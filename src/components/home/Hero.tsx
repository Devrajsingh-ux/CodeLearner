"use client";

import Link from "next/link";
import { ArrowRight, Play, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { codeSnippet } from "@/data/courses";

export function Hero() {
  return (
    <section
      className="relative flex min-h-svh items-center overflow-hidden pt-16 sm:pt-20"
      aria-label="Hero section"
    >
      {/* Background glows */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-[400px] w-[400px] rounded-full bg-violet-600/12 blur-3xl sm:-left-64 sm:-top-64 sm:h-[700px] sm:w-[700px]" />
        <div className="absolute -right-32 top-1/3 h-[400px] w-[400px] rounded-full bg-indigo-600/10 blur-3xl sm:-right-64 sm:h-[600px] sm:w-[600px]" />
        <div className="absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-600/5 blur-3xl sm:h-[400px] sm:w-[400px]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16 lg:px-8">
        <div className="grid items-center gap-10 sm:gap-14 lg:grid-cols-2 lg:gap-16">

          {/* ── Text column ── */}
          <div className="text-center lg:text-left">
            {/* Pill badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300 sm:mb-6 sm:px-4 sm:text-sm">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-400" />
              React 19 + Next.js 16 tracks now live
            </div>

            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Master Coding.
              <br />
              <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                Build the Future.
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-zinc-400 sm:mt-6 sm:text-lg lg:mx-0">
              Expert-crafted courses, real-world projects, and an interactive code editor — everything you need to go from beginner to production-ready developer.
            </p>

            {/* Social proof */}
            <div className="mt-5 flex items-center justify-center gap-3 lg:justify-start">
              <div className="flex -space-x-1.5">
                {["AC", "BK", "CM", "DW", "EL"].map((init) => (
                  <div
                    key={init}
                    className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-zinc-950 bg-gradient-to-br from-violet-600 to-indigo-700 text-[10px] font-bold text-white sm:h-8 sm:w-8 sm:text-xs"
                  >
                    {init}
                  </div>
                ))}
              </div>
              <div className="text-sm text-zinc-400">
                <div className="flex items-center gap-0.5 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-current sm:h-3.5 sm:w-3.5" />
                  ))}
                </div>
                <span className="text-xs sm:text-sm">485k+ learners trust us</span>
              </div>
            </div>

            {/* CTA buttons — full width on mobile, auto on lg */}
            <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4 lg:justify-start">
              <Link href="/register" className="sm:w-auto">
                <Button size="lg" rightIcon={<ArrowRight className="h-5 w-5" />} className="w-full sm:w-auto">
                  Start learning free
                </Button>
              </Link>
              <Link href="/learn" className="sm:w-auto">
                <Button variant="secondary" size="lg" leftIcon={<Play className="h-4 w-4" />} className="w-full sm:w-auto">
                  Browse courses
                </Button>
              </Link>
            </div>
          </div>

          {/* ── Code editor window — hidden on xs, shown sm+ ── */}
          <div className="relative hidden sm:block">
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-r from-violet-600/20 to-indigo-600/20 blur-2xl sm:-inset-4" />
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl shadow-black/60">
              {/* Window chrome */}
              <div className="flex items-center justify-between border-b border-white/8 bg-zinc-950/50 px-3 py-2.5 sm:px-4 sm:py-3">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/80 sm:h-3 sm:w-3" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80 sm:h-3 sm:w-3" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80 sm:h-3 sm:w-3" />
                </div>
                <span className="font-mono text-[11px] text-zinc-500 sm:text-xs">lesson-01.ts</span>
                <span className="rounded-md bg-violet-500/20 px-1.5 py-0.5 text-[11px] font-medium text-violet-400 sm:px-2 sm:text-xs">
                  TypeScript
                </span>
              </div>
              {/* Code */}
              <div className="overflow-x-auto p-3 sm:p-5">
                <pre className="font-mono text-[11px] leading-6 text-zinc-300 sm:text-sm sm:leading-7">
                  <code>{codeSnippet}</code>
                </pre>
              </div>
              {/* Status bar */}
              <div className="flex items-center justify-between border-t border-white/8 bg-zinc-950/30 px-3 py-1.5 text-[11px] text-zinc-600 sm:px-4 sm:py-2 sm:text-xs">
                <span>TypeScript</span>
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  No errors
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Trust logos */}
        <div className="mt-14 text-center sm:mt-20">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-zinc-600 sm:mb-6 sm:text-xs">
            Trusted by developers at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 opacity-25 grayscale sm:gap-8">
            {["Google", "Meta", "Amazon", "Microsoft", "Stripe", "Vercel"].map((co) => (
              <span key={co} className="text-sm font-bold tracking-tight text-zinc-400 sm:text-lg">
                {co}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
