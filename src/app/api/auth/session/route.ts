/**
 * /api/auth/session
 *
 * Stores a minimal AuthUser snapshot in an HttpOnly, Secure, Same-Site cookie
 * so it is NEVER accessible to JavaScript running on the page.
 *
 * GET    → returns the current user from cookie  (or { user: null })
 * POST   → sets the cookie with the provided user object
 * DELETE → clears the cookie (logout)
 */

import { NextRequest, NextResponse } from "next/server";
import type { AuthUser } from "@/types";

const COOKIE_NAME = "cl_session";
const MAX_AGE     = 7 * 24 * 60 * 60; // 7 days in seconds

const cookieOpts = {
  httpOnly : true,
  secure   : process.env.NODE_ENV === "production",
  sameSite : "lax"  as const,
  maxAge   : MAX_AGE,
  path     : "/",
};

export async function GET(req: NextRequest) {
  const raw = req.cookies.get(COOKIE_NAME)?.value;
  if (!raw) return NextResponse.json({ user: null });

  try {
    const user = JSON.parse(raw) as AuthUser;
    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ user: null });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { user } = (await req.json()) as { user?: AuthUser };
    if (!user?.id) {
      return NextResponse.json({ error: "Invalid session data" }, { status: 400 });
    }
    const res = NextResponse.json({ ok: true });
    res.cookies.set(COOKIE_NAME, JSON.stringify(user), cookieOpts);
    return res;
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, "", { ...cookieOpts, maxAge: 0 });
  return res;
}
