"use client";

import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock,
  Flame,
  Play,
  Star,
  Target,
  TrendingUp,
  Trophy,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { getTechColor, TechIcon } from "@/components/ui/TechIcon";
import { useAuth } from "@/context/AuthContext";
import { tracks } from "@/data/courses";
import { formatNumber } from "@/lib/utils";

const ENROLLED_TRACK_IDS = ["1", "14", "32"];
const MOCK_PROGRESS: Record<string, number> = { "1": 68, "14": 32, "32": 15 };
const MOCK_STREAK = 7;
const MOCK_XP = 3420;
const MOCK_LEVEL = 6;
const XP_TO_NEXT = MOCK_LEVEL * MOCK_LEVEL * 100 + 100;

const STAT_CONFIG = [
  {
    icon: Flame,
    label: "Day Streak",
    getValue: () => `${MOCK_STREAK}`,
    accent: "#f59e0b",
  },
  {
    icon: Trophy,
    label: "Total XP",
    getValue: () => formatNumber(MOCK_XP),
    accent: "#8b5cf6",
  },
  {
    icon: Zap,
    label: "Current Level",
    getValue: () => `${MOCK_LEVEL}`,
    accent: "#06b6d4",
  },
  {
    icon: BookOpen,
    label: "Courses",
    getValue: () => `${ENROLLED_TRACK_IDS.length}`,
    accent: "#10b981",
  },
];

const DAILY_GOALS = [
  { label: "Complete 1 lesson", done: true },
  { label: "Earn 50 XP", done: true },
  { label: "Practice exercise", done: false },
];

const WEEK_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) router.replace("/login");
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-violet-500 border-t-transparent" />
          <p className="text-sm text-zinc-500">Loading your dashboard…</p>
        </div>
      </div>
    );
  }

  const enrolledTracks = tracks.filter((t) =>
    ENROLLED_TRACK_IDS.includes(t.id),
  );
  const recommended = tracks
    .filter((t) => !ENROLLED_TRACK_IDS.includes(t.id))
    .slice(0, 4);
  const firstName = user.name.split(" ")[0];

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* ── Ambient background glows ─────────────────────────── */}
      <div
        className="pointer-events-none fixed inset-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute -top-40 left-1/4 h-112 w-md rounded-full bg-violet-600/10 blur-3xl" />
        <div className="absolute top-1/3 right-10 h-72 w-72 rounded-full bg-indigo-600/8 blur-3xl" />
      </div>

      <main className="relative mx-auto max-w-7xl px-4 pt-24 pb-24 sm:px-6 lg:px-8">
        {/* ── Greeting ─────────────────────────────────────────── */}
        <section className="mb-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              {/* Avatar with soft glow ring */}
              <div className="relative shrink-0">
                <div className="absolute inset-0 rounded-full bg-violet-500/30 blur-md" />
                <Avatar
                  initials={user.avatar ?? user.name.slice(0, 2).toUpperCase()}
                  size="lg"
                  className="relative"
                />
              </div>
              <div>
                <p className="text-sm text-zinc-500 mb-0.5">
                  Good to see you again
                </p>
                <h1 className="text-2xl font-bold text-white sm:text-3xl">
                  Hey, {firstName} 👋
                </h1>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-400">
                    <Flame className="h-3 w-3" />
                    {MOCK_STREAK}-day streak
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-violet-500/20 bg-violet-500/10 px-2.5 py-0.5 text-xs font-medium text-violet-400">
                    <Star className="h-3 w-3" />
                    Level {MOCK_LEVEL}
                  </span>
                </div>
              </div>
            </div>

            <Link href="/learn">
              <Button size="md" rightIcon={<ArrowRight className="h-4 w-4" />}>
                Explore Courses
              </Button>
            </Link>
          </div>
        </section>

        {/* ── Stats ────────────────────────────────────────────── */}
        <section className="mb-10">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STAT_CONFIG.map(({ icon: Icon, label, getValue, accent }) => (
              <div
                key={label}
                className="group relative overflow-hidden rounded-2xl border border-white/6 bg-white/3 p-5 transition-all duration-300 hover:border-white/10 hover:bg-white/5"
              >
                {/* per-card radial glow on hover */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle at 0% 0%, ${accent}18 0%, transparent 60%)`,
                  }}
                />
                <div className="relative">
                  <div
                    className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{
                      background: `${accent}18`,
                      boxShadow: `0 0 20px 0 ${accent}20`,
                    }}
                  >
                    <Icon className="h-5 w-5" style={{ color: accent }} />
                  </div>
                  <p className="text-2xl font-bold text-white tabular-nums">
                    {getValue()}
                  </p>
                  <p className="mt-0.5 text-xs text-zinc-500">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Main grid ────────────────────────────────────────── */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left — 2 cols */}
          <div className="lg:col-span-2 space-y-6">
            {/* Continue Learning */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-base font-semibold text-white">
                  Continue Learning
                </h2>
                <Link
                  href="/learn"
                  className="flex items-center gap-1 text-xs text-zinc-500 transition-colors hover:text-violet-400"
                >
                  View all <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="space-y-3">
                {enrolledTracks.map((track, idx) => {
                  const pct = MOCK_PROGRESS[track.id] ?? 0;
                  const techColor = getTechColor(track.slug);
                  const lessonsCompleted = Math.round(
                    (pct / 100) * track.lessonsCount,
                  );
                  const isPrimary = idx === 0;

                  return (
                    <Link
                      key={track.id}
                      href={`/learn/${track.slug}`}
                      className="block group"
                    >
                      <div
                        className={[
                          "relative overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-0.5",
                          isPrimary
                            ? "border-violet-500/25 bg-white/4 hover:border-violet-500/40 hover:shadow-xl hover:shadow-violet-500/10"
                            : "border-white/6 bg-white/3 hover:border-white/12 hover:shadow-xl hover:shadow-black/30",
                        ].join(" ")}
                      >
                        {/* Coloured left stripe */}
                        <div
                          className="absolute left-0 top-0 h-full w-0.75 rounded-l-2xl"
                          style={{
                            background: `linear-gradient(to bottom, ${techColor}cc, transparent)`,
                          }}
                        />

                        <div className="flex items-center gap-4 p-5">
                          {/* Tech icon */}
                          <div
                            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/8 bg-zinc-900/80"
                            style={{ boxShadow: `0 0 20px 0 ${techColor}28` }}
                          >
                            <TechIcon slug={track.slug} size={26} />
                          </div>

                          {/* Meta */}
                          <div className="flex-1 min-w-0">
                            <div className="mb-2 flex items-start justify-between gap-2">
                              <div>
                                <p className="font-semibold leading-tight text-white">
                                  {track.title}
                                </p>
                                <p className="mt-0.5 flex items-center gap-1 text-xs text-zinc-500">
                                  <Clock className="h-3 w-3" />
                                  {lessonsCompleted} / {track.lessonsCount}{" "}
                                  lessons
                                </p>
                              </div>
                              <span
                                className="shrink-0 text-sm font-semibold tabular-nums"
                                style={{ color: techColor }}
                              >
                                {pct}%
                              </span>
                            </div>
                            <ProgressBar value={pct} color="violet" size="sm" />
                          </div>

                          {/* Play button */}
                          <div className="ml-2 shrink-0">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/8 bg-white/5 text-zinc-400 transition-all duration-200 group-hover:border-violet-500/40 group-hover:bg-violet-500/20 group-hover:text-violet-400">
                              <Play className="h-3.5 w-3.5 translate-x-px" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Daily Goals */}
            <div className="rounded-2xl border border-white/6 bg-white/3 p-5">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-cyan-400" />
                  <span className="text-sm font-semibold text-white">
                    Today's Goals
                  </span>
                </div>
                <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2 py-0.5 text-xs font-medium text-cyan-400">
                  {DAILY_GOALS.filter((g) => g.done).length} /{" "}
                  {DAILY_GOALS.length}
                </span>
              </div>

              <div className="space-y-3">
                {DAILY_GOALS.map((goal) => (
                  <div key={goal.label} className="flex items-center gap-3">
                    <CheckCircle2
                      className={`h-4 w-4 shrink-0 transition-colors ${
                        goal.done ? "text-emerald-400" : "text-zinc-700"
                      }`}
                    />
                    <span
                      className={`text-sm ${
                        goal.done
                          ? "text-zinc-500 line-through"
                          : "text-zinc-300"
                      }`}
                    >
                      {goal.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right sidebar — 1 col */}
          <div className="space-y-5">
            {/* XP / Level card */}
            <div className="relative overflow-hidden rounded-2xl border border-violet-500/20 bg-linear-to-br from-violet-900/20 to-indigo-900/10 p-5">
              <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 translate-x-12 -translate-y-12 rounded-full bg-violet-600/15 blur-2xl" />
              <div className="relative">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-xs font-medium text-zinc-400">
                    Level Progress
                  </span>
                  <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-2 py-0.5 text-xs font-semibold text-violet-400">
                    Lv. {MOCK_LEVEL}
                  </span>
                </div>
                <div className="mb-3 flex items-end gap-1">
                  <span className="text-3xl font-bold text-white tabular-nums">
                    {formatNumber(MOCK_XP)}
                  </span>
                  <span className="mb-1 text-sm text-zinc-500">
                    / {formatNumber(XP_TO_NEXT)} XP
                  </span>
                </div>
                <ProgressBar
                  value={MOCK_XP}
                  max={XP_TO_NEXT}
                  color="violet"
                  size="md"
                />
                <p className="mt-2 text-xs text-zinc-500">
                  <span className="font-medium text-violet-400">
                    {formatNumber(XP_TO_NEXT - MOCK_XP)} XP
                  </span>{" "}
                  to Level {MOCK_LEVEL + 1}
                </p>
              </div>
            </div>

            {/* Recommended */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-sm font-semibold text-white">
                  <TrendingUp className="h-4 w-4 text-violet-400" />
                  Recommended
                </h2>
                <Link
                  href="/learn"
                  className="text-xs text-zinc-500 transition-colors hover:text-violet-400"
                >
                  See all
                </Link>
              </div>

              <div className="space-y-2">
                {recommended.map((track) => (
                  <Link
                    key={track.id}
                    href={`/learn/${track.slug}`}
                    className="block group"
                  >
                    <div className="flex items-center gap-3 rounded-xl border border-white/6 bg-white/3 p-3 transition-all duration-200 hover:border-white/12 hover:bg-white/5">
                      <div
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/8 bg-zinc-900"
                        style={{
                          boxShadow: `0 0 14px 0 ${getTechColor(track.slug)}28`,
                        }}
                      >
                        <TechIcon slug={track.slug} size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-xs font-medium text-white">
                          {track.title}
                        </p>
                        <div className="mt-0.5 flex items-center gap-1.5">
                          <span
                            className={[
                              "rounded-full px-1.5 py-0.5 text-[10px] font-medium",
                              track.difficulty === "Beginner"
                                ? "bg-emerald-500/10 text-emerald-400"
                                : track.difficulty === "Advanced"
                                  ? "bg-amber-500/10 text-amber-400"
                                  : "bg-cyan-500/10 text-cyan-400",
                            ].join(" ")}
                          >
                            {track.difficulty}
                          </span>
                          <span className="text-[10px] text-zinc-600">
                            {track.duration}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="h-3.5 w-3.5 shrink-0 text-zinc-700 transition-colors group-hover:text-zinc-400" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Weekly Activity */}
            <div className="rounded-2xl border border-white/6 bg-white/3 p-5">
              <h3 className="mb-4 text-sm font-semibold text-white">
                This Week
              </h3>
              <div className="grid grid-cols-7 gap-1.5">
                {WEEK_DAYS.map((day, i) => {
                  const active = i < 5;
                  const today = i === 4;
                  return (
                    <div
                      key={day}
                      className="flex flex-col items-center gap-1.5"
                    >
                      <div
                        className={[
                          "h-8 w-full rounded-lg transition-all",
                          today
                            ? "bg-violet-500 shadow-md shadow-violet-500/30"
                            : active
                              ? "bg-violet-500/30"
                              : "bg-white/5",
                        ].join(" ")}
                      />
                      <span className="text-[9px] font-medium text-zinc-600">
                        {day}
                      </span>
                    </div>
                  );
                })}
              </div>
              <p className="mt-3 text-xs text-zinc-500">
                <span className="font-medium text-white">5 days</span> active —
                great work!
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
