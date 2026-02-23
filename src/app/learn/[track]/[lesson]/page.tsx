import { notFound } from "next/navigation";
import { tracks } from "@/data/courses";
import { getLessonContent, getCurriculum } from "@/lib/lessons";
import { LessonClient } from "@/components/learn/LessonClient";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ track: string; lesson: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { track: slug, lesson } = await params;
  const t = tracks.find((t) => t.slug === slug);
  const num = Number(lesson.replace("lesson-", ""));
  if (!t) return { title: "Lesson not found" };
  return { title: `Lesson ${num} — ${t.title} — CodeLearn` };
}

export default async function LessonPage({ params }: Props) {
  const { track: slug, lesson: lessonSlug } = await params;
  const track = tracks.find((t) => t.slug === slug);
  if (!track) notFound();

  const num = Number(lessonSlug.replace("lesson-", ""));
  const curriculum = getCurriculum(slug, track.title, track.lessonsCount);
  const totalLessons = curriculum.sections.reduce((a, s) => a + s.lessons.length, 0);
  const lessonData = getLessonContent(slug, lessonSlug, track.title, num);

  const prevSlug = num > 1 ? `lesson-${num - 1}` : null;
  const nextSlug = num < totalLessons ? `lesson-${num + 1}` : null;

  return (
    <LessonClient
      lesson={lessonData}
      lessonNum={num}
      trackSlug={slug}
      trackTitle={track.title}
      prevSlug={prevSlug}
      nextSlug={nextSlug}
      curriculum={curriculum}
    />
  );
}
