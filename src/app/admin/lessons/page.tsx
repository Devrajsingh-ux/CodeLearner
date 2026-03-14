"use client";

import {
  Check,
  Code2,
  FileText,
  HelpCircle,
  Lock,
  Search,
  Unlock,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  type AdminLesson,
  type LessonType,
} from "@/data/admin";
import { cn, formatNumber } from "@/lib/utils";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function TypeBadge({ type }: { type: LessonType }) {
  const map: Record<LessonType, { label: string; icon: React.ElementType; cls: string }> = {
    article: { label: "Article", icon: FileText, cls: "bg-sky-500/15 text-sky-400 border-sky-500/20" },
    exercise: { label: "Exercise", icon: Code2, cls: "bg-violet-500/15 text-violet-400 border-violet-500/20" },
    quiz: { label: "Quiz", icon: HelpCircle, cls: "bg-amber-500/15 text-amber-400 border-amber-500/20" },
  };
  const { label, icon: Icon, cls } = map[type];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold",
        cls,
      )}
    >
      <Icon className="h-2.5 w-2.5" />
      {label}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export default function AdminLessonsPage() {
  const [lessons, setLessons] = useState<AdminLesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<LessonType | "all">("all");
  const [trackFilter, setTrackFilter] = useState("all");
  const [lockedFilter, setLockedFilter] = useState<"all" | "locked" | "free">("all");
  const [toast, setToast] = useState<string | null>(null);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 2800);
  }

  async function loadLessons() {
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/lessons", { credentials: "same-origin" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setLessons(data.lessons ?? []);
    } catch (e: any) {
      setError(e.message ?? "Failed to load lessons");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => { loadLessons(); }, []);

  const trackOptions = useMemo((): string[] => {
    return ["all", ...Array.from(new Set<string>(lessons.map((l) => l.trackTitle).filter(Boolean)))];
  }, [lessons]);

  const filtered = useMemo(() => {
    let list = [...lessons];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (l) => l.title.toLowerCase().includes(q) || l.trackTitle.toLowerCase().includes(q),
      );
    }
    if (typeFilter !== "all") list = list.filter((l) => l.type === typeFilter);
    if (trackFilter !== "all") list = list.filter((l) => l.trackTitle === trackFilter);
    if (lockedFilter === "locked") list = list.filter((l) => l.isLocked);
    if (lockedFilter === "free") list = list.filter((l) => !l.isLocked);
    return list;
  }, [lessons, search, typeFilter, trackFilter, lockedFilter]);

  async function toggleLocked(id: string) {
    const current = lessons.find((l) => l.id === id)?.isLocked ?? false;
    try {
      const res = await fetch("/api/admin/lessons", {
        method: "PATCH",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isLocked: !current }),
      });
      if (!res.ok) throw new Error(await res.text());
      setLessons((prev) => prev.map((l) => (l.id === id ? { ...l, isLocked: !l.isLocked } : l)));
      showToast("Lock status updated.");
    } catch (e: any) { showToast(`Error: ${e.message}`); }
  }

  const counts = {
    total: lessons.length,
    articles: lessons.filter((l) => l.type === "article").length,
    exercises: lessons.filter((l) => l.type === "exercise").length,
    quizzes: lessons.filter((l) => l.type === "quiz").length,
    locked: lessons.filter((l) => l.isLocked).length,
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Lessons</h2>
          <p className="mt-1 text-sm text-zinc-500">
            {isLoading ? "Loading…" : `${counts.total} lessons · ${counts.exercises} exercises · ${counts.articles} articles · ${counts.quizzes} quizzes · ${counts.locked} locked`}
          </p>
        </div>
        <button
          type="button"
          onClick={loadLessons}
          disabled={isLoading}
          className="flex items-center gap-1.5 rounded-xl border border-white/8 bg-zinc-900 px-3 py-2 text-xs text-zinc-400 transition-colors hover:border-white/20 hover:text-white disabled:opacity-50"
        >
          {isLoading ? "Loading…" : "↻ Refresh"}
        </button>
      </div>
      {error && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</div>
      )}

      {/* Quick stat chips */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Total", val: counts.total, accent: "#8b5cf6" },
          { label: "Exercises", val: counts.exercises, accent: "#06b6d4" },
          { label: "Articles", val: counts.articles, accent: "#06b6d4" },
          { label: "Locked", val: counts.locked, accent: "#f59e0b" },
        ].map(({ label, val, accent }) => (
          <div key={label} className="rounded-2xl border border-white/6 bg-zinc-900 px-4 py-3">
            <p className="text-xl font-bold" style={{ color: accent }}>{val}</p>
            <p className="text-xs text-zinc-500">{label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex flex-1 min-w-48 items-center gap-2 rounded-xl border border-white/8 bg-zinc-900 px-3 py-2">
          <Search className="h-4 w-4 text-zinc-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search lessons or courses…"
            className="w-full bg-transparent text-sm text-zinc-300 outline-none placeholder:text-zinc-600"
          />
          {search && (
            <button type="button" onClick={() => setSearch("")}>
              <X className="h-3.5 w-3.5 text-zinc-500 hover:text-zinc-300" />
            </button>
          )}
        </div>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value as LessonType | "all")}
          className="rounded-xl border border-white/8 bg-zinc-900 px-3 py-2 text-sm text-zinc-300 outline-none focus:border-violet-500"
        >
          <option value="all">All types</option>
          <option value="article">Article</option>
          <option value="exercise">Exercise</option>
          <option value="quiz">Quiz</option>
        </select>

        <select
          value={trackFilter}
          onChange={(e) => setTrackFilter(e.target.value)}
          className="rounded-xl border border-white/8 bg-zinc-900 px-3 py-2 text-sm text-zinc-300 outline-none focus:border-violet-500"
        >
          {trackOptions.map((t: string) => (
            <option key={t} value={t}>
              {t === "all" ? "All courses" : t}
            </option>
          ))}
        </select>

        <select
          value={lockedFilter}
          onChange={(e) => setLockedFilter(e.target.value as "all" | "locked" | "free")}
          className="rounded-xl border border-white/8 bg-zinc-900 px-3 py-2 text-sm text-zinc-300 outline-none focus:border-violet-500"
        >
          <option value="all">Locked & Free</option>
          <option value="locked">Locked only</option>
          <option value="free">Free only</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-white/6 bg-zinc-900">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm" aria-label="Lessons table">
            <thead>
              <tr className="border-b border-white/6">
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Lesson</th>
                <th className="hidden px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-zinc-500 sm:table-cell">Course</th>
                <th className="hidden px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-zinc-500 md:table-cell">Type</th>
                <th className="hidden px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-zinc-500 lg:table-cell">Completions</th>
                <th className="hidden px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-zinc-500 lg:table-cell">Avg Score</th>
                <th className="hidden px-4 py-3 text-center text-[11px] font-semibold uppercase tracking-wider text-zinc-500 xl:table-cell">XP</th>
                <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Lock</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-sm text-zinc-500">
                    No lessons match your filters.
                  </td>
                </tr>
              )}
              {filtered.map((lesson) => (
                <tr
                  key={lesson.id}
                  className="border-b border-white/4 transition-colors hover:bg-white/2 last:border-0"
                >
                  {/* Lesson */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {lesson.isLocked ? (
                        <Lock className="h-3.5 w-3.5 shrink-0 text-amber-500/70" />
                      ) : (
                        <Unlock className="h-3.5 w-3.5 shrink-0 text-emerald-500/70" />
                      )}
                      <div>
                        <p className="text-sm font-medium text-zinc-200">{lesson.title}</p>
                        <p className="text-xs text-zinc-600">
                          Lesson {lesson.order} · {lesson.duration}
                        </p>
                      </div>
                    </div>
                  </td>
                  {/* Course */}
                  <td className="hidden px-4 py-3 sm:table-cell">
                    <span className="rounded-lg bg-white/4 px-2 py-1 text-xs text-zinc-400">
                      {lesson.trackTitle}
                    </span>
                  </td>
                  {/* Type */}
                  <td className="hidden px-4 py-3 md:table-cell">
                    <TypeBadge type={lesson.type} />
                  </td>
                  {/* Completions */}
                  <td className="hidden px-4 py-3 text-right text-sm tabular-nums text-zinc-300 lg:table-cell">
                    {formatNumber(lesson.completions)}
                  </td>
                  {/* Avg score */}
                  <td className="hidden px-4 py-3 text-right lg:table-cell">
                    {lesson.avgScore !== null ? (
                      <span
                        className={cn(
                          "text-sm font-semibold tabular-nums",
                          lesson.avgScore >= 80
                            ? "text-emerald-400"
                            : lesson.avgScore >= 60
                              ? "text-amber-400"
                              : "text-red-400",
                        )}
                      >
                        {lesson.avgScore}%
                      </span>
                    ) : (
                      <span className="text-xs text-zinc-600">—</span>
                    )}
                  </td>
                  {/* XP */}
                  <td className="hidden px-4 py-3 text-center text-xs font-semibold text-violet-400 xl:table-cell">
                    +{lesson.xp}
                  </td>
                  {/* Lock toggle */}
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => toggleLocked(lesson.id)}
                      title={lesson.isLocked ? "Unlock lesson" : "Lock lesson"}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-xl border px-2.5 py-1.5 text-xs font-medium transition-colors",
                        lesson.isLocked
                          ? "border-amber-500/20 text-amber-400 hover:bg-amber-500/10"
                          : "border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/10",
                      )}
                    >
                      {lesson.isLocked ? (
                        <>
                          <Lock className="h-3 w-3" /> Locked
                        </>
                      ) : (
                        <>
                          <Unlock className="h-3 w-3" /> Free
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-t border-white/6 px-4 py-3">
          <p className="text-xs text-zinc-600">
            Showing {filtered.length} of {lessons.length} lessons
          </p>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-300 flex items-center gap-2 rounded-xl border border-white/10 bg-zinc-800 px-4 py-3 shadow-2xl"
        >
          <Check className="h-4 w-4 text-emerald-400" />
          <span className="text-sm text-zinc-200">{toast}</span>
        </div>
      )}
    </div>
  );
}
