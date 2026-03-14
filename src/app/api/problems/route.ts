/**
 * GET /api/problems
 * Public — returns coding problems from the Appwrite `problems` collection.
 *
 * Appwrite document fields expected:
 *   number, title, difficulty, tags (JSON string or string[]),
 *   acceptance, description,
 *   examples (JSON string → ProblemExample[]),
 *   constraints (JSON string → string[]),
 *   hints (JSON string → string[]),
 *   starterCode (JSON string → Record<langId, code>)
 */
import { NextRequest, NextResponse } from "next/server";
import { Query } from "node-appwrite";
import {
  createAdminClient,
  DB_ID,
  COL_PROBLEMS,
} from "@/lib/appwriteServer";
import type { Problem, ProblemExample } from "@/types";

function parseJsonField<T>(value: unknown, fallback: T): T {
  if (Array.isArray(value)) return value as unknown as T;
  if (typeof value === "string" && value.trim()) {
    try {
      return JSON.parse(value) as T;
    } catch {
      return fallback;
    }
  }
  return fallback;
}

function mapDoc(doc: any): Problem {
  return {
    id         : doc.$id,
    number     : Number(doc.number) || 0,
    title      : doc.title          ?? "Untitled",
    difficulty : (["Easy", "Medium", "Hard"].includes(doc.difficulty) ? doc.difficulty : "Easy") as Problem["difficulty"],
    tags       : parseJsonField<string[]>(doc.tags, []),
    acceptance : Number(doc.acceptance) || 0,
    description: doc.description    ?? "",
    examples   : parseJsonField<ProblemExample[]>(doc.examples, []),
    constraints: parseJsonField<string[]>(doc.constraints, []),
    hints      : parseJsonField<string[]>(doc.hints, []),
    starterCode: parseJsonField<Record<string, string>>(doc.starterCode, {}),
  };
}

export async function GET(_request: NextRequest) {
  try {
    const { databases } = createAdminClient();
    const resp = await databases.listDocuments(DB_ID, COL_PROBLEMS, [
      Query.orderAsc("number"),
      Query.limit(500),
    ]);

    const problems: Problem[] = resp.documents.map(mapDoc);
    return NextResponse.json(
      { problems, total: resp.total },
      { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" } },
    );
  } catch {
    // Collection not set up yet — return empty list gracefully
    return NextResponse.json({ problems: [], total: 0 });
  }
}
