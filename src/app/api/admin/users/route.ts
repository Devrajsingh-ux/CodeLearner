/**
 * /api/admin/users
 *
 * GET    → list all Appwrite users (real data)
 * PATCH  → update user role (prefs) or suspend/restore (status)
 * DELETE → permanently delete a user
 */
import { NextRequest, NextResponse } from "next/server";
import { Query } from "node-appwrite";
import {
  createAdminClient,
  requireAdminCookie,
} from "@/lib/appwriteServer";
import type { AdminUser, UserRole, UserStatus } from "@/data/admin";

// Map an Appwrite user object → AdminUser shape
function mapUser(u: any): AdminUser {
  const prefs     = u.prefs ?? {};
  const isActive  = u.status === true;
  const isVerified = u.emailVerification === true;
  const status: UserStatus = !isActive
    ? "suspended"
    : !isVerified
      ? "pending"
      : "active";
  const role: UserRole =
    prefs.role === "admin"
      ? "admin"
      : prefs.role === "instructor"
        ? "instructor"
        : "student";
  const nameWords = (u.name || "?").split(" ");
  const avatar    = nameWords.map((w: string) => w[0] ?? "").join("").slice(0, 2).toUpperCase();

  return {
    id              : u.$id,
    name            : u.name || "Unnamed",
    email           : u.email || "",
    avatar,
    role,
    status,
    joinedAt        : (u.registration ?? "").slice(0, 10),
    lastActive      : (u.$updatedAt   ?? "").slice(0, 10),
    streak          : prefs.streak          ?? 0,
    xp              : prefs.xp              ?? 0,
    level           : prefs.level           ?? 1,
    enrolledCourses : prefs.enrolledCourses ?? 0,
    completedLessons: prefs.completedLessons ?? 0,
    country         : prefs.country         ?? "",
  };
}

export async function GET(request: NextRequest) {
  if (!requireAdminCookie(request))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  try {
    const { users } = createAdminClient();
    const resp = await users.list([Query.limit(100), Query.orderDesc("registration")]);
    return NextResponse.json({ users: resp.users.map(mapUser), total: resp.total });
  } catch (e: any) {
    const msg = e?.message ?? "Failed";
    const hint = !process.env.APPWRITE_API_KEY ? " — APPWRITE_API_KEY is not set in .env.local" : "";
    return NextResponse.json({ error: msg + hint }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  if (!requireAdminCookie(request))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  try {
    const { id, action, role } = (await request.json()) as {
      id: string;
      action: "setRole" | "suspend" | "restore";
      role?: UserRole;
    };
    const { users } = createAdminClient();

    if (action === "setRole" && role) {
      const current = await users.get(id);
      await users.updatePrefs(id, { ...(current.prefs ?? {}), role });
    } else if (action === "suspend") {
      await users.updateStatus(id, false);   // false = blocked
    } else if (action === "restore") {
      await users.updateStatus(id, true);    // true  = active
    }

    const updated = await users.get(id);
    return NextResponse.json({ user: mapUser(updated) });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Failed" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!requireAdminCookie(request))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  try {
    const { id } = (await request.json()) as { id: string };
    const { users } = createAdminClient();
    await users.delete(id);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Failed" }, { status: 500 });
  }
}
