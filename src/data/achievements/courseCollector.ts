import { BookMarked } from "lucide-react";
import type { Achievement } from "./types";

export const courseCollector: Achievement = {
  id: "course-collector",
  title: "Course Collector",
  description: "Three courses enrolled — you absolutely love to learn.",
  task: "Enroll in 3 or more courses",
  icon: BookMarked,
  color: "#14b8a6",
  xpReward: 100,
  category: "learning",
  isEarned: (ctx) => ctx.enrolledCoursesCount >= 3,
};
