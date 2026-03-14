/**
 * GET /api/admin/setup
 * Idempotent — creates the Appwrite database and all required collections/attributes
 * if they don't already exist. Safe to call multiple times.
 * Must be called once after deploying before using the admin panel.
 */
import { NextRequest, NextResponse } from "next/server";
import { createAdminClient, DB_ID, COL_COURSES, COL_LESSONS, COL_SETTINGS, SETTINGS_DOC, requireAdminCookie } from "@/lib/appwriteServer";
import { ID } from "node-appwrite";
import type { PlatformSettings } from "@/data/admin";

const log: string[] = [];
function note(msg: string) { log.push(msg); }

async function tryCreate(label: string, fn: () => Promise<unknown>) {
  try {
    await fn();
    note(`✓ Created ${label}`);
  } catch (e: any) {
    if (e?.code === 409 || e?.message?.includes("already exists")) {
      note(`↩ ${label} already exists`);
    } else {
      note(`✗ ${label} failed: ${e?.message}`);
    }
  }
}

export async function GET(request: NextRequest) {
  if (!requireAdminCookie(request)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { databases } = createAdminClient();

  // ── 1. Database ────────────────────────────────────────────────────────────
  await tryCreate("database zentax_db", () =>
    databases.create({ databaseId: DB_ID, name: "Zentax" }),
  );

  // ── 2. Courses collection + attributes ─────────────────────────────────────
  await tryCreate("courses collection", () =>
    databases.createCollection({
      databaseId: DB_ID,
      collectionId: COL_COURSES,
      name: "Courses",
      permissions: [], // server API key bypasses permissions
    }),
  );

  const courseAttrs: Array<() => Promise<unknown>> = [
    () => databases.createStringAttribute({ databaseId: DB_ID, collectionId: COL_COURSES, key: "title", size: 255, required: true }),
    () => databases.createStringAttribute({ databaseId: DB_ID, collectionId: COL_COURSES, key: "slug", size: 100, required: true }),
    () => databases.createStringAttribute({ databaseId: DB_ID, collectionId: COL_COURSES, key: "category", size: 100, required: true }),
    () => databases.createEnumAttribute({ databaseId: DB_ID, collectionId: COL_COURSES, key: "difficulty", elements: ["Beginner","Intermediate","Advanced"], required: true, xdefault: "Beginner" }),
    () => databases.createIntegerAttribute({ databaseId: DB_ID, collectionId: COL_COURSES, key: "lessonsCount", required: true, xdefault: 0 }),
    () => databases.createIntegerAttribute({ databaseId: DB_ID, collectionId: COL_COURSES, key: "enrolledCount", required: true, xdefault: 0 }),
    () => databases.createFloatAttribute({ databaseId: DB_ID, collectionId: COL_COURSES, key: "completionRate", required: true, xdefault: 0 }),
    () => databases.createFloatAttribute({ databaseId: DB_ID, collectionId: COL_COURSES, key: "rating", required: true, xdefault: 0 }),
    () => databases.createEnumAttribute({ databaseId: DB_ID, collectionId: COL_COURSES, key: "status", elements: ["published","draft","archived"], required: true, xdefault: "draft" }),
    () => databases.createBooleanAttribute({ databaseId: DB_ID, collectionId: COL_COURSES, key: "isFeatured", required: true, xdefault: false }),
    () => databases.createBooleanAttribute({ databaseId: DB_ID, collectionId: COL_COURSES, key: "isNew", required: true, xdefault: false }),
    () => databases.createStringAttribute({ databaseId: DB_ID, collectionId: COL_COURSES, key: "instructor", size: 255, required: false, xdefault: "" }),
    () => databases.createStringAttribute({ databaseId: DB_ID, collectionId: COL_COURSES, key: "duration", size: 50, required: false, xdefault: "" }),
    () => databases.createStringAttribute({ databaseId: DB_ID, collectionId: COL_COURSES, key: "description", size: 2000, required: false, xdefault: "" }),
    () => databases.createStringAttribute({ databaseId: DB_ID, collectionId: COL_COURSES, key: "tags", size: 500, required: false, xdefault: "" }),
  ];
  for (const fn of courseAttrs) await tryCreate("course attr", fn);

  // ── 3. Lessons collection + attributes ─────────────────────────────────────
  await tryCreate("lessons collection", () =>
    databases.createCollection({
      databaseId: DB_ID,
      collectionId: COL_LESSONS,
      name: "Lessons",
      permissions: [],
    }),
  );

  const lessonAttrs: Array<() => Promise<unknown>> = [
    () => databases.createStringAttribute({ databaseId: DB_ID, collectionId: COL_LESSONS, key: "title", size: 255, required: true }),
    () => databases.createStringAttribute({ databaseId: DB_ID, collectionId: COL_LESSONS, key: "slug", size: 100, required: true }),
    () => databases.createStringAttribute({ databaseId: DB_ID, collectionId: COL_LESSONS, key: "trackId", size: 100, required: true }),
    () => databases.createStringAttribute({ databaseId: DB_ID, collectionId: COL_LESSONS, key: "trackTitle", size: 255, required: false, xdefault: "" }),
    () => databases.createStringAttribute({ databaseId: DB_ID, collectionId: COL_LESSONS, key: "trackSlug", size: 100, required: false, xdefault: "" }),
    () => databases.createEnumAttribute({ databaseId: DB_ID, collectionId: COL_LESSONS, key: "type", elements: ["article","exercise","quiz"], required: true, xdefault: "article" }),
    () => databases.createStringAttribute({ databaseId: DB_ID, collectionId: COL_LESSONS, key: "duration", size: 50, required: false, xdefault: "" }),
    () => databases.createIntegerAttribute({ databaseId: DB_ID, collectionId: COL_LESSONS, key: "xp", required: true, xdefault: 0 }),
    () => databases.createBooleanAttribute({ databaseId: DB_ID, collectionId: COL_LESSONS, key: "isLocked", required: true, xdefault: false }),
    () => databases.createIntegerAttribute({ databaseId: DB_ID, collectionId: COL_LESSONS, key: "order", required: true, xdefault: 0 }),
    () => databases.createIntegerAttribute({ databaseId: DB_ID, collectionId: COL_LESSONS, key: "completions", required: true, xdefault: 0 }),
    () => databases.createFloatAttribute({ databaseId: DB_ID, collectionId: COL_LESSONS, key: "avgScore", required: false }),
  ];
  for (const fn of lessonAttrs) await tryCreate("lesson attr", fn);

  // ── 4. Settings collection + attributes ────────────────────────────────────
  await tryCreate("settings collection", () =>
    databases.createCollection({
      databaseId: DB_ID,
      collectionId: COL_SETTINGS,
      name: "Settings",
      permissions: [],
    }),
  );

  const settingsAttrs: Array<() => Promise<unknown>> = [
    () => databases.createStringAttribute({ databaseId: DB_ID, collectionId: COL_SETTINGS, key: "platformName", size: 100, required: false, xdefault: "Zentax" }),
    () => databases.createStringAttribute({ databaseId: DB_ID, collectionId: COL_SETTINGS, key: "siteUrl", size: 500, required: false, xdefault: "https://zentax.io" }),
    () => databases.createStringAttribute({ databaseId: DB_ID, collectionId: COL_SETTINGS, key: "supportEmail", size: 255, required: false, xdefault: "support@zentax.io" }),
    () => databases.createBooleanAttribute({ databaseId: DB_ID, collectionId: COL_SETTINGS, key: "registrationOpen", required: false, xdefault: true }),
    () => databases.createBooleanAttribute({ databaseId: DB_ID, collectionId: COL_SETTINGS, key: "maintenanceMode", required: false, xdefault: false }),
    () => databases.createIntegerAttribute({ databaseId: DB_ID, collectionId: COL_SETTINGS, key: "featuredCourseCount", required: false, xdefault: 6 }),
    () => databases.createIntegerAttribute({ databaseId: DB_ID, collectionId: COL_SETTINGS, key: "maxFreeCoursesPerUser", required: false, xdefault: 3 }),
    () => databases.createBooleanAttribute({ databaseId: DB_ID, collectionId: COL_SETTINGS, key: "enableOAuthGitHub", required: false, xdefault: true }),
    () => databases.createBooleanAttribute({ databaseId: DB_ID, collectionId: COL_SETTINGS, key: "enableOAuthGoogle", required: false, xdefault: true }),
    () => databases.createBooleanAttribute({ databaseId: DB_ID, collectionId: COL_SETTINGS, key: "enableEmailVerification", required: false, xdefault: false }),
    () => databases.createStringAttribute({ databaseId: DB_ID, collectionId: COL_SETTINGS, key: "smtpHost", size: 255, required: false, xdefault: "" }),
    () => databases.createStringAttribute({ databaseId: DB_ID, collectionId: COL_SETTINGS, key: "analyticsId", size: 100, required: false, xdefault: "" }),
  ];
  for (const fn of settingsAttrs) await tryCreate("setting attr", fn);

  // ── 5. Seed default settings document ─────────────────────────────────────
  await tryCreate("settings document", async () => {
    const defaults: Omit<PlatformSettings, never> = {
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
      analyticsId: "",
    };
    await databases.createDocument({
      databaseId: DB_ID,
      collectionId: COL_SETTINGS,
      documentId: SETTINGS_DOC,
      data: defaults,
    });
  });

  return NextResponse.json({ ok: true, log });
}
