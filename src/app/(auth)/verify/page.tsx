"use client";

import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { account } from "@/lib/appwrite";

type VerificationStatus = "loading" | "success" | "error";

function VerifyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [status, setStatus] = useState<VerificationStatus>("loading");
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(3);

  // Auto-trigger verification on mount
  useEffect(() => {
    async function verifyEmail() {
      const userId = searchParams.get("userId");
      const secret = searchParams.get("secret");

      if (!userId || !secret) {
        setStatus("error");
        setError("Invalid verification link. Please check your email or request a new verification link.");
        return;
      }

      try {
        await account.updateVerification(userId, secret);
        setStatus("success");
      } catch (err: any) {
        setStatus("error");
        const errorMessage = err?.message || err?.toString() || "";

        if (errorMessage.includes("expired") || errorMessage.includes("invalid")) {
          setError("This verification link has expired or is invalid. Please request a new verification email.");
        } else {
          setError("Failed to verify your email. Please try again or contact support.");
        }

        console.error("Email verification error:", err);
      }
    }

    verifyEmail();
  }, [searchParams]);

  // Countdown and redirect on success
  useEffect(() => {
    if (status === "success" && countdown > 0) {
      const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (status === "success" && countdown === 0) {
      router.push("/dashboard");
    }
  }, [status, countdown, router]);

  return (
    <div className="rounded-2xl border border-white/8 bg-zinc-900/60 p-7 shadow-2xl shadow-black/50 backdrop-blur-md">
      {/* Header */}
      <div className="mb-7">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Email Verification
        </h1>
        <p className="mt-1 text-sm text-zinc-400">
          {status === "loading" && "Verifying your email address..."}
          {status === "success" && "Your email has been verified"}
          {status === "error" && "Verification failed"}
        </p>
      </div>

      <div className="space-y-5">
        {/* Loading State */}
        {status === "loading" && (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="relative">
              <Loader2 className="h-12 w-12 animate-spin text-violet-500" />
              <div className="absolute inset-0 h-12 w-12 animate-ping rounded-full bg-violet-500/20" />
            </div>
            <p className="mt-4 text-sm text-zinc-400">
              Please wait while we verify your email...
            </p>
          </div>
        )}

        {/* Success State */}
        {status === "success" && (
          <div className="space-y-4">
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3 text-sm text-emerald-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                <span>
                  Email verified successfully! Redirecting to dashboard in {countdown}s...
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center py-4">
              <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
                <CheckCircle2 className="h-8 w-8 text-emerald-400" />
              </div>
              <p className="text-center text-sm text-zinc-400">
                Your account is now active. You'll be redirected automatically.
              </p>
            </div>
          </div>
        )}

        {/* Error State */}
        {status === "error" && (
          <div className="space-y-4">
            <div
              className="flex items-start gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3"
              role="alert"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
              <p className="text-sm text-red-400">{error}</p>
            </div>

            <div className="flex flex-col items-center py-4">
              <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
                <AlertCircle className="h-8 w-8 text-red-400" />
              </div>
              <p className="text-center text-sm text-zinc-400">
                Unable to verify your email address.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer Links */}
      <div className="mt-6 flex flex-col items-center gap-2 text-center text-sm">
        {status === "error" && (
          <>
            <Link
              href="/login"
              className="font-semibold text-violet-400 hover:text-violet-300 transition-colors"
            >
              Go to sign in →
            </Link>
            <p className="text-zinc-500">
              Need help?{" "}
              <a
                href="mailto:support@zentax.com"
                className="text-violet-400 hover:text-violet-300 transition-colors"
              >
                Contact support
              </a>
            </p>
          </>
        )}
        {status === "success" && (
          <Link
            href="/dashboard"
            className="font-semibold text-violet-400 hover:text-violet-300 transition-colors"
          >
            Go to dashboard now →
          </Link>
        )}
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="rounded-2xl border border-white/8 bg-zinc-900/60 p-7 shadow-2xl shadow-black/50 backdrop-blur-md">
          <div className="mb-7">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Email Verification
            </h1>
            <p className="mt-1 text-sm text-zinc-400">
              Verifying your email address...
            </p>
          </div>
          <div className="flex flex-col items-center justify-center py-8">
            <div className="relative">
              <Loader2 className="h-12 w-12 animate-spin text-violet-500" />
              <div className="absolute inset-0 h-12 w-12 animate-ping rounded-full bg-violet-500/20" />
            </div>
            <p className="mt-4 text-sm text-zinc-400">
              Please wait while we verify your email...
            </p>
          </div>
        </div>
      }
    >
      <VerifyContent />
    </Suspense>
  );
}
