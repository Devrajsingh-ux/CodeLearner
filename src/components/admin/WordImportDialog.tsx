"use client";

import {
  AlertCircle,
  BookOpen,
  Check,
  ChevronDown,
  ChevronUp,
  Code2,
  FileText,
  HelpCircle,
  Loader2,
  UploadCloud,
  X,
  Zap,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";
import type { AdminCourse } from "@/data/admin";
import { cn } from "@/lib/utils";

// ── Constants ──────────────────────────────────────────────────────────────

const CATEGORIES = [
  "Languages",
  "Frontend",
  "Backend",
  "Data & AI",
  "DevOps & Cloud",
  "Mobile",
  "Systems",
  "Game Dev",
  "Web3 & Security",
  "Other",
];

const inputCls =
  "w-full rounded-xl border border-white/8 bg-zinc-800 px-3 py-2 text-sm text-zinc-200 outline-none placeholder:text-zinc-600 focus:border-violet-500 transition-colors";

// ── Lesson preview item types ──────────────────────────────────────────────

interface LessonPreviewItem {
  title: string;
  type: "article" | "exercise" | "quiz";
  order: number;
  duration: string;
}

interface ImportResult {
  course: AdminCourse;
  lessonsCreated: number;
  lessonsFailed: number;
  totalDetected: number;
  lessonList: LessonPreviewItem[];
  warnings: string[];
}

// ── Type icon ──────────────────────────────────────────────────────────────

function TypeIcon({ type, className }: { type: string; className?: string }) {
  if (type === "exercise") return <Code2 className={cn("h-3 w-3", className)} />;
  if (type === "quiz") return <HelpCircle className={cn("h-3 w-3", className)} />;
  return <FileText className={cn("h-3 w-3", className)} />;
}

function TypeColor(type: string) {
  return type === "exercise"
    ? "text-violet-400"
    : type === "quiz"
      ? "text-amber-400"
      : "text-sky-400";
}

// ── Props ──────────────────────────────────────────────────────────────────

interface Props {
  onClose: () => void;
  onImported: (course: AdminCourse) => void;
}

// ── Main component ─────────────────────────────────────────────────────────

export function WordImportDialog({ onClose, onImported }: Props) {
  // Form state
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [instructor, setInstructor] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState<"" | "Beginner" | "Intermediate" | "Advanced">("");

  // UI state
  type Stage = "form" | "uploading" | "success" | "error";
  const [stage, setStage] = useState<Stage>("form");
  const [errorMsg, setErrorMsg] = useState("");
  const [result, setResult] = useState<ImportResult | null>(null);
  const [showAllLessons, setShowAllLessons] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<"file" | "instructor", string>>>({});

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── File selection ────────────────────────────────────────────────────

  function handleFile(f: File | null) {
    if (!f) return;
    if (!f.name.toLowerCase().endsWith(".docx")) {
      setFieldErrors((p) => ({ ...p, file: "Only .docx Word files are supported." }));
      return;
    }
    if (f.size > 15 * 1024 * 1024) {
      setFieldErrors((p) => ({ ...p, file: "File is too large (max 15 MB)." }));
      return;
    }
    setFieldErrors((p) => ({ ...p, file: undefined }));
    setFile(f);
  }

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      handleFile(e.dataTransfer.files[0] ?? null);
    },
    [], // eslint-disable-line react-hooks/exhaustive-deps
  );

  // ── Submit ────────────────────────────────────────────────────────────

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const errs: typeof fieldErrors = {};
    if (!file) errs.file = "Please select a .docx file.";
    if (!instructor.trim()) errs.instructor = "Instructor name is required.";
    if (Object.keys(errs).length) {
      setFieldErrors(errs);
      return;
    }

    setStage("uploading");

    const fd = new FormData();
    fd.append("file", file!);
    fd.append("instructor", instructor.trim());
    fd.append("status", status);
    if (category) fd.append("category", category);
    if (difficulty) fd.append("difficulty", difficulty);

    try {
      const res = await fetch("/api/admin/courses/import", {
        method: "POST",
        credentials: "same-origin",
        body: fd,
      });
      const json = await res.json();
      if (!res.ok) {
        setErrorMsg(json.error ?? `Server error (${res.status})`);
        setStage("error");
        return;
      }
      setResult(json as ImportResult);
      setStage("success");
      onImported(json.course);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Network error. Please try again.");
      setStage("error");
    }
  }

  // ── Lesson list display ───────────────────────────────────────────────

  const visibleLessons = result
    ? showAllLessons
      ? result.lessonList
      : result.lessonList.slice(0, 6)
    : [];

  // ── Render ────────────────────────────────────────────────────────────

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl">
        {/* ── Header ── */}
        <div className="flex items-center justify-between border-b border-white/8 px-6 py-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-violet-600/20">
              <UploadCloud className="h-4 w-4 text-violet-400" />
            </span>
            <div>
              <h3 className="text-sm font-semibold text-white">Import from Word</h3>
              <p className="text-[11px] text-zinc-500">Upload a .docx file to auto-generate a course</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-500 hover:bg-white/8 hover:text-zinc-200 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* ════════════════ FORM ════════════════ */}
        {stage === "form" && (
          <form onSubmit={handleSubmit} noValidate>
            <div className="max-h-[72vh] overflow-y-auto px-6 py-5 space-y-4">
              {/* Drop zone */}
              <div>
                <p className="mb-1.5 text-xs font-medium text-zinc-400">
                  Word Document <span className="text-red-400">*</span>
                </p>
                <div
                  role="button"
                  tabIndex={0}
                  aria-label="Upload Word document"
                  onClick={() => fileInputRef.current?.click()}
                  onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
                  onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={onDrop}
                  className={cn(
                    "flex cursor-pointer flex-col items-center justify-center gap-2.5 rounded-2xl border-2 border-dashed px-6 py-10 text-center transition-colors",
                    dragging
                      ? "border-violet-500 bg-violet-500/10"
                      : file
                        ? "border-emerald-500/50 bg-emerald-500/5"
                        : "border-white/10 bg-white/2 hover:border-white/20 hover:bg-white/4",
                    fieldErrors.file && "border-red-500/50",
                  )}
                >
                  {file ? (
                    <>
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/15">
                        <Check className="h-6 w-6 text-emerald-400" />
                      </span>
                      <div>
                        <p className="text-sm font-medium text-zinc-200 truncate max-w-xs">{file.name}</p>
                        <p className="text-xs text-zinc-500">
                          {(file.size / 1024).toFixed(0)} KB · Click to replace
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5">
                        <UploadCloud className={cn("h-6 w-6", dragging ? "text-violet-400" : "text-zinc-500")} />
                      </span>
                      <div>
                        <p className="text-sm font-medium text-zinc-300">
                          Drop your .docx file here
                        </p>
                        <p className="text-xs text-zinc-600">or click to browse · max 15 MB</p>
                      </div>
                    </>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  className="hidden"
                  onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
                />
                {fieldErrors.file && (
                  <p className="mt-1 text-[11px] text-red-400">{fieldErrors.file}</p>
                )}
              </div>

              {/* How to format hint */}
              <div className="rounded-xl border border-white/6 bg-white/3 px-4 py-3 text-xs text-zinc-500 space-y-1">
                <p className="font-semibold text-zinc-400">How to format your Word file:</p>
                <p>• <span className="text-zinc-300">Heading 1</span> → Course title (first occurrence)</p>
                <p>• <span className="text-zinc-300">Heading 2</span> → Each lesson title</p>
                <p>• <span className="text-zinc-300">Heading 3 / 4</span> → Sub-sections within a lesson</p>
                <p>• <span className="text-zinc-300">Preformatted / Code style</span> → Starter code for the editor</p>
              </div>

              {/* Instructor */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-zinc-400">
                  Instructor <span className="text-red-400">*</span>
                </label>
                <input
                  value={instructor}
                  onChange={(e) => {
                    setInstructor(e.target.value);
                    setFieldErrors((p) => ({ ...p, instructor: undefined }));
                  }}
                  placeholder="e.g. Ahmad Raza"
                  className={cn(inputCls, fieldErrors.instructor && "border-red-500")}
                />
                {fieldErrors.instructor && (
                  <p className="text-[11px] text-red-400">{fieldErrors.instructor}</p>
                )}
              </div>

              {/* Status + Difficulty */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-zinc-400">Initial Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as "draft" | "published")}
                    className={inputCls}
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-zinc-400">
                    Difficulty{" "}
                    <span className="font-normal text-zinc-600">(auto-detect)</span>
                  </label>
                  <select
                    value={difficulty}
                    onChange={(e) =>
                      setDifficulty(
                        e.target.value as "" | "Beginner" | "Intermediate" | "Advanced",
                      )
                    }
                    className={inputCls}
                  >
                    <option value="">Auto-detect</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              {/* Category */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-zinc-400">
                  Category{" "}
                  <span className="font-normal text-zinc-600">(auto-detect)</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={inputCls}
                >
                  <option value="">Auto-detect</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 border-t border-white/8 px-6 py-4">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-white/8 px-4 py-2 text-sm text-zinc-400 hover:border-white/20 hover:text-zinc-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2 text-sm font-semibold text-white hover:bg-violet-500 transition-colors"
              >
                <UploadCloud className="h-4 w-4" />
                Analyze &amp; Import
              </button>
            </div>
          </form>
        )}

        {/* ════════════════ UPLOADING ════════════════ */}
        {stage === "uploading" && (
          <div className="flex flex-col items-center gap-5 px-6 py-16">
            <div className="relative flex h-16 w-16 items-center justify-center">
              <div className="absolute inset-0 animate-spin rounded-full border-4 border-violet-500 border-t-transparent" />
              <UploadCloud className="h-7 w-7 text-violet-400" />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-white">Analyzing your document…</p>
              <p className="mt-1 text-xs text-zinc-500">
                Parsing structure, detecting lessons & language
              </p>
            </div>
          </div>
        )}

        {/* ════════════════ SUCCESS ════════════════ */}
        {stage === "success" && result && (
          <div className="max-h-[78vh] overflow-y-auto">
            {/* Success banner */}
            <div className="m-6 mb-0 rounded-2xl border border-emerald-500/20 bg-emerald-500/8 px-5 py-4">
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20">
                  <Check className="h-5 w-5 text-emerald-400" />
                </span>
                <div>
                  <p className="font-semibold text-emerald-400 text-sm">Import successful!</p>
                  <p className="mt-0.5 text-xs text-zinc-400">
                    <span className="font-medium text-zinc-200">"{result.course.title}"</span>{" "}
                    was created with{" "}
                    <span className="font-medium text-zinc-200">{result.lessonsCreated}</span>{" "}
                    lesson{result.lessonsCreated !== 1 ? "s" : ""}.
                  </p>
                </div>
              </div>
            </div>

            {/* Course meta summary */}
            <div className="mx-6 mt-4 grid grid-cols-3 gap-2">
              {[
                { label: "Category", val: result.course.category },
                { label: "Difficulty", val: result.course.difficulty },
                { label: "Duration", val: result.course.duration },
              ].map(({ label, val }) => (
                <div key={label} className="rounded-xl border border-white/6 bg-zinc-800 px-3 py-2">
                  <p className="text-[10px] text-zinc-600 uppercase tracking-wider">{label}</p>
                  <p className="mt-0.5 text-xs font-semibold text-zinc-200 truncate">{val}</p>
                </div>
              ))}
            </div>

            {/* Lesson list */}
            <div className="mx-6 mt-4 overflow-hidden rounded-2xl border border-white/6 bg-zinc-800">
              <div className="border-b border-white/6 px-4 py-2.5">
                <p className="text-xs font-semibold text-zinc-400">
                  <BookOpen className="mr-1.5 inline h-3.5 w-3.5 text-zinc-500" />
                  {result.totalDetected} lessons detected
                </p>
              </div>
              <ul className="divide-y divide-white/4">
                {visibleLessons.map((l) => (
                  <li key={l.order} className="flex items-center gap-3 px-4 py-2.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-500/15 text-[10px] font-bold text-violet-400">
                      {l.order}
                    </span>
                    <TypeIcon type={l.type} className={cn("shrink-0", TypeColor(l.type))} />
                    <span className="flex-1 truncate text-xs text-zinc-300">{l.title}</span>
                    <span className="shrink-0 text-[10px] text-zinc-600">{l.duration}</span>
                  </li>
                ))}
              </ul>
              {result.lessonList.length > 6 && (
                <button
                  type="button"
                  onClick={() => setShowAllLessons((v) => !v)}
                  className="flex w-full items-center justify-center gap-1.5 py-2.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  {showAllLessons ? (
                    <><ChevronUp className="h-3.5 w-3.5" /> Show less</>
                  ) : (
                    <><ChevronDown className="h-3.5 w-3.5" /> Show all {result.lessonList.length} lessons</>
                  )}
                </button>
              )}
            </div>

            {/* Warnings */}
            {result.warnings.length > 0 && (
              <div className="mx-6 mt-3 rounded-xl border border-amber-500/20 bg-amber-500/8 px-4 py-3">
                <p className="mb-1.5 text-xs font-semibold text-amber-400">
                  {result.lessonsFailed} lesson{result.lessonsFailed !== 1 ? "s" : ""} could not be saved
                </p>
                <ul className="space-y-0.5">
                  {result.warnings.map((w, i) => (
                    <li key={i} className="text-[11px] text-amber-300/80">{w}</li>
                  ))}
                </ul>
                <p className="mt-2 text-[11px] text-zinc-500">
                  Tip: Add <code className="text-zinc-400">content</code>,{" "}
                  <code className="text-zinc-400">code</code>,{" "}
                  <code className="text-zinc-400">language</code>,{" "}
                  <code className="text-zinc-400">filename</code>,{" "}
                  <code className="text-zinc-400">objectives</code> and{" "}
                  <code className="text-zinc-400">track</code> string attributes to your Appwrite{" "}
                  <em>lessons</em> collection to enable full content storage.
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
                </span>.{" "}
                {result.course.status === "draft" && "Go to Courses to review and publish."}
              </p>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 border-t border-white/8 px-6 py-4 mt-5">
              <button
                type="button"
                onClick={() => {
                  setStage("form");
                  setFile(null);
                  setInstructor("");
                  setCategory("");
                  setDifficulty("");
                  setResult(null);
                  setShowAllLessons(false);
                }}
                className="rounded-xl border border-white/8 px-4 py-2 text-sm text-zinc-400 hover:border-white/20 hover:text-zinc-200 transition-colors"
              >
                Import Another
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

        {/* ════════════════ ERROR ════════════════ */}
        {stage === "error" && (
          <div className="px-6 py-8 space-y-5">
            <div className="flex flex-col items-center gap-3 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/15">
                <AlertCircle className="h-7 w-7 text-red-400" />
              </span>
              <div>
                <p className="font-semibold text-white">Import failed</p>
                <p className="mt-1 text-sm text-zinc-400">{errorMsg}</p>
              </div>
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
