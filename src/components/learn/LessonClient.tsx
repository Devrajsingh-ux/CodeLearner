"use client";

import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock,
  Code2,
  FileText,
  HelpCircle,
  List,
  X,
  Zap,
} from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import type { LessonContent, TrackCurriculum } from "@/lib/lessons";
import { cn } from "@/lib/utils";

// ── Lazy-load Monaco (heavy, SSR-unsafe) ─────────────────────────────────────
const CodeEditor = dynamic(
  () => import("@/components/learn/CodeEditor").then((m) => m.CodeEditor),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full items-center justify-center bg-[#0d0d0d]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-violet-500 border-t-transparent" />
          <p className="text-xs text-zinc-500">Loading editor…</p>
        </div>
      </div>
    ),
  },
);

type Tab = "content" | "editor";

interface Props {
  lesson: LessonContent;
  lessonNum: number;
  trackSlug: string;
  trackTitle: string;
  prevSlug: string | null;
  nextSlug: string | null;
  curriculum: TrackCurriculum;
}

function LessonTypeIcon({
  type,
  className,
}: {
  type: string;
  className?: string;
}) {
  if (type === "exercise") return <Code2 className={className} />;
  if (type === "quiz") return <HelpCircle className={className} />;
  return <FileText className={className} />;
}

// ── Simple markdown renderer ─────────────────────────────────────────────────
function renderMarkdown(text: string) {
  return text.split("\n").map((line, i) => {
    if (line.startsWith("## "))
      return (
        <h2 key={i} className="mt-7 mb-3 text-xl font-bold text-white">
          {line.slice(3)}
        </h2>
      );
    if (line.startsWith("### "))
      return (
        <h3 key={i} className="mt-5 mb-2 text-base font-semibold text-zinc-200">
          {line.slice(4)}
        </h3>
      );
    if (line.startsWith("- ") || line.startsWith("* "))
      return (
        <li key={i} className="ml-5 list-disc text-sm text-zinc-400 leading-7">
          {renderInline(line.slice(2))}
        </li>
      );
    if (line.startsWith("> "))
      return (
        <blockquote
          key={i}
          className="my-3 rounded-lg border-l-2 border-violet-500 bg-violet-500/5 py-2.5 pl-4 text-sm text-zinc-300 italic"
        >
          {renderInline(line.slice(2))}
        </blockquote>
      );
    // inline code block line
    if (line.startsWith("```") || line.trim() === "```") return null;
    if (!line.trim()) return <br key={i} />;
    return (
      <p key={i} className="text-sm leading-7 text-zinc-400">
        {renderInline(line)}
      </p>
    );
  });
}

function renderInline(text: string): React.ReactNode {
  // Bold: **text**
  // Code: `text`
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("`") && part.endsWith("`"))
      return (
        <code
          key={i}
          className="rounded bg-white/8 px-1.5 py-0.5 font-mono text-xs text-violet-300"
        >
          {part.slice(1, -1)}
        </code>
      );
    if (part.startsWith("**") && part.endsWith("**"))
      return (
        <strong key={i} className="font-semibold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    return part;
  });
}

export function LessonClient({
  lesson,
  lessonNum,
  trackSlug,
  trackTitle,
  prevSlug,
  nextSlug,
  curriculum,
}: Props) {
  const [tab, setTab] = useState<Tab>("content");
  const [sidebarOpen, setSidebar] = useState(false);
  const [completed, setCompleted] = useState(false);

  const totalLessons = curriculum.sections.reduce(
    (a, s) => a + s.lessons.length,
    0,
  );

  return (
    <div className="flex h-screen flex-col bg-zinc-950 pt-16">
      {/* ── Top bar ──────────────────────────────────────────────── */}
      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/6 bg-zinc-950/90 px-4 py-2.5 backdrop-blur-sm">
        {/* Left: back + breadcrumb */}
        <div className="flex items-center gap-2 min-w-0">
          <Link
            href={`/learn/${trackSlug}`}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-white/8 hover:text-white"
            aria-label="Back to course"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <span className="hidden truncate text-sm text-zinc-500 sm:block">
            {trackTitle}
          </span>
          <ChevronRight className="hidden h-3.5 w-3.5 shrink-0 text-zinc-700 sm:block" />
          <Badge variant="purple" className="shrink-0">
            Lesson {lessonNum}
          </Badge>
          <span className="hidden truncate text-sm text-zinc-400 md:block">
            {lesson.title}
          </span>
        </div>

        {/* Centre: tab switcher */}
        <div className="flex shrink-0 items-center rounded-xl border border-white/8 bg-white/4 p-0.5">
          {(["content", "editor"] as Tab[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-all",
                tab === t
                  ? "bg-violet-600 text-white shadow"
                  : "text-zinc-400 hover:text-white",
              )}
            >
              {t === "content" ? (
                <BookOpen className="h-3.5 w-3.5" />
              ) : (
                <Code2 className="h-3.5 w-3.5" />
              )}
              {t}
            </button>
          ))}
        </div>

        {/* Right: nav + curriculum toggle */}
        <div className="flex shrink-0 items-center gap-1.5">
          {prevSlug && (
            <Link href={`/learn/${trackSlug}/${prevSlug}`}>
              <button
                type="button"
                className="flex h-8 items-center gap-1 rounded-lg border border-white/8 px-2.5 text-xs text-zinc-400 transition-colors hover:text-white"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Prev
              </button>
            </Link>
          )}
          {nextSlug && (
            <Link href={`/learn/${trackSlug}/${nextSlug}`}>
              <button
                type="button"
                className="flex h-8 items-center gap-1 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-2.5 text-xs font-medium text-white shadow-sm shadow-violet-500/30 transition-all hover:from-violet-500 hover:to-indigo-500"
              >
                Next <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </Link>
          )}
          <button
            type="button"
            onClick={() => setSidebar((o) => !o)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-white/8 hover:text-white"
            aria-label="Toggle curriculum"
          >
            {sidebarOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <List className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* ── Progress bar ─────────────────────────────────────────── */}
      <div className="h-0.5 w-full bg-white/5 shrink-0">
        <div
          className="h-full bg-gradient-to-r from-violet-600 to-indigo-500 transition-all duration-500"
          style={{ width: `${(lessonNum / totalLessons) * 100}%` }}
        />
      </div>

      {/* ── Layout: content/editor + optional sidebar ────────────── */}
      <div className="relative flex min-h-0 flex-1 overflow-hidden">
        {/* Main pane */}
        <div className="flex min-h-0 flex-1 flex-col">
          {/* Content tab */}
          {tab === "content" && (
            <div className="flex-1 overflow-y-auto">
              <div className="mx-auto max-w-3xl px-6 py-8">
                {/* Lesson meta */}
                <div className="mb-6 flex flex-wrap items-center gap-2.5">
                  <LessonTypeIcon
                    type={lesson.type}
                    className={cn(
                      "h-4 w-4",
                      lesson.type === "exercise"
                        ? "text-violet-400"
                        : lesson.type === "quiz"
                          ? "text-amber-400"
                          : "text-sky-400",
                    )}
                  />
                  <span className="text-xs font-medium capitalize text-zinc-500">
                    {lesson.type}
                  </span>
                  <span className="text-zinc-700">·</span>
                  <Clock className="h-3.5 w-3.5 text-zinc-600" />
                  <span className="text-xs text-zinc-500">
                    {lesson.duration}
                  </span>
                  <span className="text-zinc-700">·</span>
                  <Zap className="h-3.5 w-3.5 text-violet-400" />
                  <span className="text-xs text-zinc-500">
                    {lesson.xp} XP on completion
                  </span>
                </div>

                <h1 className="mb-6 text-2xl font-bold text-white sm:text-3xl">
                  {lesson.title}
                </h1>

                {/* Learning objectives */}
                <div className="mb-8 rounded-2xl border border-violet-500/20 bg-violet-500/5 p-5">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-violet-400">
                    What you'll learn
                  </p>
                  <ul className="space-y-2">
                    {lesson.objectives.map((obj) => (
                      <li
                        key={obj}
                        className="flex items-start gap-2.5 text-sm text-zinc-300"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                        {obj}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Lesson content */}
                <div className="prose-custom">
                  {renderMarkdown(lesson.content)}
                </div>

                {/* CTA: switch to editor */}
                {lesson.type === "exercise" && (
                  <div className="mt-10 rounded-2xl border border-white/6 bg-white/[0.02] p-5 text-center">
                    <Code2 className="mx-auto mb-3 h-8 w-8 text-violet-400" />
                    <p className="mb-4 text-sm text-zinc-400">
                      Ready to practice? Switch to the{" "}
                      <strong className="text-white">Editor</strong> tab to
                      complete the exercise.
                    </p>
                    <button
                      type="button"
                      onClick={() => setTab("editor")}
                      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-all hover:from-violet-500 hover:to-indigo-500"
                    >
                      <Code2 className="h-4 w-4" /> Open Editor
                    </button>
                  </div>
                )}

                {/* Mark complete & next lesson */}
                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setCompleted(true);
                      if (nextSlug) {
                        setTimeout(() => {
                          window.location.href = `/learn/${trackSlug}/${nextSlug}`;
                        }, 500);
                      }
                    }}
                    className={cn(
                      "flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all",
                      completed
                        ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                        : "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/20 hover:from-violet-500 hover:to-indigo-500",
                    )}
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    {completed ? "Completed! 🎉" : "Mark as Complete"}
                  </button>

                  {nextSlug && !completed && (
                    <Link href={`/learn/${trackSlug}/${nextSlug}`}>
                      <button
                        type="button"
                        className="flex items-center gap-2 rounded-xl border border-white/8 bg-white/4 px-5 py-2.5 text-sm text-zinc-300 transition-colors hover:bg-white/8"
                      >
                        Next Lesson <ArrowRight className="h-4 w-4" />
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Editor tab */}
          {tab === "editor" && (
            <div className="flex-1 overflow-hidden">
              <CodeEditor
                initialCode={lesson.code}
                language={lesson.language}
                filename={lesson.filename}
                className="h-full"
              />
            </div>
          )}
        </div>

        {/* ── Curriculum sidebar ───────────────────────────────── */}
        {sidebarOpen && (
          <div className="w-72 shrink-0 overflow-y-auto border-l border-white/6 bg-zinc-950">
            <div className="p-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-500">
                Curriculum
              </p>
              <div className="space-y-3">
                {curriculum.sections.map((section, sIdx) => {
                  const offset = curriculum.sections
                    .slice(0, sIdx)
                    .reduce((a, s) => a + s.lessons.length, 0);
                  return (
                    <div key={section.title}>
                      <p className="mb-1.5 text-[10px] font-bold uppercase tracking-widest text-zinc-600">
                        {section.title}
                      </p>
                      <div className="space-y-0.5">
                        {section.lessons.map((sl, lIdx) => {
                          const num = offset + lIdx + 1;
                          const isActive = num === lessonNum;
                          return (
                            <Link
                              key={sl.slug}
                              href={
                                sl.isLocked
                                  ? "#"
                                  : `/learn/${trackSlug}/${sl.slug}`
                              }
                              className={cn(
                                "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs transition-all",
                                sl.isLocked && "pointer-events-none opacity-40",
                                isActive
                                  ? "bg-violet-500/15 text-violet-300"
                                  : "text-zinc-500 hover:bg-white/4 hover:text-zinc-300",
                              )}
                            >
                              <span
                                className={cn(
                                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[9px] font-bold",
                                  isActive
                                    ? "bg-violet-500 text-white"
                                    : "bg-white/6 text-zinc-600",
                                )}
                              >
                                {num}
                              </span>
                              <span className="truncate">{sl.title}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
