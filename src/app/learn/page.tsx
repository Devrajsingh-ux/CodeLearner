"use client";

import {
  BookOpen,
  ChevronRight,
  Clock,
  Search,
  SlidersHorizontal,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { CourseCard } from "@/components/home/CourseCard";
import { Button } from "@/components/ui/Button";
import { CATEGORIES } from "@/data/courses";
import { cn, formatNumber } from "@/lib/utils";
import type { Track, TrackCategory } from "@/types";

const DIFFICULTIES = ["All", "Beginner", "Intermediate", "Advanced"] as const;
type Difficulty = (typeof DIFFICULTIES)[number];

type CategoryFilter = "All" | TrackCategory;

const CATEGORY_META: Record<string, { emoji: string }> = {
  Languages: { emoji: "💻" },
  Frontend: { emoji: "🎨" },
  Backend: { emoji: "⚙️" },
  "Data & AI": { emoji: "📊" },
  Mobile: { emoji: "📱" },
  "DevOps & Cloud": { emoji: "☁️" },
  Systems: { emoji: "🏗️" },
  "Web3 & Security": { emoji: "🔐" },
  "Game Dev": { emoji: "🎮" },
};

const DIFFICULTY_DOT: Record<string, string> = {
  Beginner: "bg-emerald-500",
  Intermediate: "bg-sky-500",
  Advanced: "bg-amber-500",
};

// ─────────────────────────────────────────────────────────────────────────────

function FilterSidebar({
  allTracks,
  category,
  setCategory,
  difficulty,
  setDifficulty,
  hasFilters,
  clearAll,
}: {
  allTracks: Track[];
  category: CategoryFilter;
  setCategory: (c: CategoryFilter) => void;
  difficulty: Difficulty;
  setDifficulty: (d: Difficulty) => void;
  hasFilters: boolean;
  clearAll: () => void;
}) {
  return (
    <div className="rounded-2xl border border-white/8 bg-zinc-900 p-5">
      <h3 className="mb-5 text-sm font-semibold text-white">Filters</h3>

      {/* ── Category ─────────────────────────────────────── */}
      <div className="mb-6">
        <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-widest text-zinc-500">
          Category
        </p>
        <div className="space-y-0.5">
          {(["All", ...CATEGORIES] as CategoryFilter[]).map((cat) => {
            const count =
              cat === "All"
                ? allTracks.length
                : allTracks.filter((t) => t.category === cat).length;
            const emoji =
              cat === "All" ? "🗂️" : (CATEGORY_META[cat]?.emoji ?? "📚");
            const isActive = category === cat;
            return (
              <button
                type="button"
                key={cat}
                onClick={() => setCategory(cat)}
                className={cn(
                  "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150",
                  isActive
                    ? "bg-violet-500/15 text-violet-300"
                    : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200",
                )}
              >
                <span className="flex items-center gap-2.5">
                  <span className="text-base leading-none">{emoji}</span>
                  {cat}
                </span>
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.5 text-[11px] font-semibold",
                    isActive
                      ? "bg-violet-500/30 text-violet-300"
                      : "bg-zinc-800 text-zinc-500",
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Difficulty ───────────────────────────────────── */}
      <div className="mb-5">
        <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-widest text-zinc-500">
          Difficulty
        </p>
        <div className="space-y-0.5">
          {DIFFICULTIES.map((d) => {
            const count =
              d === "All"
                ? allTracks.length
                : allTracks.filter((t) => t.difficulty === d).length;
            const isActive = difficulty === d;
            return (
              <button
                type="button"
                key={d}
                onClick={() => setDifficulty(d)}
                className={cn(
                  "flex w-full items-center justify-between rounded-lg border px-3 py-2 text-sm font-medium transition-all duration-150",
                  isActive
                    ? "border-violet-500/40 bg-violet-500/15 text-violet-300"
                    : "border-transparent text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200",
                )}
              >
                <span className="flex items-center gap-2.5">
                  {d !== "All" && (
                    <span
                      className={cn(
                        "inline-flex h-2 w-2 rounded-full",
                        DIFFICULTY_DOT[d],
                      )}
                    />
                  )}
                  {d === "All" && <span className="h-2 w-2" />}
                  {d}
                </span>
                <span className="text-xs text-zinc-600">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Clear ────────────────────────────────────────── */}
      {hasFilters && (
        <button
          type="button"
          onClick={clearAll}
          className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-zinc-700/60 py-2 text-sm text-zinc-500 transition-colors hover:border-zinc-600 hover:text-zinc-300"
        >
          <X className="h-3.5 w-3.5" /> Clear all filters
        </button>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export default function LearnPage() {
  const [allTracks, setAllTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty>("All");
  const [category, setCategory] = useState<CategoryFilter>("All");
  const [mobileSidebar, setMobileSidebar] = useState(false);

  useEffect(() => {
    fetch("/api/courses")
      .then((r) => r.json())
      .then((data) => setAllTracks(data.tracks ?? []))
      .catch(() => setAllTracks([]))
      .finally(() => setIsLoading(false));
  }, []);

  const filtered: Track[] = allTracks.filter((t) => {
    const q = query.toLowerCase();
    const matchesQuery =
      !query ||
      t.title.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.tags.some((tag) => tag.toLowerCase().includes(q)) ||
      t.category.toLowerCase().includes(q);
    const matchesDiff = difficulty === "All" || t.difficulty === difficulty;
    const matchesCat = category === "All" || t.category === category;
    return matchesQuery && matchesDiff && matchesCat;
  });

  const hasFilters = query !== "" || difficulty !== "All" || category !== "All";
  const showGrouped = !hasFilters;

  function clearAll() {
    setQuery("");
    setDifficulty("All");
    setCategory("All");
  }

  const sidebarProps = {
    allTracks,
    category,
    setCategory,
    difficulty,
    setDifficulty,
    hasFilters,
    clearAll,
  };

  const totalHours = allTracks.reduce((s, t) => {
    const h = Number.parseInt(t.duration, 10);
    return s + (Number.isNaN(h) ? 0 : h);
  }, 0);
  const totalEnrolled = allTracks.reduce((s, t) => s + t.enrolledCount, 0);

  return (
    <main className="min-h-screen bg-zinc-950 pt-24 pb-24">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden border-b border-white/8">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-linear-to-br from-violet-600/8 via-transparent to-cyan-600/8"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Text */}
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                Browse All{" "}
                <span className="bg-linear-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                  Courses
                </span>
              </h1>
              <div className="mt-4 flex flex-wrap gap-5 text-sm text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4 text-violet-400" />
                  <strong className="text-zinc-200">{isLoading ? "—" : allTracks.length}</strong>{" "}
                  tracks
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-cyan-400" />
                  <strong className="text-zinc-200">{isLoading ? "—" : `${totalHours}+`}</strong> hours
                  of content
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-emerald-400" />
                  <strong className="text-zinc-200">
                    {isLoading ? "—" : formatNumber(totalEnrolled)}
                  </strong>{" "}
                  learners enrolled
                </span>
              </div>
            </div>

            {/* Search */}
            <div className="relative w-full max-w-md">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500 pointer-events-none" />
              <input
                type="text"
                placeholder="Search languages, frameworks, topics…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-zinc-900 py-3 pl-11 pr-4 text-sm text-zinc-200 placeholder-zinc-500 outline-none transition focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/20"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-zinc-500 hover:text-zinc-300"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Main layout ──────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        {/* Mobile filter toggle */}
        <div className="mb-4 flex items-center justify-between lg:hidden">
          <p className="text-sm text-zinc-500">
            <span className="font-semibold text-zinc-200">
              {filtered.length}
            </span>{" "}
            courses
          </p>
          <button
            type="button"
            onClick={() => setMobileSidebar((v) => !v)}
            className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm text-zinc-400 hover:border-white/20 hover:text-zinc-200 transition-colors"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {hasFilters && (
              <span className="h-2 w-2 rounded-full bg-violet-500" />
            )}
          </button>
        </div>

        {/* Mobile sidebar */}
        {mobileSidebar && (
          <div className="mb-6 lg:hidden">
            <FilterSidebar {...sidebarProps} />
          </div>
        )}

        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden w-64 shrink-0 lg:block">
            <div className="sticky top-24">
              <FilterSidebar {...sidebarProps} />
            </div>
          </aside>

          {/* ── Results area ──────────────────────────────────────── */}
          <div className="min-w-0 flex-1">
            {/* Results header */}
            <div className="mb-6 flex items-center justify-between">
              {showGrouped ? (
                <p className="text-sm text-zinc-500">
                  <span className="font-semibold text-zinc-200">
                    {isLoading ? "—" : allTracks.length}
                  </span>{" "}
                  courses across{" "}
                  <span className="font-semibold text-zinc-200">
                    {CATEGORIES.length}
                  </span>{" "}
                  categories
                </p>
              ) : (
                <p className="text-sm text-zinc-500">
                  <span className="font-semibold text-zinc-200">
                    {filtered.length}
                  </span>{" "}
                  of {allTracks.length} courses
                  {category !== "All" && (
                    <span className="ml-1 font-medium text-violet-400">
                      in {category}
                    </span>
                  )}
                </p>
              )}
              {hasFilters && (
                <button
                  type="button"
                  onClick={clearAll}
                  className="flex items-center gap-1.5 text-xs text-zinc-500 transition-colors hover:text-zinc-300"
                >
                  <X className="h-3 w-3" /> Clear filters
                </button>
              )}
            </div>

            {/* No results */}
            {!isLoading && filtered.length === 0 && (
              <div className="flex flex-col items-center py-28 text-center">
                <span className="mb-4 text-5xl">🔍</span>
                <p className="text-xl font-semibold text-white">
                  No courses found
                </p>
                <p className="mt-2 text-zinc-500">
                  Try different keywords or remove some filters.
                </p>
                <Button variant="ghost" className="mt-6" onClick={clearAll}>
                  Clear all filters
                </Button>
              </div>
            )}

            {/* Skeleton while loading */}
            {isLoading && (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-72 animate-pulse rounded-2xl border border-white/6 bg-zinc-900"
                  />
                ))}
              </div>
            )}

            {/* Grouped browse (default "All" view) */}
            {!isLoading && showGrouped && filtered.length > 0 && (
              <div className="space-y-14">
                {CATEGORIES.map((cat) => {
                  const catTracks = allTracks.filter((t) => t.category === cat);
                  if (catTracks.length === 0) return null;
                  const emoji = CATEGORY_META[cat]?.emoji ?? "📚";
                  return (
                    <section key={cat} aria-label={cat}>
                      {/* Category header */}
                      <div className="mb-5 flex items-center justify-between">
                        <h2 className="flex items-center gap-2.5 text-lg font-bold text-white">
                          <span className="text-xl">{emoji}</span>
                          {cat}
                          <span className="text-sm font-normal text-zinc-500">
                            ({catTracks.length} courses)
                          </span>
                        </h2>
                        <button
                          type="button"
                          onClick={() => setCategory(cat)}
                          className="flex items-center gap-1 text-sm text-violet-400 transition-colors hover:text-violet-300"
                        >
                          View all <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Show first 3 per category */}
                      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                        {catTracks.slice(0, 3).map((track) => (
                          <CourseCard key={track.id} track={track} />
                        ))}
                      </div>

                      {catTracks.length > 3 && (
                        <button
                          type="button"
                          onClick={() => setCategory(cat)}
                          className="mt-4 flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-zinc-300"
                        >
                          +{catTracks.length - 3} more in {cat}{" "}
                          <ChevronRight className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </section>
                  );
                })}
              </div>
            )}

            {/* Filtered results grid */}
            {!isLoading && !showGrouped && filtered.length > 0 && (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((track) => (
                  <CourseCard key={track.id} track={track} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
