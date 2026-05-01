"use client";

import { ArrowRight, BookOpen, Clock, Users } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { Button } from "@/ui/components/Button";
import { CATEGORIES } from "@/data/courses";
import { cn, formatNumber } from "@/lib/utils";
import type { Track, TrackCategory } from "@/types";
import { CourseCard } from "./CourseCard";
import { useMarketingData } from "./data-source";

type Tab = "Featured" | TrackCategory;
const TABS: Tab[] = ["Featured", ...CATEGORIES];

const CATEGORY_META: Record<string, { emoji: string; description: string }> = {
  Featured: {
    emoji: "⭐",
    description: "Hand-picked tracks loved by our community — the best place to start.",
  },
  Languages: {
    emoji: "💻",
    description: "Master JavaScript, Python, Rust, Go, Elixir, and 13 more languages.",
  },
  Frontend: {
    emoji: "🎨",
    description: "Build stunning UIs with React, Vue, Angular, Svelte, and Tailwind CSS.",
  },
  Backend: {
    emoji: "⚙️",
    description: "Design robust APIs with Node.js, NestJS, Django, FastAPI, and GraphQL.",
  },
  "Data & AI": {
    emoji: "📊",
    description: "From SQL & Pandas to production LLMs, RAG pipelines, and deep learning.",
  },
  Mobile: {
    emoji: "📱",
    description: "Ship beautiful apps to iOS and Android with Flutter, React Native, and Swift.",
  },
  "DevOps & Cloud": {
    emoji: "☁️",
    description: "Automate, deploy, and scale with Docker, Kubernetes, AWS, and Linux.",
  },
  Systems: {
    emoji: "🏗️",
    description: "Ace FAANG interviews with DSA and design million-user distributed systems.",
  },
  "Web3 & Security": {
    emoji: "🔐",
    description: "Smart contracts in Solidity, ethical hacking, and full-stack Web3 dApps.",
  },
  "Game Dev": {
    emoji: "🎮",
    description: "Build 2D/3D games with Unity, Godot 4, and Unreal Engine.",
  },
};

export function CoursesSection() {
  const { data, isLoading } = useMarketingData();
  const allTracks = data.courses;
  const [activeTab, setActiveTab] = useState<Tab>("Featured");
  const tabsRef = useRef<HTMLDivElement>(null);

  const visible =
    activeTab === "Featured"
      ? allTracks.filter((t) => t.isFeatured)
      : allTracks.filter((t) => t.category === activeTab);

  const totalHours = visible.reduce((sum, t) => {
    const h = Number.parseInt(t.duration.replace("h", ""), 10);
    return sum + (Number.isNaN(h) ? 0 : h);
  }, 0);
  const totalEnrolled = visible.reduce((s, t) => s + t.enrolledCount, 0);
  const meta = CATEGORY_META[activeTab] ?? CATEGORY_META.Featured;

  return (
    <section className="py-16 sm:py-24" aria-label="Course catalog">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Section header ─────────────────────────────────────────── */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-cyan-400">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Course Catalog
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Pick your{" "}
              <span className="bg-linear-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                learning path
              </span>
            </h2>
          </div>
          <Link href="/learn" className="shrink-0">
            <Button
              variant="outline"
              size="sm"
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              Browse all {isLoading ? "…" : allTracks.length} courses
            </Button>
          </Link>
        </div>

        {/* ── Category tabs (horizontal scroll, no wrapping) ─────────── */}
        <div
          ref={tabsRef}
          className="mb-6 flex gap-2 overflow-x-auto pb-2"
          style={
            {
              scrollbarWidth: "none",
              WebkitOverflowScrolling: "touch",
            } as React.CSSProperties
          }
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab;
            const count =
              tab === "Featured"
                ? allTracks.filter((t) => t.isFeatured).length
                : allTracks.filter((t) => t.category === tab).length;
            const { emoji } = CATEGORY_META[tab] ?? { emoji: "📚" };
            return (
              <button
                type="button"
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "border-violet-500 bg-violet-500/15 text-white shadow-lg shadow-violet-500/10"
                    : "border-white/8 bg-zinc-900/60 text-zinc-400 hover:border-white/16 hover:bg-zinc-900 hover:text-zinc-200",
                )}
              >
                <span className="text-base leading-none">{emoji}</span>
                <span>{tab}</span>
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

        {/* ── Active category info bar ───────────────────────────────── */}
        <div className="mb-8 flex flex-col gap-3 rounded-xl border border-white/6 bg-zinc-900/40 px-4 py-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:px-5">
          <p className="text-sm text-zinc-400">{meta.description}</p>
          <div className="flex items-center gap-5 text-xs text-zinc-500">
            <span className="flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5 text-violet-400" />
              <span className="text-zinc-300 font-medium">
                {visible.length}
              </span>{" "}
              courses
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-cyan-400" />
              <span className="text-zinc-300 font-medium">{totalHours}h</span>{" "}
              content
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-zinc-300 font-medium">
                {formatNumber(totalEnrolled)}
              </span>{" "}
              enrolled
            </span>
          </div>
        </div>

        {/* ── Course grid ───────────────────────────────────────────── */}
        {isLoading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-64 animate-pulse rounded-2xl border border-white/6 bg-zinc-900" />
            ))}
          </div>
        ) : visible.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visible.map((track) => (
              <CourseCard key={track.id} track={track} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center py-20 text-center">
            <span className="mb-3 text-4xl">🚧</span>
            <p className="text-zinc-400 font-medium">Coming soon</p>
            <p className="mt-1 text-sm text-zinc-600">
              These courses are in production — check back shortly.
            </p>
          </div>
        )}

        {/* ── Footer CTA ────────────────────────────────────────────── */}
        {!isLoading && visible.length > 0 && (
          <div className="mt-12 flex flex-col items-center gap-3 text-center">
            <p className="text-sm text-zinc-500">
              Showing {visible.length} of {allTracks.length} available courses
            </p>
            <Link href="/learn">
              <Button size="lg" rightIcon={<ArrowRight className="h-5 w-5" />}>
                Explore all {allTracks.length} courses
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
