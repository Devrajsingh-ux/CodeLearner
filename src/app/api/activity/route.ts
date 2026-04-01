/**
 * /api/activity
 *
 * POST - Record daily activity (lessons, problems, XP)
 * GET  - Get user's activity history
 */

import { NextRequest, NextResponse } from "next/server";
import { ID, Query } from "node-appwrite";
import {
  createAdminClient,
  DB_ID,
  COL_ACTIVITY,
  COL_STREAKS,
} from "@/lib/appwriteServer";
import { getUserFromSession } from "@/lib/auth";
import { validateInput, activityPostSchema, activityGetSchema, sanitizeString } from "@/lib/validation";
import {
  formatDateISO,
  daysBetween,
  unauthorizedResponse,
  validationErrorResponse,
  handleDatabaseError,
  withErrorHandling
} from "@/lib/utils";

// POST - Record activity and update streak
export async function POST(request: NextRequest) {
  return withErrorHandling(async () => {
    const user = await getUserFromSession(request);
    if (!user) {
      return unauthorizedResponse();
    }

    const body = await request.json();

    // Validate input
    const validation = validateInput(activityPostSchema, body);
    if (!validation.success) {
      return validationErrorResponse(validation.errors || []);
    }

    const {
      type,
      xpEarned = 0,
      minutesStudied = 0,
      problemId = null,
      questId = null
    } = validation.data;

    const today = formatDateISO();
    const now = new Date().toISOString();

    const { databases, users } = createAdminClient();

    // Get or create today's activity record
    let todayActivity = null;
    const existingActivity = await databases.listDocuments(DB_ID, COL_ACTIVITY, [
      Query.equal("userId", user.id),
      Query.equal("date", today),
      Query.limit(1)
    ]);

    if (existingActivity.documents.length > 0) {
      todayActivity = existingActivity.documents[0];
    } else {
      // Create new activity record for today
      todayActivity = await databases.createDocument(
        DB_ID,
        COL_ACTIVITY,
        ID.unique(),
        {
          userId: user.id,
          date: today,
          lessonsCompleted: 0,
          problemsSolved: 0,
          xpEarned: 0,
          minutesStudied: 0,
          questsCompleted: [],
          createdAt: now,
        }
      );
    }

    // Update activity based on type
    const updates: any = {
      xpEarned: (todayActivity.xpEarned || 0) + xpEarned,
      minutesStudied: (todayActivity.minutesStudied || 0) + minutesStudied,
    };

    if (type === "lesson") {
      updates.lessonsCompleted = (todayActivity.lessonsCompleted || 0) + 1;
    } else if (type === "problem") {
      updates.problemsSolved = (todayActivity.problemsSolved || 0) + 1;
    } else if (type === "quest" && questId) {
      const currentQuests = todayActivity.questsCompleted || [];
      const sanitizedQuestId = sanitizeString(questId, 100);
      if (!currentQuests.includes(sanitizedQuestId)) {
        updates.questsCompleted = [...currentQuests, sanitizedQuestId];
      }
    }

    // Update today's activity
    await databases.updateDocument(
      DB_ID,
      COL_ACTIVITY,
      todayActivity.$id,
      updates
    );

    // Update or create streak record
    let streakRecord = null;
    const existingStreak = await databases.listDocuments(DB_ID, COL_STREAKS, [
      Query.equal("userId", user.id),
      Query.limit(1)
    ]);

    if (existingStreak.documents.length > 0) {
      streakRecord = existingStreak.documents[0];
      const lastActivityDate = streakRecord.lastActivityDate;
      const daysSinceLastActivity = daysBetween(lastActivityDate, today);

      let currentStreak = streakRecord.currentStreak || 0;
      let longestStreak = streakRecord.longestStreak || 0;
      let streakStartDate = streakRecord.streakStartDate || today;

      if (daysSinceLastActivity === 0) {
        // Same day, no change to streak
      } else if (daysSinceLastActivity === 1) {
        // Consecutive day - increment streak
        currentStreak += 1;
        longestStreak = Math.max(longestStreak, currentStreak);
      } else {
        // Streak broken - reset
        currentStreak = 1;
        streakStartDate = today;
      }

      await databases.updateDocument(
        DB_ID,
        COL_STREAKS,
        streakRecord.$id,
        {
          currentStreak,
          longestStreak,
          lastActivityDate: today,
          streakStartDate,
          updatedAt: now,
        }
      );

      // Update user prefs with new streak
      try {
        const userAccount = await users.get(user.id);
        const userPrefs = userAccount.prefs || {};
        await users.updatePrefs(user.id, {
          ...userPrefs,
          streak: currentStreak,
        });
      } catch (err) {
        console.error("Failed to update user streak:", err);
      }

    } else {
      // Create new streak record
      await databases.createDocument(
        DB_ID,
        COL_STREAKS,
        ID.unique(),
        {
          userId: user.id,
          currentStreak: 1,
          longestStreak: 1,
          lastActivityDate: today,
          streakStartDate: today,
          updatedAt: now,
        }
      );

      // Update user prefs
      try {
        const userAccount = await users.get(user.id);
        const userPrefs = userAccount.prefs || {};
        await users.updatePrefs(user.id, {
          ...userPrefs,
          streak: 1,
        });
      } catch (err) {
        console.error("Failed to update user streak:", err);
      }
    }

    return NextResponse.json({
      success: true,
      activity: updates,
      date: today
    });

  }, (error) => {
    // Handle database connection issues gracefully
    const errorResult = handleDatabaseError(error, {
      fallbackData: {
        success: true,
        activity: {
          xpEarned: 0,
          minutesStudied: 0,
          lessonsCompleted: 0,
          problemsSolved: 0,
        },
        date: formatDateISO(),
        warning: "Database not initialized - activity not persisted"
      }
    }, "activity tracking");

    if (errorResult.success) {
      return NextResponse.json(errorResult.data);
    }
    return errorResult.response;
  });
}

// GET - Get user's activity history
export async function GET(request: NextRequest) {
  return withErrorHandling(async () => {
    const user = await getUserFromSession(request);
    if (!user) {
      return unauthorizedResponse();
    }

    const { searchParams } = new URL(request.url);

    // Validate query parameters
    const validation = validateInput(activityGetSchema, {
      days: searchParams.get("days")
    });

    const days = validation.success ? validation.data.days : 7;
    const { databases } = createAdminClient();

    // Get recent activity
    const activities = await databases.listDocuments(DB_ID, COL_ACTIVITY, [
      Query.equal("userId", user.id),
      Query.orderDesc("date"),
      Query.limit(days)
    ]);

    // Get streak info
    const streaks = await databases.listDocuments(DB_ID, COL_STREAKS, [
      Query.equal("userId", user.id),
      Query.limit(1)
    ]);

    const streakInfo = streaks.documents.length > 0 ? streaks.documents[0] : null;
    const today = formatDateISO();

    // Calculate totals
    const totalXpThisWeek = activities.documents
      .filter(activity => {
        const activityDate = new Date(activity.date);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return activityDate >= weekAgo;
      })
      .reduce((sum, activity) => sum + (activity.xpEarned || 0), 0);

    const totalMinutesToday = activities.documents
      .filter(activity => activity.date === today)
      .reduce((sum, activity) => sum + (activity.minutesStudied || 0), 0);

    return NextResponse.json({
      activities: activities.documents,
      streak: streakInfo,
      stats: {
        xpThisWeek: totalXpThisWeek,
        minutesToday: totalMinutesToday,
      }
    });

  }, (error) => {
    // Handle database connection issues gracefully
    const errorResult = handleDatabaseError(error, {
      fallbackData: {
        activities: [],
        streak: {
          currentStreak: 0,
          longestStreak: 0,
          lastActivityDate: formatDateISO(),
          streakStartDate: formatDateISO(),
        },
        stats: {
          xpThisWeek: 0,
          minutesToday: 0,
        },
        warning: "Database not initialized"
      }
    }, "activity fetch");

    if (errorResult.success) {
      return NextResponse.json(errorResult.data);
    }
    return errorResult.response;
  });
}