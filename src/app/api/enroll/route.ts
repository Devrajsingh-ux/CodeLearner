/**
 * /api/enroll
 *
 * POST - Enroll user in a course
 * GET  - Get user's enrollments
 */

import { NextRequest, NextResponse } from "next/server";
import { ID, Query } from "node-appwrite";
import { createAdminClient, DB_ID, COL_ENROLLMENTS, COL_COURSES } from "@/lib/appwriteServer";
import type { Enrollment } from "@/types";

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

// POST - Enroll in a course
export async function POST(request: NextRequest) {
  try {
    const user = getUserFromSession(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { courseId, courseSlug, courseTitle, totalLessons } = body;

    if (!courseId || !courseSlug || !courseTitle) {
      return NextResponse.json(
        { error: "Missing required fields: courseId, courseSlug, courseTitle" },
        { status: 400 }
      );
    }

    const { databases } = createAdminClient();

    // Check if already enrolled
    const existing = await databases.listDocuments(DB_ID, COL_ENROLLMENTS, [
      Query.equal("userId", user.id),
      Query.equal("courseId", courseId),
    ]);

    if (existing.documents.length > 0) {
      // Already enrolled, just return the existing enrollment
      return NextResponse.json({
        enrollment: existing.documents[0],
        alreadyEnrolled: true,
      });
    }

    // Create new enrollment
    const now = new Date().toISOString();
    const enrollment = await databases.createDocument(
      DB_ID,
      COL_ENROLLMENTS,
      ID.unique(),
      {
        userId: user.id,
        courseId,
        courseSlug,
        courseTitle,
        enrolledAt: now,
        lastAccessedAt: now,
        status: "active",
        completedLessons: 0,
        totalLessons: totalLessons || 0,
        percentComplete: 0,
      }
    );

    return NextResponse.json({ enrollment });
  } catch (error: any) {
    console.error("Enroll API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to enroll in course" },
      { status: 500 }
    );
  }
}

// GET - Get user's enrollments
export async function GET(request: NextRequest) {
  try {
    const user = getUserFromSession(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { databases } = createAdminClient();

    // Fetch all enrollments for this user
    const result = await databases.listDocuments(DB_ID, COL_ENROLLMENTS, [
      Query.equal("userId", user.id),
      Query.orderDesc("lastAccessedAt"),
    ]);

    return NextResponse.json({ enrollments: result.documents });
  } catch (error: any) {
    console.error("Get enrollments error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch enrollments" },
      { status: 500 }
    );
  }
}
