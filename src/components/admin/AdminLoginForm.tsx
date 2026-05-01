"use client";

import { AlertCircle, ArrowRight, Eye, EyeOff, Lock, Mail, Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/ui/components/Button";
import { Input } from "@/ui/components/Input";
import { account } from "@/lib/appwrite";
import { useAuth } from "@/context/AuthContext";
import { checkRateLimit, clearAttempts, recordFailedAttempt } from "@/security/lockout";

export function AdminLoginForm() {
  const router = useRouter();
  const { reloadUser } = useAuth();

  const [email, setEmail]           = useState("");
  const [password, setPassword]     = useState("");
  const [showPass, setShowPass]     = useState(false);
  const [isLoading, setIsLoading]   = useState(false);
  const [error, setError]           = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please fill in all fields.");
      return;
    }

    // ── Rate-limit / lockout ────────────────────────────────────────────────
    const rl = checkRateLimit(email);
    if (rl.blocked) {
      setError(rl.message ?? "Account temporarily locked.");
      return;
    }

    setIsLoading(true);

    try {
      // Ensure no stale session exists (prevents "Creation of a session is prohibited when a session is active")
      try {
        // ignore if there's no session or deletion fails
        // @ts-ignore
        await account.deleteSession("current");
      } catch {}

      // Authenticate via Appwrite
      await account.createEmailPasswordSession(email, password);

      // Reload AuthContext state (reads prefs.role from Appwrite and updates React state)
      const loggedInUser = await reloadUser();

      if (!loggedInUser || loggedInUser.role !== "admin") {
        // Sign them back out immediately — wrong door
        try {
          await account.deleteSession("current");
        } catch {}
        const result = recordFailedAttempt(email);
        const warning = result.warning ? ` ${result.warning}` : "";
        setError("Access denied — admin accounts only." + warning);
        setIsLoading(false);
        return;
      }

      clearAttempts(email);
      router.replace("/admin/dashboard");
    } catch (err: any) {
      // Helpful dev-only logging: surface the raw error to aid debugging
      if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
        // eslint-disable-next-line no-console
        console.error("Admin login error:", err);
      }
      const result = recordFailedAttempt(email);
      if (result.locked) {
        setError("Account locked after too many failed attempts. Try again in 15 minutes.");
      } else {
        const warning = result.warning ? ` (${result.warning})` : "";
        // Show more detail in development so we can diagnose network/CORS/Appwrite issues.
        const fallback = err?.message || (typeof err === "string" ? err : "Invalid credentials.");
        const detailed = process.env.NODE_ENV === "development" ? `${fallback} — ${JSON.stringify(err)}` : fallback;
        setError(detailed + warning);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <Input
        label="Admin email"
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="username"
        leftAddon={<Mail className="h-4 w-4" />}
        required
      />

      <div>
        <Input
          label="Password"
          type={showPass ? "text" : "password"}
          placeholder="••••••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          leftAddon={<Lock className="h-4 w-4" />}
          rightAddon={
            <button
              type="button"
              onClick={() => setShowPass((s) => !s)}
              aria-label={showPass ? "Hide password" : "Show password"}
              className="text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          }
          required
        />
      </div>

      {error && (
        <div
          className="flex items-start gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3"
          role="alert"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full"
        isLoading={isLoading}
        rightIcon={<ArrowRight className="h-5 w-5" />}
      >
        Sign in to Admin
      </Button>

      {/* Security reminder */}
      <p className="text-center text-xs text-zinc-600">
        <Shield className="inline h-3 w-3 mr-1 text-zinc-700" />
        Protected area — admin accounts only. 5 failed attempts locks your IP for 15 min.
      </p>
    </form>
  );
}
