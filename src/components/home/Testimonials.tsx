"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Card } from "@/components/ui/Card";
import type { Testimonial } from "@/types";

function SkeletonCard() {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-white/8 bg-zinc-900 p-5 animate-pulse">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((n) => (
          <div key={n} className="h-4 w-4 rounded bg-white/8" />
        ))}
      </div>
      <div className="flex-1 space-y-2">
        <div className="h-3 w-full rounded bg-white/8" />
        <div className="h-3 w-5/6 rounded bg-white/8" />
        <div className="h-3 w-4/6 rounded bg-white/8" />
      </div>
      <div className="flex items-center gap-3 border-t border-white/8 pt-4">
        <div className="h-8 w-8 rounded-full bg-white/8 shrink-0" />
        <div className="space-y-1.5">
          <div className="h-3 w-24 rounded bg-white/8" />
          <div className="h-2.5 w-32 rounded bg-white/10" />
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/testimonials")
      .then((r) => r.json())
      .then((d) => setTestimonials(d.testimonials ?? []))
      .catch(() => setTestimonials([]))
      .finally(() => setIsLoading(false));
  }, []);

  // Hide the entire section if no testimonials and not loading
  if (!isLoading && testimonials.length === 0) return null;

  return (
    <section
      id="testimonials"
      className="relative py-16 sm:py-24 lg:py-28"
      aria-label="Student testimonials"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute right-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-indigo-600/8 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-16">
          <span className="mb-3 inline-block rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1 text-sm font-medium text-emerald-400">
            Student Stories
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Real results,{" "}
            <span className="bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              real developers
            </span>
          </h2>
          <p className="mt-4 text-zinc-400">
            Thousands of developers have leveled up their careers with
            Zentax. Here's what they have to say.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
            : testimonials.map((t) => (
                <Card key={t.id} hover className="flex flex-col gap-4">
                  <div
                    role="img"
                    className="flex gap-0.5"
                    aria-label={`${t.rating} out of 5 stars`}
                  >
                    {Array.from({ length: t.rating }, (_, i) => i + 1).map((n) => (
                      <Star key={n} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <blockquote className="flex-1 text-sm leading-relaxed text-zinc-400">
                    "{t.content}"
                  </blockquote>

                  <div className="flex items-center gap-3 border-t border-white/8 pt-4">
                    <Avatar initials={t.avatar} size="sm" />
                    <div>
                      <p className="text-sm font-semibold text-white">{t.name}</p>
                      <p className="text-xs text-zinc-500">{t.role}</p>
                    </div>
                  </div>

                  {t.course && (
                    <p className="text-xs text-violet-400/80">Completed: {t.course}</p>
                  )}
                </Card>
              ))}
        </div>
      </div>
    </section>
  );
}

