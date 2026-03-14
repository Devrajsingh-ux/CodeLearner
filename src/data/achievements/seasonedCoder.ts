import { Trophy } from "lucide-react";
import type { Achievement } from "./types";

export const seasonedCoder: Achievement = {
  id: "seasoned-coder",
  title: "Seasoned Coder",
  description: "Level 5 reached — you've proven real commitment to the craft.",
  task: "Reach Level 5",
  icon: Trophy,
  color: "#3b82f6",
  xpReward: 250,
  category: "milestone",
  isEarned: (ctx) => ctx.level >= 5,
};
