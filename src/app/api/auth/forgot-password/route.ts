/**
 * /api/auth/forgot-password
 *
 * POST → Initiates password recovery by sending a reset email via Appwrite
 * Returns success regardless of whether email exists (security best practice)
 */

import { NextRequest, NextResponse } from "next/server";
import { account } from "@/lib/appwrite";

export async function POST(req: NextRequest) {
  try {
    const { email } = (await req.json()) as { email?: string };

    // Validate email format
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Build reset URL
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const resetUrl = `${appUrl}/reset-password`;

    try {
      // Attempt to send recovery email via Appwrite
      await account.createRecovery(email, resetUrl);
    } catch (error) {
      // Silently catch errors - don't reveal if email exists or not
      console.error("Password recovery error:", error);
    }

    // Always return success (security: don't leak user existence)
    return NextResponse.json({
      success: true,
      message: "If an account exists with this email, a password reset link has been sent.",
    });
  } catch {
    return NextResponse.json(
      { error: "An error occurred. Please try again." },
      { status: 500 }
    );
  }
}
