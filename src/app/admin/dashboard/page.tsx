"use client";

import {
  BookOpen,
  Database,
  Flag,
  RefreshCw,
  Star,
  TrendingDown,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn, formatNumber } from "@/lib/utils";

// ── Types ─────────────────────────────────────────────────────────────────────

interface TopCourse {
  id: string;
  title: string;
  category: string;
  difficulty: string;
  enrolledCount: number;
  completionRate: number;
  rating: number;
}

interface ActivityItem {
  id: string;
  type: string;
  user: string;
  avatar: string;
  description: string;
  timestamp: string;
  meta?: string;
}

interface DashStats {
  totalUsers   : number;
  totalCourses : number;
  totalLessons : number;
  topCourses   : TopCourse[];
  activity     : ActivityItem[];
  error?       : string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

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

// ── Stat card ─────────────────────────────────────────────────────────────────

function StatCard({
  label, value, icon: Icon, accent,
}: {
  label: string; value: string; icon: React.ElementType; accent: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/6 bg-zinc-900 p-5 transition-all duration-200 hover:border-white/10">
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `radial-gradient(circle at 0% 0%, ${accent}20 0%, transparent 55%)` }}
      />
      <div className="relative">
        <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl"
          style={{ background: `${accent}1a` }}>
          <Icon className="h-5 w-5" style={{ color: accent }} />
        </div>
        <p className="text-2xl font-bold tabular-nums text-white">{value}</p>
        <p className="mt-0.5 text-xs text-zinc-500">{label}</p>
      </div>
    </div>
  );
}

function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-xl bg-white/5", className)} />;
}

// ─────────────────────────────────────────────────────────────────────────────

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadStats() {
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/stats", { credentials: "same-origin" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data.error) setError(`Appwrite error: ${data.error}. Check APPWRITE_API_KEY in .env.local`);
      setStats(data);
    } catch (e: any) {
      setError(e.message ?? "Failed to load stats");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => { loadStats(); }, []);

  const statCards = [
    { label: "Total Users",   value: stats ? formatNumber(stats.totalUsers)  : "—", icon: Users,    accent: "#8b5cf6" },
    { label: "Live Courses",  value: stats ? String(stats.totalCourses)       : "—", icon: BookOpen, accent: "#06b6d4" },
    { label: "Total Lessons", value: stats ? formatNumber(stats.totalLessons) : "—", icon: Zap,      accent: "#10b981" },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6">
      {/* ── Header ──────────────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Platform Overview</h2>
          <p className="mt-1 text-sm text-zinc-500">Live data from Appwrite</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            title="Run database setup (creates collections if missing)"
            onClick={async () => {
              try {
                const r = await fetch("/api/admin/setup", { credentials: "same-origin" });
                const d = await r.json();
                alert(d.log?.join("\n") ?? "Setup done");
                loadStats();
              } catch { alert("Setup failed"); }
            }}
            className="flex items-center gap-1.5 rounded-xl border border-white/8 bg-zinc-900 px-3 py-2 text-xs text-zinc-400 transition-colors hover:border-violet-500/30 hover:text-violet-400"
          >
            <Database className="h-3.5 w-3.5" /> Setup DB
          </button>
          <button
            type="button"
            onClick={loadStats}
            className="flex items-center gap-1.5 rounded-xl border border-white/8 bg-zinc-900 px-3 py-2 text-xs text-zinc-400 transition-colors hover:border-white/20 hover:text-white"
          >
            <RefreshCw className={cn("h-3.5 w-3.5", isLoading && "animate-spin")} /> Refresh
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</div>
      )}

      {/* ── Stats grid ─────────────────────────────────────────── */}
      <section aria-label="Platform statistics">
        <div className="grid gap-4 sm:grid-cols-3">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-32 rounded-2xl" />)
            : statCards.map((s) => <StatCard key={s.label} {...s} />)}
        </div>
      </section>

      {/* ── Bottom grid: top courses + activity ─────────────────── */}
      <section className="grid gap-6 lg:grid-cols-5">
        {/* Top Courses — 3 cols */}
        <div className="lg:col-span-3 rounded-2xl border border-white/6 bg-zinc-900 p-5">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-semibold text-white">Top Courses</p>
            <Link href="/admin/courses" className="text-xs text-violet-400 hover:text-violet-300 transition-colors">Manage →</Link>
          </div>
          {isLoading ? (
            <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-14" />)}</div>
          ) : !stats?.topCourses.length ? (
            <div className="flex flex-col items-center justify-center py-10 gap-2 text-zinc-600">
              <BookOpen className="h-8 w-8 opacity-30" />
              <p className="text-sm">No published courses yet.</p>
              <Link href="/admin/courses" className="text-xs text-violet-400 hover:underline">Add courses →</Link>
            </div>
          ) : (
            <div className="space-y-3">
              {stats.topCourses.map((course, i) => (
                <div key={course.id} className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/2 px-4 py-3">
                  <span className="w-5 shrink-0 text-xs font-bold text-zinc-600">{i + 1}</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-zinc-200">{course.title}</p>
                    <p className="text-xs text-zinc-500">{course.category} · {course.difficulty}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-sm font-semibold text-white">{formatNumber(course.enrolledCount)}</p>
                    {course.rating > 0 && (
                      <div className="flex items-center justify-end gap-0.5">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        <span className="text-xs text-zinc-400">{course.rating}</span>
                      </div>
                    )}
                  </div>
                  <div className="ml-2 shrink-0">
                    <div className="h-1.5 w-20 overflow-hidden rounded-full bg-white/8">
                      <div className="h-full rounded-full bg-violet-500" style={{ width: `${course.completionRate}%` }} />
                    </div>
                    <p className="mt-0.5 text-right text-[10px] text-zinc-600">{course.completionRate}% done</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Activity feed — 2 cols */}
        <div className="lg:col-span-2 rounded-2xl border border-white/6 bg-zinc-900 p-5">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-semibold text-white">Recent Registrations</p>
            <Link href="/admin/users" className="text-xs text-violet-400 hover:text-violet-300 transition-colors">Users →</Link>
          </div>
          {isLoading ? (
            <div className="space-y-3">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-10" />)}</div>
          ) : !stats?.activity.length ? (
            <p className="py-8 text-center text-sm text-zinc-600">No registrations yet.</p>
          ) : (
            <ol className="space-y-3" aria-label="Recent activity">
              {stats.activity.map((item) => (
                <li key={item.id} className="flex items-start gap-2.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-[10px] font-bold text-violet-300">
                    {item.avatar}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs text-zinc-300">
                      <span className="font-medium text-white">{item.user}</span> — {item.description}
                    </p>
                    <div className="mt-0.5 flex items-center gap-1.5">
                      <ActivityDot type={item.type} />
                      <span className="text-[10px] text-zinc-600">{relativeTime(item.timestamp)}</span>
                      {item.meta && (
                        <>
                          <span className="text-zinc-700">·</span>
                          <span className="text-[10px] text-zinc-500">{item.meta}</span>
                        </>
                      )}
                      {item.type === "report" && <Flag className="ml-0.5 h-2.5 w-2.5 text-red-400" />}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </div>
      </section>

      {/* ── Quick links ─────────────────────────────────────────── */}
      <section>
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-600">Quick Actions</p>
        <div className="flex flex-wrap gap-3">
          {[
            { href: "/admin/users",     label: "Manage Users",      color: "border-violet-500/30 text-violet-300 hover:bg-violet-500/10" },
            { href: "/admin/courses",   label: "Manage Courses",    color: "border-sky-500/30 text-sky-300 hover:bg-sky-500/10" },
            { href: "/admin/lessons",   label: "Manage Lessons",    color: "border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10" },
            { href: "/admin/analytics", label: "View Analytics",    color: "border-amber-500/30 text-amber-300 hover:bg-amber-500/10" },
            { href: "/admin/settings",  label: "Platform Settings", color: "border-zinc-500/30 text-zinc-300 hover:bg-zinc-500/10" },
          ].map(({ href, label, color }) => (
            <Link key={href} href={href} className={cn("rounded-xl border px-4 py-2 text-sm font-medium transition-colors", color)}>
              {label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
