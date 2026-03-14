import { Zap } from "lucide-react";
import type { Achievement } from "./types";

export const centuryClub: Achievement = {
  id: "century-club",
  title: "Century Club",
  description: "You earned your first 100 XP — just the beginning.",
  task: "Accumulate 100 XP",
  icon: Zap,
  color: "#8b5cf6",
  xpReward: 25,
  category: "milestone",
  isEarned: (ctx) => ctx.xp >= 100,
};
