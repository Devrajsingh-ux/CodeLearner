import { motion } from "framer-motion";
import { BookOpen, Clock, Star, Users } from "lucide-react";
import Link from "next/link";
import { getTechColor, TechIcon } from "@/components/ui/TechIcon";
import { formatNumber } from "@/lib/utils";
import type { Track } from "@/types";

interface CourseCardProps {
  track: Track;
  index?: number;
}

const difficultyVariant = {
  Beginner: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  Intermediate: "text-sky-400 bg-sky-500/10 border-sky-500/20",
  Advanced: "text-amber-400 bg-amber-500/10 border-amber-500/20",
} as const;

export function CourseCard({ track, index = 0 }: CourseCardProps) {
  const brandColor = getTechColor(track.slug);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
      className="group relative h-full w-full outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 block"
    >
      <Link
        href={`/learn/${track.slug}`}
        className="relative flex h-full flex-col overflow-hidden rounded-[24px] border border-white/10 bg-zinc-900/40 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:bg-zinc-800/60 hover:border-white/20 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] z-10"
      >
        {/* Top Gradient Banner */}
        <div className="relative h-32 w-full overflow-hidden shrink-0">
          <div
            className="absolute inset-0 opacity-40 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-70"
            style={{
              background: `linear-gradient(135deg, ${brandColor}, transparent)`,
            }}
          />
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-[0.15] [background-image:radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

          <div className="absolute bottom-0 left-0 h-3/4 w-full bg-gradient-to-t from-zinc-900/90 to-transparent" />

          {/* Badges Overlay */}
          <div className="absolute top-4 right-4 flex flex-wrap justify-end gap-2 z-20">
            {track.isNew && (
              <span className="rounded-full bg-cyan-500/20 px-2.5 py-1 text-[11px] font-bold tracking-wide text-cyan-300 ring-1 ring-inset ring-cyan-500/30 backdrop-blur-md shadow-lg">
                NEW
              </span>
            )}
            {track.isFeatured && (
              <span className="rounded-full bg-violet-500/20 px-2.5 py-1 text-[11px] font-bold tracking-wide text-violet-300 ring-1 ring-inset ring-violet-500/30 backdrop-blur-md shadow-lg">
                POPULAR
              </span>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="relative flex flex-1 flex-col p-6 pt-0 z-20">
          {/* Icon Avatar */}
          <div className="-mt-10 mb-5 relative flex items-center justify-between">
            <div
              className="flex h-[72px] w-[72px] items-center justify-center rounded-2xl border border-white/15 bg-zinc-950 shadow-2xl transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 relative overflow-hidden"
              style={{ boxShadow: `0 8px 32px -8px ${brandColor}60` }}
            >
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  background: `radial-gradient(circle at center, ${brandColor}, transparent 70%)`,
                }}
              />
              <TechIcon slug={track.slug} size={36} />
            </div>

            <span
              className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest shadow-inner ${difficultyVariant[track.difficulty as keyof typeof difficultyVariant] || difficultyVariant.Beginner}`}
            >
              {track.difficulty}
            </span>
          </div>

          <div className="mb-4 flex items-center justify-between gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">
              {track.category}
            </span>
          </div>

          <div className="flex-1">
            <h3 className="mb-2.5 text-xl font-bold leading-tight text-white transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-400">
              {track.title}
            </h3>
            <p className="mb-5 text-[13px] leading-relaxed text-zinc-400 line-clamp-2 mix-blend-plus-lighter">
              {track.description}
            </p>
          </div>

          {/* Tags */}
          <div className="mb-6 flex flex-wrap gap-1.5">
            {track.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-lg bg-white/5 border border-white/5 px-2.5 py-1 text-[10px] font-semibold text-zinc-300 transition-colors hover:bg-white/10"
              >
                {tag}
              </span>
            ))}
            {track.tags.length > 3 && (
              <span className="rounded-lg bg-white/5 border border-white/5 px-2 py-1 text-[10px] font-semibold text-zinc-500">
                +{track.tags.length - 3}
              </span>
            )}
          </div>

          {/* Meta Footer */}
          <div className="flex items-center justify-between border-t border-white/5 pt-4 text-xs font-semibold text-zinc-400">
            <div className="flex flex-col gap-2">
              <span
                className="flex items-center gap-1.5 transition-colors group-hover:text-zinc-300"
                title={`${track.lessonsCount} lessons`}
              >
                <BookOpen className="h-3.5 w-3.5 text-violet-400/80" />
                {track.lessonsCount} lessons
              </span>
              <span
                className="flex items-center gap-1.5 transition-colors group-hover:text-zinc-300"
                title="Course duration"
              >
                <Clock className="h-3.5 w-3.5 text-cyan-400/80" />
                {track.duration}h duration
              </span>
            </div>

            <div className="flex flex-col gap-2 items-end">
              <span
                className="flex items-center gap-1.5 transition-colors group-hover:text-zinc-300"
                title={`${formatNumber(track.enrolledCount)} learners`}
              >
                <Users className="h-3.5 w-3.5 text-amber-400/80" />
                {formatNumber(track.enrolledCount)}
              </span>
              <span className="flex items-center gap-1 text-zinc-300 bg-amber-500/10 px-1.5 py-0.5 rounded-md">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                {track.rating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>

        {/* Glow Hover Layer */}
        <div
          className="pointer-events-none absolute -inset-px rounded-[24px] opacity-0 transition duration-500 group-hover:opacity-100"
          style={{
            boxShadow: `inset 0 0 0 1px ${brandColor}40`,
            background: `radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${brandColor}15, transparent 40%)`,
          }}
        />
      </Link>
    </motion.div>
  );
}
