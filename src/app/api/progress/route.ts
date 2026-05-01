/**
 * /api/progress
 *
 * POST - Record lesson completion and award XP
 * GET  - Get user's progress across all courses
 */

import { NextRequest, NextResponse } from "next/server";
import { ID, Query } from "node-appwrite";
import {
  createAdminClient,
  DB_ID,
  COL_PROGRESS,
  COL_ENROLLMENTS,
} from "@/lib/appwriteServer";
import { getUserFromSession, generateAccessToken, generateRefreshToken, setAuthCookies } from "@/security/auth";
import { requireApiUser, validateApiBody } from "@/security/api-guard";
import { progressPostSchema, sanitizeString } from "@/security/validation";
import {
  calculateLevel,
  handleDatabaseError,
  withErrorHandling
} from "@/lib/utils";

// POST - Record lesson completion
export async function POST(request: NextRequest) {
  return withErrorHandling(async () => {
    const auth = await requireApiUser(request, { enforceCsrf: true });
    if (!auth.ok) return auth.response;
    const user = auth.user;

    const body = await request.json();

    const parsed = validateApiBody(progressPostSchema, body);
    if (!parsed.ok) {
      return parsed.response;
    }

    // `validateInput` returned success above, but TypeScript doesn't narrow `validation.data`.
    // Assert it's non-null before destructuring.
    const postData = parsed.data;
    const {
      courseId,
      courseSlug,
      lessonId,
      lessonSlug,
      xpEarned = 0,
      timeSpent = 0
    } = postData;

    const now = new Date().toISOString();
    const { databases, users } = createAdminClient();

    // Check if already completed
    const existingProgress = await databases.listDocuments(DB_ID, COL_PROGRESS, [
      Query.equal("userId", user.id),
      Query.equal("lessonId", lessonId),
      Query.limit(1)
    ]);

    if (existingProgress.documents.length > 0) {
      return NextResponse.json({
        success: true,
        message: "Lesson already completed",
        progress: existingProgress.documents[0]
      });
    }

    // Create progress record first
    const progressRecord = await databases.createDocument(
      DB_ID,
      COL_PROGRESS,
      ID.unique(),
      {
        userId: user.id,
        courseId: sanitizeString(courseId, 100),
        courseSlug: sanitizeString(courseSlug, 100),
        lessonId: sanitizeString(lessonId, 100),
        lessonSlug: sanitizeString(lessonSlug, 100),
        status: "completed",
        xpEarned,
        timeSpent: Math.max(0, timeSpent),
        completedAt: now,
      }
    );

    // Run concurrent operations for enrollment update and user XP update
    const [enrollmentResult, userAccountResult] = await Promise.allSettled([
      // Get enrollment and progress data concurrently
      Promise.all([
        databases.listDocuments(DB_ID, COL_ENROLLMENTS, [
          Query.equal("userId", user.id),
          Query.equal("courseId", courseId),
        ]),
        databases.listDocuments(DB_ID, COL_PROGRESS, [
          Query.equal("userId", user.id),
          Query.equal("courseId", courseId),
        ])
      ]),
      // Get user account for XP update
      users.get(user.id)
    ]);

    // Process enrollment update if successful
    if (enrollmentResult.status === 'fulfilled') {
      const [enrollments, allProgress] = enrollmentResult.value;

      if (enrollments.documents.length > 0) {
        const enrollment = enrollments.documents[0];
        const completedCount = allProgress.total;
        const totalLessons = Math.max(enrollment.totalLessons || 1, 1);
        const percentComplete = Math.min(100, Math.round((completedCount / totalLessons) * 100));

        // Update enrollment (non-blocking)
        databases.updateDocument(
          DB_ID,
          COL_ENROLLMENTS,
          enrollment.$id,
          {
            completedLessons: completedCount,
            percentComplete,
            lastAccessedAt: now,
            lastLessonId: lessonId,
            status: percentComplete >= 100 ? "completed" : "active",
          }
        ).catch(err => console.error("Error updating enrollment:", err));
      }
    }

    // Process user XP update if successful
    let newXp = user.xp || 0;
    let newLevel = user.level || 1;
    let shouldGenerateNewTokens = false;

    if (userAccountResult.status === 'fulfilled' && xpEarned > 0) {
      try {
        const userAccount = userAccountResult.value;
        const userPrefs = userAccount.prefs || {};
        const currentXp = (userPrefs.xp as number) || 0;
        const currentLevel = (userPrefs.level as number) || 1;

        newXp = currentXp + xpEarned;
        newLevel = calculateLevel(newXp);

        await users.updatePrefs(user.id, {
          ...userPrefs,
          xp: newXp,
          level: newLevel,
        });

        // Only regenerate tokens if XP or level actually changed
        shouldGenerateNewTokens = (newLevel !== currentLevel) || (newXp !== currentXp);

      } catch (xpError) {
        console.error("Error updating user XP:", xpError);
      }
    }

    // Generate response
    const response = NextResponse.json({
      success: true,
      progress: progressRecord,
      xpAwarded: xpEarned,
      newXp,
      newLevel,
      leveledUp: newLevel > (user.level || 1)
    });

    // Set new auth cookies with updated XP/level if needed
    if (shouldGenerateNewTokens) {
      try {
        const updatedUser = { ...user, xp: newXp, level: newLevel };
        const [accessToken, refreshToken] = await Promise.all([
          generateAccessToken(updatedUser),
          generateRefreshToken(updatedUser)
        ]);

        const { accessTokenCookie, refreshTokenCookie } = setAuthCookies(accessToken, refreshToken);

        response.cookies.set(accessTokenCookie.name, accessTokenCookie.value, accessTokenCookie.options);
        response.cookies.set(refreshTokenCookie.name, refreshTokenCookie.value, refreshTokenCookie.options);

      } catch (tokenError) {
        console.error("Error updating auth tokens:", tokenError);
      }
    }

    return response;

  }, (error) => {
    const errorResult = handleDatabaseError(error, {
      fallbackData: {
        success: true,
        progress: { id: "local_progress", status: "completed" },
        xpAwarded: 0,
        warning: "Database not initialized - progress not saved"
      }
    }, "progress tracking");

    if (errorResult.success) {
      return NextResponse.json(errorResult.data);
    }
    return errorResult.response;
  });
}

// GET - Get user's progress across all courses
export async function GET(request: NextRequest) {
  return withErrorHandling(async () => {
    const auth = await requireApiUser(request);
    if (!auth.ok) return auth.response;
    const user = auth.user;

    const { databases } = createAdminClient();

    // Run concurrent queries for better performance
    const [progressResult, enrollmentsResult] = await Promise.allSettled([
      databases.listDocuments(DB_ID, COL_PROGRESS, [
        Query.equal("userId", user.id),
        Query.orderDesc("completedAt"),
        Query.limit(100)
      ]),
      databases.listDocuments(DB_ID, COL_ENROLLMENTS, [
        Query.equal("userId", user.id),
        Query.orderDesc("lastAccessedAt"),
        Query.limit(50)
      ])
    ]);

    const progress = progressResult.status === 'fulfilled' ? progressResult.value.documents : [];
    const enrollments = enrollmentsResult.status === 'fulfilled' ? enrollmentsResult.value.documents : [];

    // Calculate stats
    const totalXp = progress.reduce((sum, p) => sum + (p.xpEarned || 0), 0);
    const totalLessons = progress.length;
    const totalTimeSpent = progress.reduce((sum, p) => sum + (p.timeSpent || 0), 0);

    return NextResponse.json({
      progress: progress.map(p => ({
        id: p.$id,
        courseId: p.courseId,
        courseSlug: p.courseSlug,
        lessonId: p.lessonId,
        lessonSlug: p.lessonSlug,
        xpEarned: p.xpEarned || 0,
        timeSpent: p.timeSpent || 0,
        completedAt: p.completedAt,
      })),
      enrollments: enrollments.map(e => ({
        id: e.$id,
        courseId: e.courseId,
        courseSlug: e.courseSlug,
        courseTitle: e.courseTitle,
        completedLessons: e.completedLessons || 0,
        totalLessons: e.totalLessons || 0,
        percentComplete: e.percentComplete || 0,
        status: e.status || "active",
      })),
      stats: {
        totalXp,
        totalLessons,
        totalTimeSpent,
        coursesEnrolled: enrollments.length,
        coursesCompleted: enrollments.filter(e => e.status === "completed").length,
      }
    });

  }, (error) => {
    const errorResult = handleDatabaseError(error, {
      fallbackData: {
        progress: [],
        enrollments: [],
        stats: { totalXp: 0, totalLessons: 0, totalTimeSpent: 0, coursesEnrolled: 0, coursesCompleted: 0 },
        warning: "Database not initialized"
      }
    }, "progress fetch");

    if (errorResult.success) {
      return NextResponse.json(errorResult.data);
    }
    return errorResult.response;
  });
}