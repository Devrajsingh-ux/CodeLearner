"use client";

import { ArrowRight, Play, Star } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { formatNumber } from "@/lib/utils";

export function Hero() {
  const [activeLearners, setActiveLearners] = useState<number>(0);

  useEffect(() => {
    fetch("/api/platform/stats")
      .then((r) => r.json())
      .then((data) => setActiveLearners(Number(data.activeLearners) || 0))
      .catch(() => {});
  }, []);

  return (
    <section
      className="relative flex min-h-svh items-center overflow-hidden pt-16 sm:pt-20"
      aria-label="Hero section"
    >
      {/* Background glows */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-28 -top-24 h-96 w-96 rounded-full bg-violet-500/16 blur-3xl sm:-left-44 sm:-top-36 sm:h-[34rem] sm:w-[34rem]" />
        <div className="absolute -right-24 top-1/4 h-80 w-80 rounded-full bg-indigo-500/14 blur-3xl sm:-right-40 sm:h-[30rem] sm:w-[30rem]" />
        <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl sm:h-[24rem] sm:w-[24rem]" />
        <div className="absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/10 to-transparent lg:block" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-400/35 bg-violet-500/12 px-4 py-1.5 text-xs font-semibold text-violet-200 shadow-[0_0_0_1px_rgba(167,139,250,0.2)] sm:text-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-300" />
            React 19 + Next.js 16 tracks now live
          </div>

          <h1 className="text-4xl font-extrabold leading-[1.04] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Master Coding.
            <br />
            <span className="bg-linear-to-r from-violet-300 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
              Build the Future.
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-zinc-300 sm:mt-6 sm:text-lg">
            Expert-crafted courses, real-world projects, and an interactive code
            editor - everything you need to go from beginner to
            production-ready developer.
          </p>

          <div className="mx-auto mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
            <Link href="/register" className="sm:w-auto">
              <Button
                size="lg"
                rightIcon={<ArrowRight className="h-5 w-5" />}
                className="w-full sm:w-auto"
              >
                Start learning free
              </Button>
            </Link>
            <Link href="/learn" className="sm:w-auto">
              <Button
                variant="secondary"
                size="lg"
                leftIcon={<Play className="h-4 w-4" />}
                className="w-full sm:w-auto"
              >
                Browse courses
              </Button>
            </Link>
          </div>

          <div className="mx-auto mt-8 w-full max-w-3xl rounded-2xl border border-white/12 bg-white/[0.03] p-4 shadow-[0_20px_80px_-40px_rgba(99,102,241,0.65)] backdrop-blur-sm sm:p-5">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-1.5">
                  {["AC", "BK", "CM", "DW", "EL"].map((init) => (
                    <div
                      key={init}
                      className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-zinc-950 bg-linear-to-br from-violet-600 to-indigo-700 text-xs font-bold text-white"
                    >
                      {init}
                    </div>
                  ))}
                </div>
                <div className="text-left text-sm text-zinc-300">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star key={n} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs sm:text-sm">
                    {activeLearners > 0
                      ? `${formatNumber(activeLearners)}+ learners trust us`
                      : "trusted by thousands of learners"}
                  </span>
                </div>
              </div>

              <div className="h-px w-full bg-white/8 sm:hidden" />

              <div className="grid w-full grid-cols-3 gap-2 text-center sm:w-auto sm:gap-3">
                <div className="rounded-xl border border-white/10 bg-black/20 px-3 py-2">
                  <p className="text-[11px] uppercase tracking-wide text-zinc-500">Tracks</p>
                  <p className="text-sm font-semibold text-white">9+</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/20 px-3 py-2">
                  <p className="text-[11px] uppercase tracking-wide text-zinc-500">Projects</p>
                  <p className="text-sm font-semibold text-white">50+</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/20 px-3 py-2">
                  <p className="text-[11px] uppercase tracking-wide text-zinc-500">Mentors</p>
                  <p className="text-sm font-semibold text-white">24/7</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 text-center sm:mt-20">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-zinc-600 sm:mb-6 sm:text-xs">
            Trusted by developers at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 opacity-30 grayscale sm:gap-8">
            {["Google", "Meta", "Amazon", "Microsoft", "Stripe", "Vercel"].map(
              (co) => (
                <span
                  key={co}
                  className="text-sm font-bold tracking-tight text-zinc-400 sm:text-lg"
                >
                  {co}
                </span>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
