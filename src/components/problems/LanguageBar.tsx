"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import type { SupportedLanguage } from "@/types";

interface LanguageBarProps {
  languages: SupportedLanguage[];
  selected: string;
  onChange: (id: string) => void;
}

export function LanguageBar({
  languages,
  selected,
  onChange,
}: LanguageBarProps) {
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const active = listRef.current?.querySelector<HTMLButtonElement>(
      `[data-lang="${selected}"]`,
    );
    active?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [selected]);

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const currentIndex = languages.findIndex((lang) => lang.id === selected);
    if (currentIndex < 0) {
      return;
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      onChange(
        languages[(currentIndex + 1) % languages.length]?.id ?? selected,
      );
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      onChange(
        languages[(currentIndex - 1 + languages.length) % languages.length]
          ?.id ?? selected,
      );
    }

    if (event.key === "Home") {
      event.preventDefault();
      onChange(languages[0]?.id ?? selected);
    }

    if (event.key === "End") {
      event.preventDefault();
      onChange(languages[languages.length - 1]?.id ?? selected);
    }
  }

  return (
    <div className="relative border-y border-white/8 bg-zinc-900/55 px-3 py-2 backdrop-blur-md sm:px-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-linear-to-r from-zinc-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-linear-to-l from-zinc-950 to-transparent" />

      <div
        ref={listRef}
        className="scrollbar-none flex items-center gap-1 overflow-x-auto"
        role="tablist"
        aria-label="Programming language selector"
        onKeyDown={handleKeyDown}
      >
        {languages.map((lang) => {
          const isActive = selected === lang.id;
          return (
            <button
              key={lang.id}
              data-lang={lang.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls="problem-compiler"
              tabIndex={isActive ? 0 : -1}
              onClick={() => onChange(lang.id)}
              className={cn(
                "group relative inline-flex h-10 shrink-0 items-center gap-2 rounded-xl border px-3 text-sm font-medium transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500",
                isActive
                  ? "border-violet-400/50 bg-violet-500/20 text-violet-200 shadow-[0_0_0_1px_rgba(139,92,246,0.3),0_0_24px_rgba(139,92,246,0.2)]"
                  : "border-white/10 bg-zinc-900/70 text-zinc-400 hover:border-white/20 hover:bg-white/8 hover:text-zinc-200",
              )}
            >
              <span className="text-base leading-none" aria-hidden="true">
                {lang.icon || "•"}
              </span>
              <span className="whitespace-nowrap">{lang.label}</span>
              {isActive ? (
                <span className="absolute inset-x-2 bottom-0.5 h-px bg-linear-to-r from-transparent via-cyan-400 to-transparent" />
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
