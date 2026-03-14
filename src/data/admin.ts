/**
 * src/data/admin.ts
 * Shared TypeScript types for the admin panel.
 * All data is fetched live from Appwrite via the admin API routes.
 */

// ─── Shared types ─────────────────────────────────────────────────────────────

export type UserRole = "student" | "instructor" | "admin";
export type UserStatus = "active" | "suspended" | "pending";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  status: UserStatus;
  joinedAt: string;
  lastActive: string;
  streak: number;
  xp: number;
  level: number;
  enrolledCourses: number;
  completedLessons: number;
  country: string;
}

export type CourseStatus = "published" | "draft" | "archived";

export interface AdminCourse {
  id: string;
  slug: string;
  title: string;
  description: string;
  tags: string[];
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  lessonsCount: number;
  enrolledCount: number;
  completionRate: number;
  rating: number;
  status: CourseStatus;
  isFeatured: boolean;
  isNew: boolean;
  createdAt: string;
  updatedAt: string;
  instructor: string;
  duration: string;
}

export type LessonType = "article" | "exercise" | "quiz";

export interface AdminLesson {
  id: string;
  slug: string;
  title: string;
  trackId: string;
  trackTitle: string;
  trackSlug: string;
  type: LessonType;
  duration: string;
  xp: number;
  isLocked: boolean;
  order: number;
  completions: number;
  avgScore: number | null;
  createdAt: string;
}

export interface ActivityItem {
  id: string;
  type: "registration" | "enrollment" | "completion" | "achievement" | "report";
  user: string;
  avatar: string;
  description: string;
  timestamp: string;
  meta?: string;
}

export interface PlatformStat {
  label: string;
  value: number;
  formatted: string;
  change: number;
  trend: "up" | "down" | "flat";
  icon: string;
  accent: string;
}

export interface ChartPoint {
  label: string;
  value: number;
}

export interface AnalyticsData {
  userGrowth: ChartPoint[];
  enrollmentsByCategory: ChartPoint[];
  dailyLessons: ChartPoint[];
  topCourses: { title: string; enrollments: number; rating: number }[];
  retentionRate: number;
  avgSessionMin: number;
  totalRevenue: number;
  mrr: number;
}

export interface PlatformSettings {
  platformName: string;
  siteUrl: string;
  supportEmail: string;
  registrationOpen: boolean;
  maintenanceMode: boolean;
  featuredCourseCount: number;
  maxFreeCoursesPerUser: number;
  enableOAuthGitHub: boolean;
  enableOAuthGoogle: boolean;
  enableEmailVerification: boolean;
  smtpHost: string;
  analyticsId: string;
}

// DEFAULT_SETTINGS removed — all settings are fetched live from Appwrite.
// Use /api/admin/settings (GET) to read and (PUT) to write platform config.
