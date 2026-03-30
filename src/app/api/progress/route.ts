/**
 * /api/progress
 *
 * POST - Mark a lesson as complete and update enrollment progress
 * GET  - Get user's progress for courses
 */

import { NextRequest, NextResponse } from "next/server";
import { ID, Query } from "node-appwrite";
import {
  createAdminClient,
  DB_ID,
  COL_PROGRESS,
  COL_ENROLLMENTS,
} from "@/lib/appwriteServer";

// Helper to get user from session cookie
function getUserFromSession(request: NextRequest): { id: string } | null {
  try {
    const raw = request.cookies.get("cl_session")?.value;
    if (!raw) return null;
    const user = JSON.parse(raw) as { id: string; xp?: number; level?: number };
    return user?.id ? user : null;
  } catch {
    return null;
  }
}

// POST - Mark lesson as complete
export async function POST(request: NextRequest) {
  try {
    const user = getUserFromSession(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { courseId, lessonId, lessonSlug, xpEarned = 10 } = body;

    if (!courseId || !lessonId || !lessonSlug) {
      return NextResponse.json(
        { error: "Missing required fields: courseId, lessonId, lessonSlug" },
        { status: 400 }
      );
    }

    const { databases, users } = createAdminClient();

    // Check if already completed
    const existing = await databases.listDocuments(DB_ID, COL_PROGRESS, [
      Query.equal("userId", user.id),
      Query.equal("courseId", courseId),
      Query.equal("lessonId", lessonId),
    ]);

    if (existing.documents.length > 0) {
      // Already completed
      return NextResponse.json({
        progress: existing.documents[0],
        alreadyCompleted: true,
      });
    }

    // Create progress record
    const now = new Date().toISOString();
    const progress = await databases.createDocument(
      DB_ID,
      COL_PROGRESS,
      ID.unique(),
      {
        userId: user.id,
        courseId,
        lessonId,
        lessonSlug,
        completedAt: now,
        xpEarned,
      }
    );

    // Update enrollment progress
    const enrollments = await databases.listDocuments(DB_ID, COL_ENROLLMENTS, [
      Query.equal("userId", user.id),
      Query.equal("courseId", courseId),
    ]);

    if (enrollments.documents.length > 0) {
      const enrollment = enrollments.documents[0];

      // Count total completed lessons for this course
      const allProgress = await databases.listDocuments(DB_ID, COL_PROGRESS, [
        Query.equal("userId", user.id),
        Query.equal("courseId", courseId),
      ]);

      const completedCount = allProgress.total;
      const totalLessons = enrollment.totalLessons || 1;
      const percentComplete = Math.round((completedCount / totalLessons) * 100);

      // Update enrollment
      await databases.updateDocument(
        DB_ID,
        COL_ENROLLMENTS,
        enrollment.$id,
        {
          completedLessons: completedCount,
          percentComplete,
          lastAccessedAt: now,
          status: percentComplete >= 100 ? "completed" : "active",
        }
      );
    }

    // Award XP to user (update user preferences)
    try {
      const userAccount = await users.get(user.id);
      const userPrefs = userAccount.prefs || {};
      const currentXp = userPrefs.xp || 0;
      const currentLevel = userPrefs.level || 1;
      const newXp = currentXp + xpEarned;

      // Simple level calculation: every 100 XP = 1 level
      const newLevel = Math.max(1, Math.floor(newXp / 100) + 1);

      await users.updatePrefs(user.id, {
        ...userPrefs,
        xp: newXp,
        level: newLevel,
      });

      // Track daily activity
      try {
        await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/activity`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Cookie": request.headers.get("Cookie") || ""
          },
          body: JSON.stringify({
            type: "lesson",
            xpEarned,
            minutesStudied: 10, // Estimate 10 minutes per lesson
          }),
        });
      } catch (activityError) {
        console.error("Failed to track activity:", activityError);
        // Continue anyway - lesson completion is more important
      }

      // Update session cookie with new XP/level
      const sessionCookie = request.cookies.get("cl_session");
      if (sessionCookie) {
        const sessionData = JSON.parse(sessionCookie.value);
        sessionData.xp = newXp;
        sessionData.level = newLevel;

        const response = NextResponse.json({
          progress,
          xpAwarded: xpEarned,
          newXp,
          newLevel,
        });

        response.cookies.set("cl_session", JSON.stringify(sessionData), {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 7 * 24 * 60 * 60,
          path: "/",
        });

        return response;
      }
    } catch (xpError) {
      console.error("Failed to award XP:", xpError);
      // Continue anyway - progress was saved
    }

    return NextResponse.json({
      progress,
      xpAwarded: xpEarned,
    });
  } catch (error: any) {
    console.error("Progress API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to save progress" },
      { status: 500 }
    );
  }
}

// GET - Get user's progress
export async function GET(request: NextRequest) {
  try {
    const user = getUserFromSession(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get("courseId");

    const { databases } = createAdminClient();

    const queries = [Query.equal("userId", user.id)];
    if (courseId) {
      queries.push(Query.equal("courseId", courseId));
    }

    const result = await databases.listDocuments(DB_ID, COL_PROGRESS, queries);

    return NextResponse.json({
      progress: result.documents,
      total: result.total,
    });
  } catch (error: any) {
    console.error("Get progress error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch progress" },
      { status: 500 }
    );
  }
}
