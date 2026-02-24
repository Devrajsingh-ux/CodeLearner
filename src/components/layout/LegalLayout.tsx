import { Scale } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

interface Section {
  id: string;
  title: string;
}

interface LegalLayoutProps {
  title: string;
  subtitle: string;
  lastUpdated: string;
  sections: Section[];
  children: ReactNode;
}

export function LegalLayout({
  title,
  subtitle,
  lastUpdated,
  sections,
  children,
}: LegalLayoutProps) {
  return (
    <main className="min-h-screen bg-zinc-950 pb-24">
      {/* ── Ambient ─────────────────────────────────────── */}
      <div
        className="pointer-events-none fixed inset-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute -top-40 left-1/2 h-128 w-lg -translate-x-1/2 rounded-full bg-violet-600/6 blur-[120px]" />
      </div>

      {/* ── Header ──────────────────────────────────────── */}
      <section className="relative border-b border-white/6 pt-28 pb-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-300">
            <Scale className="h-3.5 w-3.5" />
            Legal
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            {title}
          </h1>
          <p className="mt-3 text-zinc-400">{subtitle}</p>
          <p className="mt-2 text-xs text-zinc-600">
            Last updated: {lastUpdated}
          </p>
        </div>
      </section>

      {/* ── Body ────────────────────────────────────────── */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 pt-12 lg:grid-cols-[220px_1fr]">
          {/* ── Sticky TOC ──────────────────────────────── */}
          <aside className="hidden lg:block">
            <nav
              className="sticky top-24 rounded-2xl border border-white/8 bg-white/3 p-5"
              aria-label="Table of contents"
            >
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-zinc-500">
                On this page
              </p>
              <ul className="space-y-1">
                {sections.map(({ id, title: sTitle }) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      className="block rounded-lg px-3 py-1.5 text-sm text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
                    >
                      {sTitle}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* ── Content ─────────────────────────────────── */}
          <article className="prose-legal">{children}</article>
        </div>

        {/* ── Footer note ──────────────────────────────── */}
        <div className="mt-16 rounded-2xl border border-white/8 bg-white/3 p-6 text-center">
          <p className="text-sm text-zinc-500">
            Questions about this document?{" "}
            <Link
              href="/contact"
              className="font-medium text-violet-400 transition-colors hover:text-violet-300"
            >
              Contact us
            </Link>{" "}
            and we'll respond within one business day.
          </p>
        </div>
      </div>
    </main>
  );
}

// ── Prose helpers ──────────────────────────────────────────────────────────

export function LegalSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mb-10 scroll-mt-24">
      <h2 className="mb-4 text-xl font-bold text-white">{title}</h2>
      <div className="space-y-3 text-sm leading-relaxed text-zinc-400">
        {children}
      </div>
    </section>
  );
}

export function LegalP({ children }: { children: ReactNode }) {
  return <p className="text-sm leading-relaxed text-zinc-400">{children}</p>;
}

export function LegalUl({ children }: { children: ReactNode }) {
  return (
    <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-zinc-400 marker:text-zinc-600">
      {children}
    </ul>
  );
}

export function LegalLi({ children }: { children: ReactNode }) {
  return <li>{children}</li>;
}

export function LegalStrong({ children }: { children: ReactNode }) {
  return <strong className="font-semibold text-zinc-200">{children}</strong>;
}
