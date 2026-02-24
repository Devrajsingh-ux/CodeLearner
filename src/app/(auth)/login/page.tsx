import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Sign in — CodeLearn",
  description: "Sign in to your CodeLearn account and continue your journey.",
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

      <LoginForm />

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
