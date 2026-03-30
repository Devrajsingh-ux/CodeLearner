"use client";

import {
  ArrowDownUp,
  CheckCircle2,
  Circle,
  Search,
  Star,
  TrendingUp,
} from "lucide-react";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import type { Problem, ProblemDifficulty } from "@/types";

interface ProblemListProps {
  problems: Problem[];
  selectedId: string | null;
  solvedIds: Set<string>;
  attemptedIds: Set<string>;
  bookmarkedIds: Set<string>;
  onSelect: (p: Problem) => void;
  onToggleBookmark: (id: string) => void;
  languageId: string;
  onOpenSearch: () => void;
  viewMode: "list" | "grid";
}

type FilterDifficulty = "All" | ProblemDifficulty;
type SortMode = "default" | "difficulty" | "acceptance" | "number";
type StatusMode = "all" | "solved" | "attempted" | "unsolved";

const difficultyStyle: Record<ProblemDifficulty, string> = {
  Easy: "text-emerald-300 bg-emerald-500/12 border-emerald-500/25",
  Medium: "text-amber-300 bg-amber-500/12 border-amber-500/25",
  Hard: "text-red-300 bg-red-500/12 border-red-500/25",
};

const difficultyRank: Record<ProblemDifficulty, number> = {
  Easy: 1,
  Medium: 2,
  Hard: 3,
};

function cardClasses(selected: boolean, viewMode: "list" | "grid") {
  return cn(
    "group relative rounded-xl border p-3 text-left transition duration-150",
    viewMode === "list" ? "w-full" : "w-full",
    selected
      ? "border-violet-500/45 bg-violet-500/10 shadow-[inset_3px_0_0_0_rgba(139,92,246,1)]"
      : "border-white/8 bg-zinc-900/40 hover:border-white/15 hover:bg-zinc-900/70",
  );
}

export function ProblemList({
  problems,
  selectedId,
  solvedIds,
  attemptedIds,
  bookmarkedIds,
  onSelect,
  onToggleBookmark,
  languageId,
  onOpenSearch,
  viewMode,
}: ProblemListProps) {
  const [query, setQuery] = useState("");
  const [difficulty, setDifficulty] = useState<FilterDifficulty>("All");
  const [status, setStatus] = useState<StatusMode>("all");
  const [sortMode, setSortMode] = useState<SortMode>("default");
  const [tagFilter, setTagFilter] = useState<string>("all");
  const [acceptanceFloor, setAcceptanceFloor] = useState(0);
  const [showCount, setShowCount] = useState(30);

  const availableTags = useMemo(
    () =>
      Array.from(new Set(problems.flatMap((problem) => problem.tags)))
        .sort((a, b) => a.localeCompare(b))
        .slice(0, 20),
    [problems],
  );

  const counters = useMemo(() => {
    const hasStarter = (problem: Problem) => !!problem.starterCode[languageId];
    const source = problems.filter(hasStarter);
    return {
      All: source.length,
      Easy: source.filter((p) => p.difficulty === "Easy").length,
      Medium: source.filter((p) => p.difficulty === "Medium").length,
      Hard: source.filter((p) => p.difficulty === "Hard").length,
    };
  }, [languageId, problems]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const result = problems
      .filter((problem) => !!problem.starterCode[languageId])
      .filter((problem) => {
        if (!normalized) {
          return true;
        }
        return (
          problem.title.toLowerCase().includes(normalized) ||
          `${problem.number}`.includes(normalized.replace("#", "")) ||
          problem.tags.some((tag) => tag.toLowerCase().includes(normalized))
        );
      })
      .filter((problem) =>
        difficulty === "All" ? true : problem.difficulty === difficulty,
      )
      .filter((problem) =>
        tagFilter === "all"
          ? true
          : problem.tags.some((tag) => tag === tagFilter),
      )
      .filter((problem) => problem.acceptance >= acceptanceFloor)
      .filter((problem) => {
        if (status === "all") {
          return true;
        }
        if (status === "solved") {
          return solvedIds.has(problem.id);
        }
        if (status === "attempted") {
          return attemptedIds.has(problem.id) && !solvedIds.has(problem.id);
        }
        return !attemptedIds.has(problem.id) && !solvedIds.has(problem.id);
      });

    if (sortMode === "default") {
      return result.sort((a, b) => a.number - b.number);
    }
    if (sortMode === "number") {
      return result.sort((a, b) => a.number - b.number);
    }
    if (sortMode === "difficulty") {
      return result.sort(
        (a, b) => difficultyRank[a.difficulty] - difficultyRank[b.difficulty],
      );
    }
    return result.sort((a, b) => b.acceptance - a.acceptance);
  }, [
    acceptanceFloor,
    attemptedIds,
    difficulty,
    languageId,
    problems,
    query,
    solvedIds,
    sortMode,
    status,
    tagFilter,
  ]);

  const visible = filtered.slice(0, showCount);

  return (
    <section
      className="flex h-full min-h-0 flex-col bg-zinc-950"
      aria-label="Problem browser panel"
    >
      <div className="sticky top-0 z-10 space-y-3 border-b border-white/10 bg-zinc-950/92 p-3 backdrop-blur-md">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-500" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Filter in-panel list"
            aria-label="Filter problems"
            className="h-10 w-full rounded-xl border border-white/10 bg-zinc-900/65 pl-9 pr-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
          />
        </div>

        <button
          type="button"
          onClick={onOpenSearch}
          className="group flex w-full items-center gap-2 rounded-xl border border-white/10 bg-zinc-900/65 px-3 py-2 text-left text-sm text-zinc-400 transition hover:border-violet-500/40 hover:text-zinc-200"
          aria-label="Open global problem search"
        >
          <Search className="h-4 w-4 text-zinc-500 transition group-hover:text-violet-300" />
          <span className="flex-1">
            Search problems by number, title, or tag
          </span>
          <kbd className="rounded-md bg-zinc-800 px-2 py-0.5 text-[10px] font-semibold text-zinc-400">
            Ctrl/Cmd + K
          </kbd>
        </button>

        <div className="flex gap-1 overflow-x-auto pb-1">
          {(["All", "Easy", "Medium", "Hard"] as FilterDifficulty[]).map(
            (value) => {
              const active = difficulty === value;
              const count = counters[value] ?? 0;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setDifficulty(value)}
                  className={cn(
                    "inline-flex h-8 shrink-0 items-center gap-1 rounded-lg border px-2.5 text-xs font-semibold transition",
                    active
                      ? "border-violet-400/45 bg-violet-500/15 text-violet-200"
                      : "border-white/10 bg-zinc-900/55 text-zinc-400 hover:text-zinc-200",
                  )}
                >
                  {value}{" "}
                  <span className="text-[10px] text-zinc-500">({count})</span>
                </button>
              );
            },
          )}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <label className="flex items-center gap-2 rounded-lg border border-white/10 bg-zinc-900/60 px-2 text-xs text-zinc-400">
            <ArrowDownUp className="h-3.5 w-3.5 text-zinc-500" />
            <select
              value={sortMode}
              onChange={(event) => setSortMode(event.target.value as SortMode)}
              className="h-8 w-full bg-transparent text-zinc-300 focus:outline-none"
              aria-label="Sort problems"
            >
              <option value="default">Default</option>
              <option value="difficulty">Difficulty</option>
              <option value="acceptance">Acceptance</option>
              <option value="number"># Number</option>
            </select>
          </label>

          <label className="flex items-center gap-2 rounded-lg border border-white/10 bg-zinc-900/60 px-2 text-xs text-zinc-400">
            <TrendingUp className="h-3.5 w-3.5 text-zinc-500" />
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value as StatusMode)}
              className="h-8 w-full bg-transparent text-zinc-300 focus:outline-none"
              aria-label="Filter by progress status"
            >
              <option value="all">All status</option>
              <option value="solved">Solved</option>
              <option value="attempted">Attempted</option>
              <option value="unsolved">Unsolved</option>
            </select>
          </label>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <label className="rounded-lg border border-white/10 bg-zinc-900/60 px-2 text-xs text-zinc-400">
            <span className="sr-only">Tag filter</span>
            <select
              value={tagFilter}
              onChange={(event) => setTagFilter(event.target.value)}
              className="h-8 w-full bg-transparent text-zinc-300 focus:outline-none"
            >
              <option value="all">All topics</option>
              {availableTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </label>

          <label className="rounded-lg border border-white/10 bg-zinc-900/60 px-2 text-xs text-zinc-400">
            <span className="inline-block pt-1">Min acceptance</span>
            <input
              type="number"
              min={0}
              max={100}
              value={acceptanceFloor}
              onChange={(event) =>
                setAcceptanceFloor(
                  Math.max(0, Math.min(100, Number(event.target.value || 0))),
                )
              }
              className="h-6 w-full bg-transparent text-zinc-300 focus:outline-none"
            />
          </label>
        </div>
      </div>

      <div className="flex items-center justify-between border-b border-white/8 px-4 py-2 text-[11px] text-zinc-500">
        <p>
          Showing {Math.min(showCount, filtered.length)} of {filtered.length}
        </p>
        <p className="text-emerald-400">{solvedIds.size} solved</p>
      </div>
      <ul
        className={cn(
          "flex-1 overflow-y-auto p-2",
          viewMode === "grid"
            ? "grid grid-cols-1 gap-2 xl:grid-cols-2"
            : "space-y-1.5",
        )}
        aria-label="Problem list"
      >
        {visible.length === 0 ? (
          <li className="flex min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-white/10 text-center text-zinc-500">
            <Search className="mb-2 h-7 w-7 opacity-40" />
            <p className="text-sm">No problems found for this filter set.</p>
          </li>
        ) : (
          visible.map((problem) => {
            const solved = solvedIds.has(problem.id);
            const selected = selectedId === problem.id;
            const attempted = attemptedIds.has(problem.id);
            const bookmarked = bookmarkedIds.has(problem.id);

            return (
              <li key={problem.id}>
                <button
                  type="button"
                  onClick={() => onSelect(problem)}
                  className={cardClasses(selected, viewMode)}
                >
                  <div className="mb-1.5 flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-zinc-100">
                        <span className="mr-1.5 text-zinc-500">
                          #{problem.number}
                        </span>
                        {problem.title}
                      </p>
                    </div>

                    <div className="flex items-center gap-1">
                      {solved ? (
                        <CheckCircle2
                          className="h-4 w-4 text-emerald-400"
                          aria-label="Solved"
                        />
                      ) : attempted ? (
                        <Circle
                          className="h-4 w-4 text-amber-400"
                          aria-label="Attempted"
                        />
                      ) : (
                        <Circle
                          className="h-4 w-4 text-zinc-700"
                          aria-label="Unsolved"
                        />
                      )}
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          onToggleBookmark(problem.id);
                        }}
                        className="inline-flex h-6 w-6 items-center justify-center rounded-md text-zinc-500 hover:bg-white/10"
                        aria-label={
                          bookmarked ? "Remove bookmark" : "Bookmark problem"
                        }
                      >
                        <Star
                          className={cn(
                            "h-3.5 w-3.5",
                            bookmarked
                              ? "fill-amber-300 text-amber-300"
                              : "text-zinc-600",
                          )}
                        />
                      </button>
                    </div>
                  </div>

                  <div className="mb-2 flex items-center gap-1.5">
                    <span
                      className={cn(
                        "rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                        difficultyStyle[problem.difficulty],
                      )}
                    >
                      {problem.difficulty}
                    </span>
                    <span className="rounded-full bg-white/7 px-2 py-0.5 text-[10px] text-zinc-400">
                      {problem.acceptance.toFixed(1)}%
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {problem.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-white/6 px-1.5 py-0.5 text-[10px] text-zinc-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </button>
              </li>
            );
          })
        )}
      </ul>

      {showCount < filtered.length ? (
        <div className="border-t border-white/8 p-2">
          <button
            type="button"
            onClick={() => setShowCount((count) => count + 30)}
            className="w-full rounded-lg border border-white/12 bg-zinc-900/60 py-2 text-sm text-zinc-300 transition hover:bg-white/10"
          >
            Load more
          </button>
        </div>
      ) : null}
    </section>
  );
}
