/**
 * /api/notifications/mark-all
 *
 * POST - Mark all notifications for the current user as read
 */

import { NextRequest, NextResponse } from "next/server";
import { Query } from "node-appwrite";
import { createAdminClient, DB_ID, COL_NOTIFICATIONS } from "@/lib/appwriteServer";
import { getUserFromSession } from "@/lib/auth";
import { handleDatabaseError, serverErrorResponse, unauthorizedResponse, withErrorHandling } from "@/lib/utils";

export async function POST(request: NextRequest) {
  return withErrorHandling(async () => {
    const user = await getUserFromSession(request);
    if (!user) return unauthorizedResponse();

    const { databases } = createAdminClient();

    try {
      const resp = await databases.listDocuments(DB_ID, COL_NOTIFICATIONS, [
        Query.equal("recipientId", user.id),
        Query.equal("unread", true),
        Query.limit(1000),
      ]);

      const docs = resp.documents || [];

      // Update each unread notification to unread: false
      for (const d of docs) {
        try {
          await databases.updateDocument(DB_ID, COL_NOTIFICATIONS, d.$id, {
            unread: false,
            updatedAt: new Date().toISOString(),
          });
        } catch (err) {
          // ignore per-item errors
          console.error('Failed to mark notification read:', err instanceof Error ? err.message : String(err));
        }
      }

      return NextResponse.json({ updated: docs.length });
    } catch (error) {
      const handled = handleDatabaseError(error, { fallbackData: { updated: 0 } }, "marking notifications read");
      if (handled.success) return NextResponse.json(handled.data);
      return handled.response;
    }
  }, (error) => serverErrorResponse("Failed to mark notifications read"));
}
