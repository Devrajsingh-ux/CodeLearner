import { Shield } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false }, // keep this page out of search results
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 py-16">
      {/* Background glow */}
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-violet-900/20 blur-[120px]" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-violet-600 to-indigo-700 shadow-lg shadow-violet-500/40">
            <Shield className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Portal</h1>
          <p className="mt-1.5 text-sm text-zinc-500">
            Restricted access — authorised personnel only
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-white/8 bg-zinc-900/80 p-8 shadow-2xl backdrop-blur-sm">
          <AdminLoginForm />
        </div>

        {/* Back link */}
        <p className="mt-6 text-center text-sm text-zinc-600">
          Not an admin?{" "}
          <Link
            href="/login"
            className="text-violet-400 transition-colors hover:text-violet-300"
          >
            Go to regular login
          </Link>
        </p>
      </div>
    </div>
  );
}
