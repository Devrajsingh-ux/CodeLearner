/**
 * GET /api/admin/stats
 * Returns real user, course, lesson counts + recent registrations as activity feed.
 */
import { NextRequest, NextResponse } from "next/server";
import { Query } from "node-appwrite";
import { createAdminClient, DB_ID, COL_COURSES, COL_LESSONS } from "@/lib/appwriteServer";
import { requireAdminAuth } from "@/security/auth";

export async function GET(request: NextRequest) {
  if (!(await requireAdminAuth(request)))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { users, databases } = createAdminClient();

  // Run all queries in parallel for speed
  const [usersResp, coursesResp, lessonsResp, recentResp] = await Promise.allSettled([
    users.list([Query.limit(1)]),
    databases.listDocuments(DB_ID, COL_COURSES, [Query.limit(1)]),
    databases.listDocuments(DB_ID, COL_LESSONS, [Query.limit(1)]),
    users.list([Query.orderDesc("registration"), Query.limit(8)]),
  ]);

  // If the primary users query failed, surface the error (likely missing API key)
  const appwriteError = usersResp.status === "rejected"
    ? (usersResp.reason as any)?.message ?? "Appwrite admin client error"
    : null;

  const totalUsers   = usersResp.status   === "fulfilled" ? usersResp.value.total   : 0;
  const totalCourses = coursesResp.status === "fulfilled" ? coursesResp.value.total : 0;
  const totalLessons = lessonsResp.status === "fulfilled" ? lessonsResp.value.total : 0;

  // Map recent registrations to the ActivityItem shape
  const recentUsers = recentResp.status === "fulfilled" ? recentResp.value.users : [];
  const activity = recentUsers.map((u: any, i: number) => {
    const nameWords = (u.name || "?").split(" ");
    const avatar = nameWords.map((w: string) => w[0] ?? "").join("").slice(0, 2).toUpperCase();
    return {
      id         : u.$id,
      type       : "registration" as const,
      user       : u.name || u.email,
      avatar,
      description: "New user registered",
      timestamp  : u.registration ?? u.$createdAt ?? new Date().toISOString(),
      meta       : u.emailVerification ? "email verified" : "via email",
    };
  });

  // Top 5 courses by enrolled count (from DB)
  let topCourses: any[] = [];
  try {
    const top = await databases.listDocuments(DB_ID, COL_COURSES, [
      Query.orderDesc("enrolledCount"),
      Query.limit(5),
      Query.equal("status", "published"),
    ]);
    topCourses = top.documents.map((d: any) => ({
      id            : d.$id,
      title         : d.title,
      category      : d.category,
      difficulty    : d.difficulty,
      enrolledCount : d.enrolledCount ?? 0,
      completionRate: d.completionRate ?? 0,
      rating        : d.rating ?? 0,
    }));
  } catch { /* collection not set up yet */ }

  return NextResponse.json({
    totalUsers,
    totalCourses,
    totalLessons,
    activity,
    topCourses,
    ...(appwriteError && { error: appwriteError }),
  });
}
