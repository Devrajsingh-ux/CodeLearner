/**
 * /api/admin/courses/import
 *
 * POST → Accepts multipart/form-data containing a .docx Word file.
 *        Uses mammoth to convert it to HTML, then parses the heading
 *        structure to extract:
 *          • Course title   (first Heading 1)
 *          • Course description (first paragraph after the title)
 *          • Lessons        (each Heading 2, or each Heading 1 if no H2)
 *          • Lesson content (paragraphs / sub-headings between lesson headings)
 *          • Starter code   (first <pre> block in each lesson)
 *        Then creates one course document + N lesson documents in Appwrite.
 *
 * Form fields:
 *   file        .docx file               (required)
 *   instructor  Instructor display name  (required)
 *   status      "draft" | "published"    (default: "draft")
 *   category    Category override        (optional — auto-detected)
 *   difficulty  Difficulty override      (optional — auto-detected)
 */

import { NextRequest, NextResponse } from "next/server";
import { ID } from "node-appwrite";
import mammoth from "mammoth";
import {
  createAdminClient,
  DB_ID,
  COL_COURSES,
  COL_LESSONS,
  requireAdminCookie,
} from "@/lib/appwriteServer";

// ── Helper types ────────────────────────────────────────────────────────────

interface ParsedLesson {
  title: string;
  order: number;
  content: string;     // markdown
  starterCode: string; // first code block
  language: string;    // detected lang
  type: "article" | "exercise" | "quiz";
  duration: string;
  xp: number;
  objectives: string[];
}

interface ParsedCourse {
  title: string;
  description: string;
  language: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  tags: string[];
  lessons: ParsedLesson[];
}

// ── HTML utilities ──────────────────────────────────────────────────────────

function decodeEntities(s: string): string {
  return s
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}

function stripTags(html: string): string {
  return decodeEntities(html.replace(/<[^>]+>/g, "")).trim();
}

/** Convert a mammoth HTML chunk to minimal Markdown for storage. */
function htmlToMarkdown(html: string): string {
  const md = html
    // Fenced code blocks (pre > code)
    .replace(
      /<pre[^>]*>\s*<code[^>]*>([\s\S]*?)<\/code>\s*<\/pre>/gi,
      (_, code) => `\n\`\`\`\n${decodeEntities(code.replace(/<[^>]+>/g, "")).trim()}\n\`\`\`\n\n`,
    )
    .replace(
      /<pre[^>]*>([\s\S]*?)<\/pre>/gi,
      (_, code) => `\n\`\`\`\n${decodeEntities(code.replace(/<[^>]+>/g, "")).trim()}\n\`\`\`\n\n`,
    )
    // Sub-headings inside a lesson block
    .replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, "\n### $1\n\n")
    .replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, "\n#### $1\n\n")
    .replace(/<h5[^>]*>([\s\S]*?)<\/h5>/gi, "\n##### $1\n\n")
    // Inline formatting
    .replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, "**$1**")
    .replace(/<b[^>]*>([\s\S]*?)<\/b>/gi, "**$1**")
    .replace(/<em[^>]*>([\s\S]*?)<\/em>/gi, "*$1*")
    .replace(/<i[^>]*>([\s\S]*?)<\/i>/gi, "*$1*")
    .replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, "`$1`")
    // Links
    .replace(/<a[^>]+href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, "[$2]($1)")
    // Line breaks
    .replace(/<br\s*\/?>/gi, "\n")
    // Lists
    .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, "- $1\n")
    .replace(/<[ou]l[^>]*>([\s\S]*?)<\/[ou]l>/gi, "\n$1\n")
    // Blockquote
    .replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, "\n> $1\n\n")
    // Paragraphs
    .replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, "$1\n\n")
    // Strip remaining tags
    .replace(/<[^>]+>/g, "");

  return decodeEntities(md).replace(/\n{3,}/g, "\n\n").trim();
}

/** Pull the first raw code snippet from an HTML chunk. */
function extractFirstCode(html: string): string {
  const m1 = html.match(/<pre[^>]*>\s*<code[^>]*>([\s\S]*?)<\/code>\s*<\/pre>/i);
  if (m1) return decodeEntities(m1[1].replace(/<[^>]+>/g, "")).trim();
  const m2 = html.match(/<pre[^>]*>([\s\S]*?)<\/pre>/i);
  if (m2) return decodeEntities(m2[1].replace(/<[^>]+>/g, "")).trim();
  return "";
}

/** Grab the first <ul>'s items as a list of objective strings. */
function extractObjectives(html: string): string[] {
  const ulM = html.match(/<ul[^>]*>([\s\S]*?)<\/ul>/i);
  if (!ulM) return [];
  return [...ulM[1].matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)]
    .map((m) => stripTags(m[1]).slice(0, 255))
    .filter(Boolean)
    .slice(0, 10);
}

// ── Heuristic detectors ──────────────────────────────────────────────────────

function detectLanguage(text: string): string {
  const t = text.toLowerCase();
  if (/\bhtml\b/.test(t) && /\bcss\b/.test(t)) return "html";
  if (/\bhtml\b/.test(t)) return "html";
  if (/\bcss\b|\bstylesheet\b|\bflexbox\b|\bgrid\b/.test(t)) return "css";
  if (/\btypescript\b|\.tsx?\b|\binterface\s+\w|\btype\s+\w+\s*=/.test(t)) return "typescript";
  if (/\bjavascript\b|\bdom\b|\bconsole\.log\b|\bes20[0-9]{2}\b/.test(t)) return "javascript";
  if (/\bpython\b|\bpip\b|\bdef\s+\w+\s*\(|\bimport\s+\w+/.test(t)) return "python";
  if (/\bjava\b(?!\s*(script|fx))/.test(t)) return "java";
  if (/c\+\+|cpp|\bstd::/i.test(t)) return "cpp";
  if (/\bc#\b|\bcsharp\b|\bnamespace\s+\w|\busing system/.test(t)) return "csharp";
  if (/\brust\b|\bfn main\b|\blet mut\b/.test(t)) return "rust";
  if (/\bgolang\b|\bpackage main\b|\bfunc main\b/.test(t)) return "go";
  if (/\bruby\b|\brails\b|\bgemfile\b/.test(t)) return "ruby";
  if (/\bphp\b/.test(t)) return "php";
  if (/\bswift\b/.test(t)) return "swift";
  if (/\bkotlin\b/.test(t)) return "kotlin";
  if (/\bsql\b|\bselect\b.{0,30}\bfrom\b|\bcreate table\b/.test(t)) return "sql";
  if (/\breact\b|\bjsx\b|\busestate\b|\buseeffect\b/.test(t)) return "tsx";
  return "javascript";
}

function detectCategory(language: string, title: string): string {
  const t = `${language} ${title}`.toLowerCase();
  if (/html|css|react|vue|angular|svelte|frontend|tailwind/.test(t)) return "Frontend";
  if (/node|express|django|flask|laravel|php|backend|rest|graphql|mongodb/.test(t)) return "Backend";
  if (/python|ml|ai|machine.?learning|data.?science|pandas|numpy|tensorflow/.test(t)) return "Data & AI";
  if (/docker|aws|kubernetes|devops|cloud|ci\/cd|terraform/.test(t)) return "DevOps & Cloud";
  if (/swift|kotlin|android|ios|mobile|flutter|react.?native/.test(t)) return "Mobile";
  if (/rust|c\+\+|systems|kernel|embedded/.test(t)) return "Systems";
  if (/solidity|web3|blockchain|crypto/.test(t)) return "Web3 & Security";
  if (/unity|unreal|game.?dev|godot/.test(t)) return "Game Dev";
  return "Languages";
}

function detectDifficulty(text: string): "Beginner" | "Intermediate" | "Advanced" {
  const t = text.toLowerCase();
  if (/advanced|expert|senior|deep.?dive|master|architect|optimization|professional/.test(t))
    return "Advanced";
  if (/intermediate|moderate|practical|experienced|solid.?foundation|beyond.?basics/.test(t))
    return "Intermediate";
  return "Beginner";
}

function estimateDuration(contentLen: number): string {
  const mins = Math.max(5, Math.round(contentLen / 5 / 200 / 5) * 5);
  if (mins < 60) return `${mins}m`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

function estimateTotalDuration(lessons: ParsedLesson[]): string {
  let total = 0;
  for (const l of lessons) {
    const mh = l.duration.match(/^(\d+)h(?:\s*(\d+)m)?/);
    const mm = l.duration.match(/^(\d+)m$/);
    if (mh) total += parseInt(mh[1]) * 60 + parseInt(mh[2] ?? "0");
    else if (mm) total += parseInt(mm[1]);
  }
  if (total < 60) return `${total}m`;
  const h = Math.floor(total / 60);
  const m = total % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function cleanLessonTitle(title: string): string {
  const cleaned = title
    .replace(/^(lesson|chapter|module|topic|unit|section|part)\s*\d+\s*[:\-–—.]\s*/i, "")
    .replace(/^\d+[.\s:\-–—]+\s*/i, "")
    .trim();
  return cleaned || title.trim();
}

function getFilenameForLang(lang: string): string {
  const map: Record<string, string> = {
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
  return map[lang] ?? "main.js";
}

// ── Core document parser ────────────────────────────────────────────────────

function parseDocument(html: string, filename: string): ParsedCourse {
  // Normalize whitespace; remove empty paragraphs
  const clean = html
    .replace(/<p>\s*<\/p>/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();

  // Collect all heading tags with their content and positions
  interface HeadingInfo {
    level: number;
    title: string;
    tagStart: number;
    contentStart: number; // position right after the closing </hN> tag
  }

  const headings: HeadingInfo[] = [];
  const hRe = /<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi;
  let hm: RegExpExecArray | null;
  while ((hm = hRe.exec(clean)) !== null) {
    headings.push({
      level: parseInt(hm[1]),
      title: stripTags(hm[2]),
      tagStart: hm.index,
      contentStart: hm.index + hm[0].length,
    });
  }

  // ── No headings: treat whole document as one lesson ──────────────────────
  if (headings.length === 0) {
    const lang = detectLanguage(stripTags(clean) + " " + filename);
    const code = extractFirstCode(clean);
    const content = htmlToMarkdown(clean);
    const titleFromFile = filename
      .replace(/\.docx?$/i, "")
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

    return {
      title: titleFromFile || "Imported Course",
      description: "",
      language: lang,
      category: detectCategory(lang, titleFromFile),
      difficulty: detectDifficulty(titleFromFile),
      tags: [lang],
      lessons: [
        {
          title: "Introduction",
          order: 1,
          content,
          starterCode: code,
          language: lang,
          type: code ? "exercise" : "article",
          duration: estimateDuration(content.length),
          xp: code ? 75 : 50,
          objectives: extractObjectives(clean),
        },
      ],
    };
  }

  // ── Build sections: heading + content HTML up to the next heading ────────
  const sections = headings.map((h, i) => ({
    level: h.level,
    title: h.title,
    contentHtml: clean.slice(
      h.contentStart,
      i + 1 < headings.length ? headings[i + 1].tagStart : clean.length,
    ),
  }));

  // ── Determine course title ───────────────────────────────────────────────
  let courseTitle = "";
  let courseDescription = "";
  let sectionStart = 0;

  if (sections[0].level === 1) {
    courseTitle = sections[0].title;
    const descM = sections[0].contentHtml.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
    courseDescription = descM ? stripTags(descM[1]).slice(0, 500) : "";
    sectionStart = 1;
  } else {
    courseTitle = filename
      .replace(/\.docx?$/i, "")
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }

  const remaining = sections.slice(sectionStart);
  if (remaining.length === 0) {
    const lang = detectLanguage(courseTitle + " " + filename);
    return {
      title: courseTitle || "Imported Course",
      description: courseDescription,
      language: lang,
      category: detectCategory(lang, courseTitle),
      difficulty: detectDifficulty(courseTitle),
      tags: [lang],
      lessons: [],
    };
  }

  // Lesson-level heading = the smallest heading number (highest hierarchy) present
  const lessonLevel = Math.min(...remaining.map((s) => s.level));

  // ── Build lessons ────────────────────────────────────────────────────────
  const lessons: ParsedLesson[] = [];
  let curTitle = "";
  let curHtml = "";

  function finalizeLesson() {
    if (!curTitle) return;
    const code = extractFirstCode(curHtml);
    const objectives = extractObjectives(curHtml);
    const content = htmlToMarkdown(curHtml);
    const fullText = stripTags(curHtml) + " " + curTitle + " " + courseTitle + " " + filename;
    const lang = detectLanguage(fullText);
    const isQuiz = /quiz|test|assessment|exam/i.test(curTitle);
    const lessonType: ParsedLesson["type"] = isQuiz
      ? "quiz"
      : code
        ? "exercise"
        : "article";

    lessons.push({
      title: cleanLessonTitle(curTitle),
      order: lessons.length + 1,
      content,
      starterCode: code,
      language: lang,
      type: lessonType,
      duration: estimateDuration(content.length),
      xp: lessonType === "quiz" ? 100 : lessonType === "exercise" ? 75 : 50,
      objectives,
    });
  }

  for (const s of remaining) {
    if (s.level <= lessonLevel) {
      finalizeLesson();
      curTitle = s.title;
      curHtml = s.contentHtml;
    } else {
      // Sub-heading within a lesson — absorb its heading tag + content
      curHtml += `<h${s.level}>${s.title}</h${s.level}>${s.contentHtml}`;
    }
  }
  finalizeLesson();

  // ── Course-level language: majority vote from lessons ────────────────────
  const votes: Record<string, number> = {};
  for (const l of lessons) votes[l.language] = (votes[l.language] ?? 0) + 1;
  const courseLang =
    Object.entries(votes).sort((a, b) => b[1] - a[1])[0]?.[0] ??
    detectLanguage(courseTitle + " " + filename);

  // Tags: language + meaningful words from the title
  const titleWords = courseTitle
    .split(/[\s,;]+/)
    .filter((w) => w.length > 3)
    .map((w) => w.replace(/[^a-zA-Z0-9+#.]/g, ""))
    .filter(Boolean);
  const tags = [...new Set([courseLang, ...titleWords])]
    .slice(0, 6)
    .map((t) => t.charAt(0).toUpperCase() + t.slice(1));

  return {
    title: courseTitle || "Imported Course",
    description: courseDescription,
    language: courseLang,
    category: detectCategory(courseLang, courseTitle),
    difficulty: detectDifficulty(stripTags(clean).slice(0, 2000) + " " + courseTitle),
    tags,
    lessons,
  };
}

// ── mapCourse (mirror of /api/admin/courses/route.ts) ────────────────────────

function parseTags(raw: unknown): string[] {
  if (Array.isArray(raw)) return (raw as unknown[]).filter(Boolean) as string[];
  if (typeof raw === "string" && raw.trim())
    return raw.split(",").map((t) => t.trim()).filter(Boolean);
  return [];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapCourse(doc: any) {
  return {
    id: doc.$id,
    slug: doc.slug ?? "",
    title: doc.title ?? "",
    description: doc.description ?? "",
    tags: parseTags(doc.tags),
    category: doc.category ?? "",
    difficulty: doc.difficulty ?? "Beginner",
    lessonsCount: doc.lessonsCount ?? 0,
    enrolledCount: doc.enrolledCount ?? 0,
    completionRate: doc.completionRate ?? 0,
    rating: doc.rating ?? 0,
    status: doc.status ?? "draft",
    isFeatured: doc.isFeatured ?? false,
    isNew: doc.isNew ?? false,
    createdAt: ((doc.$createdAt as string) ?? "").slice(0, 10),
    updatedAt: ((doc.$updatedAt as string) ?? "").slice(0, 10),
    instructor: doc.instructor ?? "",
    duration: doc.duration ?? "",
  };
}

// ── POST handler ─────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  if (!requireAdminCookie(request))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  // ── Parse multipart form ───────────────────────────────────────────────
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid multipart body" }, { status: 400 });
  }

  const file = formData.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "No file provided." }, { status: 400 });
  if (!file.name.toLowerCase().endsWith(".docx"))
    return NextResponse.json({ error: "Only .docx files are supported." }, { status: 400 });
  if (file.size > 15 * 1024 * 1024)
    return NextResponse.json({ error: "File too large (max 15 MB)." }, { status: 400 });
  if (file.size === 0)
    return NextResponse.json({ error: "Uploaded file is empty." }, { status: 400 });

  const instructor = ((formData.get("instructor") as string | null) ?? "").trim() || "Admin";
  const status =
    (formData.get("status") as string | null) === "published" ? "published" : "draft";
  const categoryOverride = ((formData.get("category") as string | null) ?? "").trim();
  const difficultyOverride = ((formData.get("difficulty") as string | null) ?? "").trim() as
    | ""
    | "Beginner"
    | "Intermediate"
    | "Advanced";

  // ── Convert .docx → HTML via mammoth ──────────────────────────────────
  let html: string;
  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await mammoth.convertToHtml(
      { buffer },
      {
        styleMap: [
          // Map common 'Code' paragraph styles to <pre> so we capture them
          "p[style-name='Code'] => pre:fresh",
          "p[style-name='Code Block'] => pre:fresh",
          "p[style-name='Preformatted Text'] => pre:fresh",
        ],
      },
    );
    html = result.value;
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "unknown error";
    return NextResponse.json(
      { error: `Failed to parse Word document: ${msg}` },
      { status: 422 },
    );
  }

  if (!html.trim())
    return NextResponse.json({ error: "The document appears to be empty." }, { status: 422 });

  // ── Extract course + lessons ───────────────────────────────────────────
  const parsed = parseDocument(html, file.name);

  if (parsed.lessons.length === 0) {
    return NextResponse.json(
      {
        error:
          "No lessons were found. Make sure the Word document uses Heading 2 (or Heading 1) for each lesson title.",
      },
      { status: 422 },
    );
  }

  const category = categoryOverride || parsed.category;
  const difficulty = difficultyOverride || parsed.difficulty;

  // ── Write to Appwrite ──────────────────────────────────────────────────
  const { databases } = createAdminClient();
  const courseId = ID.unique();
  const courseSlug = slugify(parsed.title) || `course-${courseId.slice(0, 8)}`;
  const totalDuration = estimateTotalDuration(parsed.lessons);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let courseDoc: any;
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    courseDoc = await (databases.createDocument as any)(DB_ID, COL_COURSES, courseId, {
      title: parsed.title.slice(0, 255),
      slug: courseSlug,
      description: parsed.description.slice(0, 1000),
      tags: parsed.tags.join(","),
      category,
      difficulty,
      lessonsCount: parsed.lessons.length,
      enrolledCount: 0,
      completionRate: 0,
      rating: 0,
      status,
      isFeatured: false,
      isNew: true,
      instructor,
      duration: totalDuration,
    });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: `Failed to create course: ${msg}` }, { status: 500 });
  }

  // ── Create lessons one by one (preserves order; avoids Appwrite rate limits) ──
  type LessonResult = { ok: boolean; title: string; error?: string };
  const lessonResults: LessonResult[] = [];

  for (const lesson of parsed.lessons) {
    const lessonSlug = slugify(lesson.title) || `lesson-${lesson.order}`;
    const docId = ID.unique();

    // Full payload including content fields
    const fullPayload = {
      title: lesson.title.slice(0, 255),
      slug: `${courseSlug}-${lessonSlug}`,
      // Fields used by getCurriculum() / getLessonContent() (queried by "track")
      track: courseSlug,
      // Fields used by the admin lessons panel
      trackId: courseId,
      trackTitle: parsed.title.slice(0, 255),
      trackSlug: courseSlug,
      // Lesson metadata
      type: lesson.type,
      duration: lesson.duration,
      xp: lesson.xp,
      isLocked: lesson.order > 3, // first 3 lessons are free
      order: lesson.order,
      completions: 0,
      avgScore: null,
      // Lesson content (attributes must exist in Appwrite schema)
      content: lesson.content.slice(0, 100_000),
      code: lesson.starterCode.slice(0, 20_000),
      language: lesson.language,
      filename: getFilenameForLang(lesson.language),
      objectives: lesson.objectives.slice(0, 10),
    };

    // Minimal payload as fallback (schema might not have content attributes yet)
    const minimalPayload = {
      title: fullPayload.title,
      slug: fullPayload.slug,
      track: fullPayload.track,
      trackId: fullPayload.trackId,
      trackTitle: fullPayload.trackTitle,
      trackSlug: fullPayload.trackSlug,
      type: fullPayload.type,
      duration: fullPayload.duration,
      xp: fullPayload.xp,
      isLocked: fullPayload.isLocked,
      order: fullPayload.order,
      completions: 0,
      avgScore: null,
    };

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (databases.createDocument as any)(DB_ID, COL_LESSONS, docId, fullPayload);
      lessonResults.push({ ok: true, title: lesson.title });
    } catch {
      // Retry without content fields — schema may be missing those attributes
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (databases.createDocument as any)(DB_ID, COL_LESSONS, ID.unique(), minimalPayload);
        lessonResults.push({ ok: true, title: lesson.title });
      } catch (e2: unknown) {
        const msg2 = e2 instanceof Error ? e2.message : String(e2);
        lessonResults.push({ ok: false, title: lesson.title, error: msg2 });
      }
    }
  }

  const succeeded = lessonResults.filter((r) => r.ok).length;
  const failed = lessonResults.filter((r) => !r.ok).length;

  // If some lessons failed, sync lessonsCount on the course
  if (failed > 0) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (databases.updateDocument as any)(DB_ID, COL_COURSES, courseId, {
        lessonsCount: succeeded,
      });
    } catch {
      // best-effort — ignore
    }
  }

  return NextResponse.json({
    course: mapCourse(courseDoc),
    lessonsCreated: succeeded,
    lessonsFailed: failed,
    totalDetected: parsed.lessons.length,
    lessonList: parsed.lessons.map((l) => ({
      title: l.title,
      type: l.type,
      order: l.order,
      duration: l.duration,
    })),
    warnings:
      failed > 0
        ? lessonResults.filter((r) => !r.ok).map((r) => `"${r.title}": ${r.error}`)
        : [],
  });
}
