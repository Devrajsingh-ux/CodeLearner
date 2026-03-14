import { Timer } from "lucide-react";
import type { Achievement } from "./types";

export const sprintLearner: Achievement = {
  id: "sprint-learner",
  title: "Sprint Learner",
  description: "Five lessons down — you're on a serious roll.",
  task: "Complete 5 lessons",
  icon: Timer,
  color: "#06b6d4",
  xpReward: 75,
  category: "learning",
  isEarned: (ctx) => ctx.completedLessonsCount >= 5,
};
