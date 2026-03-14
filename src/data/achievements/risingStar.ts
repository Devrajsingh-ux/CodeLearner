import { Star } from "lucide-react";
import type { Achievement } from "./types";

export const risingStar: Achievement = {
  id: "rising-star",
  title: "Rising Star",
  description: "500 XP earned — your hard work is clearly paying off.",
  task: "Earn a total of 500 XP",
  icon: Star,
  color: "#eab308",
  xpReward: 100,
  category: "milestone",
  isEarned: (ctx) => ctx.xp >= 500,
};
