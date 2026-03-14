/**
 * GET /api/testimonials
 * Public — returns testimonials from the Appwrite `testimonials` collection.
 * Fields expected on each document:
 *   name, role, avatar (2-letter initials), content, rating (1-5), course
 */
import { NextRequest, NextResponse } from "next/server";
import { Query } from "node-appwrite";
import {
  createAdminClient,
  DB_ID,
  COL_TESTIMONIALS,
} from "@/lib/appwriteServer";
import type { Testimonial } from "@/types";

function mapDoc(doc: any): Testimonial {
  return {
    id      : doc.$id,
    name    : doc.name    ?? "Anonymous",
    role    : doc.role    ?? "",
    avatar  : doc.avatar  ?? (doc.name ? doc.name.slice(0, 2).toUpperCase() : "?"),
    content : doc.content ?? "",
    rating  : Number(doc.rating) || 5,
    course  : doc.course  ?? "",
  };
}

export async function GET(_request: NextRequest) {
  try {
    const { databases } = createAdminClient();
    const resp = await databases.listDocuments(DB_ID, COL_TESTIMONIALS, [
      Query.orderDesc("$createdAt"),
      Query.limit(50),
    ]);

    const testimonials: Testimonial[] = resp.documents.map(mapDoc);
    return NextResponse.json(
      { testimonials, total: resp.total },
      { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120" } },
    );
  } catch {
    // Collection not set up yet — return empty list gracefully
    return NextResponse.json({ testimonials: [], total: 0 });
  }
}
