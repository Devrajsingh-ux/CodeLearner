import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/appwriteServer";

export async function GET(_req: NextRequest) {
  try {
    const client = createAdminClient();

    // Try a lightweight call to verify connectivity/credentials
    let usersSample: any = null;
    try {
      // node-appwrite Users.list() returns a promise; limit to 1 to be lightweight
      // @ts-ignore
      const res = await client.users.list({ limit: 1 });
      usersSample = { ok: true, count: res.total ?? (res?.users?.length ?? 0) };
    } catch (uerr) {
      usersSample = { ok: false, error: String(uerr) };
    }

    return NextResponse.json({
      ok: true,
      env: {
        NEXT_PUBLIC_APPWRITE_ENDPOINT: Boolean(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT),
        NEXT_PUBLIC_APPWRITE_PROJECT_ID: Boolean(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
        APPWRITE_API_KEY: Boolean(process.env.APPWRITE_API_KEY),
      },
      users: usersSample,
    });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || String(err) }, { status: 500 });
  }
}
