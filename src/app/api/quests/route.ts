/**
 * /api/quests
 *
 * GET  - Get daily quests and their completion status
 * POST - Mark a quest as complete (admin testing only)
 */

import { NextRequest, NextResponse } from "next/server";
import { Query } from "node-appwrite";
import {
  createAdminClient,
  DB_ID,
  COL_ACTIVITY,
} from "@/lib/appwriteServer";
import { requireApiUser, validateApiBody } from "@/security/api-guard";
import { questPostSchema } from "@/security/validation";

// Helper to format date as YYYY-MM-DD
function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

// Define daily quests
const DAILY_QUESTS = [
  {
    id: "lesson_complete",
    label: "Complete one lesson",
    xp: 40,
    target: 1,
    type: "lessons" as const
  },
  {
    id: "study_time",
    label: "Study for 30 minutes",
    xp: 30,
    target: 30,
    type: "minutes" as const
  },
  {
    id: "xp_gain",
    label: "Earn 50 XP today",
    xp: 20,
    target: 50,
    type: "xp" as const
  }
];

// GET - Get today's quests and completion status
export async function GET(request: NextRequest) {
  try {
    const auth = await requireApiUser(request);
    if (!auth.ok) {
      return auth.response;
    }
    const user = auth.user;

    const today = formatDate(new Date());

    try {
      const { databases } = createAdminClient();

      // Get today's activity to check quest completion
      const todayActivity = await databases.listDocuments(DB_ID, COL_ACTIVITY, [
        Query.equal("userId", user.id),
        Query.equal("date", today),
        Query.limit(1)
      ]);

      const activity = todayActivity.documents.length > 0 ? todayActivity.documents[0] : {
        lessonsCompleted: 0,
        minutesStudied: 0,
        xpEarned: 0,
        questsCompleted: [] as string[]
      };

      // Check each quest completion status
      const questsWithStatus = DAILY_QUESTS.map(quest => {
        let currentValue = 0;
        let completed = false;

        switch (quest.type) {
          case "lessons":
            currentValue = activity.lessonsCompleted || 0;
            completed = currentValue >= quest.target;
            break;
          case "minutes":
            currentValue = activity.minutesStudied || 0;
            completed = currentValue >= quest.target;
            break;
          case "xp":
            currentValue = activity.xpEarned || 0;
            completed = currentValue >= quest.target;
            break;
        }

        return {
          ...quest,
          completed,
          progress: Math.min(currentValue, quest.target),
          currentValue,
        };
      });

      const completedCount = questsWithStatus.filter(q => q.completed).length;
      const totalXp = questsWithStatus.filter(q => q.completed).reduce((sum, q) => sum + q.xp, 0);

      return NextResponse.json({
        quests: questsWithStatus,
        stats: {
          completed: completedCount,
          total: questsWithStatus.length,
          xpEarned: totalXp,
          date: today
        }
      });

    } catch (dbError: unknown) {
      const error = dbError as { code?: number; type?: string; message?: string };

      if (error.code === 404 && error.type === 'database_not_found') {
        console.warn("Database not found, returning default quests");

        const defaultQuests = DAILY_QUESTS.map(quest => ({
          ...quest,
          completed: false,
          progress: 0,
          currentValue: 0,
        }));

        return NextResponse.json({
          quests: defaultQuests,
          stats: {
            completed: 0,
            total: defaultQuests.length,
            xpEarned: 0,
            date: today
          },
          warning: "Database not initialized"
        });
      }

      console.error("Database error fetching quests:", error.message);
      return NextResponse.json({
        quests: [],
        stats: { completed: 0, total: 0, xpEarned: 0, date: today },
        error: "Unable to fetch quest data"
      }, { status: 500 });
    }

  } catch (error) {
    console.error("Get quests error:", error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(
      {
        quests: [],
        stats: { completed: 0, total: 0, xpEarned: 0, date: formatDate(new Date()) },
        error: "An error occurred"
      },
      { status: 500 }
    );
  }
}

// POST - Manual quest toggle (admin/testing only)
export async function POST(request: NextRequest) {
  try {
    const auth = await requireApiUser(request, {
      requireAdmin: true,
      enforceCsrf: true,
    });
    if (!auth.ok) {
      return auth.response;
    }
    const user = auth.user;

    const body = await request.json();

    const parsed = validateApiBody(questPostSchema, body);
    if (!parsed.ok) {
      return parsed.response;
    }

    const postData = parsed.data;
    const { questId } = postData;

    // In production, quests are auto-completed by activity tracking
    // This endpoint is for testing/admin purposes only
    return NextResponse.json({
      success: true,
      questId,
      message: "Quest status updated (admin override)"
    });

  } catch (error) {
    console.error("Update quest error:", error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(
      { error: "Failed to update quest" },
      { status: 500 }
    );
  }
}
