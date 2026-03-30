/**
 * /api/leaderboard
 *
 * GET - Get top users by XP for leaderboard
 */

import { NextRequest, NextResponse } from "next/server";
import { Query } from "node-appwrite";
import { createAdminClient } from "@/lib/appwriteServer";

// Helper to get user from session cookie
function getUserFromSession(request: NextRequest): { id: string } | null {
  try {
    const raw = request.cookies.get("cl_session")?.value;
    if (!raw) return null;
    const user = JSON.parse(raw) as { id: string };
    return user?.id ? user : null;
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    const currentUser = getUserFromSession(request);
    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { users } = createAdminClient();

    // Get all users and sort by XP (note: this might not scale well with many users)
    // In production, you'd want to implement server-side sorting or caching
    const usersResult = await users.list();

    // Filter out admin users and sort by XP
    const leaderboardData = usersResult.users
      .filter(user => {
        const prefs = user.prefs || {};
        return prefs.role !== "admin" && (prefs.xp || 0) > 0;
      })
      .map(user => {
        const prefs = user.prefs || {};
        return {
          id: user.$id,
          name: user.name || "Anonymous",
          xp: prefs.xp || 0,
          level: prefs.level || 1,
          avatar: prefs.avatar || null,
        };
      })
      .sort((a, b) => b.xp - a.xp)
      .slice(0, 10); // Top 10

    // Add rank and find current user position
    const leaderboard = leaderboardData.map((user, index) => ({
      ...user,
      rank: index + 1,
    }));

    // Find current user's rank if not in top 10
    let currentUserRank = leaderboard.find(user => user.id === currentUser.id);
    if (!currentUserRank) {
      // Find user's actual rank among all users
      const allUsersRanked = usersResult.users
        .filter(user => {
          const prefs = user.prefs || {};
          return prefs.role !== "admin";
        })
        .map(user => {
          const prefs = user.prefs || {};
          return {
            id: user.$id,
            xp: prefs.xp || 0,
          };
        })
        .sort((a, b) => b.xp - a.xp);

      const userIndex = allUsersRanked.findIndex(user => user.id === currentUser.id);
      if (userIndex !== -1) {
        const userInfo = usersResult.users.find(u => u.$id === currentUser.id);
        const prefs = (userInfo?.prefs || {}) as { xp?: number; level?: number; avatar?: string };

        currentUserRank = {
          id: currentUser.id,
          name: userInfo?.name || "You",
          xp: prefs.xp || 0,
          level: prefs.level || 1,
          avatar: prefs.avatar || null,
          rank: userIndex + 1,
        };
      }
    }

    return NextResponse.json({
      leaderboard,
      currentUser: currentUserRank,
      totalUsers: usersResult.total,
    });

  } catch (error: any) {
    console.error("Leaderboard error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch leaderboard" },
      { status: 500 }
    );
  }
}