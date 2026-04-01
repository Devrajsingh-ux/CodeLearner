"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  Clock,
  MonitorPlay,
  PlayCircle,
  Search,
  SlidersHorizontal,
  Sparkles,
  Users,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { CourseCard } from "@/components/home/CourseCard";
import { Button } from "@/components/ui/Button";
import { CATEGORIES } from "@/data/courses";
import { cn } from "@/lib/utils";
import type { Track, TrackCategory } from "@/types";

const DIFFICULTIES = ["All", "Beginner", "Intermediate", "Advanced"] as const;
type Difficulty = (typeof DIFFICULTIES)[number];

type CategoryFilter = "All" | TrackCategory;

const CATEGORY_META: Record<
  string,
  { emoji: string; color: string; desc: string }
> = {
  Languages: {
    emoji: "💻",
    color: "text-blue-400 bg-blue-500/10",
    desc: "Core syntax & logic",
  },
  Frontend: {
    emoji: "🎨",
    color: "text-cyan-400 bg-cyan-500/10",
    desc: "User interfaces",
  },
  Backend: {
    emoji: "⚙️",
    color: "text-green-400 bg-green-500/10",
    desc: "Server architectures",
  },
  "Data & AI": {
    emoji: "📊",
    color: "text-orange-400 bg-orange-500/10",
    desc: "ML & Analytics",
  },
  Mobile: {
    emoji: "📱",
    color: "text-fuchsia-400 bg-fuchsia-500/10",
    desc: "iOS & Android apps",
  },
  "DevOps & Cloud": {
    emoji: "☁️",
    color: "text-sky-400 bg-sky-500/10",
    desc: "Infrastructure",
  },
  Systems: {
    emoji: "🏗️",
    color: "text-indigo-400 bg-indigo-500/10",
    desc: "Low-level programming",
  },
  "Web3 & Security": {
    emoji: "🔐",
    color: "text-emerald-400 bg-emerald-500/10",
    desc: "Crypto & InfoSec",
  },
  "Game Dev": {
    emoji: "🎮",
    color: "text-violet-400 bg-violet-500/10",
    desc: "Interactive worlds",
  },
};

function FilterSidebar({
  allTracks,
  category,
  setCategory,
  difficulty,
  setDifficulty,
  hasFilters,
  clearAll,
  onClose,
}: {
  allTracks: Track[];
  category: CategoryFilter;
  setCategory: (c: CategoryFilter) => void;
  difficulty: Difficulty;
  setDifficulty: (d: Difficulty) => void;
  hasFilters: boolean;
  clearAll: () => void;
  onClose?: () => void;
}) {
  return (
    <div className="flex h-full flex-col overflow-y-auto rounded-3xl border border-white/10 bg-zinc-950/50 p-6 shadow-2xl backdrop-blur-3xl xl:w-[280px]">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-sm font-black uppercase tracking-widest text-white flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-violet-400" /> Filters
        </h3>
        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-white/5 p-1.5 text-zinc-400 hover:bg-white/10 hover:text-white xl:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        ) : hasFilters ? (
          <button
            type="button"
            onClick={clearAll}
            className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            Clear
          </button>
        ) : null}
      </div>

      <div className="mb-8 relative">
        <div className="absolute -left-2 top-0 h-full w-[2px] bg-gradient-to-b from-violet-500/0 via-violet-500/20 to-transparent" />
        <p className="mb-3 pl-2 text-[10px] font-black uppercase tracking-widest text-zinc-500">
          Target Level
        </p>
        <div className="flex flex-col gap-1.5 pl-2">
          {DIFFICULTIES.map((diff) => (
            <button
              type="button"
              key={diff}
              onClick={() => setDifficulty(diff)}
              className={cn(
                "group relative flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold transition-all duration-200",
                difficulty === diff
                  ? "bg-violet-500/15 text-violet-300 ring-1 ring-inset ring-violet-500/30"
                  : "text-zinc-400 hover:bg-white/5 hover:text-zinc-100",
              )}
            >
              {difficulty === diff && (
                <motion.div
                  layoutId="activeDiff"
                  className="absolute inset-0 rounded-xl bg-violet-500/10"
                />
              )}
              <span className="relative z-10">{diff}</span>
              <span
                className={cn(
                  "relative z-10 rounded-full px-2 py-0.5 text-[10px] font-bold shadow-inner",
                  difficulty === diff
                    ? "bg-violet-500/30 text-violet-200"
                    : "bg-zinc-800/80 text-zinc-500 group-hover:bg-zinc-700",
                )}
              >
                {diff === "All"
                  ? allTracks.length
                  : allTracks.filter((t) => t.difficulty === diff).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="relative">
        <div className="absolute -left-2 top-0 h-full w-[2px] bg-gradient-to-b from-cyan-500/0 via-cyan-500/20 to-transparent" />
        <p className="mb-3 pl-2 text-[10px] font-black uppercase tracking-widest text-zinc-500">
          Subject Area
        </p>
        <div className="flex flex-col gap-1 pl-2">
          {(["All", ...CATEGORIES] as CategoryFilter[]).map((cat) => {
            const count =
              cat === "All"
                ? allTracks.length
                : allTracks.filter((t) => t.category === cat).length;
            const meta =
              cat === "All"
                ? { emoji: "🌌", color: "text-white bg-white/10" }
                : CATEGORY_META[cat];
            const isActive = category === cat;

            return (
              <button
                type="button"
                key={cat}
                onClick={() => setCategory(cat)}
                className={cn(
                  "group flex w-full items-center justify-between rounded-xl p-2 transition-all duration-300",
                  isActive
                    ? "bg-cyan-500/15 ring-1 ring-inset ring-cyan-500/30 shadow-lg"
                    : "hover:bg-white/5",
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-lg text-sm shadow-inner transition-colors",
                      isActive
                        ? "bg-cyan-500/20"
                        : "bg-zinc-800/80 group-hover:bg-zinc-700",
                    )}
                  >
                    {meta?.emoji}
                  </div>
                  <span
                    className={cn(
                      "text-xs font-bold leading-tight",
                      isActive
                        ? "text-cyan-300"
                        : "text-zinc-400 group-hover:text-zinc-200",
                    )}
                  >
                    {cat}
                  </span>
                </div>
                <span
                  className={cn(
                    "rounded-md px-1.5 py-0.5 text-[9px] font-black shadow-inner",
                    isActive
                      ? "bg-cyan-500/30 text-cyan-200"
                      : "bg-zinc-900/80 text-zinc-500 border border-white/5",
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
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
    async function load() {
      try {
        const res = await fetch("/api/courses");
        const json = await res.json();
        setAllTracks(json.tracks || []);
      } catch (e) {
        console.error("Failed to load tracks", e);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  const filtered = useMemo(() => {
    return allTracks.filter((track) => {
      const matchQ =
        track.title.toLowerCase().includes(query.toLowerCase()) ||
        track.description.toLowerCase().includes(query.toLowerCase()) ||
        track.tags.some((t) => t.toLowerCase().includes(query.toLowerCase())) ||
        track.category.toLowerCase().includes(query.toLowerCase());
      const matchD = difficulty === "All" || track.difficulty === difficulty;
      const matchC = category === "All" || track.category === category;
      return matchQ && matchD && matchC;
    });
  }, [allTracks, query, difficulty, category]);

  const hasFilters =
    query.length > 0 || difficulty !== "All" || category !== "All";

  const clearAll = () => {
    setQuery("");
    setDifficulty("All");
    setCategory("All");
  };

  const totalHours = allTracks.reduce<number>(
    (acc, t) => acc + (Number((t as any).duration) || 0),
    0,
  );
  const totalLearners = allTracks.reduce((acc, t) => acc + t.enrolledCount, 0);
  type Stat = { title: string; value: React.ReactNode; icon: any; color: string };
  const stats: Stat[] = [
    {
      title: "Active Courses",
      value: allTracks.length,
      icon: MonitorPlay,
      color: "text-violet-400 bg-violet-500/10 border-violet-500/20",
    },
    {
      title: "Total Hours",
      value: totalHours,
      icon: Clock,
      color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    },
    {
      title: "Developers",
      value: `${(totalLearners / 1000).toFixed(1)}k+`,
      icon: Users,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      title: "Completion Rate",
      value: "94%",
      icon: Zap,
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    },
  ];

  return (
    <main className="min-h-screen bg-zinc-950 font-sans selection:bg-violet-500/30 text-zinc-200 overflow-x-hidden">
      {/* ────────────────── GAMING / GLASS HERO ────────────────── */}
      <div className="relative overflow-hidden border-b border-white/5 pt-24 pb-16 lg:pt-32 lg:pb-24">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/20 via-zinc-950 to-zinc-950" />
        <div className="absolute right-0 top-0 h-[600px] w-[600px] -translate-y-1/2 translate-x-1/3 rounded-full bg-cyan-600/10 blur-[120px]" />
        <div className="absolute left-0 top-0 h-[400px] w-[400px] -translate-x-1/2 translate-y-1/4 rounded-full bg-violet-600/10 blur-[100px]" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxwYXRoIGQ9Ik0wIDAuNWgyMFYwSDB2LjV6bTAgMjBoLjVWMGgtLjV2MjB6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIi8+Cjwvc3ZnPg==')] opacity-30 mask-image:linear-gradient(to_bottom,white,transparent)" />
        <div className="absolute -bottom-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center"
          >
            {/* Left Content */}
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 mb-6 text-xs font-bold uppercase tracking-widest text-violet-300 shadow-[0_0_15px_-3px_#8b5cf6] backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Level Up Your Skills</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-black tracking-tight text-white mb-6 leading-[1.1]">
                Master the <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-violet-400 via-cyan-400 to-emerald-400">
                  Code Universe
                </span>
              </h1>
              <p className="text-lg text-zinc-400 mb-8 max-w-xl leading-relaxed font-medium">
                Unlock elite programming tracks. Gain XP, climb the ranks, and
                build world-class applications alongside thousands of
                developers.
              </p>

              {/* Advanced Search Bar */}
              <div className="relative group max-w-xl mb-6">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-violet-500/20 to-cyan-500/20 opacity-0 blur transition duration-500 group-hover:opacity-100 group-focus-within:opacity-100" />
                <div className="relative flex items-center rounded-2xl border border-white/10 bg-zinc-900/80 p-2 shadow-2xl backdrop-blur-md overflow-hidden">
                  <div className="pl-4 pr-3 text-zinc-500">
                    <Search className="h-5 w-5" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search for Python, React, Web3..."
                    className="w-full bg-transparent py-3 text-sm font-semibold text-white placeholder:text-zinc-600 focus:outline-none"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <div className="hidden sm:flex px-4 py-2 bg-zinc-800 rounded-xl items-center gap-2 cursor-pointer hover:bg-zinc-700 transition-colors mr-1 border border-white/5 shadow-inner">
                    <span className="text-xs font-bold text-zinc-400">⌘K</span>
                  </div>
                </div>
              </div>

              {/* Quick Pills */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-600">
                  Popular:
                </span>
                {["Frontend", "Python", "Cloud"].map((tag) => (
                  <button
                    type="button"
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="rounded-full border border-white/5 bg-white/5 px-3 py-1 text-[11px] font-bold text-zinc-400 transition-all hover:bg-white/10 hover:text-white hover:border-white/10"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Interactive Stats */}
            <div className="hidden lg:flex justify-end relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-violet-600/20 blur-[80px] rounded-full mix-blend-screen" />

              <div className="grid grid-cols-2 gap-4 relative z-10 w-full max-w-md">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                    className="p-5 rounded-3xl border border-white/10 bg-zinc-900/50 backdrop-blur-xl hover:bg-zinc-800/80 transition-all shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1 group"
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center border mb-4 shadow-inner group-hover:scale-110 transition-transform ${stat.color}`}
                    >
                      <stat.icon className="h-5 w-5" />
                    </div>
                    <p className="text-3xl font-black text-white mb-1.5 font-mono">
                      {isLoading ? "..." : stat.value}
                    </p>
                    <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                      {stat.title}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ────────────────── MAIN CONTENT GRID ────────────────── */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px] py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative">
          {/* Mobile Sidebar Back-drop / Drawer */}
          <AnimatePresence>
            {mobileSidebar && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-zinc-950/80 backdrop-blur-sm lg:hidden flex items-end sm:items-center justify-center sm:p-4"
              >
                <motion.div
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "100%", opacity: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="w-full sm:max-w-md h-[85vh] sm:h-auto overflow-hidden bg-zinc-900 rounded-t-3xl sm:rounded-3xl border-t sm:border border-white/10 shadow-3xl flex flex-col pt-2"
                >
                  {/* Handle for drawer */}
                  <div className="w-12 h-1.5 bg-zinc-700 rounded-full mx-auto sm:hidden" />
                  <div className="flex-1 overflow-y-auto p-4">
                    <FilterSidebar
                      allTracks={allTracks}
                      category={category}
                      setCategory={setCategory}
                      difficulty={difficulty}
                      setDifficulty={setDifficulty}
                      hasFilters={hasFilters}
                      clearAll={clearAll}
                      onClose={() => setMobileSidebar(false)}
                    />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Desktop Sidebar (Sticky) */}
          <aside className="hidden lg:block shrink-0 relative">
            <div className="sticky top-24 pt-4 pb-20 max-h-[calc(100vh-6rem)] overflow-y-auto w-[280px]">
              <FilterSidebar
                allTracks={allTracks}
                category={category}
                setCategory={setCategory}
                difficulty={difficulty}
                setDifficulty={setDifficulty}
                hasFilters={hasFilters}
                clearAll={clearAll}
              />
            </div>
          </aside>

          {/* Results Area */}
          <div className="flex-1 w-full min-w-0 pb-24 relative">
            <div className="mb-8 flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-black text-white flex items-center gap-3">
                  <PlayCircle className="h-6 w-6 text-cyan-400" />
                  {hasFilters ? "Search Results" : "Explore Paths"}
                </h2>
                <div className="text-zinc-500 font-semibold text-sm">
                  {isLoading ? (
                    "Loading course catalog..."
                  ) : (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      key={filtered.length}
                    >
                      Showing{" "}
                      <span className="text-cyan-400">{filtered.length}</span>{" "}
                      {filtered.length === 1 ? "course" : "courses"}
                    </motion.span>
                  )}
                </div>
              </div>

              {/* Mobile Filter Toggle */}
              <div className="lg:hidden flex items-center gap-3 relative z-20">
                <Button
                  variant="outline"
                  onClick={() => setMobileSidebar(true)}
                  className="rounded-xl border-white/10 bg-zinc-900/80 hover:bg-zinc-800 text-sm font-bold shadow-xl backdrop-blur-md"
                >
                  <SlidersHorizontal className="mr-2 h-4 w-4 text-violet-400" />
                  Filters
                  {hasFilters && (
                    <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500/20 text-[10px] text-cyan-400 ring-1 ring-cyan-500/30">
                      {(query.length > 0 ? 1 : 0) +
                        (difficulty !== "All" ? 1 : 0) +
                        (category !== "All" ? 1 : 0)}
                    </span>
                  )}
                </Button>
              </div>
            </div>

            {/* Skelton Loader */}
            {isLoading ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, _i) => (
                  <div
                    key={crypto.randomUUID()}
                    className="h-[420px] rounded-[24px] bg-zinc-900/50 backdrop-blur-md animate-pulse border border-white/5 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              /* Empty State */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-12 flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-zinc-900/30 p-16 text-center backdrop-blur-sm"
              >
                <div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white/5 border border-white/10 shadow-2xl">
                  <div className="absolute inset-0 rounded-full border border-violet-500/30 animate-[ping_3s_infinite]" />
                  <Search className="h-10 w-10 text-zinc-500" />
                </div>
                <h3 className="mb-2 text-2xl font-black text-white">
                  No signals found
                </h3>
                <p className="max-w-md text-zinc-400 mb-8 font-medium">
                  We couldn't detect any modules matching your current radar.
                  Adjust your filters or coordinate a broad sweep.
                </p>
                <Button
                  onClick={clearAll}
                  className="rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 px-8 py-6 text-sm font-black text-white hover:from-violet-500 hover:to-cyan-500 shadow-[0_0_20px_-5px_#8b5cf6]"
                >
                  Clear Filters & Rescan
                </Button>
              </motion.div>
            ) : hasFilters ? (
              /* Filtered Grid */
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((track, i) => (
                  <CourseCard key={track.id} track={track} index={i} />
                ))}
              </div>
            ) : (
              /* Grouped Mode */
              <div className="space-y-16">
                {CATEGORIES.map((cat, _groupIdx) => {
                  const items = allTracks.filter((t) => t.category === cat);
                  if (items.length === 0) return null;

                  const meta = CATEGORY_META[cat];
                  return (
                    <motion.div
                      key={cat}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6 }}
                      className="relative"
                    >
                      <div className="mb-6 flex items-end justify-between border-b border-white/5 pb-4">
                        <div className="flex items-center gap-4">
                          <div
                            className={cn(
                              "flex h-12 w-12 items-center justify-center rounded-xl text-2xl shadow-inner border border-white/5",
                              meta.color,
                            )}
                          >
                            {meta.emoji}
                          </div>
                          <div>
                            <h3 className="text-xl font-black text-white tracking-widest uppercase">
                              {cat}
                            </h3>
                            <p className="text-sm font-bold text-zinc-500 mt-0.5">
                              {meta.desc}
                            </p>
                          </div>
                        </div>
                        {items.length > 3 && (
                          <button
                            type="button"
                            onClick={() => setCategory(cat)}
                            className="group flex items-center gap-2 text-xs font-black uppercase tracking-widest text-violet-400 hover:text-violet-300 transition-colors"
                          >
                            Explore All
                            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </button>
                        )}
                      </div>

                      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                        {items.slice(0, 3).map((track, i) => (
                          <CourseCard key={track.id} track={track} index={i} />
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
