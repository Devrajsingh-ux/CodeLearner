import { NextRequest } from "next/server";
import { ID } from "node-appwrite";
import {
  createAdminClient,
  DB_ID,
  COL_COURSES,
  COL_LESSONS,
  requireAdminCookie,
} from "@/lib/appwriteServer";

/**
 * /api/admin/courses/generate
 *
 * Simplified server endpoint that accepts a fully-formed course payload
 * (created by an external self-hosted AI or any admin client) and persists
 * the course + lessons to Appwrite. This endpoint DOES NOT call any external
 * AI provider and requires an admin session cookie.
 *
 * Expected request body (JSON):
 * {
 *   course: { title, description, category?, difficulty?, tags?, status? },
 *   lessons: [ { title, type, objectives, content, starterCode?, solutionCode?, language?, duration? }, ... ]
 * }
 */

function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^\\w\\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getFilename(lang?: string) {
  const m: Record<string, string> = {
    javascript: "index.js",
    typescript: "index.ts",
    tsx: "App.tsx",
    python: "main.py",
    java: "Main.java",
    cpp: "main.cpp",
    csharp: "Program.cs",
    rust: "main.rs",
    go: "main.go",
    ruby: "main.rb",
    php: "index.php",
    swift: "main.swift",
    kotlin: "Main.kt",
    sql: "query.sql",
    html: "index.html",
    css: "styles.css",
  };
  return (lang && m[lang]) || "main.js";
}

function mapCourseForResponse(doc: any) {
  return {
    id: doc.$id,
    slug: doc.slug ?? "",
    title: doc.title ?? "",
    description: doc.description ?? "",
    category: doc.category ?? "",
    difficulty: doc.difficulty ?? "",
    tags: Array.isArray(doc.tags) ? doc.tags : (typeof doc.tags === "string" ? String(doc.tags).split(",").map((t: string) => t.trim()) : []),
    duration: doc.duration ?? "",
    status: doc.status ?? "draft",
    createdAt: (doc.$createdAt ?? "").toString().slice(0, 10),
    updatedAt: (doc.$updatedAt ?? "").toString().slice(0, 10),
  };
}

export async function POST(request: NextRequest) {
  if (!requireAdminCookie(request)) {
    return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403, headers: { "Content-Type": "application/json" } });
  }

  let payload: any;
  try {
    payload = await request.json();
  } catch (e) {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), { status: 400, headers: { "Content-Type": "application/json" } });
  }

  const { course, lessons } = payload ?? {};
  if (!course || !course.title || !Array.isArray(lessons)) {
    return new Response(JSON.stringify({ error: "Payload must include 'course' and 'lessons' array." }), { status: 400, headers: { "Content-Type": "application/json" } });
  }

  const admin = createAdminClient();
  const { databases } = admin;

  // Normalize course
  const title = String(course.title);
  const slug = course.slug ? String(course.slug) : slugify(title);
  const courseDocPayload: Record<string, unknown> = {
    title,
    slug,
    description: course.description ?? "",
    category: course.category ?? "",
    difficulty: course.difficulty ?? "",
    tags: course.tags ?? [],
    duration: course.duration ?? "",
    status: course.status ?? "draft",
    instructor: course.instructor ?? "",
    lessonsCount: lessons.length,
  };

  let createdCourse: any = null;
  try {
    createdCourse = await databases.createDocument(DB_ID, COL_COURSES, ID.unique(), courseDocPayload);
  } catch (e: any) {
    return new Response(JSON.stringify({ error: `Failed to create course: ${e?.message ?? String(e)}` }), { status: 500, headers: { "Content-Type": "application/json" } });
  }

  const createdLessons: any[] = [];
  let lessonsFailed = 0;

  for (let i = 0; i < lessons.length; i++) {
    const l = lessons[i] ?? {};
    const lessonPayload: Record<string, unknown> = {
      title: l.title ?? `Lesson ${i + 1}`,
      slug: l.slug ?? slugify(String(l.title ?? `lesson-${i + 1}`)),
      courseId: createdCourse.$id,
      order: Number(l.order ?? (i + 1)),
      type: l.type ?? "article",
      content: l.content ?? "",
      code: l.starterCode ?? "",
      solution: l.solutionCode ?? "",
      language: l.language ?? "",
      filename: getFilename(l.language),
      objectives: Array.isArray(l.objectives) ? l.objectives : [],
      duration: l.duration ?? "",
    };

    try {
      const doc = await databases.createDocument(DB_ID, COL_LESSONS, ID.unique(), lessonPayload);
      createdLessons.push(doc);
    } catch (e) {
      lessonsFailed++;
    }
  }

  // Return created course + summary
  return new Response(JSON.stringify({
    course: mapCourseForResponse(createdCourse),
    lessonsCreated: createdLessons.length,
    lessonsFailed,
    lessonList: createdLessons.map((d) => ({ id: d.$id, title: d.title ?? "" })),
  }), { status: 200, headers: { "Content-Type": "application/json" } });
}
