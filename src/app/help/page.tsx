import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  Code2,
  HelpCircle,
  LifeBuoy,
  MessageCircle,
  Search,
  Shield,
  User,
  Zap,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Help Center — CodeLearn",
  description:
    "Find answers to common questions, troubleshoot issues, and learn how to get the most out of CodeLearn.",
};

const CATEGORIES = [
  {
    icon: User,
    title: "Account & Billing",
    count: 24,
    color: "text-violet-400",
    bg: "bg-violet-500/10 border-violet-500/20",
    slug: "account",
  },
  {
    icon: BookOpen,
    title: "Courses & Content",
    count: 31,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10 border-cyan-500/20",
    slug: "courses",
  },
  {
    icon: Code2,
    title: "Code Editor",
    count: 18,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
    slug: "editor",
  },
  {
    icon: Shield,
    title: "Privacy & Security",
    count: 12,
    color: "text-pink-400",
    bg: "bg-pink-500/10 border-pink-500/20",
    slug: "security",
  },
  {
    icon: Zap,
    title: "Progress & Certificates",
    count: 15,
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
    slug: "certificates",
  },
  {
    icon: MessageCircle,
    title: "Community",
    count: 9,
    color: "text-fuchsia-400",
    bg: "bg-fuchsia-500/10 border-fuchsia-500/20",
    slug: "community",
  },
];

const FAQS: Array<{ q: string; a: string }> = [
  {
    q: "Is CodeLearn really free?",
    a: "Yes. The fundamentals track — JavaScript, Python, HTML/CSS, Git, and Command Line — is free forever with no credit card required. Pro features like advanced tracks, certificates, and AI code review are available on our paid plan.",
  },
  {
    q: "How does the in-browser code editor work?",
    a: "Our editor runs a secure, sandboxed Node.js or Python environment in your browser using WebAssembly. No installation required. Code executes in under 200 ms in most exercises and is isolated per session for security.",
  },
  {
    q: "Can I get a certificate when I complete a track?",
    a: "Yes. Each track awards a verifiable certificate on completion. Certificates include a unique verification URL you can share on LinkedIn, GitHub, or your portfolio. They're available on both free and Pro plans.",
  },
  {
    q: "How do I reset my progress on a track?",
    a: "Go to your Dashboard → select the track → Settings → Reset progress. Note this is irreversible. Your certificate will also be revoked if you've already earned one.",
  },
  {
    q: "What happens if my code doesn't pass the tests?",
    a: "The test runner shows exactly which assertions failed with clear error messages. You can also ask for a hint (free, up to 3 per lesson) or request an AI code review that explains what's wrong and why.",
  },
  {
    q: "Does CodeLearn work on mobile?",
    a: "Our course pages and lesson content are fully responsive. The code editor works on tablets (iPad and larger) but we recommend a keyboard for the best experience. A dedicated mobile app is on our 2026 roadmap.",
  },
  {
    q: "How do I cancel my Pro subscription?",
    a: "Settings → Billing → Cancel subscription. You'll retain Pro access until the end of your current billing period. We don't do dark patterns — cancellation is one click and instant.",
  },
  {
    q: "I found a bug. How do I report it?",
    a: "Use the 'Report an issue' button inside any lesson (bottom-right corner) or email bugs@codelearn.io. Include your browser, OS, and steps to reproduce. We aim to triage within 24 hours.",
  },
];

export default function HelpPage() {
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
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-300">
            <LifeBuoy className="h-3.5 w-3.5" />
            Help Center
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl">
            How can we{" "}
            <span className="bg-linear-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              help?
            </span>
          </h1>
          <p className="mt-4 text-lg text-zinc-400">
            Search our knowledge base or browse by category.
          </p>

          {/* Search */}
          <div className="relative mx-auto mt-8 max-w-xl">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />
            <input
              type="search"
              placeholder="Search articles…"
              aria-label="Search help articles"
              className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-5 text-sm text-zinc-200 placeholder-zinc-600 outline-none transition-colors focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20"
            />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Categories ──────────────────────────────────── */}
        <section>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map(({ icon: Icon, title, count, color, bg, slug }) => (
              <Link
                key={title}
                href={`/help/${slug}`}
                className="group flex items-center gap-4 rounded-2xl border border-white/8 bg-white/3 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-500/30"
              >
                <span
                  className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${bg} ${color}`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <p className="font-semibold text-white">{title}</p>
                  <p className="text-sm text-zinc-500">{count} articles</p>
                </div>
                <ArrowRight className="h-4 w-4 text-zinc-600 transition-colors group-hover:text-violet-400" />
              </Link>
            ))}
          </div>
        </section>

        {/* ── Popular questions ────────────────────────────── */}
        <section className="pt-20">
          <div className="mb-8 flex items-center gap-3">
            <HelpCircle className="h-5 w-5 text-violet-400" />
            <h2 className="text-2xl font-bold text-white">
              Frequently asked questions
            </h2>
          </div>
          <div className="divide-y divide-white/6 rounded-2xl border border-white/8 bg-white/3">
            {FAQS.map(({ q, a }) => (
              <details key={q} className="group px-6 py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-zinc-200 hover:text-white">
                  {q}
                  <ChevronDown className="h-4 w-4 shrink-0 text-zinc-500 transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                  {a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* ── Still need help ──────────────────────────────── */}
        <section className="pt-16">
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/community"
              className="group flex items-center gap-4 rounded-2xl border border-white/8 bg-white/3 p-6 transition-all hover:border-violet-500/30"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-fuchsia-500/20 bg-fuchsia-500/10 text-fuchsia-400">
                <MessageCircle className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-white">Ask the community</p>
                <p className="text-sm text-zinc-500">
                  285K+ developers ready to help
                </p>
              </div>
              <ArrowRight className="ml-auto h-4 w-4 text-zinc-600 transition-colors group-hover:text-violet-400" />
            </Link>

            <Link
              href="/contact"
              className="group flex items-center gap-4 rounded-2xl border border-white/8 bg-white/3 p-6 transition-all hover:border-violet-500/30"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10 text-violet-400">
                <LifeBuoy className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-white">Contact support</p>
                <p className="text-sm text-zinc-500">
                  We reply within one business day
                </p>
              </div>
              <ArrowRight className="ml-auto h-4 w-4 text-zinc-600 transition-colors group-hover:text-violet-400" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
