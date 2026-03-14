import type { LucideIcon } from "lucide-react";

/** Snapshot of a user's progress — passed into each achievement's isEarned(). */
export interface AchievementContext {
  xp: number;
  level: number;
  streak: number;
  enrolledCoursesCount: number;
  completedLessonsCount: number;
  solvedProblemsCount: number;
  hasGithub: boolean;
  hasTwitter: boolean;
  hasLinkedin: boolean;
}

export interface Achievement {
  /** Stable unique identifier. */
  id: string;
  /** Display title shown to the user. */
  title: string;
  /** Short flavour text describing the achievement. */
  description: string;
  /** Human-readable instructions: exactly what the user must do to earn this. */
  task: string;
  /** Lucide React icon component. */
  icon: LucideIcon;
  /** Accent colour hex string (e.g. "#f59e0b"). */
  color: string;
  /** XP awarded on first unlock. */
  xpReward: number;
  /** Thematic grouping. */
  category: "learning" | "streak" | "social" | "milestone" | "challenge";
  /**
   * Pure function — receives a snapshot of user progress and returns true
   * when all criteria for this achievement have been met.
   */
  isEarned: (ctx: AchievementContext) => boolean;
}
