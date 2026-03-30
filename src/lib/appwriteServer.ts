/**
 * Server-side Appwrite SDK (node-appwrite).
 * Only import this in Next.js API routes — never in client components.
 * Uses APPWRITE_API_KEY which bypasses permission checks.
 */
import { Client, Users, Databases } from "node-appwrite";
import type { NextRequest } from "next/server";

export function createAdminClient() {
  const client = new Client()
    .setEndpoint(
      process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ?? "https://sgp.cloud.appwrite.io/v1",
    )
    .setProject(
      process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID ?? "69aa826d003e711776fd",
    )
    .setKey(process.env.APPWRITE_API_KEY ?? "");

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
export const COL_LANGUAGES    = "languages"; // new collection for supported languages
export const COL_SNIPPETS     = "snippets";
export const COL_ENROLLMENTS  = "enrollments"; // user course enrollments
export const COL_PROGRESS     = "progress";    // lesson completion tracking
export const COL_ACTIVITY     = "activity";    // daily user activity
export const COL_STREAKS      = "streaks";     // user streak tracking
export const COL_PROBLEMS_SOLVED = "problems_solved"; // coding problems tracking
export const SETTINGS_DOC     = "platform";

// ── Admin auth guard ──────────────────────────────────────────────────────────

export function requireAdminCookie(request: NextRequest): boolean {
  try {
    const raw = request.cookies.get("cl_session")?.value;
    if (!raw) return false;
    const session = JSON.parse(raw) as { role?: string };
    return session.role === "admin";
  } catch {
    return false;
  }
}
