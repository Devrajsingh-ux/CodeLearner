/**
 * /api/admin/settings
 *
 * GET  → read the platform settings document from Appwrite
 * PUT  → update / upsert the settings document
 */
import { NextRequest, NextResponse } from "next/server";
import {
  createAdminClient,
  DB_ID,
  COL_SETTINGS,
  SETTINGS_DOC,
  requireAdminCookie,
} from "@/lib/appwriteServer";
import type { PlatformSettings } from "@/data/admin";

// Empty baseline used only when the Appwrite document doesn't exist yet.
const EMPTY_SETTINGS: PlatformSettings = {
  platformName: "",
  siteUrl: "",
  supportEmail: "",
  registrationOpen: true,
  maintenanceMode: false,
  featuredCourseCount: 6,
  maxFreeCoursesPerUser: 3,
  enableOAuthGitHub: false,
  enableOAuthGoogle: false,
  enableEmailVerification: false,
  smtpHost: "",
  analyticsId: "",
};

export async function GET(request: NextRequest) {
  if (!requireAdminCookie(request))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  try {
    const { databases } = createAdminClient();
    const doc = await databases.getDocument(DB_ID, COL_SETTINGS, SETTINGS_DOC);
    const settings: PlatformSettings = {
      platformName          : doc.platformName           ?? "",
      siteUrl               : doc.siteUrl                ?? "",
      supportEmail          : doc.supportEmail           ?? "",
      registrationOpen      : doc.registrationOpen       ?? true,
      maintenanceMode       : doc.maintenanceMode        ?? false,
      featuredCourseCount   : doc.featuredCourseCount    ?? 6,
      maxFreeCoursesPerUser : doc.maxFreeCoursesPerUser  ?? 3,
      enableOAuthGitHub     : doc.enableOAuthGitHub      ?? false,
      enableOAuthGoogle     : doc.enableOAuthGoogle      ?? false,
      enableEmailVerification: doc.enableEmailVerification ?? false,
      smtpHost              : doc.smtpHost               ?? "",
      analyticsId           : doc.analyticsId            ?? "",
    };
    return NextResponse.json({ settings });
  } catch (e: any) {
    // Doc doesn't exist yet — return empty settings
    if (e?.code === 404) return NextResponse.json({ settings: EMPTY_SETTINGS });
    return NextResponse.json({ error: e?.message ?? "Failed" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  if (!requireAdminCookie(request))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  try {
    const body = (await request.json()) as Partial<PlatformSettings>;
    const { databases } = createAdminClient();

    // Try updating; if doc doesn't exist, create it
    let doc: any;
    try {
      doc = await databases.updateDocument(DB_ID, COL_SETTINGS, SETTINGS_DOC, body);
    } catch (e: any) {
      if (e?.code === 404) {
        doc = await databases.createDocument(
          DB_ID,
          COL_SETTINGS,
          SETTINGS_DOC,
          { ...EMPTY_SETTINGS, ...body },
        );
      } else {
        throw e;
      }
    }

    return NextResponse.json({ ok: true, settings: doc });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Failed" }, { status: 500 });
  }
}
