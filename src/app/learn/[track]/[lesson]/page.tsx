import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Query } from "node-appwrite";
import { LessonClient } from "@/components/learn/LessonClient";
import { createAdminClient, DB_ID, COL_COURSES } from "@/lib/appwriteServer";
import { getCurriculum, getLessonContent, TrackCurriculum } from "@/lib/lessons";

interface Props {
  params: Promise<{ track: string; lesson: string }>;
}

async function fetchTrackMeta(
  slug: string,
): Promise<{ title: string; lessonsCount: number } | null> {
  try {
    const { databases } = createAdminClient();
    const resp = await databases.listDocuments(DB_ID, COL_COURSES, [
      Query.equal("slug", slug),
      Query.equal("status", "published"),
      Query.limit(1),
    ]);
    if (resp.total === 0) return null;
    const doc = resp.documents[0];
    return { title: doc.title ?? "", lessonsCount: doc.lessonsCount ?? 0 };
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { track: slug, lesson } = await params;
  const t = await fetchTrackMeta(slug);
  const num = Number(lesson.replace("lesson-", ""));
  if (!t) return { title: "Lesson not found" };
  return { title: `Lesson ${num} — ${t.title} — Zentax` };
}

export default async function LessonPage({ params }: Props) {
  const { track: slug, lesson: lessonSlug } = await params;
  const track = await fetchTrackMeta(slug);
  if (!track) notFound();

  const num = Number(lessonSlug.replace("lesson-", ""));
  const curriculum: TrackCurriculum = await getCurriculum(
    slug,
    track.title,
    track.lessonsCount,
  );

  const totalLessons = curriculum.sections.reduce(
    (a: number, s) => a + s.lessons.length,
    0,
  );
  const lessonData = await getLessonContent(slug, lessonSlug, track.title, num);
  if (!lessonData) notFound();

  const prevSlug = num > 1 ? `lesson-${num - 1}` : null;
  const nextSlug = num < totalLessons ? `lesson-${num + 1}` : null;

  return (
    <LessonClient
      lesson={lessonData}
      lessonNum={num}
      lessonSlug={lessonSlug}
      trackSlug={slug}
      trackTitle={track.title}
      prevSlug={prevSlug}
      nextSlug={nextSlug}
      curriculum={curriculum}
    />
  );
}
