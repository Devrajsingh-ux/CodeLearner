"use client";

import { AlertCircle, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { account } from "@/lib/appwrite";
import type { AuthUser } from "@/types";

function OAuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");

  useEffect(() => {
    async function handleOAuthCallback() {
      // Check if there's an error in the URL
      const errorParam = searchParams.get("error");
      if (errorParam) {
        setError("OAuth authentication was cancelled or failed.");
        setTimeout(() => router.push("/login"), 3000);
        return;
      }

      try {
        // Fetch the current user session from Appwrite
        const accountData = await account.get();
        const prefs = await account.getPrefs();

        // Map to AuthUser format (same structure as AuthContext)
        const user: AuthUser = {
          id: accountData.$id,
          name: accountData.name,
          email: accountData.email,
          username: prefs.username || accountData.email.split("@")[0],
          avatar: prefs.avatar || undefined,
          role: prefs.role || "student",
          xp: prefs.xp || 0,
          level: prefs.level || 1,
          streak: prefs.streak || 0,
        };

        // If user doesn't have preferences set (first OAuth login), set defaults
        if (!prefs.username) {
          const derivedUsername = accountData.name
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9_.-]/g, "")
            .slice(0, 20) || accountData.email.split("@")[0];

          try {
            await account.updatePrefs({
              username: derivedUsername,
              xp: 0,
              level: 1,
              streak: 0,
              role: "student",
            });

            // Update user object with new prefs
            user.username = derivedUsername;
            user.role = "student";
            user.xp = 0;
            user.level = 1;
            user.streak = 0;
          } catch (prefError) {
            console.error("Failed to set default preferences:", prefError);
          }
        }

        // Store session in HttpOnly cookie
        const sessionRes = await fetch("/api/auth/session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user }),
        });

        if (!sessionRes.ok) {
          throw new Error("Failed to create session");
        }

        // Redirect to dashboard
        router.push("/dashboard");
      } catch (err) {
        console.error("OAuth callback error:", err);
        setError("Failed to complete OAuth login. Please try again.");
        setTimeout(() => router.push("/login?error=oauth_failed"), 3000);
      }
    }

    handleOAuthCallback();
  }, [router, searchParams]);

  return (
    <div className="rounded-2xl border border-white/8 bg-zinc-900/60 p-7 shadow-2xl shadow-black/50 backdrop-blur-md">
      <div className="flex flex-col items-center justify-center py-12">
        {!error ? (
          <>
            <div className="relative mb-6">
              <Loader2 className="h-12 w-12 animate-spin text-violet-500" />
              <div className="absolute inset-0 h-12 w-12 animate-ping rounded-full bg-violet-500/20" />
            </div>
            <h2 className="text-xl font-bold text-white">Completing sign in...</h2>
            <p className="mt-2 text-sm text-zinc-400">
              Please wait while we set up your account
            </p>
          </>
        ) : (
          <>
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
              <AlertCircle className="h-8 w-8 text-red-400" />
            </div>
            <h2 className="text-xl font-bold text-white">Authentication Failed</h2>
            <p className="mt-2 text-center text-sm text-zinc-400">{error}</p>
            <p className="mt-1 text-xs text-zinc-500">Redirecting to login...</p>
          </>
        )}
      </div>
    </div>
  );
}

export default function OAuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="rounded-2xl border border-white/8 bg-zinc-900/60 p-7 shadow-2xl shadow-black/50 backdrop-blur-md">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="relative mb-6">
              <Loader2 className="h-12 w-12 animate-spin text-violet-500" />
              <div className="absolute inset-0 h-12 w-12 animate-ping rounded-full bg-violet-500/20" />
            </div>
            <h2 className="text-xl font-bold text-white">Loading...</h2>
          </div>
        </div>
      }
    >
      <OAuthCallbackContent />
    </Suspense>
  );
}
