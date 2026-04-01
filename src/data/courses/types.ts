/**
 * Curriculum Types
 * Defines the structure for complete 5-level course curricula
 */

export type DifficultyLevel = "Basics" | "Beginner" | "Intermediate" | "Advanced" | "Professional";

export interface Exercise {
  id: string;
  title: string;
  description: string;
  starterCode?: string;
  solution?: string;
  hints?: string[];
  testCases?: {
    input: string;
    expectedOutput: string;
  }[];
}

export interface Subtopic {
  title: string;
  content: string;
  codeExample?: string;
  keyPoints?: string[];
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  duration: string; // e.g., "45 mins"
  objectives: string[];
  concepts: Subtopic[];
  practicalExamples: {
    title: string;
    description: string;
    code: string;
    explanation: string;
  }[];
  realWorldUseCases: string[];
  exercises: Exercise[];
  quiz?: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }[];
  summary: string;
  nextSteps: string;
}

export interface Level {
  id: DifficultyLevel;
  title: string;
  description: string;
  prerequisites?: string[];
  estimatedDuration: string;
  learningOutcomes: string[];
  chapters: Chapter[];
  capstoneProject?: {
    title: string;
    description: string;
    requirements: string[];
    deliverables: string[];
    evaluationCriteria: string[];
  };
}

export interface CourseMeta {
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  icon: string;
  color: string;
  category: string;
  tags: string[];
  prerequisites?: string[];
  targetAudience: string[];
  careerPaths: string[];
  industryApplications: string[];
  toolsAndTechnologies: string[];
  lastUpdated: string;
  version: string;
}

export interface Curriculum {
  meta: CourseMeta;
  levels: Level[];
}

// Helper to create consistent IDs
export function createChapterId(levelIndex: number, chapterIndex: number): string {
  return `L${levelIndex + 1}C${chapterIndex + 1}`;
}

export function createExerciseId(levelIndex: number, chapterIndex: number, exerciseIndex: number): string {
  return `L${levelIndex + 1}C${chapterIndex + 1}E${exerciseIndex + 1}`;
}
