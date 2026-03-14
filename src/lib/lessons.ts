export interface LessonContent {
  title: string;
  type: "article" | "exercise" | "quiz";
  duration: string;
  xp: number;
  content: string; // markdown-like text rendered by the lesson page
  code: string; // initial editor code
  language: string;
  filename: string;
  objectives: string[];
}

export interface TrackCurriculum {
  sections: {
    title: string;
    lessons: {
      slug: string;
      title: string;
      type: "article" | "exercise" | "quiz";
      duration: string;
      isLocked: boolean;
      xp: number;
    }[];
  }[];
}

import { createAdminClient, DB_ID, COL_LESSONS } from "@/lib/appwriteServer";
import { Query } from "node-appwrite";

// Note: runtime fallback removed — lessons are served live from Appwrite.

// Curriculum metadata is provided by Appwrite. The in-repo static curricula
// and lesson objects were removed so the site relies on live data only.
export const CURRICULA: Record<string, TrackCurriculum> = {};

// Fetch curriculum from Appwrite lessons collection for the given track.
export async function getCurriculum(
  slug: string,
  _title: string,
  _lessonCount: number,
): Promise<TrackCurriculum> {
  try {
    const { databases } = createAdminClient();
    const resp = await databases.listDocuments(DB_ID, COL_LESSONS, [
      Query.equal("track", slug),
      Query.orderAsc("$createdAt"),
      Query.limit(1000),
    ]);

    if (resp.total === 0) return { sections: [] };

    const lessons = resp.documents.map((d: any, idx: number) => ({
      slug: d.slug ?? `lesson-${idx + 1}`,
      title: d.title ?? `Lesson ${idx + 1}`,
      type: (d.type as "article" | "exercise" | "quiz") ?? "exercise",
      duration: d.duration ?? "15m",
      isLocked: Boolean(d.isLocked),
      xp: Number(d.xp) || 50,
    }));

    return { sections: [{ title: "Lessons", lessons }] };
  } catch {
    return { sections: [] };
  }
}

// ── Lesson content resolver (live) ───────────────────────────────────────────
export async function getLessonContent(
  trackSlug: string,
  lessonSlug: string,
  _trackTitle: string,
  _lessonNum: number,
): Promise<LessonContent | null> {
  try {
    const { databases } = createAdminClient();
    const resp = await databases.listDocuments(DB_ID, COL_LESSONS, [
      Query.equal("track", trackSlug),
      Query.equal("slug", lessonSlug),
      Query.limit(1),
    ]);

    if (resp.total > 0) {
      const d = resp.documents[0];
      return {
        title: d.title ?? "",
        type: (d.type as "article" | "exercise" | "quiz") ?? "exercise",
        duration: d.duration ?? "15m",
        xp: Number(d.xp) || 50,
        objectives: Array.isArray(d.objectives) ? d.objectives : [],
        content: d.content ?? "",
        code: d.code ?? "",
        language: d.language ?? "javascript",
        filename: d.filename ?? "",
      } as LessonContent;
    }
  } catch (err) {
    // intentionally return null on error — no local mock/fallback
  }

  return null;
}
