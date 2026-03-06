"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { useAuth } from "@/context/AuthContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // ── Access guard ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      router.replace("/login?redirect=/admin/dashboard");
      return;
    }
    if (user.role !== "admin") {
      router.replace("/dashboard");
    }
  }, [user, isLoading, router]);

  // ── Loading / unauthorised states ────────────────────────────────────────
  if (isLoading || !user) {
    return (
      <div className="fixed inset-0 z-100 flex items-center justify-center bg-zinc-950">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-violet-500 border-t-transparent" />
          <p className="text-sm text-zinc-500">Verifying access…</p>
        </div>
      </div>
    );
  }

  if (user.role !== "admin") {
    return (
      <div className="fixed inset-0 z-100 flex items-center justify-center bg-zinc-950">
        <p className="text-sm text-red-400">Access denied. Redirecting…</p>
      </div>
    );
  }

  // ── Admin chrome ──────────────────────────────────────────────────────────
  return (
    <div className="fixed inset-0 z-100 flex bg-zinc-950">
      {/* Sidebar */}
      <AdminSidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      {/* Main area */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <AdminHeader
          pathname={pathname}
          onMenuClick={() => setMobileOpen(true)}
        />
        <main className="flex-1 overflow-y-auto bg-zinc-950">
          {children}
        </main>
      </div>
    </div>
  );
}
