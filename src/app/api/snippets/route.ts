/**
 * GET /api/snippets
 * Public — returns language/code snippets from the Appwrite `snippets` collection.
 * Expected fields on each document: lang, icon, color, code, description
 */
import { NextRequest, NextResponse } from "next/server";
import { Query } from "node-appwrite";
import { createAdminClient, DB_ID, COL_SNIPPETS } from "@/lib/appwriteServer";

export async function GET(_request: NextRequest) {
  try {
    const { databases } = createAdminClient();
    const resp = await databases.listDocuments(DB_ID, COL_SNIPPETS, [
      Query.orderDesc("$createdAt"),
      Query.limit(100),
    ]);

    const snippets = resp.documents.map((d: any) => ({
      id: d.$id,
      lang: d.lang ?? d.language ?? "Unknown",
      icon: d.icon ?? d.emoji ?? "",
      color: d.color ?? "#000000",
      code: d.code ?? d.snippet ?? "",
      description: d.description ?? "",
    }));

    return NextResponse.json(
      { snippets, total: resp.total },
      { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120" } },
    );
  } catch (err) {
    return NextResponse.json({ snippets: [], total: 0 });
  }
}
