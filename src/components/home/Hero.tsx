"use client";

import Link from "next/link";
import { ArrowRight, Play, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { codeSnippet } from "@/data/courses";

export function Hero() {
  return (
    <section
      className="relative flex min-h-screen items-center overflow-hidden pt-20"
      aria-label="Hero section"
    >
      {/* Background glows */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-64 -top-64 h-[700px] w-[700px] rounded-full bg-violet-600/10 blur-3xl" />
        <div className="absolute -right-64 top-1/3 h-[600px] w-[600px] rounded-full bg-indigo-600/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-cyan-600/5 blur-3xl" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Text column */}
          <div className="text-center lg:text-left">
            {/* Pill badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-300">
              <span className="flex h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
              React 19 + Next.js 16 tracks now live
            </div>

            <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
              Master Coding.
              <br />
              <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                Build the Future.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
              Expert-crafted courses, real-world projects, and an interactive code editor — everything you need to go from beginner to production-ready developer.
            </p>

            {/* Social proof */}
            <div className="mt-5 flex items-center justify-center gap-3 lg:justify-start">
              <div className="flex -space-x-2">
                {["AC", "BK", "CM", "DW", "EL"].map((init) => (
                  <div
                    key={init}
                    className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-zinc-950 bg-gradient-to-br from-violet-600 to-indigo-700 text-xs font-bold text-white"
                  >
                    {init}
                  </div>
                ))}
              </div>
              <div className="text-sm text-zinc-400">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <span>285k+ learners trust us</span>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <Link href="/register">
                <Button size="lg" rightIcon={<ArrowRight className="h-5 w-5" />}>
                  Start learning free
                </Button>
              </Link>
              <Link href="/learn">
                <Button variant="secondary" size="lg" leftIcon={<Play className="h-4 w-4" />}>
                  Browse courses
                </Button>
              </Link>
            </div>
          </div>

          {/* Code editor window */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-violet-600/20 to-indigo-600/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl shadow-black/60">
              {/* Window chrome */}
              <div className="flex items-center justify-between border-b border-white/8 bg-zinc-950/50 px-4 py-3">
                <div className="flex gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-red-500/80" />
                  <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                  <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-xs font-mono text-zinc-500">lesson-01.ts</span>
                <span className="rounded-md bg-violet-500/20 px-2 py-0.5 text-xs font-medium text-violet-400">
                  TypeScript
                </span>
              </div>
              {/* Code */}
              <div className="overflow-x-auto p-5">
                <pre className="text-sm leading-7 text-zinc-300 font-mono whitespace-pre">
                  <code>{codeSnippet}</code>
                </pre>
              </div>
              {/* Status bar */}
              <div className="flex items-center justify-between border-t border-white/8 bg-zinc-950/30 px-4 py-2 text-xs text-zinc-600">
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
        <div className="mt-20 text-center">
          <p className="mb-6 text-xs font-medium uppercase tracking-widest text-zinc-600">
            Trusted by developers at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-30 grayscale">
            {["Google", "Meta", "Amazon", "Microsoft", "Stripe", "Vercel"].map((co) => (
              <span key={co} className="text-lg font-bold text-zinc-400 tracking-tight">
                {co}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
