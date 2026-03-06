import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Sign in — Zentax",
  description: "Sign in to your Zentax account and continue your journey.",
};

export default function LoginPage() {
  return (
    <div className="rounded-2xl border border-white/8 bg-zinc-900/60 p-7 shadow-2xl shadow-black/50 backdrop-blur-md">
      {/* Header */}
      <div className="mb-7">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Welcome back
        </h1>
        <p className="mt-1 text-sm text-zinc-400">
          Sign in to continue your learning journey
        </p>
      </div>

      <Suspense
        fallback={
          <div className="rounded-2xl border border-white/8 bg-zinc-900/60 p-7 text-center">
            <div className="h-8 w-8 mx-auto animate-spin rounded-full border-4 border-violet-500 border-t-transparent" />
            <p className="mt-3 text-sm text-zinc-500">Loading form…</p>
          </div>
        }
      >
        <LoginForm />
      </Suspense>

      <p className="mt-6 text-center text-sm text-zinc-500">
        Don't have an account?{" "}
        <Link
          href="/register"
          className="font-semibold text-violet-400 hover:text-violet-300 transition-colors"
        >
          Create one for free →
        </Link>
      </p>
    </div>
  );
}
