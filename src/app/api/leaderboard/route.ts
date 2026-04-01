/**
 * /api/leaderboard
 *
 * GET - Get top users by XP for leaderboard
 * Optimized to avoid N+1 queries and handle large user bases efficiently
 */

import { NextRequest, NextResponse } from "next/server";
import { Query } from "node-appwrite";
import { createAdminClient } from "@/lib/appwriteServer";
import { getUserFromSession } from "@/lib/auth";
import { cacheGet, cacheSet } from "@/lib/cache";

const LEADERBOARD_CACHE_KEY = "leaderboard:top10";
const USER_RANK_CACHE_KEY = "leaderboard:userrank:";
const CACHE_TTL = 300; // 5 minutes

interface LeaderboardEntry {
  id: string;
  name: string;
  xp: number;
  level: number;
  avatar: string | null;
  rank: number;
}

async function getTopLeaderboard(): Promise<{ leaderboard: LeaderboardEntry[]; total: number }> {
  // Try cache first
  try {
    const cached = await cacheGet<{ leaderboard: LeaderboardEntry[]; total: number }>(LEADERBOARD_CACHE_KEY);
    if (cached) {
      return cached;
    }
  } catch {
    // Cache miss, continue
  }

  const { users } = createAdminClient();

  // For large user bases, we need pagination. Appwrite has a default limit of 25.
  // We'll load up to 1000 users to find top 10 non-admin with XP > 0
  let allUsersData: any[] = [];
  let offset = 0;
  const limit = 100; // Batch size
  const maxUsers = 1000; // Safety limit to prevent infinite loops

  try {
    while (allUsersData.length < maxUsers) {
      const batch = await users.list([
        Query.limit(limit),
        Query.offset(offset)
      ]);

      if (batch.users.length === 0) {
        break; // No more users
      }

      allUsersData.push(...batch.users);
      offset += limit;

      // If we got less than the limit, we've reached the end
      if (batch.users.length < limit) {
        break;
      }
    }
  } catch (error) {
    console.error("Error fetching users for leaderboard:", error);
    // Return empty data on error
    return { leaderboard: [], total: 0 };
  }

  // Filter and sort users to find top performers
  const eligibleUsers = allUsersData
    .filter(user => {
      const prefs = user.prefs || {};
      return prefs.role !== "admin" && (prefs.xp || 0) > 0;
    })
    .map(user => {
      const prefs = user.prefs || {};
      return {
        id: user.$id,
        name: user.name || "Anonymous",
        xp: (prefs.xp as number) || 0,
        level: (prefs.level as number) || 1,
        avatar: (prefs.avatar as string) || null,
      };
    })
    .sort((a, b) => b.xp - a.xp)
    .slice(0, 10)
    .map((user, index) => ({
      ...user,
      rank: index + 1,
    }));

  const result = {
    leaderboard: eligibleUsers,
    total: allUsersData.length,
  };

  // Cache the result
  try {
    await cacheSet(LEADERBOARD_CACHE_KEY, result, CACHE_TTL);
  } catch {
    // Caching failed, continue without cache
  }

  return result;
}

async function getCurrentUserRank(userId: string): Promise<LeaderboardEntry | null> {
  // Try cache first
  const cacheKey = USER_RANK_CACHE_KEY + userId;
  try {
    const cached = await cacheGet<LeaderboardEntry>(cacheKey);
    if (cached) {
      return cached;
    }
  } catch {
    // Cache miss, continue
  }

  const { users } = createAdminClient();

  try {
    // Get the current user's data first
    const currentUserData = await users.get(userId);
    const currentUserPrefs = currentUserData.prefs || {};
    const currentUserXP = (currentUserPrefs.xp as number) || 0;

    // Strategy: Load users in batches and count how many have higher XP
    let rank = 1; // Start with rank 1 (assuming nobody has higher XP)
    let offset = 0;
    const limit = 100;

    while (true) {
      const batch = await users.list([
        Query.limit(limit),
        Query.offset(offset)
      ]);

      if (batch.users.length === 0) {
        break;
      }

      // Count users with higher XP than current user
      for (const user of batch.users) {
        const prefs = user.prefs || {};
        const userXP = (prefs.xp as number) || 0;

        // Skip admin users and the current user
        if (prefs.role === "admin" || user.$id === userId) {
          continue;
        }

        if (userXP > currentUserXP) {
          rank++;
        }
      }

      offset += limit;

      if (batch.users.length < limit) {
        break;
      }
    }

    const userRank: LeaderboardEntry = {
      id: userId,
      name: currentUserData.name || "You",
      xp: currentUserXP,
      level: (currentUserPrefs.level as number) || 1,
      avatar: (currentUserPrefs.avatar as string) || null,
      rank,
    };

    // Cache the result (shorter TTL for user rank)
    try {
      await cacheSet(cacheKey, userRank, Math.floor(CACHE_TTL / 2));
    } catch {
      // Caching failed, continue
    }

    return userRank;

  } catch (error) {
    console.error("Error finding user rank:", error);
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    const currentUser = await getUserFromSession(request);
    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get top leaderboard and current user rank concurrently
    const [leaderboardData, currentUserRank] = await Promise.all([
      getTopLeaderboard(),
      // Check if user is in top 10 first, then calculate rank if needed
      (async () => {
        const { leaderboard } = await getTopLeaderboard();
        const topUser = leaderboard.find(u => u.id === currentUser.id);
        if (topUser) {
          return topUser;
        }
        // User not in top 10, calculate their actual rank
        return getCurrentUserRank(currentUser.id);
      })()
    ]);

    return NextResponse.json({
      leaderboard: leaderboardData.leaderboard,
      currentUser: currentUserRank,
      totalUsers: leaderboardData.total,
    });

  } catch (error) {
    console.error("Leaderboard error:", error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(
      { error: "Failed to fetch leaderboard", leaderboard: [], currentUser: null, totalUsers: 0 },
      { status: 500 }
    );
  }
}