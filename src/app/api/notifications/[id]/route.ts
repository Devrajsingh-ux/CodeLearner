/**
 * /api/notifications/[id]
 *
 * PATCH - Update a notification (mark read/unread)
 * DELETE - Remove a notification
 */

import { NextRequest, NextResponse } from "next/server";
import { createAdminClient, DB_ID, COL_NOTIFICATIONS } from "@/lib/appwriteServer";
import { requireApiUser } from "@/security/api-guard";
import { handleDatabaseError, serverErrorResponse, withErrorHandling } from "@/lib/utils";

export async function PATCH(request: NextRequest, context: any) {
  return withErrorHandling(async () => {
    const auth = await requireApiUser(request, { enforceCsrf: true });
    if (!auth.ok) return auth.response;
    const user = auth.user;

    const params = await (context?.params || {});
    const id = params?.id;
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const body = await request.json();
    if (typeof body.unread !== "boolean") {
      return NextResponse.json({ error: "Provide boolean 'unread' field" }, { status: 400 });
    }

    const { databases } = createAdminClient();

    try {
      const doc = await databases.getDocument(DB_ID, COL_NOTIFICATIONS, id);

      // Only recipient or admin can modify
      if (doc.recipientId !== user.id && user.role !== "admin") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }

      const updated = await databases.updateDocument(DB_ID, COL_NOTIFICATIONS, id, {
        unread: body.unread,
        updatedAt: new Date().toISOString(),
      });

      return NextResponse.json({ notification: updated });
    } catch (error) {
      const handled = handleDatabaseError(error, { fallbackData: { notification: null } }, "updating notification");
      if (handled.success) return NextResponse.json(handled.data);
      return handled.response;
    }
  }, (error) => serverErrorResponse("Failed to update notification"));
}

export async function DELETE(request: NextRequest, context: any) {
  return withErrorHandling(async () => {
    const auth = await requireApiUser(request, { enforceCsrf: true });
    if (!auth.ok) return auth.response;
    const user = auth.user;

    const params = await (context?.params || {});
    const id = params?.id;
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const { databases } = createAdminClient();

    try {
      const doc = await databases.getDocument(DB_ID, COL_NOTIFICATIONS, id);
      if (doc.recipientId !== user.id && user.role !== "admin") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }

      await databases.deleteDocument(DB_ID, COL_NOTIFICATIONS, id);
      return NextResponse.json({ success: true });
    } catch (error) {
      const handled = handleDatabaseError(error, { fallbackData: { success: false } }, "deleting notification");
      if (handled.success) return NextResponse.json(handled.data);
      return handled.response;
    }
  }, (error) => serverErrorResponse("Failed to delete notification"));
}
