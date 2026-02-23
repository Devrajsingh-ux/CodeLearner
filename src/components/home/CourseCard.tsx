import Link from "next/link";
import { Clock, Star, ArrowRight, BookOpen, Users } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { TechIcon, getTechColor } from "@/components/ui/TechIcon";
import { formatNumber } from "@/lib/utils";
import type { Track } from "@/types";

interface CourseCardProps {
  track: Track;
}

const difficultyVariant = {
  Beginner: "success",
  Intermediate: "info",
  Advanced: "warning",
} as const;

const categoryColors: Record<string, string> = {
  Languages:         "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  Frontend:          "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  Backend:           "text-green-400 bg-green-500/10 border-green-500/20",
  "Data & AI":       "text-orange-400 bg-orange-500/10 border-orange-500/20",
  Mobile:            "text-sky-400 bg-sky-500/10 border-sky-500/20",
  "DevOps & Cloud":  "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
  Systems:           "text-purple-400 bg-purple-500/10 border-purple-500/20",
  "Web3 & Security": "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  "Game Dev":        "text-rose-400 bg-rose-500/10 border-rose-500/20",
};

export function CourseCard({ track }: CourseCardProps) {
  const brandColor = getTechColor(track.slug);

  return (
    <Link
      href={`/learn/${track.slug}`}
      className="group block h-full rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
    >
      <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 bg-zinc-900 transition-all duration-300 group-hover:border-white/16 group-hover:shadow-2xl group-hover:-translate-y-0.5">
        {/* Brand-color top accent bar */}
        <div
          className="h-[3px] w-full shrink-0"
          style={{ background: `linear-gradient(90deg, ${brandColor}cc, ${brandColor}22)` }}
        />

        <div className="flex flex-1 flex-col p-5">
          {/* Icon + badges */}
          <div className="mb-4 flex items-start justify-between">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/8 bg-zinc-950"
              style={{ boxShadow: `0 0 20px 0 ${brandColor}28` }}
            >
              <TechIcon slug={track.slug} size={26} />
            </div>
            <div className="flex flex-wrap justify-end gap-1.5">
              {track.isNew && <Badge variant="purple">New</Badge>}
              {track.isFeatured && <Badge variant="warning">Popular</Badge>}
            </div>
          </div>

          {/* Category chip */}
          <span
            className={`mb-3 inline-flex w-fit items-center rounded-md border px-2 py-0.5 text-[11px] font-semibold ${
              categoryColors[track.category] ?? "text-zinc-400 bg-zinc-800 border-zinc-700"
            }`}
          >
            {track.category}
          </span>

          {/* Title & description */}
          <div className="flex-1">
            <h3 className="mb-2 font-semibold leading-snug text-white transition-colors group-hover:text-violet-300">
              {track.title}
            </h3>
            <p className="mb-4 text-sm leading-relaxed text-zinc-500 line-clamp-2">
              {track.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {track.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-white/6 bg-zinc-800/80 px-2 py-0.5 text-[11px] text-zinc-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="my-4 border-t border-white/6" />

          {/* Meta row */}
          <div className="mb-3 flex items-center gap-3 text-xs text-zinc-500">
            <span className="flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5" />
              {track.lessonsCount} lessons
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {track.duration}
            </span>
            <span className="ml-auto flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5" />
              {formatNumber(track.enrolledCount)}
            </span>
          </div>

          {/* Footer: difficulty + rating + enroll CTA */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant={difficultyVariant[track.difficulty]}>
                {track.difficulty}
              </Badge>
              <span className="flex items-center gap-0.5 text-xs text-amber-400">
                <Star className="h-3 w-3 fill-current" />
                {track.rating}
              </span>
            </div>
            <span className="flex translate-x-2 items-center gap-1 text-xs font-medium text-violet-400 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">
              Enroll <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
