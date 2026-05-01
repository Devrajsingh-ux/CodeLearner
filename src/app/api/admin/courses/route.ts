/**
 * /api/admin/courses
 *
 * GET    → list all courses from Appwrite Database
 * POST   → create a new course
 * PATCH  → update course fields (status, featured, isNew, etc.)
 * DELETE → delete a course
 */
import { NextRequest, NextResponse } from "next/server";
import { ID, Query } from "node-appwrite";
import { createAdminClient, DB_ID, COL_COURSES } from "@/lib/appwriteServer";
import { requireAdminAuth } from "@/security/auth";
import type { AdminCourse } from "@/data/admin";

function parseTags(raw: unknown): string[] {
  if (Array.isArray(raw)) return raw.filter(Boolean);
  if (typeof raw === "string" && raw.trim()) {
    return raw.split(",").map((t) => t.trim()).filter(Boolean);
  }
  return [];
}

function mapCourse(doc: any): AdminCourse {
  return {
    id             : doc.$id,
    slug           : doc.slug           ?? "",
    title          : doc.title          ?? "",
    description    : doc.description    ?? "",
    tags           : parseTags(doc.tags),
    category       : doc.category       ?? "",
    difficulty     : doc.difficulty     ?? "Beginner",
    lessonsCount   : doc.lessonsCount   ?? 0,
    enrolledCount  : doc.enrolledCount  ?? 0,
    completionRate : doc.completionRate ?? 0,
    rating         : doc.rating         ?? 0,
    status         : doc.status         ?? "draft",
    isFeatured     : doc.isFeatured     ?? false,
    isNew          : doc.isNew          ?? false,
    createdAt      : (doc.$createdAt ?? "").slice(0, 10),
    updatedAt      : (doc.$updatedAt ?? "").slice(0, 10),
    instructor     : doc.instructor     ?? "",
    duration       : doc.duration       ?? "",
  };
}

export async function GET(request: NextRequest) {
  if (!(await requireAdminAuth(request)))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  try {
    const { databases } = createAdminClient();

    // Protect against long-running requests to Appwrite by timing out
    const listPromise = databases.listDocuments(DB_ID, COL_COURSES, [
      Query.limit(100),
      Query.orderDesc("$createdAt"),
    ]);

    const TIMEOUT_MS = 5000;
    const resp: any = await Promise.race([
      listPromise,
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("appwrite_timeout")), TIMEOUT_MS),
      ),
    ]);
    return NextResponse.json({
      courses: resp.documents.map(mapCourse),
      total  : resp.total,
    });
  } catch (e: any) {
    // Collection doesn't exist yet — return empty gracefully
    if (e?.code === 404) return NextResponse.json({ courses: [], total: 0 });

    // Timeout while talking to Appwrite
    if (e?.message === "appwrite_timeout") {
      console.error("/api/admin/courses - Appwrite request timed out");
      return NextResponse.json({ error: "Upstream timeout" }, { status: 504 });
    }

    console.error("/api/admin/courses - error:", e);
    return NextResponse.json({ error: e?.message ?? "Failed" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!(await requireAdminAuth(request)))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  try {
    const body = await request.json();
    const { databases } = createAdminClient();
    const doc = await databases.createDocument(DB_ID, COL_COURSES, ID.unique(), {
      title         : body.title          ?? "",
      slug          : body.slug           ?? body.title?.toLowerCase().replace(/\s+/g, "-"),
      description   : body.description    ?? "",
      tags          : Array.isArray(body.tags) ? body.tags.join(",") : (body.tags ?? ""),
      category      : body.category       ?? "Languages",
      difficulty    : body.difficulty     ?? "Beginner",
      lessonsCount  : body.lessonsCount   ?? 0,
      enrolledCount : body.enrolledCount  ?? 0,
      completionRate: body.completionRate ?? 0,
      rating        : body.rating         ?? 0,
      status        : body.status         ?? "draft",
      isFeatured    : body.isFeatured     ?? false,
      isNew         : body.isNew          ?? false,
      instructor    : body.instructor     ?? "",
      duration      : body.duration       ?? "",
    });
    return NextResponse.json({ course: mapCourse(doc) });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Failed" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  if (!(await requireAdminAuth(request)))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  try {
    const { id, ...fields } = await request.json() as { id: string; [k: string]: unknown };
    const { databases } = createAdminClient();
    const doc = await databases.updateDocument(DB_ID, COL_COURSES, id, fields);
    return NextResponse.json({ course: mapCourse(doc) });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Failed" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!(await requireAdminAuth(request)))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  try {
    const { id } = await request.json() as { id: string };
    const { databases } = createAdminClient();
    await databases.deleteDocument(DB_ID, COL_COURSES, id);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Failed" }, { status: 500 });
  }
}
