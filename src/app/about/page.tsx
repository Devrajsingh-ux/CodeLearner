import {
  Code2,
  Globe,
  Heart,
  Lightbulb,
  Rocket,
  Shield,
  Users,
  Zap,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — CodeLearn",
  description:
    "Learn about CodeLearn's mission to make world-class coding education accessible to every developer on the planet.",
};

const STATS = [
  { value: "285K+", label: "Active learners" },
  { value: "100+", label: "Course tracks" },
  { value: "4.9★", label: "Average rating" },
  { value: "92%", label: "Completion rate" },
];

const VALUES = [
  {
    icon: Lightbulb,
    title: "Learn by Doing",
    description:
      "Theory without practice is forgotten within days. Every concept on CodeLearn ships with real exercises, projects, and an in-browser code editor so you build muscle memory from day one.",
  },
  {
    icon: Globe,
    title: "Radically Accessible",
    description:
      "Great education shouldn't be locked behind a paywall or require expensive hardware. Our free-forever plan covers the full fundamentals track, on any device, anywhere on earth.",
  },
  {
    icon: Heart,
    title: "Community First",
    description:
      "Learning alone is hard. Our forums, Discord server, and peer code-reviews create the support network that pushes you through the tough chapters and celebrates every milestone.",
  },
  {
    icon: Rocket,
    title: "Always Current",
    description:
      "The web moves fast. Our curriculum team ships updates weekly, retiring outdated patterns and adding new APIs as they land in stable releases, so you never learn yesterday's tech.",
  },
  {
    icon: Shield,
    title: "Quality You Can Trust",
    description:
      "Every lesson is peer-reviewed by industry engineers, technically edited, and A/B-tested for clarity before it ships. No ads, no filler, no fluff — just signal.",
  },
  {
    icon: Users,
    title: "Built With Developers",
    description:
      "Our roadmap is shaped by 285 000 learners who file issues, vote on features, and contribute open-source exercises. What you want built gets built.",
  },
];

const TEAM = [
  {
    name: "Maya Patel",
    role: "Co-founder & CEO",
    gradient: "from-violet-500 to-indigo-600",
    initials: "MP",
    bio: "10 years at Google & Stripe building infrastructure at scale. Quit big-tech to fix coding education.",
  },
  {
    name: "Jordan Lee",
    role: "Co-founder & CTO",
    gradient: "from-cyan-500 to-blue-600",
    initials: "JL",
    bio: "Former Staff Engineer at Vercel. Core contributor to Next.js App Router. Obsessed with DX.",
  },
  {
    name: "Sofia Reyes",
    role: "Head of Curriculum",
    gradient: "from-emerald-500 to-teal-600",
    initials: "SR",
    bio: "CS educator with 8 years building bootcamp curricula. Believes every learner can become a great engineer.",
  },
  {
    name: "Kai Nguyen",
    role: "Head of Design",
    gradient: "from-pink-500 to-rose-600",
    initials: "KN",
    bio: "Design systems veteran from Figma & Linear. Passionate about WCAG accessibility and 60fps UIs.",
  },
  {
    name: "Daniel Osei",
    role: "Lead Backend Engineer",
    gradient: "from-amber-500 to-orange-600",
    initials: "DO",
    bio: "Distributed systems at Cloudflare. Keeps our platform at five nines while nobody sleeps.",
  },
  {
    name: "Priya Sharma",
    role: "Developer Advocate",
    gradient: "from-fuchsia-500 to-purple-700",
    initials: "PS",
    bio: "Open-source maintainer, conference speaker, and the loudest cheerleader for every new learner.",
  },
];

const TIMELINE = [
  {
    year: "2021",
    title: "The idea",
    body: "After watching yet another promising engineer give up on coding because no platform met them where they were, Maya and Jordan sketched CodeLearn on a whiteboard in a San Francisco café.",
  },
  {
    year: "2022",
    title: "Private beta",
    body: "500 hand-picked beta learners validated the in-browser editor and project-based curriculum. NPS hit 78 in week two.",
  },
  {
    year: "2023",
    title: "Public launch",
    body: "CodeLearn opened its doors. 40 000 learners signed up in the first 30 days. The JavaScript track topped Product Hunt.",
  },
  {
    year: "2024",
    title: "Series A & expansion",
    body: "Raised $12M led by a16z. Launched 60 new tracks, mobile app, team plans, and the certificate program.",
  },
  {
    year: "2025",
    title: "285K learners",
    body: "Crossed a quarter-million developers. Opened our open-source exercise repository and shipped the AI code-review assistant.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-zinc-950 pb-24">
      {/* ── Ambient glow ────────────────────────────────────── */}
      <div
        className="pointer-events-none fixed inset-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute -top-40 left-1/2 h-160 w-160 -translate-x-1/2 rounded-full bg-violet-600/10 blur-[120px]" />
        <div className="absolute top-1/2 right-0 h-80 w-80 rounded-full bg-indigo-600/8 blur-[100px]" />
      </div>

      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-20 text-center">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-300">
            <Heart className="h-3.5 w-3.5" />
            Our mission
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Coding education{" "}
            <span className="bg-linear-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              rebuilt from scratch
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
            CodeLearn exists to give every developer — regardless of background,
            budget, or timezone — a clear, engaging, and effective path from
            first line of code to production-ready engineer.
          </p>
        </div>
      </section>

      {/* ── Stats bar ────────────────────────────────────────── */}
      <section className="relative border-y border-white/6 bg-white/2">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <dl className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {STATS.map(({ value, label }) => (
              <div key={label} className="text-center">
                <dt className="text-3xl font-extrabold text-white">{value}</dt>
                <dd className="mt-1 text-sm text-zinc-500">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Values ──────────────────────────────────────────── */}
      <section className="relative mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            What we stand for
          </h2>
          <p className="mt-3 text-zinc-500">
            Six principles that guide every product decision we make.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group rounded-2xl border border-white/8 bg-white/3 p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-500/30 hover:bg-white/5"
            >
              <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-violet-500/25 bg-violet-500/10 text-violet-400">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mb-2 text-base font-semibold text-white">
                {title}
              </h3>
              <p className="text-sm leading-relaxed text-zinc-500">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Timeline ──────────────────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Our story
          </h2>
          <p className="mt-3 text-zinc-500">
            From whiteboard sketch to quarter-million developers.
          </p>
        </div>
        <ol className="relative border-l border-white/10 pl-10 space-y-12">
          {TIMELINE.map(({ year, title, body }) => (
            <li key={year} className="relative">
              <span className="absolute -left-10.25 flex h-7 w-7 items-center justify-center rounded-full border border-violet-500/40 bg-zinc-900 text-xs font-bold text-violet-400">
                ●
              </span>
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-violet-500">
                {year}
              </p>
              <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
              <p className="text-sm leading-relaxed text-zinc-400">{body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Team ──────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Meet the team
          </h2>
          <p className="mt-3 text-zinc-500">
            Industry veterans who left comfortable jobs to fix something broken.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map(({ name, role, gradient, initials, bio }) => (
            <div
              key={name}
              className="group rounded-2xl border border-white/8 bg-white/3 p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-500/30"
            >
              <div className="mb-5 flex items-center gap-4">
                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br ${gradient} text-sm font-bold text-white shadow-lg`}
                >
                  {initials}
                </div>
                <div>
                  <p className="font-semibold text-white">{name}</p>
                  <p className="text-xs text-violet-400">{role}</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-zinc-500">{bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-4 pt-24 text-center sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-violet-500/20 bg-linear-to-br from-violet-500/10 via-transparent to-indigo-500/10 p-12">
          <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-500/30 bg-violet-500/15">
            <Zap className="h-7 w-7 text-violet-400" />
          </div>
          <h2 className="mb-4 text-3xl font-bold text-white">
            Join 285 000+ developers
          </h2>
          <p className="mb-8 text-zinc-400">
            Start learning today — no credit card required. Free forever on the
            fundamentals track.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href="/register"
              className="inline-flex h-12 items-center gap-2 rounded-xl bg-linear-to-r from-violet-600 to-indigo-600 px-7 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:from-violet-500 hover:to-indigo-500"
            >
              <Rocket className="h-4 w-4" />
              Get started for free
            </a>
            <a
              href="/learn"
              className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-7 text-sm font-semibold text-white transition-all hover:bg-white/10"
            >
              <Code2 className="h-4 w-4" />
              Browse courses
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
