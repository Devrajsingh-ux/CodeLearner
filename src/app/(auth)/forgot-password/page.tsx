"use client";

import { AlertCircle, ArrowRight, CheckCircle2, Mail } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { useState } from "react";
import { Button } from "@/ui/components/Button";
import { Input } from "@/ui/components/Input";
import { checkRateLimit, recordFailedAttempt, clearAttempts } from "@/security/lockout";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Rate limiting check
    const rl = checkRateLimit(email);
    if (rl.blocked) {
      setError(rl.message || "Too many attempts. Please try again later.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Record failed attempt
        const result = recordFailedAttempt(email);
        if (result.locked) {
          setError("Too many attempts. Please try again in 15 minutes.");
        } else {
          setError(data.error || "An error occurred. Please try again.");
        }
        setSuccess(false);
      } else {
        // Clear rate limit attempts on success
        clearAttempts(email);
        setSuccess(true);
        setError("");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
      setSuccess(false);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-white/8 bg-zinc-900/60 p-7 shadow-2xl shadow-black/50 backdrop-blur-md">
      {/* Header */}
      <div className="mb-7">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Forgot password?
        </h1>
        <p className="mt-1 text-sm text-zinc-400">
          Enter your email and we'll send you a reset link
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <Input
          label="Email address"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          leftAddon={<Mail className="h-4 w-4" />}
          required
        />

        {error && (
          <div
            className="flex items-start gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3"
            role="alert"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        {success && (
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3 text-sm text-emerald-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              <span>
                Check your email for password reset instructions. If you don't see it, check your spam folder.
              </span>
            </div>
          </div>
        )}

        <Button
          type="submit"
          size="lg"
          className="w-full"
          isLoading={isLoading}
          rightIcon={<ArrowRight className="h-5 w-5" />}
        >
          Send reset link
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-zinc-500">
        Remember your password?{" "}
        <Link
          href="/login"
          className="font-semibold text-violet-400 hover:text-violet-300 transition-colors"
        >
          Sign in →
        </Link>
      </p>
    </div>
  );
}
