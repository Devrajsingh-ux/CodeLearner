"use client";

import { Play } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface EnrollButtonProps {
  courseId: string;
  courseSlug: string;
  courseTitle: string;
  totalLessons: number;
}

export function EnrollButton({
  courseId,
  courseSlug,
  courseTitle,
  totalLessons,
}: EnrollButtonProps) {
  const router = useRouter();
  const [isEnrolling, setIsEnrolling] = useState(false);

  async function handleStartLearning() {
    setIsEnrolling(true);

    try {
      // Enroll in the course
      await fetch("/api/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId,
          courseSlug,
          courseTitle,
          totalLessons,
        }),
      });

      // Navigate to first lesson regardless of enrollment API response
      // (enrollment might already exist, which is fine)
      router.push(`/learn/${courseSlug}/lesson-1`);
    } catch (error) {
      console.error("Enrollment error:", error);
      // Navigate anyway - don't block the user
      router.push(`/learn/${courseSlug}/lesson-1`);
    }
  }

  return (
    <button
      onClick={handleStartLearning}
      disabled={isEnrolling}
      className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-violet-600 to-indigo-600 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:from-violet-500 hover:to-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed"
    >
      <Play className="h-4 w-4" />
      {isEnrolling ? "Starting..." : "Start Learning"}
    </button>
  );
}
