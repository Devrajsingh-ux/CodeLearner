"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  BookCheck,
  Code2,
  LayoutGrid,
  List,
  Search,
  Sparkles,
  Target,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { LanguageBar } from "@/components/problems/LanguageBar";
import { ProblemCompiler } from "@/components/problems/ProblemCompiler";
import { ProblemList } from "@/components/problems/ProblemList";
import { SearchModal } from "@/components/problems/SearchModal";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import type { Problem, SupportedLanguage } from "@/types";

interface ProblemsClientProps {
  problems: Problem[];
  languages: SupportedLanguage[];
}

export function ProblemsClient({ problems, languages }: ProblemsClientProps) {
  const prefersReducedMotion = useReducedMotion();
  const { user } = useAuth();

  const [selectedLangId, setSelectedLangId] = useState<string>(
    languages[0]?.id ?? "javascript",
  );
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(
    problems[0] ?? null,
  );
  const [solvedIds, setSolvedIds] = useState<Set<string>>(new Set());
  const [attemptedIds, setAttemptedIds] = useState<Set<string>>(new Set());
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [mobileListOpen, setMobileListOpen] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);

  const currentLang =
    languages.find((language) => language.id === selectedLangId) ??
    languages[0];

  useEffect(() => {
    function onShortcut(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
    }

    document.addEventListener("keydown", onShortcut);
    return () => document.removeEventListener("keydown", onShortcut);
  }, []);

  useEffect(() => {
    if (selectedProblem) {
      setMobileListOpen(false);
    }
  }, [selectedProblem]);

  function handleLanguageChange(id: string) {
    setSelectedLangId(id);

    if (selectedProblem && !selectedProblem.starterCode[id]) {
      const fallback =
        problems.find((problem) => !!problem.starterCode[id]) ?? null;
      setSelectedProblem(fallback);
    }
  }

  function handleSolved(id: string) {
    setSolvedIds((prev) => new Set(prev).add(id));
    setAttemptedIds((prev) => new Set(prev).add(id));
  }

  function handleAttempt(id: string) {
    setAttemptedIds((prev) => new Set(prev).add(id));
  }

  function handleToggleBookmark(id: string) {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  const solvedPercent = useMemo(() => {
    if (problems.length === 0) {
      return 0;
    }
    return Math.round((solvedIds.size / problems.length) * 100);
  }, [problems.length, solvedIds.size]);

  const breadcrumbTitle = selectedProblem?.title ?? "Select problem";

  return (
    <main
      className="flex h-screen flex-col overflow-hidden bg-zinc-950 pt-16"
      aria-label="Problems workspace"
    >
      <motion.header
        initial={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
        animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="border-b border-white/10 bg-zinc-950/85 px-4 py-3 backdrop-blur-md sm:px-5"
      >
        <div className="mb-2 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-violet-600 to-cyan-600 shadow-lg shadow-violet-500/25">
            <Code2 className="h-4 w-4 text-white" />
          </div>

          <div className="min-w-0">
            <h1 className="text-sm font-bold text-white sm:text-base">
              Problems
            </h1>
            <p className="truncate text-xs text-zinc-500">
              Problems &gt;{" "}
              <span className="text-zinc-400">{breadcrumbTitle}</span>
            </p>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="inline-flex h-9 items-center gap-1 rounded-lg border border-white/10 bg-zinc-900/70 px-2.5 text-xs font-semibold text-zinc-300 transition hover:bg-white/10"
              aria-label="Open global search"
            >
              <Search className="h-3.5 w-3.5" /> Search
            </button>

            <div className="hidden items-center gap-1 rounded-lg border border-white/10 bg-zinc-900/65 p-1 sm:flex">
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={cn(
                  "inline-flex h-7 w-7 items-center justify-center rounded-md transition",
                  viewMode === "list"
                    ? "bg-violet-500/18 text-violet-200"
                    : "text-zinc-500 hover:text-zinc-300",
                )}
                aria-label="List view"
              >
                <List className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={cn(
                  "inline-flex h-7 w-7 items-center justify-center rounded-md transition",
                  viewMode === "grid"
                    ? "bg-violet-500/18 text-violet-200"
                    : "text-zinc-500 hover:text-zinc-300",
                )}
                aria-label="Grid view"
              >
                <LayoutGrid className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:gap-2">
          <StatPill
            label="Solved"
            value={`${solvedIds.size}/${problems.length}`}
            icon={<BookCheck className="h-3.5 w-3.5" />}
          />
          <StatPill
            label="Progress"
            value={`${solvedPercent}%`}
            icon={<Target className="h-3.5 w-3.5" />}
          />
          <StatPill
            label="Bookmarks"
            value={`${bookmarkedIds.size}`}
            icon={<Sparkles className="h-3.5 w-3.5" />}
          />
          {user ? (
            <StatPill
              label="Streak"
              value={`${user.streak}d`}
              icon={<Sparkles className="h-3.5 w-3.5" />}
            />
          ) : (
            <div className="col-span-2 rounded-lg border border-cyan-500/20 bg-cyan-500/10 px-3 py-2 text-xs text-cyan-200 sm:col-span-1">
              Sign in to persist progress and streak.
            </div>
          )}
        </div>
      </motion.header>

      <LanguageBar
        languages={languages}
        selected={selectedLangId}
        onChange={handleLanguageChange}
      />

      <div className="flex min-h-0 flex-1 overflow-hidden">
        <aside
          className={cn(
            "shrink-0 border-r border-white/10 transition-all duration-200",
            mobileListOpen
              ? "w-full sm:w-[360px] xl:w-[420px]"
              : "hidden sm:block sm:w-[360px] xl:w-[420px]",
          )}
        >
          <ProblemList
            problems={problems}
            selectedId={selectedProblem?.id ?? null}
            solvedIds={solvedIds}
            attemptedIds={attemptedIds}
            bookmarkedIds={bookmarkedIds}
            onSelect={(problem) => {
              setSelectedProblem(problem);
              setMobileListOpen(false);
            }}
            onToggleBookmark={handleToggleBookmark}
            languageId={selectedLangId}
            onOpenSearch={() => setSearchOpen(true)}
            viewMode={viewMode}
          />
        </aside>

        <section className="min-w-0 flex-1">
          {selectedProblem && currentLang ? (
            <ProblemCompiler
              key={`${selectedProblem.id}-${selectedLangId}`}
              problem={selectedProblem}
              language={currentLang}
              onSolved={handleSolved}
              onAttempt={handleAttempt}
            />
          ) : (
            <div className="flex h-full items-center justify-center p-6 text-center">
              <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6">
                <p className="text-lg font-semibold text-zinc-100">
                  No problem selected
                </p>
                <p className="mt-1 text-sm text-zinc-500">
                  Choose a problem from the list to begin coding.
                </p>
              </div>
            </div>
          )}
        </section>
      </div>

      <AnimatePresence>
        {!mobileListOpen ? (
          <motion.div
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 8 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: 8 }}
            className="border-t border-white/10 bg-zinc-950/95 p-3 sm:hidden"
          >
            <button
              type="button"
              onClick={() => setMobileListOpen(true)}
              className="w-full rounded-xl border border-white/10 py-2 text-sm text-zinc-300 transition hover:bg-white/10"
            >
              Back to problem list
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <SearchModal
        open={searchOpen}
        problems={problems}
        onClose={() => setSearchOpen(false)}
        onSelectProblem={(problem) => {
          setSelectedProblem(problem);
          setMobileListOpen(false);
        }}
      />
    </main>
  );
}

function StatPill({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-zinc-900/70 px-2.5 py-1.5 text-xs text-zinc-300">
      <span className="text-violet-300">{icon}</span>
      <span className="text-zinc-500">{label}</span>
      <span className="font-semibold text-zinc-100">{value}</span>
    </div>
  );
}
