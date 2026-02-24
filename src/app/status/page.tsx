import {
  Activity,
  Bell,
  CheckCircle2,
  Clock,
  Minus,
  XCircle,
} from "lucide-react";
import type { Metadata } from "next";
import { SubscribeForm } from "@/components/status/SubscribeForm";

export const metadata: Metadata = {
  title: "System Status — CodeLearn",
  description: "Live operational status for all CodeLearn services.",
};

type ServiceStatus = "operational" | "degraded" | "partial" | "outage";

interface Service {
  name: string;
  description: string;
  status: ServiceStatus;
}

interface Incident {
  id: string;
  title: string;
  date: string;
  severity: "none" | "minor" | "major" | "critical";
  resolved: boolean;
  updates: Array<{ time: string; body: string }>;
}

const SERVICES: Service[] = [
  {
    name: "Web application",
    description: "codelearn.io — main learner interface",
    status: "operational",
  },
  {
    name: "Code execution engine",
    description: "In-browser sandboxed runner (Node.js, Python, Go, Rust)",
    status: "operational",
  },
  {
    name: "Authentication service",
    description: "Login, registration, OAuth providers",
    status: "operational",
  },
  {
    name: "API (REST & GraphQL)",
    description: "Progress sync, course data, user profile",
    status: "operational",
  },
  {
    name: "CDN & static assets",
    description: "Images, videos, course media via Cloudflare",
    status: "operational",
  },
  {
    name: "Database cluster",
    description: "PostgreSQL primary + read replicas",
    status: "operational",
  },
  {
    name: "Search",
    description: "Course catalog & forum search",
    status: "operational",
  },
  {
    name: "Notification service",
    description: "Email, in-app notifications, digest",
    status: "operational",
  },
];

const PAST_INCIDENTS: Incident[] = [
  {
    id: "inc-003",
    title: "Elevated error rates on code execution engine",
    date: "Feb 14, 2026",
    severity: "minor",
    resolved: true,
    updates: [
      {
        time: "14:23 UTC",
        body: "Resolved. A stale container pool was recycled. All executions are running normally. P99 latency back to 190 ms.",
      },
      {
        time: "13:58 UTC",
        body: "Identified root cause: container pool exhaustion following an unexpected traffic spike. Remediation in progress.",
      },
      {
        time: "13:41 UTC",
        body: "Investigating elevated 502 errors on the code execution endpoint. Authentication and content are unaffected.",
      },
    ],
  },
  {
    id: "inc-002",
    title: "Partial CDN outage — APAC region",
    date: "Jan 30, 2026",
    severity: "minor",
    resolved: true,
    updates: [
      {
        time: "09:04 UTC",
        body: "Cloudflare confirmed resolution. All regions reporting normal cache-hit rates.",
      },
      {
        time: "08:18 UTC",
        body: "Cloudflare engineers are working on the issue. Learners in APAC may see slower media load times.",
      },
    ],
  },
  {
    id: "inc-001",
    title: "Database read-replica lag spike",
    date: "Jan 11, 2026",
    severity: "none",
    resolved: true,
    updates: [
      {
        time: "22:31 UTC",
        body: "Replication lag back to normal (< 100 ms). No data loss reported.",
      },
      {
        time: "22:17 UTC",
        body: "Read replica falling behind primary by up to 8 s. Dashboard progress reads may show stale data temporarily.",
      },
    ],
  },
];

const UPTIME_MONTHS = [
  { month: "Sep", pct: 100.0 },
  { month: "Oct", pct: 99.98 },
  { month: "Nov", pct: 100.0 },
  { month: "Dec", pct: 99.95 },
  { month: "Jan", pct: 99.99 },
  { month: "Feb", pct: 100.0 },
];

const STATUS_CONFIG: Record<
  ServiceStatus,
  { label: string; color: string; dot: string; icon: typeof CheckCircle2 }
> = {
  operational: {
    label: "Operational",
    color: "text-emerald-400",
    dot: "bg-emerald-500",
    icon: CheckCircle2,
  },
  degraded: {
    label: "Degraded performance",
    color: "text-amber-400",
    dot: "bg-amber-500",
    icon: Minus,
  },
  partial: {
    label: "Partial outage",
    color: "text-orange-400",
    dot: "bg-orange-500",
    icon: Minus,
  },
  outage: {
    label: "Major outage",
    color: "text-red-400",
    dot: "bg-red-500",
    icon: XCircle,
  },
};

const SEVERITY_BADGE: Record<
  Incident["severity"],
  { label: string; classes: string }
> = {
  none: {
    label: "Informational",
    classes: "bg-zinc-700/50 text-zinc-400 border-zinc-600/30",
  },
  minor: {
    label: "Minor",
    classes: "bg-amber-500/10 text-amber-400 border-amber-500/25",
  },
  major: {
    label: "Major",
    classes: "bg-orange-500/10 text-orange-400 border-orange-500/25",
  },
  critical: {
    label: "Critical",
    classes: "bg-red-500/10 text-red-400 border-red-500/25",
  },
};

const allOperational = SERVICES.every((s) => s.status === "operational");

export default function StatusPage() {
  return (
    <main className="min-h-screen bg-zinc-950 pb-24">
      {/* ── Ambient ─────────────────────────────────────────── */}
      <div
        className="pointer-events-none fixed inset-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute -top-40 left-1/2 h-144 w-xl -translate-x-1/2 rounded-full bg-violet-600/8 blur-[120px]" />
      </div>

      {/* ── Header ──────────────────────────────────────────── */}
      <section className="relative pt-28 pb-16 text-center">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-300">
            <Activity className="h-3.5 w-3.5" />
            System status
          </div>

          {allOperational ? (
            <>
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10">
                <CheckCircle2 className="h-8 w-8 text-emerald-400" />
              </div>
              <h1 className="text-4xl font-extrabold text-white">
                All systems operational
              </h1>
              <p className="mt-3 text-zinc-500">
                No active incidents. Last checked now.
              </p>
            </>
          ) : (
            <>
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/10">
                <Minus className="h-8 w-8 text-amber-400" />
              </div>
              <h1 className="text-4xl font-extrabold text-white">
                Investigating an issue
              </h1>
              <p className="mt-3 text-zinc-500">
                Our team has been notified and is actively investigating.
              </p>
            </>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* ── Uptime overview ───────────────────────────── */}
        <section className="mb-12 rounded-2xl border border-white/8 bg-white/3 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-white">90-day uptime</h2>
            <span className="text-sm font-semibold text-emerald-400">
              99.99% avg
            </span>
          </div>
          <div className="flex items-end gap-1.5">
            {UPTIME_MONTHS.map(({ month, pct }) => (
              <div
                key={month}
                className="flex flex-1 flex-col items-center gap-1.5"
              >
                <div
                  className={`w-full rounded-sm ${pct >= 99.99 ? "bg-emerald-500" : pct >= 99.9 ? "bg-amber-500" : "bg-red-500"}`}
                  style={{ height: `${(pct / 100) * 48 + 4}px` }}
                  title={`${pct}%`}
                />
                <span className="text-[10px] text-zinc-600">{month}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Services list ──────────────────────────────── */}
        <section className="mb-12">
          <h2 className="mb-5 text-xl font-bold text-white">Services</h2>
          <div className="divide-y divide-white/6 rounded-2xl border border-white/8 bg-white/3">
            {SERVICES.map((service) => {
              const cfg = STATUS_CONFIG[service.status];
              const Icon = cfg.icon;
              return (
                <div
                  key={service.name}
                  className="flex items-center justify-between px-6 py-4"
                >
                  <div>
                    <p className="text-sm font-medium text-white">
                      {service.name}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {service.description}
                    </p>
                  </div>
                  <div
                    className={`flex items-center gap-1.5 text-xs font-semibold ${cfg.color}`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {cfg.label}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Past incidents ─────────────────────────────── */}
        <section className="mb-12">
          <h2 className="mb-5 text-xl font-bold text-white">Past incidents</h2>
          <div className="space-y-5">
            {PAST_INCIDENTS.map((inc) => {
              const severity = SEVERITY_BADGE[inc.severity];
              return (
                <div
                  key={inc.id}
                  className="rounded-2xl border border-white/8 bg-white/3 p-6"
                >
                  <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-white">{inc.title}</p>
                      <p className="mt-0.5 text-xs text-zinc-500">{inc.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${severity.classes}`}
                      >
                        {severity.label}
                      </span>
                      {inc.resolved && (
                        <span className="flex items-center gap-1 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400">
                          <CheckCircle2 className="h-3 w-3" /> Resolved
                        </span>
                      )}
                    </div>
                  </div>
                  <ol className="relative border-l border-white/8 pl-6 space-y-4">
                    {inc.updates.map((u) => (
                      <li key={u.time} className="relative">
                        <span className="absolute -left-6.25 mt-1 flex h-3 w-3 items-center justify-center rounded-full border border-white/15 bg-zinc-900">
                          <span className="h-1.5 w-1.5 rounded-full bg-zinc-500" />
                        </span>
                        <div className="flex items-center gap-2 mb-1">
                          <Clock className="h-3 w-3 text-zinc-500" />
                          <span className="text-xs font-medium text-zinc-400">
                            {u.time}
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed text-zinc-400">
                          {u.body}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Subscribe ──────────────────────────────────── */}
        <section className="rounded-3xl border border-violet-500/20 bg-linear-to-br from-violet-500/10 via-transparent to-indigo-500/10 p-10 text-center">
          <Bell className="mx-auto mb-4 h-9 w-9 text-violet-400" />
          <h2 className="mb-3 text-2xl font-bold text-white">
            Get incident notifications
          </h2>
          <p className="mb-6 text-zinc-400">
            Subscribe via email for real-time updates whenever we publish or
            update an incident.
          </p>
          <SubscribeForm />
        </section>
      </div>
    </main>
  );
}
