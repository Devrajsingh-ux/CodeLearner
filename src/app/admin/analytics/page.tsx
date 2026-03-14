"use client";

import {
  Activity,
  BookOpen,
  RefreshCw,
  Star,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { cn, formatNumber } from "@/lib/utils";

// ── Types ─────────────────────────────────────────────────────────────────────

interface TopCourse {
  id: string;
  title: string;
  enrolledCount: number;
  completionRate: number;
  rating: number;
}

interface StatsData {
  totalUsers   : number;
  totalCourses : number;
  totalLessons : number;
  topCourses   : TopCourse[];
}

// ─── CSS bar chart ────────────────────────────────────────────────────────────

// BarChart kept for future use if chart data becomes available
function BarChart({
  data,
  accent,
  showValues = false,
  horizontal = false,
}: {
  data: { label: string; value: number }[];
  accent: string;
  showValues?: boolean;
  horizontal?: boolean;
}) {
  if (!data.length) return (
    <div className="flex h-40 items-center justify-center text-xs text-zinc-600">
      No historical data yet
    </div>
  );
  const max = Math.max(...data.map((d) => d.value));

  if (horizontal) {
    return (
      <div className="space-y-2.5" aria-hidden>
        {data.map((d) => {
          const pct = Math.round((d.value / max) * 100);
          return (
            <div key={d.label} className="flex items-center gap-3">
              <span className="w-24 shrink-0 text-right text-xs text-zinc-400 truncate">{d.label}</span>
              <div className="flex-1 overflow-hidden rounded-full bg-white/6 h-2.5">
                <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: accent }} />
              </div>
              <span className="w-16 shrink-0 text-right text-xs tabular-nums text-zinc-400">{formatNumber(d.value)}</span>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex h-40 items-end gap-2" aria-hidden>
      {data.map((d) => {
        const pct = Math.round((d.value / max) * 100);
        return (
          <div key={d.label} className="flex flex-1 flex-col items-center gap-1.5">
            {showValues && <span className="text-[9px] tabular-nums text-zinc-500">{formatNumber(d.value)}</span>}
            <div className="w-full rounded-md transition-all duration-500" style={{ height: `${pct}%`, background: accent, opacity: 0.8 }} />
            <span className="text-[10px] text-zinc-600">{d.label}</span>
          </div>
        );
      })}
    </div>
  );
}


// ─── Metric card ──────────────────────────────────────────────────────────────

function MetricCard({
  label,
  value,
  sub,
  icon: Icon,
  accent,
}: {
  label: string;
  value: string;
  sub: string;
  icon: React.ElementType;
  accent: string;
}) {
  return (
    <div className="rounded-2xl border border-white/6 bg-zinc-900 p-5">
      <div className="mb-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl"
          style={{ background: `${accent}1a` }}
        >
          <Icon className="h-5 w-5" style={{ color: accent }} />
        </div>
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="mt-0.5 text-sm font-medium text-zinc-400">{label}</p>
      <p className="mt-0.5 text-xs text-zinc-600">{sub}</p>
    </div>
  );
}

function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-xl bg-white/5", className)} />;
}

// ─────────────────────────────────────────────────────────────────────────────

export default function AdminAnalyticsPage() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadStats() {
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/stats", { credentials: "same-origin" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStats(await res.json());
    } catch (e: any) {
      setError(e.message ?? "Failed to load stats");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => { loadStats(); }, []);

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Analytics</h2>
          <p className="mt-1 text-sm text-zinc-500">Live platform metrics from Appwrite</p>
        </div>
        <button
          type="button"
          onClick={loadStats}
          className="flex items-center gap-1.5 rounded-xl border border-white/8 bg-zinc-900 px-3 py-2 text-xs text-zinc-400 transition-colors hover:border-white/20 hover:text-white"
        >
          <RefreshCw className={cn("h-3.5 w-3.5", isLoading && "animate-spin")} /> Refresh
        </button>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</div>
      )}

      {/* KPI cards — real data */}
      <section className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Total Users",   value: stats ? formatNumber(stats.totalUsers)  : "—", sub: "Registered accounts",        icon: Users,    accent: "#8b5cf6" },
          { label: "Live Courses",  value: stats ? String(stats.totalCourses)       : "—", sub: "In Appwrite courses DB",     icon: BookOpen, accent: "#06b6d4" },
          { label: "Total Lessons", value: stats ? formatNumber(stats.totalLessons) : "—", sub: "Lessons across all courses",  icon: Zap,      accent: "#10b981" },
        ].map(({ label, value, sub, icon: Icon, accent }) => (
          isLoading
            ? <Skeleton key={label} className="h-28 rounded-2xl" />
            : <MetricCard key={label} label={label} value={value} sub={sub} icon={Icon} accent={accent} />
        ))}
      </section>

      {/* Top courses by enrollments */}
      <section>
        <div className="rounded-2xl border border-white/6 bg-zinc-900 p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-white">Top Courses by Enrollments</p>
              <p className="text-xs text-zinc-500">Published courses, sorted by enrolled students</p>
            </div>
            {stats?.topCourses[0] && (
              <div className="flex items-center gap-1.5">
                <TrendingUp className="h-4 w-4 text-emerald-400" />
                <span className="text-xs font-semibold text-emerald-400">
                  {formatNumber(stats.topCourses.reduce((s, c) => s + c.enrolledCount, 0))} total
                </span>
              </div>
            )}
          </div>
          {isLoading ? (
            <div className="space-y-3">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-10" />)}</div>
          ) : !stats?.topCourses.length ? (
            <p className="py-10 text-center text-sm text-zinc-600">No published courses with enrollments yet.</p>
          ) : (
            <ol className="space-y-3">
              {stats.topCourses.map((course, i) => {
                const maxEnrolled = stats.topCourses[0].enrolledCount;
                const pct = maxEnrolled > 0 ? Math.round((course.enrolledCount / maxEnrolled) * 100) : 0;
                return (
                  <li key={course.id} className="flex items-center gap-3">
                    <span className="w-4 shrink-0 text-xs font-bold text-zinc-600">{i + 1}</span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-medium text-zinc-200">{course.title}</p>
                      <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-white/6">
                        <div className="h-full rounded-full bg-violet-500 transition-all" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-xs tabular-nums text-zinc-300">{formatNumber(course.enrolledCount)}</p>
                      {course.rating > 0 && (
                        <div className="flex items-center justify-end gap-0.5">
                          <Star className="h-2.5 w-2.5 fill-amber-400 text-amber-400" />
                          <span className="text-[10px] text-zinc-500">{course.rating}</span>
                        </div>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          )}
        </div>
      </section>

      {/* Activity graph placeholder */}
      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/6 bg-zinc-900 p-5">
          <p className="mb-2 text-sm font-semibold text-white">User Growth</p>
          <p className="mb-4 text-xs text-zinc-500">Historical chart — available once time-series data is tracked</p>
          <BarChart data={[]} accent="#8b5cf6" showValues />
        </div>
        <div className="rounded-2xl border border-white/6 bg-zinc-900 p-5">
          <p className="mb-2 text-sm font-semibold text-white">Lesson Completions</p>
          <p className="mb-4 text-xs text-zinc-500">Historical chart — available once completion events are stored</p>
          <BarChart data={[]} accent="#06b6d4" showValues />
        </div>
      </section>
    </div>
  );
}
