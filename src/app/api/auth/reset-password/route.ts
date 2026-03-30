/**
 * /api/auth/reset-password
 *
 * POST → Completes password recovery by updating the password with token validation
 */

import { NextRequest, NextResponse } from "next/server";
import { account } from "@/lib/appwrite";

export async function POST(req: NextRequest) {
  try {
    const { userId, secret, password, confirmPassword } = (await req.json()) as {
      userId?: string;
      secret?: string;
      password?: string;
      confirmPassword?: string;
    };

    // Validate required fields
    if (!userId || !secret || !password || !confirmPassword) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    // Validate passwords match
    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Passwords do not match." },
        { status: 400 }
      );
    }

    // Validate password strength (defense in depth)
    if (password.length < 12) {
      return NextResponse.json(
        { error: "Password must be at least 12 characters long." },
        { status: 400 }
      );
    }

    if (!/[A-Z]/.test(password)) {
      return NextResponse.json(
        { error: "Password must contain at least one uppercase letter." },
        { status: 400 }
      );
    }

    if (!/[a-z]/.test(password)) {
      return NextResponse.json(
        { error: "Password must contain at least one lowercase letter." },
        { status: 400 }
      );
    }

    if (!/[0-9]/.test(password)) {
      return NextResponse.json(
        { error: "Password must contain at least one number." },
        { status: 400 }
      );
    }

    if (!/[^A-Za-z0-9]/.test(password)) {
      return NextResponse.json(
        { error: "Password must contain at least one special character." },
        { status: 400 }
      );
    }

    try {
      // Update password via Appwrite (confirmPassword already validated above)
      await account.updateRecovery(userId, secret, password);

      return NextResponse.json({
        success: true,
        message: "Password reset successfully. You can now sign in with your new password.",
      });
    } catch (error: any) {
      // Handle Appwrite-specific errors
      const errorMessage = error?.message || error?.toString() || "";

      if (errorMessage.includes("expired") || errorMessage.includes("invalid")) {
        return NextResponse.json(
          { error: "Reset link has expired or is invalid. Please request a new one." },
          { status: 400 }
        );
      }

      console.error("Password reset error:", error);
      return NextResponse.json(
        { error: "Failed to reset password. Please try again or request a new reset link." },
        { status: 500 }
      );
    }
  } catch {
    return NextResponse.json(
      { error: "An error occurred. Please try again." },
      { status: 500 }
    );
  }
}
