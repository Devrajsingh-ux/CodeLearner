"use client";

import { AlertCircle, ArrowRight, Eye, EyeOff, Lock, Mail, Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { account } from "@/lib/appwrite";
import { checkRateLimit, clearAttempts, recordFailedAttempt } from "@/lib/rateLimit";
import type { AuthUser } from "@/types";

// ── session helpers (reuse the same HttpOnly cookie API) ────────────────────
async function saveSession(u: AuthUser) {
  await fetch("/api/auth/session", {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user: u }),
  });
}

export function AdminLoginForm() {
  const router = useRouter();

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
      // Authenticate via Appwrite
      // @ts-ignore – SDK exposes createEmailPasswordSession in this version
      await account.createEmailPasswordSession(email, password);

      const acct = await account.get();

      // ── Strict role check — only "admin" users may enter ────────────────
      // Appwrite stores the role in user prefs; fall back to default.
      const prefs   = (acct as any).prefs ?? {};
      const role    = prefs.role ?? "student";

      if (role !== "admin") {
        // Sign them back out immediately — wrong door
        try {
          // @ts-ignore
          await account.deleteSession("current");
        } catch {}
        const result = recordFailedAttempt(email);
        const warning = result.warning ? ` ${result.warning}` : "";
        setError("Access denied — admin accounts only." + warning);
        setIsLoading(false);
        return;
      }

      const mapped: AuthUser = {
        id    : (acct as any).$id   || "",
        name  : (acct as any).name  || "",
        email : (acct as any).email || "",
        role  : "admin",
      };

      clearAttempts(email);
      await saveSession(mapped);
      router.replace("/admin/dashboard");
    } catch (err: any) {
      const result = recordFailedAttempt(email);
      if (result.locked) {
        setError("Account locked after too many failed attempts. Try again in 15 minutes.");
      } else {
        const warning = result.warning ? ` (${result.warning})` : "";
        setError((err?.message || "Invalid credentials.") + warning);
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
        placeholder="admin@zentax.io"
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
