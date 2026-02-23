import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

const perks = [
  "Free forever plan — no credit card",
  "Access to 8 full course tracks",
  "In-browser code editor & exercises",
  "Progress tracking & certificates",
];

export function CTA() {
  return (
    <section className="py-28" aria-label="Call to action">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-950/60 via-indigo-950/60 to-zinc-950 p-px">
          <div className="relative overflow-hidden rounded-3xl px-8 py-16 text-center sm:px-16">
            {/* Decorative blobs */}
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-violet-600/20 blur-3xl" />
              <div className="absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-indigo-600/20 blur-3xl" />
            </div>

            <div className="relative">
              <span className="mb-4 inline-block rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1 text-sm font-medium text-violet-300">
                Start today — it's free
              </span>

              <h2 className="mx-auto max-w-2xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                Your coding journey
                <br />
                <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                  starts right now
                </span>
              </h2>

              <p className="mx-auto mt-5 max-w-xl text-lg text-zinc-400">
                Join 285,000+ developers who chose CodeLearn to sharpen their skills, build real products, and land better jobs.
              </p>

              {/* Perks */}
              <ul
                className="mx-auto mt-8 mb-10 grid max-w-lg grid-cols-1 gap-3 text-left sm:grid-cols-2"
                role="list"
              >
                {perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2.5 text-sm text-zinc-300">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    {perk}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link href="/register">
                  <Button size="lg" rightIcon={<ArrowRight className="h-5 w-5" />}>
                    Create free account
                  </Button>
                </Link>
                <Link href="/learn">
                  <Button variant="secondary" size="lg">
                    Browse all courses
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
