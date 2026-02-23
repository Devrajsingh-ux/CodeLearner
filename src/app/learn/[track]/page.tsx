import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, Star, Users, Clock, BookOpen, Lock, Play,
  CheckCircle2, ChevronRight, Zap, Award, Code2, FileText,
  HelpCircle,
} from "lucide-react";
import { TechIcon, getTechColor } from "@/components/ui/TechIcon";
import { tracks } from "@/data/courses";
import { Badge } from "@/components/ui/Badge";
import { formatNumber } from "@/lib/utils";
import { getCurriculum } from "@/lib/lessons";
import type { Metadata } from "next";

const TYPE_ICON_MAP: Record<string, string> = {
  article:  "FileText",
  exercise: "Code2",
  quiz:     "HelpCircle",
};

const TYPE_COLOR: Record<string, string> = {
  article:  "text-sky-400",
  exercise: "text-violet-400",
  quiz:     "text-amber-400",
};

interface Props {
  params: Promise<{ track: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { track: slug } = await params;
  const t = tracks.find((t) => t.slug === slug);
  if (!t) return { title: "Course not found" };
  return {
    title: `${t.title} — CodeLearn`,
    description: t.description,
  };
}

export default async function TrackPage({ params }: Props) {
  const { track: slug } = await params;
  const track = tracks.find((t) => t.slug === slug);
  if (!track) notFound();

  const techColor  = getTechColor(slug);
  const curriculum = getCurriculum(slug, track.title, track.lessonsCount);
  const totalLessons = curriculum.sections.reduce((acc, s) => acc + s.lessons.length, 0);
  const totalXP      = curriculum.sections.reduce(
    (acc, s) => acc + s.lessons.reduce((a, l) => a + l.xp, 0), 0
  );

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* ── Ambient glow ─────────────────────────────────────────── */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
        <div
          className="absolute -top-32 left-1/3 h-[30rem] w-[30rem] rounded-full opacity-30 blur-3xl"
          style={{ background: `radial-gradient(circle, ${techColor}30, transparent 70%)` }}
        />
      </div>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative pt-24 pb-16 border-b border-white/6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/learn"
            className="mb-8 inline-flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> All courses
          </Link>

          <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
            {/* Left: course info */}
            <div className="flex-1">
              <div className="mb-5 flex flex-wrap items-center gap-2.5">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/8 bg-zinc-900"
                  style={{ boxShadow: `0 0 30px 0 ${techColor}40` }}
                >
                  <TechIcon slug={slug} size={32} />
                </div>
                <Badge
                  variant={
                    track.difficulty === "Beginner" ? "success" :
                    track.difficulty === "Advanced"  ? "warning" : "info"
                  }
                >
                  {track.difficulty}
                </Badge>
                {track.isNew      && <Badge variant="purple">New</Badge>}
                {track.isFeatured && (
                  <Badge variant="warning">
                    <Star className="mr-1 h-3 w-3 fill-current" /> Featured
                  </Badge>
                )}
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                {track.title}
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-zinc-400">
                {track.description}
              </p>

              {/* Stats */}
              <div className="mt-6 flex flex-wrap gap-5 text-sm text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <strong className="text-white">{track.rating}</strong> rating
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="h-4 w-4" />
                  <strong className="text-white">{formatNumber(track.enrolledCount)}</strong> enrolled
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  <strong className="text-white">{track.duration}</strong> content
                </span>
                <span className="flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4" />
                  <strong className="text-white">{track.lessonsCount}</strong> lessons
                </span>
                <span className="flex items-center gap-1.5">
                  <Zap className="h-4 w-4 text-violet-400" />
                  <strong className="text-white">{formatNumber(totalXP)}</strong> XP
                </span>
              </div>

              {/* Tags */}
              <div className="mt-5 flex flex-wrap gap-2">
                {track.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/8 bg-white/4 px-3 py-1 text-xs font-medium text-zinc-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: enroll card */}
            <div className="w-full shrink-0 lg:w-80">
              <div className="sticky top-24 overflow-hidden rounded-2xl border border-white/8 bg-zinc-900">
                <div
                  className="h-1 w-full"
                  style={{ background: `linear-gradient(to right, ${techColor}, transparent)` }}
                />
                <div className="p-6">
                  <div className="mb-1 flex items-end gap-1">
                    <p className="text-3xl font-extrabold text-white">Free</p>
                    <p className="mb-1 text-sm text-zinc-500">forever</p>
                  </div>

                  <Link href={`/learn/${slug}/lesson-1`} className="mt-4 block">
                    <button
                      type="button"
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:from-violet-500 hover:to-indigo-500"
                    >
                      <Play className="h-4 w-4" /> Start Learning
                    </button>
                  </Link>

                  <div className="mt-5 space-y-3 text-sm text-zinc-400">
                    {[
                      { icon: BookOpen,      text: `${track.lessonsCount} structured lessons` },
                      { icon: Clock,         text: `${track.duration} of content`             },
                      { icon: Award,         text: "Certificate on completion"                },
                      { icon: Code2,         text: "In-browser code exercises"                },
                      { icon: CheckCircle2,  text: "Lifetime access"                          },
                    ].map(({ icon: Icon, text }) => (
                      <div key={text} className="flex items-center gap-2.5">
                        <Icon className="h-4 w-4 shrink-0 text-emerald-400" />
                        <span>{text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Curriculum ───────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white">Course Content</h2>
          <p className="mt-1 text-sm text-zinc-500">
            {curriculum.sections.length} sections · {totalLessons} lessons · {track.duration} total
          </p>
        </div>

        <div className="space-y-3">
          {curriculum.sections.map((section, sIdx) => {
            const globalOffset = curriculum.sections
              .slice(0, sIdx)
              .reduce((a, s) => a + s.lessons.length, 0);

            return (
              <details key={section.title} open={sIdx === 0} className="group">
                {/* Section header */}
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-2xl border border-white/6 bg-white/[0.02] px-5 py-4 transition-all hover:bg-white/[0.04] group-open:rounded-b-none group-open:border-b-0 group-open:bg-white/[0.04]">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold"
                      style={{ background: `${techColor}22`, color: techColor }}
                    >
                      {sIdx + 1}
                    </div>
                    <span className="text-sm font-semibold text-white">{section.title}</span>
                    <span className="text-xs text-zinc-600">{section.lessons.length} lessons</span>
                  </div>
                  <ChevronRight className="h-4 w-4 shrink-0 text-zinc-600 transition-transform group-open:rotate-90" />
                </summary>

                {/* Lesson rows */}
                <div className="overflow-hidden rounded-b-2xl border border-t-0 border-white/6">
                  {section.lessons.map((lesson, lIdx) => {
                    const lessonNum = globalOffset + lIdx + 1;
                    const isFirst   = sIdx === 0 && lIdx === 0;

                    return (
                      <div
                        key={lesson.slug}
                        className={[
                          "flex items-center justify-between gap-4 px-5 py-4 transition-colors",
                          lIdx < section.lessons.length - 1 && "border-b border-white/5",
                          lesson.isLocked ? "opacity-50" : "hover:bg-white/[0.03]",
                        ].filter(Boolean).join(" ")}
                      >
                        <div className="flex items-center gap-4 min-w-0">
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/4 text-[11px] font-bold text-zinc-500">
                            {lessonNum}
                          </span>

                          {/* Type dot */}
                          <span
                            className={[
                              "h-1.5 w-1.5 shrink-0 rounded-full",
                              lesson.type === "exercise" ? "bg-violet-400" :
                              lesson.type === "quiz"     ? "bg-amber-400"  : "bg-sky-400",
                            ].join(" ")}
                          />

                          <div className="min-w-0">
                            <p className={`truncate text-sm font-medium ${lesson.isLocked ? "text-zinc-500" : "text-white"}`}>
                              {lesson.title}
                            </p>
                            <p className="text-[11px] capitalize text-zinc-600">
                              {lesson.type} · {lesson.duration} · {lesson.xp} XP
                            </p>
                          </div>
                        </div>

                        <div className="flex shrink-0 items-center gap-3">
                          {lesson.isLocked ? (
                            <Lock className="h-4 w-4 text-zinc-700" />
                          ) : (
                            <Link
                              href={`/learn/${slug}/${lesson.slug}`}
                              className="flex items-center gap-1 rounded-lg border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-400 transition-all hover:bg-violet-500/20"
                            >
                              {isFirst ? "Start" : "Open"}
                              <ChevronRight className="h-3 w-3" />
                            </Link>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </details>
            );
          })}
        </div>
      </section>
    </div>
  );
}
