"use client";

import {
  ArrowRight,
  Award,
  Brain,
  CheckCircle2,
  ChevronRight,
  Clock,
  Flame,
  Medal,
  Play,
  Radar,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Trophy,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { getTechColor, TechIcon } from "@/components/ui/TechIcon";
import { useAuth } from "@/context/AuthContext";
import { ALL_ACHIEVEMENTS } from "@/data/achievements";
import { cn, formatNumber } from "@/lib/utils";
import type { Track } from "@/types";
import type { Enrollment, DailyActivity, UserStreak } from "@/types";

const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function useCountUp(target: number, duration = 900) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const startAt = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = now - startAt;
      const progress = Math.min(1, elapsed / duration);
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return value;
}

function AnimatedNumber({
  value,
  compact = false,
}: {
  value: number;
  compact?: boolean;
}) {
  const counted = useCountUp(value);
  return <>{compact ? formatNumber(counted) : counted.toLocaleString()}</>;
}

function QuestRing({ completed, total }: { completed: number; total: number }) {
  const ratio = total > 0 ? completed / total : 0;
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const filled = circumference * ratio;

  return (
    <svg
      viewBox="0 0 56 56"
      className="h-14 w-14"
      role="img"
      aria-label={`Daily goals ${Math.round(ratio * 100)} percent completed`}
    >
      <circle
        cx="28"
        cy="28"
        r={radius}
        className="fill-none stroke-white/10"
        strokeWidth="6"
      />
      <circle
        cx="28"
        cy="28"
        r={radius}
        className="fill-none stroke-violet-500 transition-all duration-500"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={`${filled} ${circumference - filled}`}
        transform="rotate(-90 28 28)"
      />
      <text
        x="28"
        y="31"
        textAnchor="middle"
        className="fill-white text-[10px] font-semibold"
      >
        {Math.round(ratio * 100)}%
      </text>
    </svg>
  );
}

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const [isHydrated, setIsHydrated] = useState(false);
  const [catalog, setCatalog] = useState<Track[]>([]);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [enrollmentsLoading, setEnrollmentsLoading] = useState(true);
  const [activityData, setActivityData] = useState<{
    activities: DailyActivity[];
    streak: UserStreak | null;
    stats: { xpThisWeek: number; minutesToday: number };
  } | null>(null);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [leaderboardLoading, setLeaderboardLoading] = useState(true);
  const [questData, setQuestData] = useState<{
    quests: any[];
    stats: { completed: number; total: number; xpEarned: number; date: string };
  } | null>(null);
  const [questsLoading, setQuestsLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && !user) router.replace("/");
  }, [isLoading, router, user]);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadCourses() {
      setCoursesLoading(true);
      try {
        const res = await fetch("/api/courses", { cache: "no-store" });
        const json = await res.json();
        if (!cancelled && res.ok) {
          setCatalog(Array.isArray(json.courses) ? json.courses : []);
        }
      } catch {
        if (!cancelled) setCatalog([]);
      } finally {
        if (!cancelled) setCoursesLoading(false);
      }
    }

    loadCourses();
    return () => {
      cancelled = true;
    };
  }, []);

  // Fetch user enrollments
  useEffect(() => {
    if (!user) return;

    let cancelled = false;

    async function loadEnrollments() {
      setEnrollmentsLoading(true);
      try {
        const res = await fetch("/api/enroll", { cache: "no-store" });
        const json = await res.json();
        if (!cancelled && res.ok) {
          setEnrollments(Array.isArray(json.enrollments) ? json.enrollments : []);
        }
      } catch {
        if (!cancelled) setEnrollments([]);
      } finally {
        if (!cancelled) setEnrollmentsLoading(false);
      }
    }

    loadEnrollments();
    return () => {
      cancelled = true;
    };
  }, [user]);

  // Fetch user activity data
  useEffect(() => {
    if (!user) return;

    let cancelled = false;

    async function loadActivity() {
      try {
        const res = await fetch("/api/activity?days=7", { cache: "no-store" });
        const json = await res.json();
        if (!cancelled && res.ok) {
          setActivityData(json);
        }
      } catch {
        if (!cancelled) setActivityData(null);
      }
    }

    loadActivity();
    return () => {
      cancelled = true;
    };
  }, [user]);

  // Fetch leaderboard data
  useEffect(() => {
    if (!user) return;

    let cancelled = false;

    async function loadLeaderboard() {
      setLeaderboardLoading(true);
      try {
        const res = await fetch("/api/leaderboard", { cache: "no-store" });
        const json = await res.json();
        if (!cancelled && res.ok) {
          setLeaderboard(json.leaderboard || []);
        }
      } catch {
        if (!cancelled) setLeaderboard([]);
      } finally {
        if (!cancelled) setLeaderboardLoading(false);
      }
    }

    loadLeaderboard();
    return () => {
      cancelled = true;
    };
  }, [user]);

  // Fetch quest data
  useEffect(() => {
    if (!user) return;

    let cancelled = false;

    async function loadQuests() {
      setQuestsLoading(true);
      try {
        const res = await fetch("/api/quests", { cache: "no-store" });
        const json = await res.json();
        if (!cancelled && res.ok) {
          setQuestData(json);
        }
      } catch {
        if (!cancelled) setQuestData(null);
      } finally {
        if (!cancelled) setQuestsLoading(false);
      }
    }

    loadQuests();
    return () => {
      cancelled = true;
    };
  }, [user]);

  const profile =
    user ??
    ({
      id: "",
      name: "Learner",
      email: "",
      username: "",
      role: "student",
      xp: 0,
      level: 1,
      streak: 0,
    } as const);

  // Left-side dashboard navigation removed per UI request

  const continueTracks = useMemo(() => {
    if (catalog.length === 0 || enrollments.length === 0) return [];

    // Get enrolled courses from catalog
    const enrolled = catalog.filter(course =>
      enrollments.some(e => e.courseId === course.id || e.courseSlug === course.slug)
    );

    // Sort by last accessed date (most recent first)
    return enrolled.sort((a, b) => {
      const enrollA = enrollments.find(e => e.courseId === a.id || e.courseSlug === a.slug);
      const enrollB = enrollments.find(e => e.courseId === b.id || e.courseSlug === b.slug);

      if (!enrollA || !enrollB) return 0;

      return new Date(enrollB.lastAccessedAt).getTime() - new Date(enrollA.lastAccessedAt).getTime();
    }).slice(0, 4);
  }, [catalog, enrollments]);

  const recommendedTracks = useMemo(() => {
    if (catalog.length === 0) return [];
    return [...catalog]
      .sort(
        (a, b) =>
          (b.rating || 0) - (a.rating || 0) ||
          (b.enrolledCount || 0) - (a.enrolledCount || 0),
      )
      .slice(0, 8);
  }, [catalog]);

  const progressByCourse = useMemo(() => {
    const map = new Map<string, number>();

    enrollments.forEach((enrollment) => {
      // Set progress for both courseId and courseSlug to handle different lookup keys
      map.set(enrollment.courseId, enrollment.percentComplete || 0);
      if (enrollment.courseSlug) {
        map.set(enrollment.courseSlug, enrollment.percentComplete || 0);
      }
    });

    return map;
  }, [enrollments]);

  const completedCourses = continueTracks.filter(
    (track) => (progressByCourse.get(track.id) ?? 0) >= 90,
  ).length;

  // Use real activity data instead of fake calculations
  const problemsSolved = useMemo(() => {
    if (!activityData) return 0;
    return activityData.activities.reduce((sum, activity) => sum + (activity.problemsSolved || 0), 0);
  }, [activityData]);

  const realXpToday = activityData && activityData.stats.minutesToday > 0 ?
    activityData.activities
      .filter(a => a.date === new Date().toISOString().split('T')[0])
      .reduce((sum, activity) => sum + (activity.xpEarned || 0), 0) : 0;

  const realXpThisWeek = activityData?.stats.xpThisWeek || 0;

  const minutesToday = activityData?.stats.minutesToday || 0;

  // Use real quest data instead of mock questState
  const dailyQuest = questData ? {
    completed: questData.stats.completed,
    total: questData.stats.total,
    xp: questData.stats.xpEarned,
  } : {
    completed: 0,
    total: 3, // Default to 3 quests if no data
    xp: 0,
  };

  const firstName = profile.name.split(" ")[0] || "Coder";
  const xpToNext = profile.level * 100; // Simplified: 100 XP per level

  // Use real streak from activity data if available
  const realStreak = activityData?.streak?.currentStreak ?? profile.streak;

  const statCards = [
    {
      icon: Flame,
      label: "Streak",
      value: realStreak,
      suffix: "days",
      accent: "#f59e0b",
    },
    {
      icon: Trophy,
      label: "Total XP",
      value: profile.xp,
      suffix: "xp",
      accent: "#8b5cf6",
    },
    {
      icon: Zap,
      label: "Level",
      value: profile.level,
      suffix: "",
      accent: "#06b6d4",
    },
    {
      icon: Award,
      label: "Courses Completed",
      value: completedCourses,
      suffix: "",
      accent: "#10b981",
    },
    {
      icon: Brain,
      label: "Problems Solved",
      value: problemsSolved,
      suffix: "",
      accent: "#38bdf8",
    },
  ];

  // Create heatmap from real activity data
  const heatmapValues = useMemo(() => {
    if (!activityData) {
      return WEEK_DAYS.map(() => 0); // All empty if no data
    }

    const today = new Date();
    const activities = activityData.activities;

    return WEEK_DAYS.map((_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() - (6 - i)); // Go back to get the date for this day
      const dateString = date.toISOString().split('T')[0];

      const dayActivity = activities.find(activity => activity.date === dateString);
      if (!dayActivity) return 0;

      // Calculate intensity based on XP earned that day
      const xp = dayActivity.xpEarned || 0;
      if (xp >= 60) return 6; // Very active
      if (xp >= 40) return 4; // Active
      if (xp >= 20) return 2; // Somewhat active
      if (xp > 0) return 1; // Minimal activity
      return 0; // No activity
    });
  }, [activityData]);

  const achievementContext = {
    xp: profile.xp,
    level: profile.level,
    streak: realStreak,
    enrolledCoursesCount: continueTracks.length,
    completedLessonsCount: continueTracks.reduce((acc, track) => {
      const enrollment = enrollments.find(e => e.courseId === track.id || e.courseSlug === track.slug);
      return acc + (enrollment?.completedLessons || 0);
    }, 0),
    solvedProblemsCount: problemsSolved,
    hasGithub: false,
    hasTwitter: false,
    hasLinkedin: false,
  };

  const achievements = ALL_ACHIEVEMENTS.map((item) => ({
    ...item,
    earned: item.isEarned(achievementContext),
  }));
  const recentBadges = achievements.filter((a) => a.earned).slice(0, 3);
  const lockedBadges = achievements.filter((a) => !a.earned).slice(0, 4);

  if (isLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-violet-500 border-t-transparent" />
          <p className="text-sm text-zinc-500">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div
        className="pointer-events-none fixed inset-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute -top-32 left-20 h-[26rem] w-[26rem] rounded-full bg-violet-500/12 blur-3xl" />
        <div className="absolute top-1/3 right-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-amber-500/8 blur-3xl" />
      </div>

      <main className="relative mx-auto max-w-[1500px] px-4 pb-20 pt-24 sm:px-6 lg:px-8">
        {/* Left navigation removed — no mobile nav button */}

        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left navigation removed — main content expands to full width on large screens */}

          {/* Mobile nav removed */}

          <div className="space-y-6 lg:col-span-12 xl:col-span-12">
            <section
              className={cn(
                "rounded-3xl border border-violet-500/20 bg-linear-to-br from-white/7 to-white/3 p-5 backdrop-blur-xl sm:p-6",
                "transition-all duration-700",
                isHydrated
                  ? "translate-y-0 opacity-100"
                  : "translate-y-2 opacity-0",
              )}
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-violet-500/40 blur-lg" />
                    <Avatar
                      initials={
                        user.avatar ?? user.name.slice(0, 2).toUpperCase()
                      }
                      size="xl"
                      className="relative ring-violet-400/40"
                    />
                  </div>

                  <div>
                    <p className="text-sm text-zinc-400">
                      Welcome back, keep the streak alive
                    </p>
                    <h1 className="text-2xl font-bold sm:text-3xl">
                      Hey {firstName}
                    </h1>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/25 bg-amber-500/12 px-2.5 py-1 text-xs font-semibold text-amber-300 animate-[pulse_2.4s_ease-in-out_infinite]">
                        <Flame className="h-3.5 w-3.5" /> {realStreak}-day
                        streak
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full border border-violet-500/25 bg-violet-500/12 px-2.5 py-1 text-xs font-semibold text-violet-300">
                        <Medal className="h-3.5 w-3.5" /> Tier{" "}
                        {Math.max(1, Math.ceil(user.level / 3))}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    href={
                      continueTracks[0]
                        ? `/learn/${continueTracks[0].slug}`
                        : "/learn"
                    }
                  >
                    <Button size="md" leftIcon={<Play className="h-4 w-4" />}>
                      Continue
                    </Button>
                  </Link>
                  <Link href="/learn">
                    <Button
                      size="md"
                      variant="secondary"
                      rightIcon={<ArrowRight className="h-4 w-4" />}
                    >
                      Explore
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="mb-1 text-xs uppercase tracking-wide text-zinc-500">
                    Level progress
                  </p>
                  <p className="mb-2 text-lg font-semibold">
                    <AnimatedNumber value={user.xp} compact /> /{" "}
                    {formatNumber(xpToNext)} XP
                  </p>
                  <ProgressBar value={user.xp} max={xpToNext} color="violet" />
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="mb-1 text-xs uppercase tracking-wide text-zinc-500">
                    XP today
                  </p>
                  <p className="text-lg font-semibold text-cyan-300">
                    +{formatNumber(realXpToday)} XP
                  </p>
                  <p className="mt-2 text-xs text-zinc-500">
                    Weekly gain: {formatNumber(realXpThisWeek)} XP
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="mb-1 text-xs uppercase tracking-wide text-zinc-500">
                    Daily quests
                  </p>
                  <p className="text-lg font-semibold text-amber-300">
                    {dailyQuest.completed}/{dailyQuest.total} done
                  </p>
                  <p className="mt-2 text-xs text-zinc-500">
                    Earned today: +{dailyQuest.xp} XP
                  </p>
                </div>
              </div>
            </section>

            <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
              {statCards.map(
                ({ icon: Icon, label, value, suffix, accent }, idx) => (
                  <div
                    key={label}
                    className={cn(
                      "group relative overflow-hidden rounded-2xl border border-white/8 bg-white/4 p-4 backdrop-blur-sm",
                      "transition-all duration-300 hover:-translate-y-0.5 hover:border-white/15",
                      isHydrated
                        ? "translate-y-0 opacity-100"
                        : "translate-y-2 opacity-0",
                    )}
                    style={{ transitionDelay: `${80 + idx * 70}ms` }}
                  >
                    <div
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{
                        background: `radial-gradient(circle at 0% 0%, ${accent}20 0%, transparent 60%)`,
                      }}
                    />

                    <div className="relative">
                      <div
                        className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl"
                        style={{ background: `${accent}1f` }}
                      >
                        <Icon className="h-5 w-5" style={{ color: accent }} />
                      </div>
                      <p className="text-xl font-bold tabular-nums text-white">
                        <AnimatedNumber value={value} compact />
                        <span className="ml-1 text-sm text-zinc-400">
                          {suffix}
                        </span>
                      </p>
                      <p className="text-xs text-zinc-500">{label}</p>
                    </div>
                  </div>
                ),
              )}
            </section>

            <div className="grid gap-6 lg:grid-cols-3">
              <div className="space-y-6 lg:col-span-2">
                <section className="rounded-3xl border border-white/10 bg-white/4 p-5 sm:p-6">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <h2 className="text-lg font-semibold">Continue Learning</h2>
                    <Link
                      href="/learn"
                      className="inline-flex items-center gap-1 text-xs text-zinc-400 hover:text-violet-300"
                    >
                      View all <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>

                  {coursesLoading || enrollmentsLoading ? (
                    <div className="space-y-3">
                      {["a", "b", "c"].map((skeletonId) => (
                        <div
                          key={skeletonId}
                          className="h-24 animate-pulse rounded-2xl border border-white/8 bg-white/5"
                        />
                      ))}
                    </div>
                  ) : continueTracks.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-violet-500/30 bg-violet-500/8 p-6 text-center">
                      <Sparkles className="mx-auto mb-3 h-8 w-8 text-violet-300" />
                      <p className="text-base font-semibold">
                        Start your learning journey
                      </p>
                      <p className="mt-1 text-sm text-zinc-400">
                        Pick your first track and unlock your personalized
                        dashboard.
                      </p>
                      <Link
                        href="/learn"
                        className="mt-4 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-500"
                      >
                        Explore courses <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  ) : (
                    <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-1 sm:flex-col sm:overflow-visible">
                      {continueTracks.map((track, idx) => {
                        // Try to get progress by course ID first, then by course slug
                        const pct = progressByCourse.get(track.id) ?? progressByCourse.get(track.slug) ?? 0;

                        // Get the actual enrollment to get real lesson completion data
                        const enrollment = enrollments.find(e =>
                          e.courseId === track.id || e.courseSlug === track.slug
                        );

                        const lessonsDone = enrollment?.completedLessons ?? Math.round((pct / 100) * track.lessonsCount);
                        const accent = getTechColor(track.slug);

                        return (
                          <Link
                            key={track.id}
                            href={`/learn/${track.slug}`}
                            className="group block min-w-[18.5rem] sm:min-w-0"
                          >
                            <div className="rounded-2xl border border-white/10 bg-zinc-900/35 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-400/35 hover:shadow-lg hover:shadow-violet-500/10">
                              <div className="mb-3 flex items-center gap-3">
                                <div
                                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-zinc-900"
                                  style={{
                                    boxShadow: `0 0 16px 0 ${accent}30`,
                                  }}
                                >
                                  <TechIcon slug={track.slug} size={22} />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="truncate text-sm font-semibold">
                                    {track.title}
                                  </p>
                                  <p className="text-xs text-zinc-500">
                                    {lessonsDone}/{track.lessonsCount} lessons
                                  </p>
                                </div>
                                <div className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 transition-all group-hover:border-violet-400/40 group-hover:bg-violet-500/20 group-hover:text-violet-200">
                                  <Play className="h-3.5 w-3.5 translate-x-px" />
                                </div>
                              </div>

                              <ProgressBar
                                value={pct}
                                color={idx % 2 === 0 ? "violet" : "cyan"}
                                size="sm"
                              />
                              <div className="mt-1 flex items-center justify-between text-xs text-zinc-500">
                                <span className="inline-flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {track.duration}
                                </span>
                                <span>{pct}% complete</span>
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </section>

                <section className="rounded-3xl border border-white/10 bg-white/4 p-5 sm:p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="inline-flex items-center gap-2 text-lg font-semibold">
                      <Target className="h-4.5 w-4.5 text-cyan-300" /> Daily
                      Goals
                    </h2>
                    <QuestRing
                      completed={dailyQuest.completed}
                      total={dailyQuest.total}
                    />
                  </div>

                  <div className="space-y-2.5">
                    {questsLoading ? (
                      // Loading state
                      Array.from({ length: 3 }).map((_, i) => (
                        <div
                          key={i}
                          className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-zinc-900/35 px-3 py-2.5"
                        >
                          <div className="flex items-center gap-2">
                            <div className="h-4.5 w-4.5 rounded-full bg-zinc-600 animate-pulse" />
                            <div className="h-4 w-32 bg-zinc-600 rounded animate-pulse" />
                          </div>
                          <div className="h-6 w-16 bg-zinc-600 rounded animate-pulse" />
                        </div>
                      ))
                    ) : questData?.quests && questData.quests.length > 0 ? (
                      questData.quests.map((quest) => (
                        <div
                          key={quest.id}
                          className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-zinc-900/35 px-3 py-2.5"
                        >
                          <span className="flex items-center gap-2 text-sm">
                            {quest.completed ? (
                              <CheckCircle2 className="h-4.5 w-4.5 text-emerald-400" />
                            ) : (
                              <span className="inline-block h-4.5 w-4.5 rounded-full border border-zinc-600" />
                            )}
                            <span
                              className={
                                quest.completed
                                  ? "text-zinc-300 line-through"
                                  : "text-zinc-100"
                              }
                            >
                              {quest.label}
                            </span>
                          </span>
                          <span className="rounded-full border border-violet-500/25 bg-violet-500/12 px-2 py-0.5 text-xs font-semibold text-violet-300">
                            +{quest.xp} XP
                          </span>
                        </div>
                      ))
                    ) : (
                      // No quest data available
                      <div className="text-center text-zinc-400 text-sm py-4">
                        No daily quests available
                      </div>
                    )}
                  </div>
                </section>

                <section className="rounded-3xl border border-white/10 bg-white/4 p-5 sm:p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="inline-flex items-center gap-2 text-lg font-semibold">
                      <TrendingUp className="h-4.5 w-4.5 text-cyan-300" />{" "}
                      Recommended Courses
                    </h2>
                    <Link
                      href="/learn"
                      className="text-xs text-zinc-400 hover:text-violet-300"
                    >
                      See all
                    </Link>
                  </div>

                  <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-1">
                    {recommendedTracks.length === 0 ? (
                      <div className="w-full rounded-2xl border border-dashed border-white/15 bg-zinc-900/30 p-5 text-sm text-zinc-500">
                        Recommendations will appear after exploring a few
                        tracks.
                      </div>
                    ) : (
                      recommendedTracks.map((track) => (
                        <Link
                          key={track.id}
                          href={`/learn/${track.slug}`}
                          className="block min-w-[15.5rem]"
                        >
                          <div className="rounded-2xl border border-white/10 bg-zinc-900/35 p-3.5 transition hover:border-white/20">
                            <div className="mb-2 flex items-center gap-2">
                              <TechIcon slug={track.slug} size={18} />
                              <p className="truncate text-sm font-medium">
                                {track.title}
                              </p>
                            </div>
                            <div className="mb-2 flex items-center gap-1.5 text-[11px]">
                              <span
                                className={cn(
                                  "rounded-full px-2 py-0.5",
                                  track.difficulty === "Beginner"
                                    ? "bg-emerald-500/15 text-emerald-300"
                                    : track.difficulty === "Advanced"
                                      ? "bg-amber-500/15 text-amber-300"
                                      : "bg-cyan-500/15 text-cyan-300",
                                )}
                              >
                                {track.difficulty}
                              </span>
                              <span className="text-zinc-500">
                                {track.duration}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-amber-300">
                              <Star className="h-3.5 w-3.5 fill-current" />{" "}
                              {track.rating || 4.8}
                            </div>
                          </div>
                        </Link>
                      ))
                    )}
                  </div>
                </section>
              </div>

              <div className="space-y-6">
                <section className="rounded-3xl border border-violet-500/20 bg-linear-to-br from-violet-900/20 to-cyan-900/10 p-5">
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-300">
                    XP and Level
                  </h3>
                  <div className="mb-3 flex items-end gap-2">
                    <span className="text-3xl font-bold tabular-nums text-white">
                      {formatNumber(user.xp)}
                    </span>
                    <span className="mb-1 text-sm text-zinc-400">
                      / {formatNumber(xpToNext)} XP
                    </span>
                  </div>
                  <ProgressBar
                    value={user.xp}
                    max={xpToNext}
                    color="violet"
                    size="md"
                  />
                  <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="rounded-xl border border-white/10 bg-black/20 px-2 py-1.5">
                      <p className="text-zinc-500">Today</p>
                      <p className="font-semibold text-cyan-300">+{realXpToday}</p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-black/20 px-2 py-1.5">
                      <p className="text-zinc-500">Week</p>
                      <p className="font-semibold text-violet-300">+{realXpThisWeek}</p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-black/20 px-2 py-1.5">
                      <p className="text-zinc-500">To next</p>
                      <p className="font-semibold text-amber-300">
                        {Math.max(0, xpToNext - user.xp)}
                      </p>
                    </div>
                  </div>
                </section>

                <section className="rounded-3xl border border-white/10 bg-white/4 p-5">
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-300">
                    Weekly Activity
                  </h3>
                  <div className="grid grid-cols-7 gap-1.5">
                    {WEEK_DAYS.map((day, i) => {
                      const intensity = heatmapValues[i];
                      const blockClass =
                        intensity >= 6
                          ? "bg-violet-500"
                          : intensity >= 4
                            ? "bg-violet-500/75"
                            : intensity >= 2
                              ? "bg-violet-500/45"
                              : intensity > 0
                                ? "bg-violet-500/25"
                                : "bg-white/6";

                      return (
                        <div key={day} className="text-center">
                          <div
                            className={cn(
                              "h-8 rounded-lg transition hover:scale-105",
                              blockClass,
                            )}
                          />
                          <p className="mt-1 text-[10px] text-zinc-500">
                            {day}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                  <p className="mt-3 text-xs text-zinc-500">
                    Today: {minutesToday} mins learned
                  </p>
                </section>

                <section className="rounded-3xl border border-white/10 bg-white/4 p-5">
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-300">
                    Achievements
                  </h3>

                  <div className="mb-3 space-y-2">
                    {recentBadges.length === 0 ? (
                      <p className="text-xs text-zinc-500">
                        No badges yet. Complete quests to unlock your first one.
                      </p>
                    ) : (
                      recentBadges.map((badge) => {
                        const Icon = badge.icon;
                        return (
                          <div
                            key={badge.id}
                            className="flex items-center gap-2 rounded-xl border border-white/10 bg-zinc-900/35 px-2.5 py-2"
                          >
                            <div
                              className="inline-flex h-8 w-8 items-center justify-center rounded-lg"
                              style={{
                                background: `${badge.color}22`,
                                boxShadow: `0 0 20px 0 ${badge.color}2f`,
                              }}
                            >
                              <Icon
                                className="h-4 w-4"
                                style={{ color: badge.color }}
                              />
                            </div>
                            <div className="min-w-0">
                              <p className="truncate text-xs font-semibold text-zinc-100">
                                {badge.title}
                              </p>
                              <p className="text-[11px] text-zinc-500">
                                +{badge.xpReward} XP
                              </p>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {lockedBadges.map((badge) => {
                      const Icon = badge.icon;
                      return (
                        <div
                          key={badge.id}
                          className="flex flex-col items-center rounded-xl border border-white/8 bg-zinc-900/20 px-2 py-2.5 opacity-50"
                        >
                          <Icon className="h-4 w-4 text-zinc-500" />
                          <p className="mt-1 text-center text-[10px] text-zinc-500">
                            {badge.title}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </section>

                <section className="rounded-3xl border border-white/10 bg-white/4 p-5">
                  <h3 className="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-zinc-300">
                    <Radar className="h-4 w-4 text-cyan-300" /> Leaderboard
                  </h3>
                  <div className="space-y-2">
                    {leaderboardLoading ? (
                      <>
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className="h-10 animate-pulse rounded-xl border border-white/8 bg-white/5"
                          />
                        ))}
                      </>
                    ) : leaderboard.length === 0 ? (
                      <p className="text-xs text-zinc-500 text-center py-4">
                        No leaderboard data available yet.
                      </p>
                    ) : (
                      leaderboard.map((entry) => (
                        <div
                          key={entry.rank}
                          className="flex items-center justify-between rounded-xl border border-white/8 bg-zinc-900/30 px-3 py-2 text-sm"
                        >
                          <span
                            className={cn(
                              "font-medium",
                              entry.name === profile.name
                                ? "text-violet-300"
                                : "text-zinc-300",
                            )}
                          >
                            #{entry.rank} {entry.name}
                          </span>
                          <span className="text-xs text-zinc-500">
                            {formatNumber(entry.xp)} XP
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
