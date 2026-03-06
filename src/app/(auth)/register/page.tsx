import type { Metadata } from "next";
import Link from "next/link";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Create account — Zentax",
  description: "Join 285,000+ developers on Zentax. Free forever.",
};

export default function RegisterPage() {
  return (
    <div className="rounded-2xl border border-white/8 bg-zinc-900/60 p-7 shadow-2xl shadow-black/50 backdrop-blur-md">
      {/* Header */}
      <div className="mb-7">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Create your account
        </h1>
        <p className="mt-1 text-sm text-zinc-400">
          Free forever. No credit card required.
        </p>
      </div>

      <RegisterForm />

      <p className="mt-6 text-center text-sm text-zinc-500">
        Already have an account?{" "}
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
