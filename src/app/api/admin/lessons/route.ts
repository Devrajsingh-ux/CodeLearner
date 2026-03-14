/**
 * /api/admin/lessons
 *
 * GET    → list all lessons from Appwrite Database
 * POST   → create a new lesson
 * PATCH  → update lesson fields (isLocked, xp, etc.)
 * DELETE → delete a lesson
 */
import { NextRequest, NextResponse } from "next/server";
import { ID, Query } from "node-appwrite";
import {
  createAdminClient,
  DB_ID,
  COL_LESSONS,
  requireAdminCookie,
} from "@/lib/appwriteServer";
import type { AdminLesson } from "@/data/admin";

function mapLesson(doc: any): AdminLesson {
  return {
    id         : doc.$id,
    slug       : doc.slug        ?? "",
    title      : doc.title       ?? "",
    trackId    : doc.trackId     ?? "",
    trackTitle : doc.trackTitle  ?? "",
    trackSlug  : doc.trackSlug   ?? "",
    type       : doc.type        ?? "article",
    duration   : doc.duration    ?? "",
    xp         : doc.xp          ?? 0,
    isLocked   : doc.isLocked    ?? false,
    order      : doc.order       ?? 0,
    completions: doc.completions ?? 0,
    avgScore   : doc.avgScore    ?? null,
    createdAt  : (doc.$createdAt ?? "").slice(0, 10),
  };
}

export async function GET(request: NextRequest) {
  if (!requireAdminCookie(request))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  try {
    const { databases } = createAdminClient();
    const resp = await databases.listDocuments(DB_ID, COL_LESSONS, [
      Query.limit(200),
      Query.orderAsc("order"),
    ]);
    return NextResponse.json({
      lessons: resp.documents.map(mapLesson),
      total  : resp.total,
    });
  } catch (e: any) {
    if (e?.code === 404) return NextResponse.json({ lessons: [], total: 0 });
    return NextResponse.json({ error: e?.message ?? "Failed" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!requireAdminCookie(request))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  try {
    const body = await request.json();
    const { databases } = createAdminClient();
    const doc = await databases.createDocument(DB_ID, COL_LESSONS, ID.unique(), {
      title      : body.title      ?? "",
      slug       : body.slug       ?? body.title?.toLowerCase().replace(/\s+/g, "-"),
      trackId    : body.trackId    ?? "",
      trackTitle : body.trackTitle ?? "",
      trackSlug  : body.trackSlug  ?? "",
      type       : body.type       ?? "article",
      duration   : body.duration   ?? "",
      xp         : body.xp         ?? 0,
      isLocked   : body.isLocked   ?? false,
      order      : body.order      ?? 0,
      completions: body.completions ?? 0,
      avgScore   : body.avgScore    ?? null,
    });
    return NextResponse.json({ lesson: mapLesson(doc) });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Failed" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  if (!requireAdminCookie(request))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  try {
    const { id, ...fields } = await request.json() as { id: string; [k: string]: unknown };
    const { databases } = createAdminClient();
    const doc = await databases.updateDocument(DB_ID, COL_LESSONS, id, fields);
    return NextResponse.json({ lesson: mapLesson(doc) });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Failed" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!requireAdminCookie(request))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  try {
    const { id } = await request.json() as { id: string };
    const { databases } = createAdminClient();
    await databases.deleteDocument(DB_ID, COL_LESSONS, id);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Failed" }, { status: 500 });
  }
}
