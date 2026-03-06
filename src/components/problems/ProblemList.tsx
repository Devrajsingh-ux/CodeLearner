"use client";

import { CheckCircle2, Circle, Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { Problem, ProblemDifficulty } from "@/types";
import { cn } from "@/lib/utils";

interface ProblemListProps {
  problems: Problem[];
  selectedId: string | null;
  solvedIds: Set<string>;
  onSelect: (p: Problem) => void;
  languageId: string;
}

const DIFFICULTY_ORDER: Record<ProblemDifficulty, number> = {
  Easy: 0,
  Medium: 1,
  Hard: 2,
};

const difficultyStyle: Record<ProblemDifficulty, string> = {
  Easy: "text-emerald-400 bg-emerald-500/10",
  Medium: "text-amber-400 bg-amber-500/10",
  Hard: "text-red-400 bg-red-500/10",
};

type FilterDifficulty = "All" | ProblemDifficulty;

export function ProblemList({
  problems,
  selectedId,
  solvedIds,
  onSelect,
  languageId,
}: ProblemListProps) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterDifficulty>("All");

  const filtered = useMemo(() => {
    return problems
      .filter((p) => {
        const matchQuery =
          !query ||
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));
        const matchDiff = filter === "All" || p.difficulty === filter;
        const hasStarter = !!p.starterCode[languageId];
        return matchQuery && matchDiff && hasStarter;
      })
      .sort((a, b) => DIFFICULTY_ORDER[a.difficulty] - DIFFICULTY_ORDER[b.difficulty]);
  }, [problems, query, filter, languageId]);

  return (
    <div className="flex h-full flex-col overflow-hidden bg-zinc-950">
      {/* Header */}
      <div className="shrink-0 space-y-2 border-b border-white/8 p-3">
        {/* Search */}
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-500" />
          <input
            type="search"
            placeholder="Search problems…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search problems"
            className={cn(
              "w-full rounded-lg border border-white/8 bg-zinc-900 py-2 pl-9 pr-3 text-sm text-zinc-200 outline-none placeholder:text-zinc-600",
              "transition-colors focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30",
            )}
          />
        </div>

        {/* Difficulty filter */}
        <div className="flex gap-1" role="group" aria-label="Filter by difficulty">
          {(["All", "Easy", "Medium", "Hard"] as FilterDifficulty[]).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setFilter(d)}
              className={cn(
                "rounded-md px-2.5 py-1 text-xs font-medium transition-all",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500",
                filter === d
                  ? "bg-violet-500/20 text-violet-300"
                  : "text-zinc-500 hover:text-zinc-300 hover:bg-white/6",
              )}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Stats bar */}
      <div className="shrink-0 flex items-center gap-4 border-b border-white/6 px-4 py-2 text-[11px] text-zinc-600">
        <span>{filtered.length} problem{filtered.length !== 1 ? "s" : ""}</span>
        <span className="text-emerald-600">{filtered.filter((p) => solvedIds.has(p.id)).length} solved</span>
      </div>

      {/* List */}
      <ul className="flex-1 overflow-y-auto" role="listbox" aria-label="Problem list">
        {filtered.length === 0 ? (
          <li className="flex flex-col items-center gap-2 py-16 text-center text-zinc-600">
            <Search className="h-8 w-8 opacity-30" />
            <p className="text-sm">No problems found</p>
          </li>
        ) : (
          filtered.map((problem) => {
            const isSolved = solvedIds.has(problem.id);
            const isSelected = selectedId === problem.id;
            return (
              <li key={problem.id} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  onClick={() => onSelect(problem)}
                  className={cn(
                    "w-full border-b border-white/4 px-4 py-3 text-left transition-colors duration-150",
                    "focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-violet-500",
                    isSelected
                      ? "bg-violet-500/10 border-l-2 border-l-violet-500"
                      : "hover:bg-white/4",
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      {isSolved ? (
                        <CheckCircle2
                          className="h-4 w-4 shrink-0 text-emerald-500"
                          aria-label="Solved"
                        />
                      ) : (
                        <Circle
                          className="h-4 w-4 shrink-0 text-zinc-700"
                          aria-label="Not solved"
                        />
                      )}
                      <span className="truncate text-sm font-medium text-zinc-200">
                        <span className="mr-1.5 text-zinc-600">#{problem.number}</span>
                        {problem.title}
                      </span>
                    </div>
                    <span
                      className={cn(
                        "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                        difficultyStyle[problem.difficulty],
                      )}
                    >
                      {problem.difficulty}
                    </span>
                  </div>

                  <div className="mt-1.5 ml-6 flex flex-wrap gap-1">
                    {problem.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] text-zinc-500"
                      >
                        {tag}
                      </span>
                    ))}
                    <span className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] text-zinc-600">
                      {problem.acceptance.toFixed(1)}%
                    </span>
                  </div>
                </button>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}
