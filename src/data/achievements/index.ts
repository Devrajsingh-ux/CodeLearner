export type { Achievement, AchievementContext } from "./types";

import { firstSteps } from "./firstSteps";
import { streakWarrior } from "./streakWarrior";
import { centuryClub } from "./centuryClub";
import { problemSolver } from "./problemSolver";
import { sprintLearner } from "./sprintLearner";
import { socialButterfly } from "./socialButterfly";
import { courseCollector } from "./courseCollector";
import { risingStar } from "./risingStar";
import { seasonedCoder } from "./seasonedCoder";
import { marathoner } from "./marathoner";

import type { Achievement } from "./types";

/** All platform achievements, ordered by expected difficulty. */
export const ALL_ACHIEVEMENTS: Achievement[] = [
  firstSteps,
  streakWarrior,
  centuryClub,
  problemSolver,
  sprintLearner,
  socialButterfly,
  courseCollector,
  risingStar,
  seasonedCoder,
  marathoner,
];

export {
  firstSteps,
  streakWarrior,
  centuryClub,
  problemSolver,
  sprintLearner,
  socialButterfly,
  courseCollector,
  risingStar,
  seasonedCoder,
  marathoner,
};
