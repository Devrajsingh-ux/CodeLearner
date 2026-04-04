/**
 * Input validation schemas using Zod
 * Protects against malicious input and ensures data integrity
 */

import { z } from 'zod';

// Common schemas
const userIdSchema = z.string().min(1, 'User ID is required').max(100);
const courseIdSchema = z.string().min(1, 'Course ID is required').max(100);
const lessonIdSchema = z.string().min(1, 'Lesson ID is required').max(100);
const dateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)');

// Activity API schemas
export const activityPostSchema = z.object({
  type: z.enum(['lesson', 'problem', 'quest'] as const),
  xpEarned: z.number().min(0).max(1000).default(0),
  minutesStudied: z.number().min(0).max(1440).default(0), // Max 24 hours
  problemId: z.string().max(100).optional().nullable(),
  questId: z.string().max(100).optional().nullable(),
});

export const activityGetSchema = z.object({
  days: z.coerce.number().min(1).max(365).default(7),
});

// Enrollment API schemas
export const enrollmentPostSchema = z.object({
  courseId: courseIdSchema,
  courseSlug: z.string().min(1).max(100),
  courseTitle: z.string().min(1).max(500),
});

// Quests API schemas
export const questPostSchema = z.object({
  questId: z.string().min(1).max(100),
  type: z.enum(['complete_lessons', 'study_time', 'earn_xp'] as const),
  targetValue: z.number().min(1).max(10000),
  currentValue: z.number().min(0).max(10000).default(0),
});

// Progress API schemas
export const progressPostSchema = z.object({
  courseId: courseIdSchema,
  courseSlug: z.string().min(1).max(100),
  lessonId: lessonIdSchema,
  lessonSlug: z.string().min(1).max(100),
  xpEarned: z.number().min(0).max(1000).default(0),
  timeSpent: z.number().min(0).max(7200).default(0), // Max 2 hours
});

// Code compilation schemas
export const compileSchema = z.object({
  language: z.enum(['javascript', 'typescript', 'python', 'cpp', 'java', 'go', 'rust'] as const),
  code: z.string().min(1).max(50000), // Max 50KB of code
  input: z.string().max(10000).default(''), // Max 10KB of input
  timeout: z.number().min(1).max(30).default(10), // Max 30 seconds
});

// Admin API schemas
export const adminUserUpdateSchema = z.object({
  userId: userIdSchema,
  role: z.enum(['user', 'instructor', 'admin'] as const).optional(),
  status: z.enum(['active', 'suspended', 'banned'] as const).optional(),
  name: z.string().min(1).max(100).optional(),
});

export const adminCourseSchema = z.object({
  title: z.string().min(1).max(500),
  description: z.string().max(2000),
  category: z.string().min(1).max(100),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced'] as const),
  estimatedTime: z.number().min(1).max(1000), // Hours
  language: z.string().min(1).max(50),
  tags: z.array(z.string().max(50)).max(20),
  isPublished: z.boolean().default(false),
});

// Authentication schemas
export const loginSchema = z.object({
  email: z.string().email('Invalid email format').max(254),
  password: z.string().min(8, 'Password must be at least 8 characters').max(128),
});

export const registerSchema = z.object({
  email: z.string().email('Invalid email format').max(254),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(128)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one lowercase letter, one uppercase letter, and one number'
    ),
  name: z.string().min(1, 'Name is required').max(100),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Reset token is required'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(128)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one lowercase letter, one uppercase letter, and one number'
    ),
});

// File upload schema
export const fileUploadSchema = z.object({
  filename: z.string().min(1).max(255),
  filesize: z.number().min(1).max(10 * 1024 * 1024), // Max 10MB
  mimetype: z.string().refine(
    type => [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ].includes(type),
    'Invalid file type'
  ),
});

/**
 * Generic validation helper
 */
export function validateInput<T>(schema: z.ZodSchema<T>, data: unknown): {
  success: boolean;
  data?: T;
  errors?: string[];
} {
  try {
    const result = schema.safeParse(data);

    if (result.success) {
      return { success: true, data: result.data };
    }

    const errors = result.error.issues.map((issue) =>
      `${issue.path.join('.')}: ${issue.message}`
    );

    return { success: false, errors };
  } catch (error) {
    return {
      success: false,
      errors: ['Validation error occurred']
    };
  }
}

/**
 * Sanitize HTML input to prevent XSS
 */
export function sanitizeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Sanitize string input
 */
export function sanitizeString(input: string, maxLength: number = 1000): string {
  return input
    .trim()
    .slice(0, maxLength)
    .replace(/[\x00-\x1F\x7F-\x9F]/g, ''); // Remove control characters
}

/**
 * Rate limit configuration
 */
export const rateLimitConfig = {
  auth: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 5, // 5 attempts per 15 minutes
  },
  api: {
    windowMs: 1 * 60 * 1000, // 1 minute
    maxRequests: 60, // 60 requests per minute
  },
  compile: {
    windowMs: 1 * 60 * 1000, // 1 minute
    maxRequests: 10, // 10 compilations per minute
  },
  admin: {
    windowMs: 1 * 60 * 1000, // 1 minute
    maxRequests: 30, // 30 requests per minute
  },
} as const;