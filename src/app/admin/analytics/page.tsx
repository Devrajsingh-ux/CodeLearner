"use client";

import {
  Activity,
  Clock,
  DollarSign,
  Star,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import { ANALYTICS, PLATFORM_STATS, type ChartPoint, type PlatformStat } from "@/data/admin";
import { cn, formatNumber } from "@/lib/utils";

// ─── CSS bar chart ────────────────────────────────────────────────────────────

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
  const max = Math.max(...data.map((d) => d.value));

  if (horizontal) {
    return (
      <div className="space-y-2.5" aria-hidden>
        {data.map((d) => {
          const pct = Math.round((d.value / max) * 100);
          return (
            <div key={d.label} className="flex items-center gap-3">
              <span className="w-24 shrink-0 text-right text-xs text-zinc-400 truncate">
                {d.label}
              </span>
              <div className="flex-1 overflow-hidden rounded-full bg-white/6 h-2.5">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${pct}%`, background: accent }}
                />
              </div>
              <span className="w-16 shrink-0 text-right text-xs tabular-nums text-zinc-400">
                {formatNumber(d.value)}
              </span>
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
            {showValues && (
              <span className="text-[9px] tabular-nums text-zinc-500">
                {formatNumber(d.value)}
              </span>
            )}
            <div
              className="w-full rounded-md transition-all duration-500"
              style={{ height: `${pct}%`, background: accent, opacity: 0.8 }}
            />
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
  change,
}: {
  label: string;
  value: string;
  sub: string;
  icon: React.ElementType;
  accent: string;
  change?: { val: number; trend: "up" | "down" };
}) {
  return (
    <div className="rounded-2xl border border-white/6 bg-zinc-900 p-5">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl"
          style={{ background: `${accent}1a` }}
        >
          <Icon className="h-5 w-5" style={{ color: accent }} />
        </div>
        {change && (
          <div
            className={cn(
              "flex items-center gap-0.5 rounded-full px-2 py-1 text-xs font-semibold",
              change.trend === "up"
                ? "bg-emerald-500/15 text-emerald-400"
                : "bg-red-500/15 text-red-400",
            )}
          >
            {change.trend === "up" ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            {change.val > 0 ? "+" : ""}
            {change.val}%
          </div>
        )}
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="mt-0.5 text-sm font-medium text-zinc-400">{label}</p>
      <p className="mt-0.5 text-xs text-zinc-600">{sub}</p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export default function AdminAnalyticsPage() {
  const revenueStat = PLATFORM_STATS.find((s: PlatformStat) => s.icon === "dollar")!;
  const userStat = PLATFORM_STATS.find((s: PlatformStat) => s.icon === "users")!;
  const activeStat = PLATFORM_STATS.find((s: PlatformStat) => s.icon === "activity")!;
  const completionStat = PLATFORM_STATS.find((s: PlatformStat) => s.icon === "check")!;

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">Analytics</h2>
        <p className="mt-1 text-sm text-zinc-500">
          Platform performance · Feb 24, 2026 · All-time snapshot
        </p>
      </div>

      {/* KPI cards */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Registered Users"
          value={userStat.formatted}
          sub="vs prior period"
          icon={Users}
          accent="#8b5cf6"
          change={{ val: userStat.change, trend: userStat.trend as "up" | "down" }}
        />
        <MetricCard
          label="Mock MRR"
          value={`$${formatNumber(ANALYTICS.mrrMock)}`}
          sub="Monthly recurring revenue"
          icon={DollarSign}
          accent="#f97316"
          change={{ val: revenueStat.change, trend: revenueStat.trend as "up" | "down" }}
        />
        <MetricCard
          label="Daily Active Users"
          value={activeStat.formatted}
          sub="Last 24 hours"
          icon={Activity}
          accent="#f59e0b"
          change={{ val: activeStat.change, trend: activeStat.trend as "up" | "down" }}
        />
        <MetricCard
          label="Completions / Day"
          value={completionStat.formatted}
          sub="Lessons finished"
          icon={Star}
          accent="#10b981"
          change={{ val: completionStat.change, trend: completionStat.trend as "up" | "down" }}
        />
      </section>

      {/* Secondary KPIs */}
      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/6 bg-zinc-900 p-5 text-center">
          <p className="text-3xl font-bold text-violet-400">{ANALYTICS.retentionRate}%</p>
          <p className="mt-1 text-sm text-zinc-400">30-day Retention Rate</p>
          <p className="mt-0.5 text-xs text-zinc-600">Users returning after first week</p>
        </div>
        <div className="rounded-2xl border border-white/6 bg-zinc-900 p-5 text-center">
          <p className="text-3xl font-bold text-sky-400">{ANALYTICS.avgSessionMin}m</p>
          <p className="mt-1 text-sm text-zinc-400">Avg Session Length</p>
          <p className="mt-0.5 text-xs text-zinc-600">Minutes per active session</p>
        </div>
        <div className="rounded-2xl border border-white/6 bg-zinc-900 p-5 text-center">
          <p className="text-3xl font-bold text-emerald-400">
            ${formatNumber(ANALYTICS.totalRevenueMock)}
          </p>
          <p className="mt-1 text-sm text-zinc-400">Total Revenue (Mock)</p>
          <p className="mt-0.5 text-xs text-zinc-600">All-time gross revenue</p>
        </div>
      </section>

      {/* Charts row */}
      <section className="grid gap-6 lg:grid-cols-2">
        {/* User growth chart */}
        <div className="rounded-2xl border border-white/6 bg-zinc-900 p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-white">User Growth</p>
              <p className="text-xs text-zinc-500">Monthly registered users (Aug–Feb)</p>
            </div>
            <div className="flex items-center gap-1.5">
              <TrendingUp className="h-4 w-4 text-emerald-400" />
              <span className="text-xs font-semibold text-emerald-400">+44k</span>
            </div>
          </div>
          <BarChart
            data={ANALYTICS.userGrowth}
            accent="#8b5cf6"
            showValues
          />
        </div>

        {/* Daily lessons chart */}
        <div className="rounded-2xl border border-white/6 bg-zinc-900 p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-white">Lesson Completions</p>
              <p className="text-xs text-zinc-500">Current week by day</p>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-sky-400" />
              <span className="text-xs font-semibold text-sky-400">
                {formatNumber(
                  ANALYTICS.dailyLessons.reduce((a: number, d: ChartPoint) => a + d.value, 0),
                )}{" "}
                this week
              </span>
            </div>
          </div>
          <BarChart
            data={ANALYTICS.dailyLessons}
            accent="#06b6d4"
            showValues
          />
        </div>
      </section>

      {/* Enrollments by category + Top courses */}
      <section className="grid gap-6 lg:grid-cols-5">
        {/* Enrollments by category — 3 cols */}
        <div className="lg:col-span-3 rounded-2xl border border-white/6 bg-zinc-900 p-5">
          <div className="mb-5">
            <p className="text-sm font-semibold text-white">Enrollments by Category</p>
            <p className="text-xs text-zinc-500">Total enrollments across all tracks</p>
          </div>
          <BarChart
            data={ANALYTICS.enrollmentsByCategory}
            accent="#10b981"
            horizontal
          />
        </div>

        {/* Top courses — 2 cols */}
        <div className="lg:col-span-2 rounded-2xl border border-white/6 bg-zinc-900 p-5">
          <div className="mb-5">
            <p className="text-sm font-semibold text-white">Top 5 Courses</p>
            <p className="text-xs text-zinc-500">By total enrollments</p>
          </div>
          <ol className="space-y-3">
            {ANALYTICS.topCourses.map((course: { title: string; enrollments: number; rating: number }, i: number) => {
              const max = ANALYTICS.topCourses[0].enrollments;
              const pct = Math.round((course.enrollments / max) * 100);
              return (
                <li key={course.title} className="flex items-center gap-3">
                  <span className="w-4 shrink-0 text-xs font-bold text-zinc-600">
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-medium text-zinc-200">
                      {course.title}
                    </p>
                    <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-white/6">
                      <div
                        className="h-full rounded-full bg-violet-500 transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-xs tabular-nums text-zinc-300">
                      {formatNumber(course.enrollments)}
                    </p>
                    <div className="flex items-center justify-end gap-0.5">
                      <Star className="h-2.5 w-2.5 fill-amber-400 text-amber-400" />
                      <span className="text-[10px] text-zinc-500">
                        {course.rating}
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>
    </div>
  );
}
