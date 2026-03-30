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

// Helper to get user from session cookie
function getUserFromSession(request: NextRequest): { id: string } | null {
  try {
    const raw = request.cookies.get("cl_session")?.value;
    if (!raw) return null;
    const user = JSON.parse(raw) as { id: string };
    return user?.id ? user : null;
  } catch {
    return null;
  }
}

// Helper to format date as YYYY-MM-DD
function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

// Helper to calculate days between dates
function daysBetween(date1: string, date2: string): number {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return Math.floor((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
}

// POST - Record activity and update streak
export async function POST(request: NextRequest) {
  try {
    const user = getUserFromSession(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      type, // "lesson" | "problem" | "quest"
      xpEarned = 0,
      minutesStudied = 0,
      problemId = null,
      questId = null
    } = body;

    const { databases, users } = createAdminClient();
    const today = formatDate(new Date());
    const now = new Date().toISOString();

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
      if (!currentQuests.includes(questId)) {
        updates.questsCompleted = [...currentQuests, questId];
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

  } catch (error: any) {
    console.error("Activity tracking error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to track activity" },
      { status: 500 }
    );
  }
}

// GET - Get user's activity history
export async function GET(request: NextRequest) {
  try {
    const user = getUserFromSession(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get("days") || "7", 10);

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
      .filter(activity => activity.date === formatDate(new Date()))
      .reduce((sum, activity) => sum + (activity.minutesStudied || 0), 0);

    return NextResponse.json({
      activities: activities.documents,
      streak: streakInfo,
      stats: {
        xpThisWeek: totalXpThisWeek,
        minutesToday: totalMinutesToday,
      }
    });

  } catch (error: any) {
    console.error("Get activity error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch activity" },
      { status: 500 }
    );
  }
}