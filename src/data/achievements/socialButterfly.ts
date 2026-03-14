import { Users } from "lucide-react";
import type { Achievement } from "./types";

export const socialButterfly: Achievement = {
  id: "social-butterfly",
  title: "Social Butterfly",
  description: "Your profile is fully connected — GitHub, Twitter, and LinkedIn.",
  task: "Link your GitHub, Twitter, and LinkedIn in your profile settings",
  icon: Users,
  color: "#ec4899",
  xpReward: 50,
  category: "social",
  isEarned: (ctx) => ctx.hasGithub && ctx.hasTwitter && ctx.hasLinkedin,
};
