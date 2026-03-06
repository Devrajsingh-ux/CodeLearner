"use client";

import {
  Activity,
  BookOpen,
  CheckCircle2,
  DollarSign,
  Flag,
  Star,
  TrendingDown,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { ADMIN_COURSES, ANALYTICS, PLATFORM_STATS, RECENT_ACTIVITY, type AdminCourse, type ActivityItem, type ChartPoint, type PlatformStat } from "@/data/admin";
import { cn, formatNumber } from "@/lib/utils";

// ── Stat icon map ─────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, React.ElementType> = {
  users: Users,
  book: BookOpen,
  zap: Zap,
  activity: Activity,
  check: CheckCircle2,
  dollar: DollarSign,
};

// ── Activity icon/colour ──────────────────────────────────────────────────────

function ActivityDot({ type }: { type: string }) {
  const map: Record<string, string> = {
    registration: "bg-emerald-500",
    enrollment: "bg-violet-500",
    completion: "bg-sky-500",
    achievement: "bg-amber-500",
    report: "bg-red-500",
  };
  return (
    <span
      className={cn(
        "mt-1.5 h-2 w-2 shrink-0 rounded-full",
        map[type] ?? "bg-zinc-500",
      )}
    />
  );
}

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60_000);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

// ── Mini bar chart (CSS only) ─────────────────────────────────────────────────

function BarChart({
  data,
  accent,
}: {
  data: { label: string; value: number }[];
  accent: string;
}) {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div className="flex h-28 items-end gap-1.5" aria-hidden>
      {data.map((d) => {
        const pct = Math.round((d.value / max) * 100);
        return (
          <div key={d.label} className="flex flex-1 flex-col items-center gap-1">
            <div className="w-full rounded-sm" style={{ height: `${pct}%`, background: accent, opacity: 0.85 }} />
            <span className="text-[9px] text-zinc-600">{d.label}</span>
          </div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export default function AdminDashboardPage() {
  const topCourses = ADMIN_COURSES.filter((c: AdminCourse) => c.status === "published")
    .sort((a: AdminCourse, b: AdminCourse) => b.enrolledCount - a.enrolledCount)
    .slice(0, 5);

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6">
      {/* ── Page intro ─────────────────────────────────────────────── */}
      <div>
        <h2 className="text-2xl font-bold text-white">Platform Overview</h2>
        <p className="mt-1 text-sm text-zinc-500">
          Real-time snapshot of Zentax — Feb 24, 2026
        </p>
      </div>

      {/* ── Stats grid ─────────────────────────────────────────────── */}
      <section aria-label="Platform statistics">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {PLATFORM_STATS.map((stat: PlatformStat) => {
            const Icon = ICON_MAP[stat.icon] ?? Activity;
            return (
              <div
                key={stat.label}
                className="group relative overflow-hidden rounded-2xl border border-white/6 bg-zinc-900 p-5 transition-all duration-200 hover:border-white/10"
              >
                {/* Per-card glow */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle at 0% 0%, ${stat.accent}20 0%, transparent 55%)`,
                  }}
                />
                <div className="relative flex items-start justify-between gap-3">
                  <div>
                    <div
                      className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{ background: `${stat.accent}1a` }}
                    >
                      <Icon className="h-5 w-5" style={{ color: stat.accent }} />
                    </div>
                    <p className="text-2xl font-bold tabular-nums text-white">
                      {stat.formatted}
                    </p>
                    <p className="mt-0.5 text-xs text-zinc-500">{stat.label}</p>
                  </div>
                  <div
                    className={cn(
                      "flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold",
                      stat.trend === "up"
                        ? "bg-emerald-500/15 text-emerald-400"
                        : stat.trend === "down"
                          ? "bg-red-500/15 text-red-400"
                          : "bg-zinc-700 text-zinc-400",
                    )}
                  >
                    {stat.trend === "up" ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : stat.trend === "down" ? (
                      <TrendingDown className="h-3 w-3" />
                    ) : null}
                    {stat.change > 0 ? "+" : ""}
                    {stat.change}%
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Charts row ─────────────────────────────────────────────── */}
      <section className="grid gap-6 lg:grid-cols-2">
        {/* User growth */}
        <div className="rounded-2xl border border-white/6 bg-zinc-900 p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-white">User Growth</p>
              <p className="text-xs text-zinc-500">Last 7 months</p>
            </div>
            <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-semibold text-emerald-400">
              +44k this period
            </span>
          </div>
          <BarChart data={ANALYTICS.userGrowth} accent="#8b5cf6" />
        </div>

        {/* Daily lessons */}
        <div className="rounded-2xl border border-white/6 bg-zinc-900 p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-white">Daily Lessons Completed</p>
              <p className="text-xs text-zinc-500">This week</p>
            </div>
            <span className="rounded-full bg-sky-500/15 px-2.5 py-1 text-xs font-semibold text-sky-400">
              {formatNumber(ANALYTICS.dailyLessons.reduce((a: number, d: ChartPoint) => a + d.value, 0))} total
            </span>
          </div>
          <BarChart data={ANALYTICS.dailyLessons} accent="#06b6d4" />
        </div>
      </section>

      {/* ── Bottom grid: top courses + activity ─────────────────────── */}
      <section className="grid gap-6 lg:grid-cols-5">
        {/* Top Courses — 3 cols */}
        <div className="lg:col-span-3 rounded-2xl border border-white/6 bg-zinc-900 p-5">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-semibold text-white">Top Courses</p>
            <Link
              href="/admin/courses"
              className="text-xs text-violet-400 hover:text-violet-300 transition-colors"
            >
              Manage →
            </Link>
          </div>
          <div className="space-y-3">
            {topCourses.map((course: AdminCourse, i: number) => (
              <div
                key={course.id}
                className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/2 px-4 py-3"
              >
                <span className="w-5 shrink-0 text-xs font-bold text-zinc-600">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-zinc-200">
                    {course.title}
                  </p>
                  <p className="text-xs text-zinc-500">
                    {course.category} · {course.difficulty}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-sm font-semibold text-white">
                    {formatNumber(course.enrolledCount)}
                  </p>
                  <div className="flex items-center justify-end gap-0.5">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    <span className="text-xs text-zinc-400">{course.rating}</span>
                  </div>
                </div>
                <div className="ml-2 shrink-0">
                  <div className="h-1.5 w-20 overflow-hidden rounded-full bg-white/8">
                    <div
                      className="h-full rounded-full bg-violet-500"
                      style={{ width: `${course.completionRate}%` }}
                    />
                  </div>
                  <p className="mt-0.5 text-right text-[10px] text-zinc-600">
                    {course.completionRate}% done
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity feed — 2 cols */}
        <div className="lg:col-span-2 rounded-2xl border border-white/6 bg-zinc-900 p-5">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-semibold text-white">Recent Activity</p>
            <Link
              href="/admin/users"
              className="text-xs text-violet-400 hover:text-violet-300 transition-colors"
            >
              Users →
            </Link>
          </div>
          <ol className="space-y-3" aria-label="Recent platform activity">
            {RECENT_ACTIVITY.map((item: ActivityItem) => (
              <li key={item.id} className="flex items-start gap-2.5">
                {/* Avatar */}
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-[10px] font-bold text-violet-300">
                  {item.avatar}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs text-zinc-300">
                    <span className="font-medium text-white">{item.user}</span>{" "}
                    — {item.description}
                  </p>
                  <div className="mt-0.5 flex items-center gap-1.5">
                    <ActivityDot type={item.type} />
                    <span className="text-[10px] text-zinc-600">
                      {relativeTime(item.timestamp)}
                    </span>
                    {item.meta && (
                      <>
                        <span className="text-zinc-700">·</span>
                        <span className="text-[10px] text-zinc-500">
                          {item.meta}
                        </span>
                      </>
                    )}
                    {item.type === "report" && (
                      <Flag className="ml-0.5 h-2.5 w-2.5 text-red-400" />
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Quick links ─────────────────────────────────────────────── */}
      <section>
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-600">
          Quick Actions
        </p>
        <div className="flex flex-wrap gap-3">
          {[
            { href: "/admin/users", label: "Manage Users", color: "border-violet-500/30 text-violet-300 hover:bg-violet-500/10" },
            { href: "/admin/courses", label: "Manage Courses", color: "border-sky-500/30 text-sky-300 hover:bg-sky-500/10" },
            { href: "/admin/lessons", label: "Manage Lessons", color: "border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10" },
            { href: "/admin/analytics", label: "View Analytics", color: "border-amber-500/30 text-amber-300 hover:bg-amber-500/10" },
            { href: "/admin/settings", label: "Platform Settings", color: "border-zinc-500/30 text-zinc-300 hover:bg-zinc-500/10" },
          ].map(({ href, label, color }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "rounded-xl border px-4 py-2 text-sm font-medium transition-colors",
                color,
              )}
            >
              {label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
