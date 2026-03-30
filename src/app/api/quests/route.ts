/**
 * /api/quests
 *
 * GET  - Get daily quests and their completion status
 * POST - Mark a quest as complete/incomplete
 */

import { NextRequest, NextResponse } from "next/server";
import { ID, Query } from "node-appwrite";
import {
  createAdminClient,
  DB_ID,
  COL_ACTIVITY,
} from "@/lib/appwriteServer";

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
    type: "lessons"
  },
  {
    id: "study_time",
    label: "Study for 30 minutes",
    xp: 30,
    target: 30,
    type: "minutes"
  },
  {
    id: "xp_gain",
    label: "Earn 50 XP today",
    xp: 20,
    target: 50,
    type: "xp"
  }
];

// GET - Get today's quests and completion status
export async function GET(request: NextRequest) {
  try {
    const user = getUserFromSession(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { databases } = createAdminClient();
    const today = formatDate(new Date());

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
      questsCompleted: []
    };

    // Check each quest completion status
    const questsWithStatus = DAILY_QUESTS.map(quest => {
      let completed = false;

      switch (quest.type) {
        case "lessons":
          completed = (activity.lessonsCompleted || 0) >= quest.target;
          break;
        case "minutes":
          completed = (activity.minutesStudied || 0) >= quest.target;
          break;
        case "xp":
          completed = (activity.xpEarned || 0) >= quest.target;
          break;
      }

      return {
        ...quest,
        completed,
        progress: Math.min(
          quest.type === "lessons" ? (activity.lessonsCompleted || 0) :
          quest.type === "minutes" ? (activity.minutesStudied || 0) :
          quest.type === "xp" ? (activity.xpEarned || 0) : 0,
          quest.target
        )
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

  } catch (error: any) {
    console.error("Get quests error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch quests" },
      { status: 500 }
    );
  }
}

// POST - Manual quest toggle (for testing purposes)
export async function POST(request: NextRequest) {
  try {
    const user = getUserFromSession(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { questId, completed } = body;

    // This is mainly for testing - in real app, quests are auto-completed
    // by tracking actual activity (lessons, time, XP)

    return NextResponse.json({
      success: true,
      questId,
      completed
    });

  } catch (error: any) {
    console.error("Update quest error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update quest" },
      { status: 500 }
    );
  }
}