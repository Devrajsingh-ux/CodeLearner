export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  role: "student" | "instructor" | "admin";
  joinedAt: string;
  streak: number;
  xp: number;
  level: number;
}

export type TrackCategory =
  | "Languages"
  | "Frontend"
  | "Backend"
  | "Data & AI"
  | "Mobile"
  | "DevOps & Cloud"
  | "Systems"
  | "Web3 & Security"
  | "Game Dev";

export interface Track {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  lessonsCount: number;
  duration: string;
  enrolledCount: number;
  rating: number;
  tags: string[];
  category: TrackCategory;
  isFeatured?: boolean;
  isNew?: boolean;
}

export interface Lesson {
  id: string;
  slug: string;
  trackId: string;
  title: string;
  description: string;
  duration: string;
  type: "video" | "article" | "exercise" | "quiz";
  order: number;
  isLocked?: boolean;
}

export interface Progress {
  trackId: string;
  completedLessons: number;
  totalLessons: number;
  lastAccessedAt: string;
  percentComplete: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
  course: string;
}

export interface Stat {
  label: string;
  value: string;
  suffix?: string;
  description: string;
}

// ── Problems ─────────────────────────────────────────────────────────────────

export type ProblemDifficulty = "Easy" | "Medium" | "Hard";

export interface ProblemExample {
  input: string;
  output: string;
  explanation?: string;
}

export interface Problem {
  id: string;
  number: number;
  title: string;
  difficulty: ProblemDifficulty;
  tags: string[];
  acceptance: number;
  description: string;
  examples: ProblemExample[];
  constraints: string[];
  hints: string[];
  starterCode: Partial<Record<string, string>>;
}

export interface SupportedLanguage {
  id: string;
  label: string;
  monacoId: string;
  icon: string;
  color: string;
  judge0Id: number;
  fileExt: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  username: string;
  avatar?: string;
  role: "student" | "instructor" | "admin";
  xp: number;
  level: number;
  streak: number;
}
