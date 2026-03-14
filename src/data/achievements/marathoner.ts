import { Award } from "lucide-react";
import type { Achievement } from "./types";

export const marathoner: Achievement = {
  id: "marathoner",
  title: "Marathoner",
  description: "30 days without skipping — you are truly unstoppable.",
  task: "Maintain a 30-day learning streak without breaking it",
  icon: Award,
  color: "#f43f5e",
  xpReward: 500,
  category: "streak",
  isEarned: (ctx) => ctx.streak >= 30,
};
