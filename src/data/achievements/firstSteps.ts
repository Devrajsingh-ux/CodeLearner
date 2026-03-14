import { BookOpen } from "lucide-react";
import type { Achievement } from "./types";

export const firstSteps: Achievement = {
  id: "first-steps",
  title: "First Steps",
  description: "You completed your very first lesson on the platform.",
  task: "Complete 1 lesson",
  icon: BookOpen,
  color: "#22c55e",
  xpReward: 50,
  category: "learning",
  isEarned: (ctx) => ctx.completedLessonsCount >= 1,
};
