import { NextResponse } from "next/server";
import { createAdminClient, DB_ID, COL_SETTINGS, SETTINGS_DOC } from "@/lib/appwriteServer";

// Public endpoint (no admin cookie) to retrieve platform settings from Appwrite.
export async function GET() {
  try {
    const { databases } = createAdminClient();
    const doc = await databases.getDocument(DB_ID, COL_SETTINGS, SETTINGS_DOC);
    return NextResponse.json({ settings: doc });
  } catch (e: any) {
    // If doc not found, return 404 with null settings (no in-repo defaults)
    if (e?.code === 404) return NextResponse.json({ settings: null }, { status: 404 });
    return NextResponse.json({ error: e?.message ?? "Failed" }, { status: 500 });
  }
}
