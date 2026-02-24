import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const perks = [
  "Free forever plan — no credit card",
  "Access to 8 full course tracks",
  "In-browser code editor & exercises",
  "Progress tracking & certificates",
];

export function CTA() {
  return (
    <section className="py-16 sm:py-24 lg:py-28" aria-label="Call to action">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-violet-500/20 bg-linear-to-br from-violet-950/60 via-indigo-950/60 to-zinc-950 p-px sm:rounded-3xl">
          <div className="relative overflow-hidden rounded-2xl px-5 py-12 text-center sm:rounded-3xl sm:px-10 sm:py-16 lg:px-16">
            {/* Decorative blobs */}
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-violet-600/20 blur-3xl sm:-left-32 sm:-top-32 sm:h-64 sm:w-64" />
              <div className="absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-indigo-600/20 blur-3xl sm:-bottom-32 sm:-right-32 sm:h-64 sm:w-64" />
            </div>

            <div className="relative">
              <span className="mb-4 inline-block rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300 sm:px-4 sm:text-sm">
                Start today — it's free
              </span>

              <h2 className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Your coding journey
                <br className="hidden xs:block" />{" "}
                <span className="bg-linear-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                  starts right now
                </span>
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-base text-zinc-400 sm:mt-5 sm:text-lg">
                Join 485,000+ developers who chose CodeLearn to sharpen their
                skills, build real products, and land better jobs.
              </p>

              {/* Perks — 1 col mobile, 2 col sm+ */}
              <ul className="mx-auto mt-6 mb-8 grid max-w-md grid-cols-1 gap-2.5 text-left sm:mt-8 sm:mb-10 sm:max-w-lg sm:grid-cols-2 sm:gap-3">
                {perks.map((perk) => (
                  <li
                    key={perk}
                    className="flex items-start gap-2.5 text-sm text-zinc-300"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    {perk}
                  </li>
                ))}
              </ul>

              {/* Buttons — stacked on mobile, inline on sm+ */}
              <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
                <Link href="/register" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    rightIcon={<ArrowRight className="h-5 w-5" />}
                    className="w-full sm:w-auto"
                  >
                    Create free account
                  </Button>
                </Link>
                <Link href="/learn" className="w-full sm:w-auto">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
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
