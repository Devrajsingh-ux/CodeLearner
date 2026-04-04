/**
 * Server-side Appwrite SDK (node-appwrite).
 * Only import this in Next.js API routes — never in client components.
 * Uses APPWRITE_API_KEY which bypasses permission checks.
 */
import { Client, Users, Databases } from "node-appwrite";
import type { NextRequest } from "next/server";
import { verifyToken, type TokenPayload } from "@/lib/auth";

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

// ── Secure Admin auth guard (uses JWT verification) ──────────────────────────

/**
 * Verifies admin authentication using JWT tokens.
 * This is secure - tokens are cryptographically signed and verified.
 *
 * @param request - The NextRequest object
 * @returns Promise<boolean> - true if user is authenticated admin, false otherwise
 */
export async function requireAdminAuth(request: NextRequest): Promise<TokenPayload | null> {
  try {
    const accessToken = request.cookies.get("cl_access_token")?.value;

    if (!accessToken) {
      return null;
    }

    const payload = await verifyToken(accessToken);

    if (!payload || payload.type !== 'access') {
      return null;
    }

    if (payload.role !== "admin") {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

/**
 * Gets user data from JWT token for API routes.
 * Returns null if not authenticated.
 */
export async function getAuthenticatedUser(request: NextRequest): Promise<TokenPayload | null> {
  try {
    const accessToken = request.cookies.get("cl_access_token")?.value;

    if (!accessToken) {
      // Fallback to legacy cookie during migration
      const legacyCookie = request.cookies.get("cl_session")?.value;
      if (legacyCookie) {
        try {
          const parsed = JSON.parse(legacyCookie) as { id?: string; role?: string };
          if (parsed.id) {
            return {
              id: parsed.id,
              role: parsed.role || 'user',
              type: 'access',
              iat: Date.now() / 1000,
              exp: (Date.now() / 1000) + 3600,
            } as TokenPayload;
          }
        } catch {
          // Invalid legacy cookie
        }
      }
      return null;
    }

    const payload = await verifyToken(accessToken);

    if (!payload || payload.type !== 'access') {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

/**
 * @deprecated Use requireAdminAuth instead - this uses unsigned cookies and is insecure
 * Kept only for backwards compatibility during migration
 */
export function requireAdminCookie(request: NextRequest): boolean {
  if (process.env.NODE_ENV === 'production') {
    console.warn("SECURITY WARNING: requireAdminCookie is deprecated. Use requireAdminAuth instead.");
  }
  try {
    const raw = request.cookies.get("cl_session")?.value;
    if (!raw) return false;
    const session = JSON.parse(raw) as { role?: string };
    return session.role === "admin";
  } catch {
    return false;
  }
}
