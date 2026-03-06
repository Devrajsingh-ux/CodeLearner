"use client";

import { Code2, LayoutPanelLeft } from "lucide-react";
import { useState } from "react";
import { LanguageBar } from "@/components/problems/LanguageBar";
import { ProblemCompiler } from "@/components/problems/ProblemCompiler";
import { ProblemList } from "@/components/problems/ProblemList";
import type { Problem, SupportedLanguage } from "@/types";
import { cn } from "@/lib/utils";

interface ProblemsClientProps {
  problems: Problem[];
  languages: SupportedLanguage[];
}

export function ProblemsClient({ problems, languages }: ProblemsClientProps) {
  const [selectedLangId, setSelectedLangId] = useState<string>(languages[0]?.id ?? "javascript");
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [solvedIds, setSolvedIds] = useState<Set<string>>(new Set());

  const currentLang = languages.find((l) => l.id === selectedLangId) ?? languages[0];

  function handleLanguageChange(id: string) {
    setSelectedLangId(id);
    // Keep selected problem if it has a starter for the new language
    if (selectedProblem && !selectedProblem.starterCode[id]) {
      setSelectedProblem(null);
    }
  }

  function handleSolved(id: string) {
    setSolvedIds((prev) => new Set(prev).add(id));
  }

  return (
    <div className="flex h-screen flex-col bg-zinc-950 pt-16">
      {/* ── Page header ─────────────────────────────────────────── */}
      <div className="shrink-0 border-b border-white/8 bg-zinc-950/80 backdrop-blur-md px-4 py-3 flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-violet-600 to-indigo-700 shadow-lg shadow-violet-500/20">
          <Code2 className="h-4 w-4 text-white" />
        </div>
        <div>
          <h1 className="text-sm font-bold text-white">Problems</h1>
          <p className="text-[11px] text-zinc-500 hidden sm:block">
            Select a language • pick a problem • start coding
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2 text-xs text-zinc-600">
          <LayoutPanelLeft className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Split pane</span>
        </div>
      </div>

      {/* ── Language bar ─────────────────────────────────────────── */}
      <LanguageBar
        languages={languages}
        selected={selectedLangId}
        onChange={handleLanguageChange}
      />

      {/* ── Split pane ───────────────────────────────────────────── */}
      <div className="flex min-h-0 flex-1 overflow-hidden">
        {/* Left: Problem list */}
        <div
          className={cn(
            "h-full shrink-0 border-r border-white/8 transition-all duration-300",
            // On mobile: full width when no problem selected, hidden otherwise
            selectedProblem
              ? "hidden sm:block sm:w-72 lg:w-80 xl:w-96"
              : "w-full sm:w-72 lg:w-80 xl:w-96",
          )}
        >
          <ProblemList
            problems={problems}
            selectedId={selectedProblem?.id ?? null}
            solvedIds={solvedIds}
            onSelect={setSelectedProblem}
            languageId={selectedLangId}
          />
        </div>

        {/* Right: Compiler / placeholder */}
        <div className="min-w-0 flex-1 h-full">
          {selectedProblem ? (
            <ProblemCompiler
              key={`${selectedProblem.id}-${selectedLangId}`}
              problem={selectedProblem}
              language={currentLang}
              onSolved={handleSolved}
            />
          ) : (
            <EmptyState onBack={() => setSelectedProblem(null)} />
          )}
        </div>
      </div>

      {/* Mobile: back button when a problem is selected */}
      {selectedProblem && (
        <div className="sm:hidden shrink-0 border-t border-white/8 bg-zinc-950 p-3">
          <button
            type="button"
            onClick={() => setSelectedProblem(null)}
            className="w-full rounded-xl border border-white/10 py-2 text-sm text-zinc-400 hover:bg-white/6 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
          >
            ← Back to problem list
          </button>
        </div>
      )}
    </div>
  );
}

function EmptyState({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 text-center px-6">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/10 ring-1 ring-violet-500/20">
        <Code2 className="h-8 w-8 text-violet-400" />
      </div>
      <div>
        <p className="text-base font-semibold text-zinc-300">Select a problem to start</p>
        <p className="mt-1 text-sm text-zinc-600">
          Choose a language above, then click any problem from the list on the left.
        </p>
      </div>
      <button
        type="button"
        onClick={onBack}
        className="sm:hidden rounded-xl border border-white/10 px-4 py-2 text-sm text-zinc-400 hover:bg-white/6 transition-colors"
      >
        ← Problem list
      </button>
    </div>
  );
}
