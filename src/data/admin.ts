/**
 * src/data/admin.ts
 * Static mock data powering the admin panel.
 * Replace each slice with real API / DB calls in production.
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
  totalRevenueMock: number;
  mrrMock: number;
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

// ─── Platform overview stats ──────────────────────────────────────────────────

export const PLATFORM_STATS: PlatformStat[] = [
  { label: "Total Users", value: 285412, formatted: "285,412", change: 12.4, trend: "up", icon: "users", accent: "#8b5cf6" },
  { label: "Active Courses", value: 64, formatted: "64", change: 3.2, trend: "up", icon: "book", accent: "#06b6d4" },
  { label: "Total Lessons", value: 2841, formatted: "2,841", change: 8.7, trend: "up", icon: "zap", accent: "#10b981" },
  { label: "Daily Active", value: 18304, formatted: "18,304", change: -2.1, trend: "down", icon: "activity", accent: "#f59e0b" },
  { label: "Completions/day", value: 4219, formatted: "4,219", change: 5.6, trend: "up", icon: "check", accent: "#ec4899" },
  { label: "Mock MRR", value: 48200, formatted: "$48,200", change: 9.1, trend: "up", icon: "dollar", accent: "#f97316" },
];

// ─── Recent activity ──────────────────────────────────────────────────────────

export const RECENT_ACTIVITY: ActivityItem[] = [
  { id: "a1", type: "registration", user: "Sophia Chen", avatar: "SC", description: "New user registered", timestamp: "2026-02-24T10:42:00Z", meta: "via Google OAuth" },
  { id: "a2", type: "enrollment", user: "Marcus Webb", avatar: "MW", description: "Enrolled in React & Next.js", timestamp: "2026-02-24T10:38:00Z" },
  { id: "a3", type: "completion", user: "Priya Sharma", avatar: "PS", description: "Completed Rust Systems Programming", timestamp: "2026-02-24T10:21:00Z", meta: "+500 XP" },
  { id: "a4", type: "achievement", user: "James O'Brien", avatar: "JO", description: "Earned 'Speed Coder' badge", timestamp: "2026-02-24T10:09:00Z", meta: "30-day streak" },
  { id: "a5", type: "registration", user: "Lena Fischer", avatar: "LF", description: "New user registered", timestamp: "2026-02-24T09:55:00Z", meta: "via email" },
  { id: "a6", type: "enrollment", user: "Carlos Mendez", avatar: "CM", description: "Enrolled in Python for Developers", timestamp: "2026-02-24T09:44:00Z" },
  { id: "a7", type: "completion", user: "Ayesha Raza", avatar: "AR", description: "Completed TypeScript Pro", timestamp: "2026-02-24T09:31:00Z", meta: "+380 XP" },
  { id: "a8", type: "report", user: "Tom Anderson", avatar: "TA", description: "Reported a content issue", timestamp: "2026-02-24T09:18:00Z", meta: "Lesson: async/await" },
];

// ─── Users ────────────────────────────────────────────────────────────────────

export const ADMIN_USERS: AdminUser[] = [
  { id: "u1", name: "Alex Dev", email: "demo@zentax.io", avatar: "AD", role: "student", status: "active", joinedAt: "2025-06-12", lastActive: "2026-02-24", streak: 7, xp: 3420, level: 6, enrolledCourses: 3, completedLessons: 42, country: "US" },
  { id: "u2", name: "Sophia Chen", email: "sophia.chen@example.com", avatar: "SC", role: "student", status: "active", joinedAt: "2025-08-03", lastActive: "2026-02-24", streak: 22, xp: 8910, level: 10, enrolledCourses: 5, completedLessons: 118, country: "CA" },
  { id: "u3", name: "Marcus Webb", email: "marcus.webb@example.com", avatar: "MW", role: "student", status: "active", joinedAt: "2025-09-17", lastActive: "2026-02-23", streak: 4, xp: 2105, level: 5, enrolledCourses: 2, completedLessons: 29, country: "GB" },
  { id: "u4", name: "Priya Sharma", email: "priya.sharma@example.com", avatar: "PS", role: "student", status: "active", joinedAt: "2025-04-22", lastActive: "2026-02-24", streak: 45, xp: 24300, level: 16, enrolledCourses: 8, completedLessons: 304, country: "IN" },
  { id: "u5", name: "James O'Brien", email: "james.obrien@example.com", avatar: "JO", role: "student", status: "active", joinedAt: "2025-11-05", lastActive: "2026-02-24", streak: 30, xp: 15680, level: 13, enrolledCourses: 6, completedLessons: 196, country: "IE" },
  { id: "u6", name: "Lena Fischer", email: "lena.fischer@example.com", avatar: "LF", role: "student", status: "pending", joinedAt: "2026-02-24", lastActive: "2026-02-24", streak: 1, xp: 30, level: 1, enrolledCourses: 0, completedLessons: 0, country: "DE" },
  { id: "u7", name: "Carlos Mendez", email: "carlos.mendez@example.com", avatar: "CM", role: "student", status: "active", joinedAt: "2025-07-14", lastActive: "2026-02-22", streak: 0, xp: 4510, level: 7, enrolledCourses: 3, completedLessons: 57, country: "MX" },
  { id: "u8", name: "Ayesha Raza", email: "ayesha.raza@example.com", avatar: "AR", role: "instructor", status: "active", joinedAt: "2025-02-01", lastActive: "2026-02-23", streak: 12, xp: 31000, level: 18, enrolledCourses: 10, completedLessons: 412, country: "PK" },
  { id: "u9", name: "Tom Anderson", email: "tom.anderson@example.com", avatar: "TA", role: "student", status: "suspended", joinedAt: "2025-05-30", lastActive: "2026-02-18", streak: 0, xp: 1200, level: 4, enrolledCourses: 1, completedLessons: 15, country: "AU" },
  { id: "u10", name: "Yuki Tanaka", email: "yuki.tanaka@example.com", avatar: "YT", role: "student", status: "active", joinedAt: "2025-10-08", lastActive: "2026-02-24", streak: 18, xp: 9820, level: 10, enrolledCourses: 4, completedLessons: 123, country: "JP" },
  { id: "u11", name: "Nina Volkov", email: "nina.volkov@example.com", avatar: "NV", role: "instructor", status: "active", joinedAt: "2024-11-15", lastActive: "2026-02-24", streak: 60, xp: 52400, level: 24, enrolledCourses: 12, completedLessons: 680, country: "RU" },
  { id: "admin1", name: "Admin User", email: "admin@zentax.io", avatar: "AU", role: "admin", status: "active", joinedAt: "2024-01-01", lastActive: "2026-02-24", streak: 365, xp: 99999, level: 99, enrolledCourses: 64, completedLessons: 2841, country: "US" },
];

// ─── Courses ──────────────────────────────────────────────────────────────────

export const ADMIN_COURSES: AdminCourse[] = [
  { id: "1", slug: "javascript", title: "JavaScript Mastery", category: "Languages", difficulty: "Beginner", lessonsCount: 48, enrolledCount: 52400, completionRate: 61, rating: 4.9, status: "published", isFeatured: true, isNew: false, createdAt: "2024-03-10", updatedAt: "2026-01-15", instructor: "Nina Volkov", duration: "32h" },
  { id: "2", slug: "typescript", title: "TypeScript Pro", category: "Languages", difficulty: "Intermediate", lessonsCount: 36, enrolledCount: 31800, completionRate: 54, rating: 4.8, status: "published", isFeatured: true, isNew: false, createdAt: "2024-04-18", updatedAt: "2026-01-20", instructor: "Nina Volkov", duration: "24h" },
  { id: "3", slug: "python", title: "Python for Developers", category: "Languages", difficulty: "Beginner", lessonsCount: 44, enrolledCount: 68100, completionRate: 67, rating: 4.9, status: "published", isFeatured: true, isNew: false, createdAt: "2024-02-05", updatedAt: "2026-02-01", instructor: "Ayesha Raza", duration: "28h" },
  { id: "21", slug: "react", title: "React & Next.js", category: "Frontend", difficulty: "Intermediate", lessonsCount: 56, enrolledCount: 48200, completionRate: 49, rating: 4.9, status: "published", isFeatured: true, isNew: true, createdAt: "2025-05-12", updatedAt: "2026-02-18", instructor: "Nina Volkov", duration: "40h" },
  { id: "4", slug: "rust", title: "Rust Systems Programming", category: "Languages", difficulty: "Advanced", lessonsCount: 52, enrolledCount: 14200, completionRate: 38, rating: 4.9, status: "published", isFeatured: false, isNew: true, createdAt: "2025-09-01", updatedAt: "2026-02-10", instructor: "Ayesha Raza", duration: "40h" },
  { id: "41", slug: "docker-kubernetes", title: "Docker & Kubernetes", category: "DevOps & Cloud", difficulty: "Intermediate", lessonsCount: 48, enrolledCount: 22100, completionRate: 44, rating: 4.7, status: "published", isFeatured: false, isNew: false, createdAt: "2024-08-22", updatedAt: "2025-12-05", instructor: "Nina Volkov", duration: "34h" },
  { id: "99", slug: "web3-security", title: "Web3 & Smart Contracts (Draft)", category: "Web3 & Security", difficulty: "Advanced", lessonsCount: 12, enrolledCount: 0, completionRate: 0, rating: 0, status: "draft", isFeatured: false, isNew: false, createdAt: "2026-01-30", updatedAt: "2026-02-20", instructor: "Ayesha Raza", duration: "~28h" },
  { id: "100", slug: "flash-legacy-course", title: "ActionScript & Flash (Legacy)", category: "Game Dev", difficulty: "Beginner", lessonsCount: 20, enrolledCount: 340, completionRate: 22, rating: 3.2, status: "archived", isFeatured: false, isNew: false, createdAt: "2023-07-01", updatedAt: "2024-01-10", instructor: "Unknown", duration: "12h" },
];

// ─── Lessons ──────────────────────────────────────────────────────────────────

export const ADMIN_LESSONS: AdminLesson[] = [
  { id: "l1", slug: "lesson-1", title: "Introduction & Setup", trackId: "1", trackTitle: "JavaScript Mastery", trackSlug: "javascript", type: "article", duration: "8m", xp: 30, isLocked: false, order: 1, completions: 48900, avgScore: null, createdAt: "2024-03-10" },
  { id: "l2", slug: "lesson-2", title: "Variables & Data Types", trackId: "1", trackTitle: "JavaScript Mastery", trackSlug: "javascript", type: "exercise", duration: "14m", xp: 50, isLocked: false, order: 2, completions: 44210, avgScore: 82, createdAt: "2024-03-10" },
  { id: "l3", slug: "lesson-3", title: "Operators & Expressions", trackId: "1", trackTitle: "JavaScript Mastery", trackSlug: "javascript", type: "exercise", duration: "12m", xp: 50, isLocked: false, order: 3, completions: 39800, avgScore: 78, createdAt: "2024-03-10" },
  { id: "l4", slug: "lesson-6", title: "Arrays & Iterators", trackId: "1", trackTitle: "JavaScript Mastery", trackSlug: "javascript", type: "exercise", duration: "22m", xp: 80, isLocked: true, order: 6, completions: 25400, avgScore: 71, createdAt: "2024-03-10" },
  { id: "l5", slug: "lesson-1", title: "Introduction & Setup", trackId: "2", trackTitle: "TypeScript Pro", trackSlug: "typescript", type: "article", duration: "10m", xp: 30, isLocked: false, order: 1, completions: 30100, avgScore: null, createdAt: "2024-04-18" },
  { id: "l6", slug: "lesson-2", title: "Type Annotations & Inference", trackId: "2", trackTitle: "TypeScript Pro", trackSlug: "typescript", type: "exercise", duration: "16m", xp: 60, isLocked: false, order: 2, completions: 27800, avgScore: 79, createdAt: "2024-04-18" },
  { id: "l7", slug: "lesson-1", title: "Python Basics", trackId: "3", trackTitle: "Python for Developers", trackSlug: "python", type: "article", duration: "9m", xp: 30, isLocked: false, order: 1, completions: 65200, avgScore: null, createdAt: "2024-02-05" },
  { id: "l8", slug: "lesson-2", title: "Data Structures", trackId: "3", trackTitle: "Python for Developers", trackSlug: "python", type: "exercise", duration: "20m", xp: 70, isLocked: false, order: 2, completions: 58900, avgScore: 76, createdAt: "2024-02-05" },
  { id: "l9", slug: "lesson-1", title: "React Fundamentals", trackId: "21", trackTitle: "React & Next.js", trackSlug: "react", type: "article", duration: "12m", xp: 40, isLocked: false, order: 1, completions: 45100, avgScore: null, createdAt: "2025-05-12" },
  { id: "l10", slug: "lesson-3", title: "Hooks Deep Dive", trackId: "21", trackTitle: "React & Next.js", trackSlug: "react", type: "exercise", duration: "28m", xp: 100, isLocked: true, order: 3, completions: 31400, avgScore: 74, createdAt: "2025-05-12" },
];

// ─── Analytics ────────────────────────────────────────────────────────────────

export const ANALYTICS: AnalyticsData = {
  userGrowth: [
    { label: "Aug", value: 198000 },
    { label: "Sep", value: 211000 },
    { label: "Oct", value: 224500 },
    { label: "Nov", value: 238000 },
    { label: "Dec", value: 251000 },
    { label: "Jan", value: 268000 },
    { label: "Feb", value: 285412 },
  ],
  enrollmentsByCategory: [
    { label: "Languages", value: 214000 },
    { label: "Frontend", value: 97000 },
    { label: "Backend", value: 64000 },
    { label: "Data & AI", value: 58000 },
    { label: "DevOps", value: 38000 },
    { label: "Mobile", value: 29000 },
    { label: "Systems", value: 18000 },
  ],
  dailyLessons: [
    { label: "Mon", value: 38200 },
    { label: "Tue", value: 41000 },
    { label: "Wed", value: 45600 },
    { label: "Thu", value: 43100 },
    { label: "Fri", value: 36800 },
    { label: "Sat", value: 28400 },
    { label: "Sun", value: 24900 },
  ],
  topCourses: [
    { title: "Python for Developers", enrollments: 68100, rating: 4.9 },
    { title: "JavaScript Mastery", enrollments: 52400, rating: 4.9 },
    { title: "React & Next.js", enrollments: 48200, rating: 4.9 },
    { title: "TypeScript Pro", enrollments: 31800, rating: 4.8 },
    { title: "Java Modern Dev", enrollments: 38500, rating: 4.7 },
  ],
  retentionRate: 68,
  avgSessionMin: 34,
  totalRevenueMock: 582400,
  mrrMock: 48200,
};

// ─── Settings defaults ────────────────────────────────────────────────────────

export const DEFAULT_SETTINGS: PlatformSettings = {
  platformName: "Zentax",
  siteUrl: "https://zentax.io",
  supportEmail: "support@zentax.io",
  registrationOpen: true,
  maintenanceMode: false,
  featuredCourseCount: 6,
  maxFreeCoursesPerUser: 3,
  enableOAuthGitHub: true,
  enableOAuthGoogle: true,
  enableEmailVerification: false,
  smtpHost: "smtp.sendgrid.net",
  analyticsId: "G-XXXXXXXXXX",
};
