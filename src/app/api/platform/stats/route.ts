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

export async function GET(_request: NextRequest) {
  try {
    const { databases } = createAdminClient();

    // Fetch published courses (max 1000)
    const resp = await databases.listDocuments(DB_ID, COL_COURSES, [
      Query.equal("status", "published"),
      Query.limit(1000),
    ]);

    const docs = resp.documents ?? [];

    // Active learners = sum of enrolledCount
    const activeLearners = docs.reduce((s: number, d: any) => s + (Number(d.enrolledCount) || 0), 0);

    // Course tracks = number of published documents
    const courseTracks = resp.total ?? docs.length;

    // Compute weighted completion rate (by enrollments) when available
    let completionRate = 0;
    try {
      const totalEnroll = docs.reduce((s: number, d: any) => s + (Number(d.enrolledCount) || 0), 0);
      if (totalEnroll > 0) {
        const weighted = docs.reduce((s: number, d: any) => s + ((Number(d.completionRate) || 0) * (Number(d.enrolledCount) || 0)), 0);
        completionRate = Math.round((weighted / totalEnroll) || 0);
      } else {
        // fallback to simple average if no enrollments
        const avg = docs.length ? docs.reduce((s: number, d: any) => s + (Number(d.completionRate) || 0), 0) / docs.length : 0;
        completionRate = Math.round(avg || 0);
      }
    } catch {
      completionRate = 0;
    }

    // Job placements: try to read from settings document if present
    let jobPlacements = 0;
    try {
      const settings = await databases.getDocument(DB_ID, COL_SETTINGS, SETTINGS_DOC);
      jobPlacements = Number(settings.jobPlacements) || 0;
    } catch {
      // ignore — settings doc may not exist
    }

    return NextResponse.json({
      activeLearners,
      courseTracks,
      completionRate,
      jobPlacements,
    }, {
      headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60" },
    });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Failed" }, { status: 500 });
  }
}
