import {
  ArrowRight,
  Code2,
  ExternalLink,
  Flame,
  Github,
  Globe,
  MessageCircle,
  Star,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community — Zentax",
  description:
    "Connect with 285K+ developers, ask questions, share your projects, and level up together.",
};

const CHANNELS = [
  {
    icon: MessageCircle,
    name: "Discord server",
    description:
      "Our primary hub — 28 topic channels, daily office hours, job board, and showcase rooms. 40 000+ members.",
    cta: "Join Discord",
    href: "https://discord.gg/zentax",
    color: "text-indigo-400",
    bg: "from-indigo-500/15 to-violet-500/15 border-indigo-500/25",
  },
  {
    icon: Github,
    name: "GitHub",
    description:
      "Open-source exercise repo with 2 400+ hands-on problems. File issues, submit PRs, or start a discussion.",
    cta: "View on GitHub",
    href: "https://github.com/zentax-io",
    color: "text-zinc-200",
    bg: "from-zinc-700/20 to-zinc-800/20 border-zinc-600/25",
  },
  {
    icon: Globe,
    name: "Community Forum",
    description:
      "Long-form discussions, project showcases, learning challenges, and monthly Q&As with our curriculum team.",
    cta: "Browse forum",
    href: "/forum",
    color: "text-cyan-400",
    bg: "from-cyan-500/15 to-teal-500/15 border-cyan-500/25",
  },
];

const STATS = [
  { icon: Users, value: "285K+", label: "Active members", color: "#8b5cf6" },
  {
    icon: MessageCircle,
    value: "1.2M+",
    label: "Messages this month",
    color: "#06b6d4",
  },
  { icon: Code2, value: "18K+", label: "Projects shared", color: "#10b981" },
  { icon: Star, value: "97%", label: "Questions answered", color: "#f59e0b" },
];

const TOP_CONTRIBUTORS = [
  {
    name: "Adrian K.",
    initials: "AK",
    gradient: "from-violet-500 to-indigo-600",
    role: "JavaScript · 1 240 XP this month",
    badge: "Top helper",
  },
  {
    name: "Lin Wei",
    initials: "LW",
    gradient: "from-cyan-500 to-blue-600",
    role: "Python · 980 XP this month",
    badge: "Problem solver",
  },
  {
    name: "Chioma N.",
    initials: "CN",
    gradient: "from-emerald-500 to-teal-600",
    role: "React · 870 XP this month",
    badge: "Mentor",
  },
  {
    name: "Erik D.",
    initials: "ED",
    gradient: "from-pink-500 to-rose-600",
    role: "Rust · 820 XP this month",
    badge: "Open source",
  },
  {
    name: "Yui T.",
    initials: "YT",
    gradient: "from-amber-500 to-orange-600",
    role: "Go · 760 XP this month",
    badge: "Streak king",
  },
  {
    name: "Fatima A.",
    initials: "FA",
    gradient: "from-fuchsia-500 to-purple-700",
    role: "TypeScript · 690 XP this month",
    badge: "Code reviewer",
  },
];

const EVENTS = [
  {
    title: "Weekly JavaScript challenge",
    date: "Every Sunday · 11:00 UTC",
    description:
      "A new algorithm puzzle drops every Sunday. Top 3 solutions get featured in the newsletter.",
  },
  {
    title: "Office Hours: Ask the curriculum team",
    date: "Every Wednesday · 18:00 UTC",
    description:
      "Live 60-minute session on Discord where you can ask our course authors anything.",
  },
  {
    title: "Monthly project showcase",
    date: "Last Friday of month",
    description:
      "Share what you've built. Community votes on the top three. Winners get Pro subscriptions.",
  },
];

export default function CommunityPage() {
  return (
    <main className="min-h-screen bg-zinc-950 pb-24">
      {/* ── Ambient ─────────────────────────────────────────── */}
      <div
        className="pointer-events-none fixed inset-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute -top-40 left-1/2 h-160 w-160 -translate-x-1/2 rounded-full bg-violet-600/8 blur-[130px]" />
      </div>

      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-20 text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-300">
            <Users className="h-3.5 w-3.5" />
            Community
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl">
            Learn together,{" "}
            <span className="bg-linear-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              grow faster
            </span>
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-zinc-400">
            Join 285 000 developers who help each other debug sticky problems,
            share projects, and celebrate milestones. No gatekeeping, no
            elitism.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Stats ───────────────────────────────────────── */}
        <section className="mb-16 grid grid-cols-2 gap-4 rounded-2xl border border-white/8 bg-white/3 p-8 md:grid-cols-4">
          {STATS.map(({ icon: Icon, value, label, color }) => (
            <div key={label} className="text-center">
              <Icon className="mx-auto mb-2 h-5 w-5" style={{ color }} />
              <p className="text-2xl font-extrabold text-white">{value}</p>
              <p className="mt-0.5 text-xs text-zinc-500">{label}</p>
            </div>
          ))}
        </section>

        {/* ── Channels ──────────────────────────────────── */}
        <section className="mb-16">
          <h2 className="mb-8 text-2xl font-bold text-white">
            Where to find us
          </h2>
          <div className="grid gap-5 lg:grid-cols-3">
            {CHANNELS.map(
              ({ icon: Icon, name, description, cta, href, color, bg }) => (
                <div
                  key={name}
                  className={`group flex flex-col rounded-2xl border bg-linear-to-br ${bg} p-7 transition-all duration-300 hover:-translate-y-0.5`}
                >
                  <Icon className={`mb-4 h-7 w-7 ${color}`} />
                  <h3 className="mb-2 font-semibold text-white">{name}</h3>
                  <p className="flex-1 text-sm leading-relaxed text-zinc-400">
                    {description}
                  </p>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-violet-400 transition-colors hover:text-violet-300"
                  >
                    {cta} <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              ),
            )}
          </div>
        </section>

        {/* ── Top contributors ─────────────────────────── */}
        <section className="mb-16">
          <div className="mb-8 flex items-center gap-3">
            <Trophy className="h-5 w-5 text-amber-400" />
            <h2 className="text-2xl font-bold text-white">
              Top contributors this month
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TOP_CONTRIBUTORS.map(
              ({ name, initials, gradient, role, badge }) => (
                <div
                  key={name}
                  className="flex items-center gap-4 rounded-2xl border border-white/8 bg-white/3 p-4 transition-all hover:border-violet-500/25"
                >
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br ${gradient} text-sm font-bold text-white`}
                  >
                    {initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white">{name}</p>
                    <p className="truncate text-xs text-zinc-500">{role}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-amber-400">
                    {badge}
                  </span>
                </div>
              ),
            )}
          </div>
        </section>

        {/* ── Events ───────────────────────────────────── */}
        <section className="mb-16">
          <div className="mb-8 flex items-center gap-3">
            <Flame className="h-5 w-5 text-orange-400" />
            <h2 className="text-2xl font-bold text-white">Recurring events</h2>
          </div>
          <div className="space-y-4">
            {EVENTS.map(({ title, date, description }) => (
              <div
                key={title}
                className="flex flex-col gap-1 rounded-2xl border border-white/8 bg-white/3 p-6 sm:flex-row sm:items-start sm:gap-6 transition-all hover:border-violet-500/25"
              >
                <div className="flex-1">
                  <p className="font-semibold text-white">{title}</p>
                  <p className="mt-0.5 text-xs font-medium text-violet-400">
                    {date}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                    {description}
                  </p>
                </div>
                <a
                  href="https://discord.gg/zentax"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-xl border border-violet-500/30 bg-violet-500/10 px-3.5 py-2 text-xs font-semibold text-violet-300 transition-colors hover:bg-violet-500/20"
                >
                  <Zap className="h-3 w-3" /> Join event
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* ── Join CTA ─────────────────────────────────── */}
        <section>
          <div className="rounded-3xl border border-violet-500/20 bg-linear-to-br from-violet-500/10 via-transparent to-indigo-500/10 p-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-white">
              Ready to join the community?
            </h2>
            <p className="mb-8 text-zinc-400">
              Create a free account and introduce yourself in #welcome-channel.
              We have strict no-jerk guidelines and a fantastic moderation team.
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a
                href="/register"
                className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-violet-600 to-indigo-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:from-violet-500 hover:to-indigo-500"
              >
                <Users className="h-4 w-4" /> Create free account
              </a>
              <a
                href="https://discord.gg/zentax"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-7 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
              >
                <MessageCircle className="h-4 w-4" /> Join Discord first
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
