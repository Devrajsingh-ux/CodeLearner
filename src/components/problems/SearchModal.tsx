"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpDown,
  Clock3,
  Command,
  Hash,
  Search,
  Tags,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { Problem } from "@/types";

interface SearchModalProps {
  open: boolean;
  problems: Problem[];
  onClose: () => void;
  onSelectProblem: (problem: Problem) => void;
}

export function SearchModal({
  open,
  problems,
  onClose,
  onSelectProblem,
}: SearchModalProps) {
  const prefersReducedMotion = useReducedMotion();
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState<string[]>(["Two Sum", "Array", "#1"]);
  const [highlightIndex, setHighlightIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return problems.slice(0, 8);
    }

    return problems
      .filter((problem) => {
        const byNumber = `${problem.number}`.includes(
          normalized.replace("#", ""),
        );
        const byTitle = problem.title.toLowerCase().includes(normalized);
        const byTag = problem.tags.some((tag) =>
          tag.toLowerCase().includes(normalized),
        );
        return byNumber || byTitle || byTag;
      })
      .slice(0, 16);
  }, [problems, query]);

  useEffect(() => {
    if (!open) {
      setHighlightIndex(0);
      setQuery("");
      return;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }

      if (!results.length) {
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setHighlightIndex((idx) => (idx + 1) % results.length);
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setHighlightIndex((idx) => (idx - 1 + results.length) % results.length);
      }

      if (event.key === "Enter") {
        event.preventDefault();
        const selected = results[highlightIndex];
        if (!selected) {
          return;
        }
        setRecent((prev) =>
          [selected.title, ...prev.filter((v) => v !== selected.title)].slice(
            0,
            5,
          ),
        );
        onSelectProblem(selected);
        onClose();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [highlightIndex, onClose, onSelectProblem, open, results]);

  useEffect(() => {
    if (!open) {
      return;
    }
    inputRef.current?.focus();
  }, [open]);

  function handlePick(problem: Problem) {
    setRecent((prev) =>
      [problem.title, ...prev.filter((v) => v !== problem.title)].slice(0, 5),
    );
    onSelectProblem(problem);
    onClose();
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={prefersReducedMotion ? undefined : { opacity: 0 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="fixed inset-0 z-[90] flex items-start justify-center bg-zinc-950/75 px-4 pt-[16vh] backdrop-blur-md"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Problem search"
        >
          <motion.div
            initial={
              prefersReducedMotion
                ? undefined
                : { opacity: 0, y: 14, scale: 0.985 }
            }
            animate={
              prefersReducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }
            }
            exit={
              prefersReducedMotion
                ? undefined
                : { opacity: 0, y: 8, scale: 0.99 }
            }
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/95 shadow-2xl shadow-violet-900/20"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="border-b border-white/10 px-4 py-3">
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-zinc-950/80 px-3">
                <Search className="h-4 w-4 text-zinc-500" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setHighlightIndex(0);
                  }}
                  placeholder="Search by number, title, or tag"
                  className="h-11 w-full bg-transparent text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
                  aria-label="Search problems"
                />
                <kbd className="hidden rounded-md bg-zinc-800 px-2 py-1 text-[10px] font-semibold text-zinc-400 sm:inline-flex">
                  <Command className="mr-1 h-3 w-3" />K
                </kbd>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-white/10 hover:text-zinc-200"
                  aria-label="Close search"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="grid max-h-[62vh] min-h-[340px] grid-cols-1 overflow-hidden md:grid-cols-[1.4fr_0.6fr]">
              <ul
                className="overflow-y-auto border-b border-white/8 p-2 md:border-b-0 md:border-r md:border-white/8"
                aria-label="Search results"
              >
                {results.length === 0 ? (
                  <li className="flex h-full min-h-[220px] items-center justify-center px-4 text-center text-sm text-zinc-500">
                    No matching problems. Try a title, tag, or number like #42.
                  </li>
                ) : (
                  results.map((problem, index) => (
                    <li key={problem.id}>
                      <button
                        type="button"
                        onMouseEnter={() => setHighlightIndex(index)}
                        onClick={() => handlePick(problem)}
                        className={cn(
                          "flex w-full items-start justify-between gap-3 rounded-xl px-3 py-2.5 text-left transition",
                          index === highlightIndex
                            ? "bg-violet-500/15 text-violet-100"
                            : "text-zinc-200 hover:bg-white/8",
                        )}
                      >
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold">
                            <span className="mr-1 text-zinc-500">
                              #{problem.number}
                            </span>
                            {problem.title}
                          </p>
                          <p className="mt-0.5 truncate text-xs text-zinc-500">
                            {problem.tags.slice(0, 3).join(" • ")}
                          </p>
                        </div>
                        <span className="rounded-md bg-white/8 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-400">
                          {problem.acceptance.toFixed(1)}%
                        </span>
                      </button>
                    </li>
                  ))
                )}
              </ul>

              <div className="space-y-4 p-3">
                <div>
                  <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                    <Clock3 className="h-3.5 w-3.5" /> Recent
                  </p>
                  <div className="space-y-1">
                    {recent.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setQuery(item)}
                        className="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left text-xs text-zinc-300 transition hover:bg-white/8"
                      >
                        <span className="truncate">{item}</span>
                        <Search className="h-3 w-3 text-zinc-500" />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                    <ArrowUpDown className="h-3.5 w-3.5" /> Tips
                  </p>
                  <div className="space-y-1.5 text-xs text-zinc-500">
                    <p className="inline-flex items-center gap-1">
                      <Hash className="h-3 w-3" /> Search number:{" "}
                      <span className="text-zinc-400">#15</span>
                    </p>
                    <p className="inline-flex items-center gap-1">
                      <Tags className="h-3 w-3" /> Search tag:{" "}
                      <span className="text-zinc-400">array</span>
                    </p>
                    <p>
                      Use{" "}
                      <span className="text-zinc-400">Arrow keys + Enter</span>{" "}
                      to jump fast.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
