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

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "student" | "instructor" | "admin";
}
