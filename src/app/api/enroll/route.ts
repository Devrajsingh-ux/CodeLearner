/**
 * /api/enroll
 *
 * POST - Enroll user in a course
 * GET  - Get user's enrollments
 */

import { NextRequest, NextResponse } from "next/server";
import { ID, Query } from "node-appwrite";
import { createAdminClient, DB_ID, COL_ENROLLMENTS } from "@/lib/appwriteServer";
import { getUserFromSession } from "@/lib/auth";
import { validateInput, enrollmentPostSchema, sanitizeString } from "@/lib/validation";

// POST - Enroll in a course
export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromSession(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    // Validate input
    const validation = validateInput(enrollmentPostSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid input", details: validation.errors },
        { status: 400 }
      );
    }

    const { courseId, courseSlug, courseTitle } = validation.data;
    const totalLessons = typeof body.totalLessons === 'number' ? Math.max(0, body.totalLessons) : 0;

    try {
      const { databases } = createAdminClient();

      // Check if already enrolled
      const existing = await databases.listDocuments(DB_ID, COL_ENROLLMENTS, [
        Query.equal("userId", user.id),
        Query.equal("courseId", courseId),
      ]);

      if (existing.documents.length > 0) {
        // Already enrolled, update last accessed time
        const enrollment = existing.documents[0];
        await databases.updateDocument(
          DB_ID,
          COL_ENROLLMENTS,
          enrollment.$id,
          { lastAccessedAt: new Date().toISOString() }
        );
        return NextResponse.json({
          enrollment,
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
          courseId: sanitizeString(courseId, 100),
          courseSlug: sanitizeString(courseSlug, 100),
          courseTitle: sanitizeString(courseTitle, 500),
          enrolledAt: now,
          lastAccessedAt: now,
          status: "active",
          completedLessons: 0,
          totalLessons,
          percentComplete: 0,
        }
      );

      return NextResponse.json({ enrollment });

    } catch (dbError: unknown) {
      const error = dbError as { code?: number; type?: string; message?: string };

      // Handle database connection issues gracefully
      if (error.code === 404 && error.type === 'database_not_found') {
        console.warn("Database not found, returning simulated enrollment");
        const now = new Date().toISOString();
        return NextResponse.json({
          enrollment: {
            $id: `local_${Date.now()}`,
            userId: user.id,
            courseId,
            courseSlug,
            courseTitle,
            enrolledAt: now,
            lastAccessedAt: now,
            status: "active",
            completedLessons: 0,
            totalLessons,
            percentComplete: 0,
          },
          warning: "Database not initialized - using simulated data"
        });
      }

      console.error("Database error in enrollment:", error.message);
      throw dbError;
    }

  } catch (error) {
    console.error("Enroll API error:", error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(
      { error: "Failed to enroll in course. Please try again." },
      { status: 500 }
    );
  }
}

// GET - Get user's enrollments
export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromSession(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
      const { databases } = createAdminClient();

      // Fetch all enrollments for this user with pagination limits
      const result = await databases.listDocuments(DB_ID, COL_ENROLLMENTS, [
        Query.equal("userId", user.id),
        Query.orderDesc("lastAccessedAt"),
        Query.limit(100),
      ]);

      return NextResponse.json({
        enrollments: result.documents.map(doc => ({
          id: doc.$id,
          userId: doc.userId,
          courseId: doc.courseId,
          courseSlug: doc.courseSlug,
          courseTitle: doc.courseTitle,
          enrolledAt: doc.enrolledAt,
          lastAccessedAt: doc.lastAccessedAt,
          completedLessons: doc.completedLessons || 0,
          totalLessons: doc.totalLessons || 0,
          percentComplete: doc.percentComplete || 0,
          timeSpent: doc.timeSpent || 0,
          lastLessonId: doc.lastLessonId || null,
          status: doc.status || "active",
        }))
      });

    } catch (dbError: unknown) {
      const error = dbError as { code?: number; type?: string; message?: string };

      if (error.code === 404 && error.type === 'database_not_found') {
        console.warn("Database not found, returning empty enrollments");
        return NextResponse.json({
          enrollments: [],
          warning: "Database not initialized"
        });
      }

      console.error("Database error fetching enrollments:", error.message);
      return NextResponse.json({
        enrollments: [],
        error: "Unable to fetch enrollments"
      }, { status: 500 });
    }

  } catch (error) {
    console.error("Get enrollments error:", error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(
      { enrollments: [], error: "An error occurred" },
      { status: 500 }
    );
  }
}
