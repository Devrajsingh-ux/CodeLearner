/**
 * GET /api/courses
 *
 * Public (no auth) — returns all PUBLISHED courses from Appwrite,
 * mapped to the Track shape used by CourseCard / learn pages.
 *
 * Falls back to static seed data for icon / color / gradient / description / tags
 * when those fields aren't stored in Appwrite yet.
 */
import { NextRequest, NextResponse } from "next/server";
import { Query } from "node-appwrite";
import { createAdminClient, DB_ID, COL_COURSES } from "@/lib/appwriteServer";
import type { Track, TrackCategory } from "@/types";

// ── Category → accent color fallback map ─────────────────────────────────────

const CATEGORY_COLOR: Record<string, string> = {
  Languages:        "#F7DF1E",
  Frontend:         "#61DAFB",
  Backend:          "#339933",
  "Data & AI":      "#FF6B35",
  Mobile:           "#0EA5E9",
  "DevOps & Cloud": "#6366F1",
  Systems:          "#A855F7",
  "Web3 & Security":"#10B981",
  "Game Dev":       "#F43F5E",
};

const KNOWN_CATEGORIES: TrackCategory[] = [
  "Languages", "Frontend", "Backend", "Data & AI", "Mobile",
  "DevOps & Cloud", "Systems", "Web3 & Security", "Game Dev",
];

function parseTags(raw: unknown): string[] {
  if (Array.isArray(raw)) return raw.filter(Boolean);
  if (typeof raw === "string" && raw.trim()) {
    return raw.split(",").map((t) => t.trim()).filter(Boolean);
  }
  return [];
}

function mapDocToTrack(doc: any): Track {
  const slug: string = doc.slug ?? "";

  // Try to find matching static track for rich visual/text fallbacks
  // (icon, color, gradient are not stored in Appwrite — derive from category)
  const category = (
    KNOWN_CATEGORIES.includes(doc.category as TrackCategory)
      ? doc.category
      : "Languages"
  ) as TrackCategory;

  const color = CATEGORY_COLOR[category] ?? "#8B5CF6";
  const gradient = "from-violet-500/20 to-cyan-500/20";
  const icon = "\ud83d\udcda";

  // Description: stored value → generic fallback
  const description: string =
    (doc.description && doc.description.trim()) ||
    `A ${doc.difficulty ?? "Beginner"}-level course covering ${doc.title ?? "core concepts"}.`;

  // Tags: stored comma-sep → []
  const rawTags = parseTags(doc.tags);
  const tags: string[] = rawTags;

  return {
    id           : doc.$id,
    slug,
    title        : doc.title          ?? "",
    description,
    icon,
    color,
    gradient,
    difficulty   : (doc.difficulty    ?? "Beginner") as Track["difficulty"],
    lessonsCount : doc.lessonsCount   ?? 0,
    duration     : doc.duration       ?? "",
    enrolledCount: doc.enrolledCount  ?? 0,
    rating       : doc.rating         ?? 0,
    tags,
    category,
    isFeatured   : doc.isFeatured     ?? false,
    isNew        : doc.isNew          ?? false,
  };
}

export async function GET(_request: NextRequest) {
  try {
    const { databases } = createAdminClient();
    const resp = await databases.listDocuments(DB_ID, COL_COURSES, [
      Query.equal("status", "published"),
      Query.limit(200),
      Query.orderDesc("enrolledCount"),
    ]);

    const tracks: Track[] = resp.documents.map(mapDocToTrack);
    return NextResponse.json(
      { tracks, total: resp.total },
      {
        headers: {
          // Serve fresh for at most 60 s; allow CDN to hold for 30 s
          "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
        },
      },
    );
  } catch (e: any) {
    // Collection doesn't exist yet or no courses — return empty gracefully
    return NextResponse.json({ tracks: [], total: 0 });
  }
}
