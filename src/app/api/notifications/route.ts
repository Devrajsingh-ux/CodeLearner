/**
 * /api/notifications
 *
 * GET  - List current user's notifications
 * POST - Create a notification (admin only)
 */

import { NextRequest, NextResponse } from "next/server";
import { ID, Query } from "node-appwrite";
import { createAdminClient, DB_ID, COL_NOTIFICATIONS } from "@/lib/appwriteServer";
import { getUserFromSession } from "@/lib/auth";
import { sanitizeString } from "@/lib/validation";
import { unauthorizedResponse, handleDatabaseError, serverErrorResponse, withErrorHandling } from "@/lib/utils";

export async function GET(request: NextRequest) {
  return withErrorHandling(async () => {
    const user = await getUserFromSession(request);
    if (!user) return unauthorizedResponse();

    const { databases } = createAdminClient();

    try {
      const resp = await databases.listDocuments(DB_ID, COL_NOTIFICATIONS, [
        Query.equal("recipientId", user.id),
        Query.orderDesc("$createdAt"),
        Query.limit(50),
      ]);

      const notifications = resp.documents.map((d: any) => ({
        id: d.$id,
        title: d.title || "",
        description: d.body || d.description || "",
        link: d.link || null,
        unread: Boolean(d.unread),
        createdAt: d.createdAt || d.$createdAt || null,
      }));

      return NextResponse.json({ notifications });
    } catch (error) {
      const handled = handleDatabaseError(error, { fallbackData: { notifications: [] } }, "fetching notifications");
      if (handled.success) return NextResponse.json(handled.data);
      return handled.response;
    }
  }, (error) => serverErrorResponse("Failed to fetch notifications"));
}

export async function POST(request: NextRequest) {
  return withErrorHandling(async () => {
    const user = await getUserFromSession(request);
    if (!user || user.role !== "admin") return unauthorizedResponse();

    const body = await request.json();
    const recipientId = typeof body.recipientId === "string" ? body.recipientId.trim() : "";
    const title = typeof body.title === "string" ? body.title.trim() : "";
    const description = typeof body.description === "string" ? body.description.trim() : "";
    const link = typeof body.link === "string" ? body.link.trim() : "";

    if (!recipientId || !title) {
      return NextResponse.json({ error: "recipientId and title are required" }, { status: 400 });
    }

    const sanitizedTitle = sanitizeString(title, 300);
    const sanitizedBody = sanitizeString(description || "", 2000);
    const sanitizedLink = sanitizeString(link || "", 500);

    const now = new Date().toISOString();

    const { databases } = createAdminClient();

    try {
      const created = await databases.createDocument(
        DB_ID,
        COL_NOTIFICATIONS,
        ID.unique(),
        {
          recipientId,
          title: sanitizedTitle,
          body: sanitizedBody,
          link: sanitizedLink,
          unread: true,
          createdAt: now,
        },
      );

      return NextResponse.json({ notification: created });
    } catch (error) {
      const handled = handleDatabaseError(error, { fallbackData: { notification: null } }, "creating notification");
      if (handled.success) return NextResponse.json(handled.data);
      return handled.response;
    }
  }, (error) => serverErrorResponse("Failed to create notification"));
}
