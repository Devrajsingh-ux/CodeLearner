"use client";

import type { SupportedLanguage } from "@/types";
import { cn } from "@/lib/utils";

interface LanguageBarProps {
  languages: SupportedLanguage[];
  selected: string;
  onChange: (id: string) => void;
}

export function LanguageBar({ languages, selected, onChange }: LanguageBarProps) {
  return (
    <div
      className="flex items-center gap-1 overflow-x-auto border-b border-white/8 bg-zinc-900/60 px-4 py-2 scrollbar-none"
      role="tablist"
      aria-label="Select programming language"
    >
      {languages.map((lang) => {
        const isActive = selected === lang.id;
        return (
          <button
            key={lang.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(lang.id)}
            className={cn(
              "flex shrink-0 items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500",
              isActive
                ? "bg-violet-500/20 text-violet-300 shadow-sm"
                : "text-zinc-400 hover:bg-white/6 hover:text-zinc-200",
            )}
          >
            <span className="text-base leading-none" aria-hidden="true">
              {lang.icon}
            </span>
            <span className="hidden sm:inline">{lang.label}</span>
          </button>
        );
      })}
    </div>
  );
}
