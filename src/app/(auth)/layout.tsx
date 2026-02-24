import { BookOpen, Star, Trophy, Users } from "lucide-react";
import type { ReactNode } from "react";

const features = [
  { icon: BookOpen, text: "100+ structured learning tracks" },
  { icon: Users, text: "285,000+ active developers worldwide" },
  { icon: Trophy, text: "Earn verifiable certificates" },
];

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-zinc-950">
      {/* ── Left Branding Panel (desktop only) ── */}
      <aside className="hidden lg:flex lg:w-[52%] xl:w-1/2 relative flex-col justify-between overflow-hidden p-12 bg-linear-to-br from-violet-950 via-[#0d0d1a] to-indigo-950">
        {/* Glow blobs */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -left-32 top-1/4 h-112.5 w-112.5 rounded-full bg-violet-600/20 blur-[100px]" />
          <div className="absolute right-0 bottom-1/4 h-87.5 w-87.5 rounded-full bg-indigo-600/25 blur-[80px]" />
          <div className="absolute left-1/2 top-0 h-50 w-50 -translate-x-1/2 rounded-full bg-violet-400/10 blur-[60px]" />
          {/* Grid */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Logo removed per request */}

        {/* Mid content (pushed down slightly) */}
        <div className="relative mt-12 space-y-10 lg:mt-16">
          <div>
            {/* (trusted badge removed per design request) */}
            <h2 className="text-4xl font-bold text-white leading-[1.2] tracking-tight">
              Learn to code.
              <br />
              Build real things.
              <br />
              <span className="bg-linear-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                Get hired.
              </span>
            </h2>
            <p className="mt-4 text-base text-zinc-400 leading-relaxed max-w-sm">
              Master modern web development through structured tracks,
              real-world projects, and a community that has your back.
            </p>
          </div>

          {/* Feature list */}
          <ul className="space-y-3">
            {features.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/15 border border-violet-500/25">
                  <Icon className="h-4 w-4 text-violet-400" />
                </span>
                <span className="text-sm text-zinc-300">{text}</span>
              </li>
            ))}
          </ul>

          {/* Testimonial card */}
          <div className="rounded-2xl border border-white/10 bg-white/4 p-5 backdrop-blur-sm">
            <div className="mb-3 flex gap-0.5">
              {[1, 2, 3, 4, 5].map((n) => (
                <Star
                  key={n}
                  className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                />
              ))}
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed">
              "This platform took me from complete beginner to landing a
              frontend role at a top startup — in under a year."
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-linear-to-br from-violet-500 to-pink-500 flex items-center justify-center text-xs font-bold text-white">
                SC
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Sarah Chen</p>
                <p className="text-xs text-zinc-500">
                  Frontend Engineer @ Stripe
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="relative text-xs text-zinc-600">
          © 2026. All rights reserved.
        </p>
      </aside>

      {/* ── Right Form Panel ── */}
      <main className="flex flex-1 flex-col items-center justify-center px-5 py-12 relative overflow-hidden">
        {/* Mobile-only background glows */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 lg:hidden"
        >
          <div className="absolute -left-40 -top-40 h-100 w-100 rounded-full bg-violet-600/10 blur-3xl" />
          <div className="absolute -right-40 -bottom-40 h-100 w-100 rounded-full bg-indigo-600/10 blur-3xl" />
        </div>

        {/* Mobile logo */}
        {/* Mobile logo removed per request */}

        <div className="relative w-full max-w-100">{children}</div>
      </main>
    </div>
  );
}
