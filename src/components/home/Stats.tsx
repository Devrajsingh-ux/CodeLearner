"use client";

import { useEffect, useRef, useState } from "react";
import { stats } from "@/data/courses";

function AnimatedNumber({
  target,
  suffix,
}: {
  target: number;
  suffix?: string;
}) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          const start = performance.now();
          const duration = 1800;
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const ease = 1 - (1 - progress) ** 4;
            setValue(Math.round(ease * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 },
    );

    if (ref.current) observerRef.current.observe(ref.current);
    return () => observerRef.current?.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section
      className="py-12 sm:py-16 lg:py-20"
      aria-label="Platform statistics"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-white/8 bg-linear-to-br from-violet-600/10 via-zinc-900 to-indigo-600/10 p-px">
          <div className="rounded-3xl bg-zinc-950/60 backdrop-blur-sm">
            <div className="grid divide-y divide-white/8 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4 [&>*:nth-child(3)]:sm:border-t [&>*:nth-child(3)]:sm:border-white/8 [&>*:nth-child(3)]:lg:border-t-0">
              {stats.map(({ label, value, suffix, description }) => (
                <div
                  key={label}
                  className="flex flex-col items-center px-5 py-8 text-center sm:px-8 sm:py-10"
                >
                  <span className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                    <AnimatedNumber
                      target={Number.parseFloat(value)}
                      suffix={suffix}
                    />
                  </span>
                  <span className="mt-1.5 text-sm font-semibold text-violet-400">
                    {label}
                  </span>
                  <span className="mt-1 text-xs text-zinc-500">
                    {description}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
