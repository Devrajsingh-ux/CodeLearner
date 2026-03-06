import {
  ArrowRight,
  Briefcase,
  Building2,
  Clock,
  Globe,
  Heart,
  MapPin,
  Rocket,
  Shield,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers — Zentax",
  description:
    "Join the team building the future of coding education. Remote-first. Mission-driven. Engineer-led.",
};

interface Role {
  title: string;
  team: string;
  type: "Full-time" | "Part-time" | "Contract";
  location: string;
  level: "Senior" | "Staff" | "Lead" | "Mid" | "IC5";
  tagColor: string;
}

const OPEN_ROLES: Role[] = [
  {
    title: "Senior Frontend Engineer",
    team: "Product",
    type: "Full-time",
    location: "Remote (Global)",
    level: "Senior",
    tagColor: "text-violet-400 bg-violet-500/10 border-violet-500/20",
  },
  {
    title: "Staff Backend Engineer (Rust / Postgres)",
    team: "Infrastructure",
    type: "Full-time",
    location: "Remote (Global)",
    level: "Staff",
    tagColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  },
  {
    title: "Senior Design Engineer",
    team: "Design",
    type: "Full-time",
    location: "Remote (Global)",
    level: "Senior",
    tagColor: "text-pink-400 bg-pink-500/10 border-pink-500/20",
  },
  {
    title: "Lead Curriculum Engineer — Python & ML",
    team: "Curriculum",
    type: "Full-time",
    location: "Remote (Global)",
    level: "Lead",
    tagColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  },
  {
    title: "Developer Advocate",
    team: "Community",
    type: "Full-time",
    location: "Remote (US / EU)",
    level: "Mid",
    tagColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  },
  {
    title: "Senior Product Designer",
    team: "Design",
    type: "Full-time",
    location: "Remote (Global)",
    level: "Senior",
    tagColor: "text-pink-400 bg-pink-500/10 border-pink-500/20",
  },
];

const PERKS = [
  {
    icon: Globe,
    title: "Fully remote",
    body: "Work from anywhere in the world. We operate across 18 time zones with async-first culture and no expectations of face-time.",
  },
  {
    icon: Heart,
    title: "Generous benefits",
    body: "Top-tier health, dental & vision. $3 000 home-office stipend. 30 days PTO. 12 weeks parental leave — for everyone.",
  },
  {
    icon: Rocket,
    title: "Equity for all",
    body: "Every full-time team member receives meaningful equity. We think everyone who builds Zentax should share in its success.",
  },
  {
    icon: Sparkles,
    title: "Learning budget",
    body: "$2 000/year for courses, books, conferences, or hardware. Because we literally are a learning company.",
  },
  {
    icon: Zap,
    title: "High impact work",
    body: "Small team, massive reach. Every feature you ship is used by 285 000+ learners this week.",
  },
  {
    icon: Shield,
    title: "Psychological safety",
    body: "Blameless incident culture, honest feedback, honest conversations. We don't do performative busy-ness.",
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Applied",
    body: "Submit your application — CV and a short note on why Zentax. That's it. No cover-letter essays.",
  },
  {
    step: "02",
    title: "Intro call (30 min)",
    body: "Chat with a team member about the role, the product, and your background. No gotcha questions.",
  },
  {
    step: "03",
    title: "Technical screen",
    body: "A focused take-home or live session — max 90 minutes, representative of real work, not puzzles.",
  },
  {
    step: "04",
    title: "Team interviews (2 × 45 min)",
    body: "Meet the people you'd work with. We evaluate fit both ways — you're interviewing us too.",
  },
  {
    step: "05",
    title: "Offer & close",
    body: "We move fast. Decisions within 48 hours of final interview. Full comp transparency from day one.",
  },
];

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-zinc-950 pb-24">
      {/* ── Ambient ─────────────────────────────────────────── */}
      <div
        className="pointer-events-none fixed inset-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute -top-40 left-1/2 h-160 w-160 -translate-x-1/2 rounded-full bg-violet-600/8 blur-[130px]" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-indigo-600/6 blur-[100px]" />
      </div>

      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-20 text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-300">
            <Briefcase className="h-3.5 w-3.5" />
            We're hiring
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl">
            Work on what{" "}
            <span className="bg-linear-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              matters
            </span>
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-zinc-400">
            Zentax is a small, remote team that ships fast, cares deeply
            about craft, and is genuinely changing how the world learns to code.
            Come build it with us.
          </p>
          <div className="mt-3 flex justify-center gap-6 text-sm text-zinc-500">
            <span className="flex items-center gap-1.5">
              <Users className="h-4 w-4 text-violet-400" /> 28 people
            </span>
            <span className="flex items-center gap-1.5">
              <Globe className="h-4 w-4 text-violet-400" /> 18 countries
            </span>
            <span className="flex items-center gap-1.5">
              <Building2 className="h-4 w-4 text-violet-400" /> Remote-first
            </span>
          </div>
        </div>
      </section>

      {/* ── Open roles ──────────────────────────────────────── */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-2xl font-bold text-white">
          Open positions{" "}
          <span className="ml-2 rounded-full bg-violet-500/15 px-2.5 py-0.5 text-sm font-semibold text-violet-400">
            {OPEN_ROLES.length}
          </span>
        </h2>
        <div className="space-y-3">
          {OPEN_ROLES.map((role) => (
            <div
              key={role.title}
              className="group flex flex-col items-start justify-between gap-3 rounded-2xl border border-white/8 bg-white/3 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-500/30 sm:flex-row sm:items-center"
            >
              <div className="flex-1">
                <div className="mb-1.5 flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${role.tagColor}`}
                  >
                    {role.team}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-zinc-400">
                    {role.level}
                  </span>
                </div>
                <p className="font-semibold text-white">{role.title}</p>
                <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-zinc-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {role.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {role.type}
                  </span>
                </div>
              </div>
              <a
                href={`/careers/${role.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-violet-500/40 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-300 transition-colors hover:bg-violet-500/20"
              >
                Apply <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ── Perks ───────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Why Zentax?
          </h2>
          <p className="mt-3 text-zinc-500">
            We mean it when we say people-first.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PERKS.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-2xl border border-white/8 bg-white/3 p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-500/30"
            >
              <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-violet-500/25 bg-violet-500/10 text-violet-400">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mb-2 font-semibold text-white">{title}</h3>
              <p className="text-sm leading-relaxed text-zinc-500">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Interview process ───────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Our hiring process
          </h2>
          <p className="mt-3 text-zinc-500">
            Transparent, fast, and respectful of your time.
          </p>
        </div>
        <ol className="relative border-l border-white/10 pl-10 space-y-10">
          {PROCESS.map(({ step, title, body }) => (
            <li key={step} className="relative">
              <span className="absolute -left-10.25 flex h-7 w-7 items-center justify-center rounded-full border border-violet-500/40 bg-zinc-900 text-xs font-bold text-violet-400">
                {step}
              </span>
              <h3 className="mb-2 font-semibold text-white">{title}</h3>
              <p className="text-sm leading-relaxed text-zinc-400">{body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ── No roles fit? ───────────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-4 pt-20 text-center sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/8 bg-white/3 p-10">
          <h2 className="mb-3 text-2xl font-bold text-white">
            Don't see your role?
          </h2>
          <p className="mb-7 text-zinc-400">
            We occasionally hire for roles we haven't listed yet. Send us a note
            — we read every message.
          </p>
          <a
            href="mailto:careers@zentax.io"
            className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-violet-600 to-indigo-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:from-violet-500 hover:to-indigo-500"
          >
            Send a speculative application
          </a>
        </div>
      </section>
    </main>
  );
}
