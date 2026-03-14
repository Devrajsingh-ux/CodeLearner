"use client";

import {
  AlertCircle,
  BookOpen,
  BrainCircuit,
  Check,
  ChevronDown,
  ChevronUp,
  Code2,
  FileText,
  HelpCircle,
  Loader2,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import { useRef, useState } from "react";
import type { AdminCourse } from "@/data/admin";
import { cn } from "@/lib/utils";

// ─── Constants ────────────────────────────────────────────────────────────────

const LANGUAGES = [
  { value: "", label: "Auto-detect" },
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "tsx", label: "React / JSX" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
  { value: "csharp", label: "C#" },
  { value: "rust", label: "Rust" },
  { value: "go", label: "Go" },
  { value: "ruby", label: "Ruby" },
  { value: "php", label: "PHP" },
  { value: "swift", label: "Swift" },
  { value: "kotlin", label: "Kotlin" },
  { value: "sql", label: "SQL" },
];

const CATEGORIES = [
  "Languages", "Frontend", "Backend", "Data & AI",
  "DevOps & Cloud", "Mobile", "Systems", "Game Dev", "Web3 & Security", "Other",
];

const LESSON_PRESETS = [4, 6, 8, 10, 12, 15, 20];

const inputCls =
  "w-full rounded-xl border border-white/8 bg-zinc-800 px-3 py-2 text-sm text-zinc-200 outline-none placeholder:text-zinc-600 focus:border-violet-500 transition-colors";

// ─── Types ────────────────────────────────────────────────────────────────────

interface LessonItem {
  order: number;
  title: string;
  type: "article" | "exercise" | "quiz";
  duration: string;
}

interface GenerateResult {
  course: AdminCourse;
  lessonsCreated: number;
  lessonsFailed: number;
  lessonList: LessonItem[];
}

interface ProgressEvent {
  step: number;
  total: number;
  message: string;
}

interface Props {
  onClose: () => void;
  onGenerated: (course: AdminCourse) => void;
}

type Stage = "form" | "generating" | "success" | "error";

// ─── Sub-components ───────────────────────────────────────────────────────────

function TypeIcon({ type, className }: { type: string; className?: string }) {
  if (type === "exercise") return <Code2 className={cn("h-3 w-3", className)} />;
  if (type === "quiz")     return <HelpCircle className={cn("h-3 w-3", className)} />;
  return <FileText className={cn("h-3 w-3", className)} />;
}

function typeColor(type: string) {
  return type === "exercise" ? "text-violet-400" : type === "quiz" ? "text-amber-400" : "text-sky-400";
}

function ProgressBar({ value, max }: { value: number; max: number }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/8">
      <div
        className="h-full rounded-full bg-gradient-to-r from-violet-600 to-indigo-500 transition-all duration-500"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

function LessonStreamRow({ item, isNew }: { item: LessonItem; isNew: boolean }) {
  return (
    <li
      className={cn(
        "flex items-center gap-3 px-4 py-2.5 transition-all duration-300",
        isNew && "animate-in slide-in-from-bottom-2",
      )}
    >
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-500/15 text-[10px] font-bold text-violet-400">
        {item.order}
      </span>
      <TypeIcon type={item.type} className={cn("shrink-0", typeColor(item.type))} />
      <span className="flex-1 truncate text-xs text-zinc-300">{item.title}</span>
      {item.duration && (
        <span className="shrink-0 text-[10px] text-zinc-600">{item.duration}</span>
      )}
    </li>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function AICourseGeneratorDialog({ onClose, onGenerated }: Props) {
  // Form fields
  const [topic, setTopic]               = useState("");
  const [instructor, setInstructor]     = useState("");
  const [lessonCount, setLessonCount]   = useState(8);
  const [difficulty, setDifficulty]     = useState<"" | "Beginner" | "Intermediate" | "Advanced">("");
  const [category, setCategory]         = useState("");
  const [language, setLanguage]         = useState("");
  const [status, setStatus]             = useState<"draft" | "published">("draft");
  const [includeCode, setIncludeCode]   = useState(true);
  const [fieldErrors, setFieldErrors]   = useState<Record<string, string>>({});

  // Generation state
  const [stage, setStage]               = useState<Stage>("form");
  const [progress, setProgress]         = useState<ProgressEvent | null>(null);
  const [streamedLessons, setStreamedLessons] = useState<LessonItem[]>([]);
  const [newLessonIndex, setNewLessonIndex]   = useState(-1);
  const [result, setResult]             = useState<GenerateResult | null>(null);
  const [errorMsg, setErrorMsg]         = useState("");
  const [showAllLessons, setShowAllLessons]   = useState(false);

  const abortRef = useRef<AbortController | null>(null);
  const listRef  = useRef<HTMLUListElement>(null);

  // ── Validate form ──────────────────────────────────────────────────────

  function validate(): boolean {
    const errs: Record<string, string> = {};
    if (!topic.trim())      errs.topic      = "Please describe the course topic.";
    if (!instructor.trim()) errs.instructor = "Instructor name is required.";
    if (Object.keys(errs).length) { setFieldErrors(errs); return false; }
    setFieldErrors({});
    return true;
  }

  // ── Start generation ───────────────────────────────────────────────────

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    const ac = new AbortController();
    abortRef.current = ac;

    setStage("generating");
    setProgress(null);
    setStreamedLessons([]);
    setNewLessonIndex(-1);
    setResult(null);
    setErrorMsg("");

    try {
      const res = await fetch("/api/admin/courses/generate", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        signal: ac.signal,
        body: JSON.stringify({
          topic:       topic.trim(),
          instructor:  instructor.trim(),
          lessonCount,
          difficulty,
          category,
          status,
          language,
          includeCode,
        }),
      });

      if (!res.ok || !res.body) {
        const text = await res.text().catch(() => `HTTP ${res.status}`);
        throw new Error(text.slice(0, 300));
      }

      // ── Read SSE stream ──────────────────────────────────────────────
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });

        // Process complete SSE messages (separated by "\n\n")
        const parts = buf.split("\n\n");
        buf = parts.pop() ?? "";

        for (const part of parts) {
          const lines = part.trim().split("\n");
          let event = "message";
          let dataStr = "";

          for (const line of lines) {
            if (line.startsWith("event: ")) event = line.slice(7).trim();
            if (line.startsWith("data: "))  dataStr = line.slice(6).trim();
          }

          if (!dataStr) continue;

          let payload: Record<string, unknown>;
          try {
            payload = JSON.parse(dataStr) as Record<string, unknown>;
          } catch {
            continue;
          }

          if (event === "progress") {
            setProgress(payload as unknown as ProgressEvent);
          }

          if (event === "lesson") {
            const item = payload as unknown as LessonItem;
            setStreamedLessons((prev) => {
              const next = [...prev, item];
              setNewLessonIndex(next.length - 1);
              return next;
            });
            // Auto-scroll lesson list
            setTimeout(() => {
              listRef.current?.lastElementChild?.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
              });
            }, 50);
          }

          if (event === "done") {
            const r = payload as unknown as GenerateResult;
            setResult(r);
            onGenerated(r.course);
            setStage("success");
          }

          if (event === "error") {
            throw new Error((payload.message as string) ?? "Unknown AI error.");
          }
        }
      }
    } catch (err: unknown) {
      if ((err as { name?: string }).name === "AbortError") return; // user cancelled
      setErrorMsg(err instanceof Error ? err.message : String(err));
      setStage("error");
    }
  }

  // ── Cancel ─────────────────────────────────────────────────────────────

  function handleCancel() {
    abortRef.current?.abort();
    onClose();
  }

  // ── Reset to form ──────────────────────────────────────────────────────

  function resetForm() {
    setStage("form");
    setProgress(null);
    setStreamedLessons([]);
    setResult(null);
    setErrorMsg("");
    setShowAllLessons(false);
    setTopic("");
    setInstructor("");
  }

  const visibleLessons = result
    ? showAllLessons ? result.lessonList : result.lessonList.slice(0, 6)
    : [];

  // ── Render ─────────────────────────────────────────────────────────────

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target !== e.currentTarget) return;
        if (stage === "generating") return; // don't dismiss while generating
        onClose();
      }}
    >
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl">

        {/* ═══════════════════ HEADER ═══════════════════ */}
        <div className="flex items-center justify-between border-b border-white/8 px-6 py-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-700 shadow-lg shadow-violet-500/30">
              <BrainCircuit className="h-4 w-4 text-white" />
            </span>
            <div>
              <h3 className="text-sm font-semibold text-white">AI Course Generator</h3>
              <p className="text-[11px] text-zinc-500">Let AI write a complete course for you</p>
            </div>
          </div>
          <button
            type="button"
            onClick={stage === "generating" ? handleCancel : onClose}
            aria-label="Close dialog"
            className="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-500 hover:bg-white/8 hover:text-zinc-200 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* ═══════════════════ FORM ═══════════════════ */}
        {stage === "form" && (
          <form onSubmit={handleGenerate} noValidate>
            <div className="max-h-[72vh] overflow-y-auto px-6 py-5 space-y-5">

              {/* Topic – main field */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-400">
                  Course Topic <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={topic}
                  onChange={(e) => {
                    setTopic(e.target.value);
                    setFieldErrors((p) => ({ ...p, topic: "" }));
                  }}
                  rows={3}
                  placeholder={`e.g. "HTML & CSS for Absolute Beginners — from zero to building real websites"\ne.g. "Advanced Python: Async, Decorators, Metaclasses"\ne.g. "Full React 19 course with Hooks, Context, and Server Components"`}
                  className={cn(inputCls, "resize-none leading-relaxed", fieldErrors.topic && "border-red-500")}
                />
                {fieldErrors.topic && (
                  <p className="text-[11px] text-red-400">{fieldErrors.topic}</p>
                )}
                <p className="text-[11px] text-zinc-600">
                  Be specific — the more detail you give, the better the course content.
                </p>
              </div>

              {/* Instructor */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-400">
                  Instructor <span className="text-red-400">*</span>
                </label>
                <input
                  value={instructor}
                  onChange={(e) => {
                    setInstructor(e.target.value);
                    setFieldErrors((p) => ({ ...p, instructor: "" }));
                  }}
                  placeholder="e.g. Ahmad Raza"
                  className={cn(inputCls, fieldErrors.instructor && "border-red-500")}
                />
                {fieldErrors.instructor && (
                  <p className="text-[11px] text-red-400">{fieldErrors.instructor}</p>
                )}
              </div>

              {/* Lesson count */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-400">
                  Number of Lessons
                  <span className="ml-2 rounded-full bg-violet-500/20 px-2 py-0.5 text-[10px] font-bold text-violet-400">
                    {lessonCount}
                  </span>
                </label>
                {/* Preset chips */}
                <div className="flex flex-wrap gap-2">
                  {LESSON_PRESETS.map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setLessonCount(n)}
                      className={cn(
                        "rounded-xl border px-3 py-1.5 text-xs font-semibold transition-colors",
                        lessonCount === n
                          ? "border-violet-500/50 bg-violet-500/20 text-violet-300"
                          : "border-white/8 text-zinc-500 hover:border-white/20 hover:text-zinc-300",
                      )}
                    >
                      {n}
                    </button>
                  ))}
                  {/* Custom slider */}
                  <div className="flex flex-1 items-center gap-2 min-w-32">
                    <input
                      type="range"
                      min={1}
                      max={30}
                      value={lessonCount}
                      onChange={(e) => setLessonCount(Number(e.target.value))}
                      className="flex-1 accent-violet-500"
                    />
                    <span className="w-6 text-right text-xs text-zinc-500">{lessonCount}</span>
                  </div>
                </div>
                <p className="text-[11px] text-zinc-600">
                  Recommended: 6–12 for a focused course · 15–20 for a comprehensive course
                </p>
              </div>

              {/* Grid: difficulty + category + language + status */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-zinc-400">Difficulty</label>
                  <select value={difficulty} onChange={(e) => setDifficulty(e.target.value as typeof difficulty)} className={inputCls}>
                    <option value="">Auto-detect</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-zinc-400">Category</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className={inputCls}>
                    <option value="">Auto-detect</option>
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-zinc-400">Language</label>
                  <select value={language} onChange={(e) => setLanguage(e.target.value)} className={inputCls}>
                    {LANGUAGES.map((l) => <option key={l.value} value={l.value}>{l.label}</option>)}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-zinc-400">Status</label>
                  <select value={status} onChange={(e) => setStatus(e.target.value as "draft" | "published")} className={inputCls}>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>

              {/* Include code toggle */}
              <button
                type="button"
                onClick={() => setIncludeCode((v) => !v)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-colors",
                  includeCode
                    ? "border-violet-500/30 bg-violet-500/8 text-zinc-200"
                    : "border-white/8 text-zinc-500 hover:border-white/15",
                )}
              >
                <div
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors",
                    includeCode
                      ? "border-violet-500 bg-violet-600"
                      : "border-zinc-600 bg-transparent",
                  )}
                >
                  {includeCode && <Check className="h-3 w-3 text-white" />}
                </div>
                <div className="text-left">
                  <p className="text-xs font-semibold">Include coding exercises</p>
                  <p className="text-[11px] text-zinc-500">
                    AI will generate starter code + solution for exercise-type lessons
                  </p>
                </div>
                <Code2 className={cn("ml-auto h-4 w-4 shrink-0", includeCode ? "text-violet-400" : "text-zinc-600")} />
              </button>

              {/* Info banner */}
              <div className="flex items-start gap-2.5 rounded-xl border border-white/6 bg-white/3 px-4 py-3">
                <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-violet-400" />
                <p className="text-[11px] leading-relaxed text-zinc-500">
                  The AI will design the full curriculum, write each lesson&apos;s content in Markdown,
                  generate starter code + solutions, then save everything to the database automatically.
                  This may take <strong className="text-zinc-400">1–3 minutes</strong> depending on lesson count.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-white/8 px-6 py-4">
              <p className="text-[11px] text-zinc-600">
                Requires <code className="text-zinc-500">OPENAI_API_KEY</code> in env
              </p>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl border border-white/8 px-4 py-2 text-sm text-zinc-400 hover:border-white/20 hover:text-zinc-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 hover:from-violet-500 hover:to-indigo-500 transition-all"
                >
                  <Sparkles className="h-4 w-4" />
                  Generate Course
                </button>
              </div>
            </div>
          </form>
        )}

        {/* ═══════════════════ GENERATING ═══════════════════ */}
        {stage === "generating" && (
          <div className="flex flex-col" style={{ minHeight: "420px" }}>
            {/* Progress header */}
            <div className="border-b border-white/8 px-6 py-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="relative h-8 w-8 shrink-0">
                    <div className="absolute inset-0 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
                    <BrainCircuit className="absolute inset-0 m-auto h-4 w-4 text-violet-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {progress?.message ?? "Initialising AI…"}
                    </p>
                    <p className="text-[11px] text-zinc-500">
                      {progress
                        ? `Step ${progress.step} of ${progress.total}`
                        : "Connecting to AI…"}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs text-red-400 hover:bg-red-500/15 transition-colors"
                >
                  Stop
                </button>
              </div>
              <ProgressBar
                value={progress?.step ?? 0}
                max={progress?.total ?? (lessonCount + 2)}
              />
            </div>

            {/* Streamed lessons */}
            <div className="flex-1 overflow-hidden px-6 py-4">
              {streamedLessons.length > 0 ? (
                <div className="overflow-hidden rounded-2xl border border-white/6 bg-zinc-800">
                  <div className="border-b border-white/6 px-4 py-2">
                    <p className="text-xs font-semibold text-zinc-400">
                      <BookOpen className="mr-1.5 inline h-3.5 w-3.5 text-zinc-500" />
                      Lessons written so far ({streamedLessons.length})
                    </p>
                  </div>
                  <ul
                    ref={listRef}
                    className="max-h-56 divide-y divide-white/4 overflow-y-auto"
                  >
                    {streamedLessons.map((l, i) => (
                      <LessonStreamRow
                        key={l.order}
                        item={l}
                        isNew={i === newLessonIndex}
                      />
                    ))}
                    {/* Animated "writing next lesson" row */}
                    {streamedLessons.length < lessonCount && (
                      <li className="flex items-center gap-3 px-4 py-2.5">
                        <Loader2 className="h-3.5 w-3.5 animate-spin text-violet-400" />
                        <span className="text-xs text-zinc-600 italic">Writing next lesson…</span>
                      </li>
                    )}
                  </ul>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
                  <div className="flex gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="h-2 w-2 rounded-full bg-violet-500 animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-zinc-400">Designing your course curriculum…</p>
                  <p className="text-xs text-zinc-600">
                    AI is thinking about "{topic.slice(0, 50)}{topic.length > 50 ? "…" : ""}"
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ═══════════════════ SUCCESS ═══════════════════ */}
        {stage === "success" && result && (
          <div className="max-h-[78vh] overflow-y-auto">
            {/* Banner */}
            <div className="m-6 mb-0 rounded-2xl border border-emerald-500/20 bg-emerald-500/8 px-5 py-4">
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20">
                  <Check className="h-5 w-5 text-emerald-400" />
                </span>
                <div>
                  <p className="font-semibold text-emerald-400 text-sm">Course generated successfully!</p>
                  <p className="mt-0.5 text-xs text-zinc-400">
                    <span className="font-medium text-zinc-200">"{result.course.title}"</span>
                    {" "}created with{" "}
                    <span className="font-medium text-zinc-200">{result.lessonsCreated}</span>
                    {" "}full lesson{result.lessonsCreated !== 1 ? "s" : ""} including content, objectives{includeCode ? ", and starter code" : ""}.
                  </p>
                </div>
              </div>
            </div>

            {/* Course meta chips */}
            <div className="mx-6 mt-4 grid grid-cols-4 gap-2">
              {[
                { label: "Category",   val: result.course.category   },
                { label: "Difficulty", val: result.course.difficulty  },
                { label: "Duration",   val: result.course.duration    },
                { label: "Status",     val: result.course.status      },
              ].map(({ label, val }) => (
                <div key={label} className="rounded-xl border border-white/6 bg-zinc-800 px-3 py-2">
                  <p className="text-[10px] text-zinc-600 uppercase tracking-wider">{label}</p>
                  <p className="mt-0.5 text-xs font-semibold text-zinc-200 capitalize truncate">{val}</p>
                </div>
              ))}
            </div>

            {/* AI tags */}
            {result.course.tags?.length > 0 && (
              <div className="mx-6 mt-3 flex flex-wrap gap-1.5">
                {result.course.tags.map((t) => (
                  <span key={t} className="rounded-full border border-white/8 bg-white/4 px-2.5 py-1 text-[11px] text-zinc-400">
                    {t}
                  </span>
                ))}
              </div>
            )}

            {/* Lesson list */}
            <div className="mx-6 mt-4 overflow-hidden rounded-2xl border border-white/6 bg-zinc-800">
              <div className="border-b border-white/6 px-4 py-2.5 flex items-center justify-between">
                <p className="text-xs font-semibold text-zinc-400">
                  <BookOpen className="mr-1.5 inline h-3.5 w-3.5 text-zinc-500" />
                  {result.lessonList.length} Lesson{result.lessonList.length !== 1 ? "s" : ""} Generated
                </p>
                <div className="flex items-center gap-3 text-[11px] text-zinc-600">
                  <span className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />exercise
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />article
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />quiz
                  </span>
                </div>
              </div>
              <ul className="divide-y divide-white/4">
                {visibleLessons.map((l) => (
                  <LessonStreamRow key={l.order} item={l} isNew={false} />
                ))}
              </ul>
              {result.lessonList.length > 6 && (
                <button
                  type="button"
                  onClick={() => setShowAllLessons((v) => !v)}
                  className="flex w-full items-center justify-center gap-1.5 py-2.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  {showAllLessons ? (
                    <><ChevronUp className="h-3.5 w-3.5" />Show less</>
                  ) : (
                    <><ChevronDown className="h-3.5 w-3.5" />Show all {result.lessonList.length} lessons</>
                  )}
                </button>
              )}
            </div>

            {/* Warnings */}
            {result.lessonsFailed > 0 && (
              <div className="mx-6 mt-3 rounded-xl border border-amber-500/20 bg-amber-500/8 px-4 py-3">
                <p className="text-xs font-semibold text-amber-400">
                  {result.lessonsFailed} lesson{result.lessonsFailed !== 1 ? "s" : ""} could not be saved to the database.
                </p>
                <p className="mt-1 text-[11px] text-zinc-500">
                  Add <code className="text-zinc-400">content</code>, <code className="text-zinc-400">code</code>,{" "}
                  <code className="text-zinc-400">language</code>, <code className="text-zinc-400">objectives</code> and{" "}
                  <code className="text-zinc-400">track</code> attributes to your Appwrite <em>lessons</em> collection.
                </p>
              </div>
            )}

            {/* Status note */}
            <div className="mx-6 mt-3 mb-0 flex items-center gap-2 rounded-xl border border-white/6 bg-white/3 px-3 py-2.5">
              <Zap className="h-3.5 w-3.5 shrink-0 text-violet-400" />
              <p className="text-xs text-zinc-500">
                Course saved as{" "}
                <span className={cn(
                  "font-semibold",
                  result.course.status === "published" ? "text-emerald-400" : "text-amber-400",
                )}>
                  {result.course.status}
                </span>.
                {result.course.status === "draft" && " Review and publish from the Courses list."}
              </p>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 border-t border-white/8 px-6 py-4 mt-5">
              <button
                type="button"
                onClick={resetForm}
                className="rounded-xl border border-white/8 px-4 py-2 text-sm text-zinc-400 hover:border-white/20 hover:text-zinc-200 transition-colors"
              >
                Generate Another
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2 text-sm font-semibold text-white hover:bg-violet-500 transition-colors"
              >
                <Check className="h-4 w-4" />
                Done
              </button>
            </div>
          </div>
        )}

        {/* ═══════════════════ ERROR ═══════════════════ */}
        {stage === "error" && (
          <div className="px-6 py-10 space-y-5">
            <div className="flex flex-col items-center gap-3 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/15">
                <AlertCircle className="h-7 w-7 text-red-400" />
              </span>
              <div>
                <p className="font-semibold text-white">Generation failed</p>
                <p className="mt-1.5 max-w-sm text-sm text-zinc-400">{errorMsg}</p>
              </div>
              {errorMsg.toLowerCase().includes("openai_api_key") && (
                <div className="rounded-xl border border-amber-500/20 bg-amber-500/8 px-4 py-3 text-xs text-amber-300 text-left max-w-sm">
                  Add <code className="bg-white/8 px-1 rounded">OPENAI_API_KEY=sk-…</code> to your{" "}
                  <code className="bg-white/8 px-1 rounded">.env.local</code> file and restart the dev server.
                </div>
              )}
            </div>
            <div className="flex justify-center gap-3">
              <button
                type="button"
                onClick={() => setStage("form")}
                className="rounded-xl border border-white/8 px-5 py-2 text-sm text-zinc-400 hover:border-white/20 hover:text-zinc-200 transition-colors"
              >
                Try again
              </button>
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-red-500/20 bg-red-500/10 px-5 py-2 text-sm text-red-400 hover:bg-red-500/15 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
