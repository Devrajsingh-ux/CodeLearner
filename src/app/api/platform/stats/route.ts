/**
 * GET /api/platform/stats
 * Public endpoint returning aggregated platform statistics backed by Appwrite.
 */
import { NextRequest, NextResponse } from "next/server";
import { Query } from "node-appwrite";
import {
  createAdminClient,
  DB_ID,
  COL_COURSES,
  COL_SETTINGS,
  SETTINGS_DOC,
} from "@/lib/appwriteServer";

function safeNumber(v: any) {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

export async function GET(_request: NextRequest) {
  try {
    const { databases } = createAdminClient();

    // Fetch published courses (max 1000)
    let resp: any = { documents: [], total: 0 };
    try {
      resp = await databases.listDocuments(DB_ID, COL_COURSES, [
        Query.equal("status", "published"),
        Query.limit(1000),
      ]);
    } catch (err) {
      // If the collection/database isn't set up yet, return zeroed stats below.
      resp = { documents: [], total: 0 };
    }

    const docs = Array.isArray(resp?.documents) ? resp.documents : [];

    // Active learners = sum of enrolledCount
    const activeLearners = docs.reduce((s: number, d: any) => s + safeNumber(d?.enrolledCount), 0);

    // Course tracks = number of published documents
    const courseTracks = Number.isFinite(Number(resp?.total)) ? Number(resp.total) : docs.length;

    // Compute weighted completion rate (by enrollments) when available
    let completionRate = 0;
    try {
      const totalEnroll = docs.reduce((s: number, d: any) => s + safeNumber(d?.enrolledCount), 0);
      if (totalEnroll > 0) {
        const weighted = docs.reduce((s: number, d: any) => s + (safeNumber(d?.completionRate) * safeNumber(d?.enrolledCount)), 0);
        completionRate = Math.round(weighted / totalEnroll) || 0;
      } else {
        const avg = docs.length ? docs.reduce((s: number, d: any) => s + safeNumber(d?.completionRate), 0) / docs.length : 0;
        completionRate = Math.round(avg) || 0;
      }
    } catch {
      completionRate = 0;
    }

    // Job placements: try to read from settings document if present
    let jobPlacements = 0;
    try {
      const settings: any = await databases.getDocument(DB_ID, COL_SETTINGS, SETTINGS_DOC);
      jobPlacements = safeNumber(settings?.jobPlacements);
    } catch {
      // ignore — settings doc may not exist
    }

    return NextResponse.json(
      {
        activeLearners,
        courseTracks,
        completionRate,
        jobPlacements,
      },
      {
        headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60" },
      },
    );
  } catch (e: any) {
    return NextResponse.json({ error: String(e?.message ?? e ?? "Failed") }, { status: 500 });
  }
}
