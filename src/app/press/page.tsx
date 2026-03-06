import { ArrowRight, Download, Mail, Newspaper } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Press — Zentax",
  description:
    "Media resources, recent coverage, brand assets, and press contact for Zentax.",
};

const COVERAGE = [
  {
    outlet: "TechCrunch",
    logo: "TC",
    logoBg: "from-green-500 to-emerald-600",
    title:
      "Zentax raises $12M to make coding education genuinely free — and actually good",
    date: "March 2024",
    href: "#",
  },
  {
    outlet: "The Verge",
    logo: "TV",
    logoBg: "from-violet-500 to-purple-700",
    title:
      "This learning platform wants to fix the bootcamp model by making everything open-source",
    date: "January 2024",
    href: "#",
  },
  {
    outlet: "Hacker News",
    logo: "HN",
    logoBg: "from-orange-500 to-red-600",
    title:
      "Ask HN: Why is Zentax's in-browser editor faster than every other platform?",
    date: "October 2023",
    href: "#",
  },
  {
    outlet: "Product Hunt",
    logo: "PH",
    logoBg: "from-amber-500 to-orange-600",
    title:
      "Product of the Day — #1 on launch day with 3 200+ upvotes and 98% positive sentiment",
    date: "August 2023",
    href: "#",
  },
  {
    outlet: "Dev.to",
    logo: "D.",
    logoBg: "from-zinc-600 to-zinc-800",
    title:
      "How Zentax built a Monaco Editor integration that starts in under 200 ms",
    date: "June 2023",
    href: "#",
  },
  {
    outlet: "InfoQ",
    logo: "IQ",
    logoBg: "from-blue-600 to-cyan-600",
    title:
      "Zentax's architecture: React Server Components at 285 000 concurrent learners",
    date: "February 2025",
    href: "#",
  },
];

const BRAND_ASSETS = [
  {
    name: "Logo package (SVG + PNG)",
    description: "Full colour, white, and dark variants at all resolutions.",
    file: "/brand/zentax-logos.zip",
  },
  {
    name: "Press photography",
    description: "High-resolution product screenshots and team photos.",
    file: "/brand/zentax-press-photos.zip",
  },
  {
    name: "Brand guidelines (PDF)",
    description: "Colour palette, typography rules, and usage do's & don'ts.",
    file: "/brand/zentax-brand-guidelines.pdf",
  },
  {
    name: "One-page company fact sheet",
    description: "Key stats, leadership bios, and funding summary.",
    file: "/brand/zentax-factsheet.pdf",
  },
];

const STATS = [
  { value: "285K+", label: "Monthly active learners" },
  { value: "$12M", label: "Series A raised" },
  { value: "Feb 2026", label: "Founded" },
  { value: "28", label: "Team members" },
];

export default function PressPage() {
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
      <section className="relative pt-28 pb-20 text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-300">
            <Newspaper className="h-3.5 w-3.5" />
            Press room
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl">
            Media &{" "}
            <span className="bg-linear-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              press
            </span>
          </h1>
          <p className="mt-4 text-lg text-zinc-400">
            Resources for journalists and content creators covering Zentax.
            For enquiries not answered here, email us directly.
          </p>
          <a
            href="mailto:press@zentax.io"
            className="mt-6 inline-flex items-center gap-2 rounded-xl border border-violet-500/40 bg-violet-500/10 px-5 py-2.5 text-sm font-medium text-violet-300 transition-colors hover:bg-violet-500/20"
          >
            <Mail className="h-4 w-4" /> press@zentax.io
          </a>
        </div>
      </section>

      {/* ── Key stats ───────────────────────────────────────── */}
      <section className="border-y border-white/6 bg-white/2">
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

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Recent coverage ─────────────────────────────── */}
        <section className="pt-20">
          <h2 className="mb-8 text-2xl font-bold text-white">
            Recent coverage
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {COVERAGE.map((item) => (
              <a
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col rounded-2xl border border-white/8 bg-white/3 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-500/30 hover:bg-white/5"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br ${item.logoBg} text-xs font-bold text-white`}
                  >
                    {item.logo}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {item.outlet}
                    </p>
                    <p className="text-xs text-zinc-500">{item.date}</p>
                  </div>
                </div>
                <p className="flex-1 text-sm leading-relaxed text-zinc-400 group-hover:text-zinc-300">
                  {item.title}
                </p>
                <div className="mt-4 flex items-center gap-1 text-xs font-medium text-violet-400 opacity-0 transition-opacity group-hover:opacity-100">
                  Read article <ArrowRight className="h-3 w-3" />
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ── Brand assets ─────────────────────────────────── */}
        <section className="pt-20">
          <h2 className="mb-8 text-2xl font-bold text-white">Brand assets</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {BRAND_ASSETS.map(({ name, description, file }) => (
              <div
                key={name}
                className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/3 p-5 transition-all hover:border-violet-500/30"
              >
                <div>
                  <p className="font-medium text-white">{name}</p>
                  <p className="mt-0.5 text-sm text-zinc-500">{description}</p>
                </div>
                <a
                  href={file}
                  download
                  className="ml-4 shrink-0 inline-flex items-center gap-1.5 rounded-xl border border-violet-500/30 bg-violet-500/10 px-3.5 py-2 text-xs font-semibold text-violet-300 transition-colors hover:bg-violet-500/20"
                >
                  <Download className="h-3.5 w-3.5" /> Download
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* ── Media contact card ───────────────────────────── */}
        <section className="pt-16">
          <div className="rounded-3xl border border-violet-500/20 bg-linear-to-br from-violet-500/10 via-transparent to-indigo-500/10 p-10 text-center">
            <h2 className="mb-3 text-2xl font-bold text-white">
              Media enquiries
            </h2>
            <p className="mb-6 text-zinc-400">
              Our press team turns around interview requests and quote approvals
              within one business day.
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a
                href="mailto:press@zentax.io"
                className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-violet-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:from-violet-500 hover:to-indigo-500"
              >
                <Mail className="h-4 w-4" /> press@zentax.io
              </a>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
              >
                Company overview
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
