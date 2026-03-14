import { Code2 } from "lucide-react";
import type { Achievement } from "./types";

export const problemSolver: Achievement = {
  id: "problem-solver",
  title: "Problem Solver",
  description: "You tackled 10 coding problems and came out on top.",
  task: "Solve 10 coding problems in the playground",
  icon: Code2,
  color: "#f97316",
  xpReward: 150,
  category: "challenge",
  isEarned: (ctx) => ctx.solvedProblemsCount >= 10,
};
