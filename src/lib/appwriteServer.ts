/**
 * Server-side Appwrite SDK (node-appwrite).
 * Only import this in Next.js API routes — never in client components.
 * Uses APPWRITE_API_KEY which bypasses permission checks.
 */
import { Client, Users, Databases } from "node-appwrite";

/**
 * Validates that required environment variables are set.
 * Logs errors in development, throws in production.
 */
function validateEnvironment(): { valid: boolean; missing: string[] } {
  const missingVars: string[] = [];

  if (!process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT) {
    missingVars.push("NEXT_PUBLIC_APPWRITE_ENDPOINT");
  }
  if (!process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID) {
    missingVars.push("NEXT_PUBLIC_APPWRITE_PROJECT_ID");
  }
  if (!process.env.APPWRITE_API_KEY) {
    missingVars.push("APPWRITE_API_KEY");
  }

  if (missingVars.length > 0) {
    const message = `Missing required environment variables: ${missingVars.join(', ')}`;
    if (process.env.NODE_ENV === 'production') {
      throw new Error(message);
    }
    console.error(`CRITICAL: ${message}`);
  }

  return { valid: missingVars.length === 0, missing: missingVars };
}

export function createAdminClient() {
  validateEnvironment();

  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "")
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "")
    .setKey(process.env.APPWRITE_API_KEY || "");

  return {
    users: new Users(client),
    databases: new Databases(client),
  };
}

// ── Collection constants ──────────────────────────────────────────────────────

export const DB_ID            = process.env.APPWRITE_DATABASE_ID ?? "zentax_db";
export const COL_COURSES      = "courses";
export const COL_LESSONS      = "lessons";
export const COL_SETTINGS     = "settings";
export const COL_TESTIMONIALS = "testimonials";
export const COL_PROBLEMS     = "problems";
export const COL_LANGUAGES    = "languages";
export const COL_SNIPPETS     = "snippets";
export const COL_ENROLLMENTS  = "enrollments";
export const COL_PROGRESS     = "progress";
export const COL_ACTIVITY     = "activity";
export const COL_STREAKS      = "streaks";
export const COL_PROBLEMS_SOLVED = "problems_solved";
export const SETTINGS_DOC     = "platform";
export const COL_NOTIFICATIONS = "notifications";

