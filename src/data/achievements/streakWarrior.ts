import { Flame } from "lucide-react";
import type { Achievement } from "./types";

export const streakWarrior: Achievement = {
  id: "streak-warrior",
  title: "Streak Warrior",
  description: "Seven days in a row — your dedication is undeniable.",
  task: "Maintain a 7-day learning streak",
  icon: Flame,
  color: "#f59e0b",
  xpReward: 100,
  category: "streak",
  isEarned: (ctx) => ctx.streak >= 7,
};
