"use client";

import {
  BarChart3,
  BookOpen,
  ChevronLeft,
  Code2,
  FileText,
  LayoutDashboard,
  Settings,
  Shield,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_SECTIONS = [
  {
    title: "Overview",
    items: [{ href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    title: "Management",
    items: [
      { href: "/admin/users", label: "Users", icon: Users },
      { href: "/admin/courses", label: "Courses", icon: BookOpen },
      { href: "/admin/lessons", label: "Lessons", icon: FileText },
    ],
  },
  {
    title: "Insights",
    items: [{ href: "/admin/analytics", label: "Analytics", icon: BarChart3 }],
  },
  {
    title: "System",
    items: [{ href: "/admin/settings", label: "Settings", icon: Settings }],
  },
];

interface AdminSidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

export function AdminSidebar({ mobileOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  const inner = (
    <div className="flex h-full flex-col">
      {/* Brand */}
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/8 px-5">
        <Link href="/admin/dashboard" className="flex items-center gap-2.5 group" onClick={onClose}>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-violet-600 to-indigo-700 shadow-lg shadow-violet-500/30 transition-transform group-hover:scale-110">
            <Shield className="h-4 w-4 text-white" />
          </span>
          <div className="leading-tight">
            <p className="text-sm font-bold text-white tracking-tight">
              Code<span className="text-violet-400">Learn</span>
            </p>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">Admin</p>
          </div>
        </Link>
        <button
          type="button"
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 hover:bg-white/8 hover:text-white transition-colors lg:hidden"
          aria-label="Close sidebar"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Admin navigation">
        {NAV_SECTIONS.map((section) => (
          <div key={section.title} className="mb-5">
            <p className="mb-1.5 px-3 text-[10px] font-bold uppercase tracking-widest text-zinc-600">
              {section.title}
            </p>
            <ul className="space-y-0.5">
              {section.items.map(({ href, label, icon: Icon }) => {
                const isActive =
                  pathname === href ||
                  (href !== "/admin/dashboard" && pathname.startsWith(href));
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={onClose}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150",
                        isActive
                          ? "bg-violet-500/15 text-violet-300"
                          : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200",
                      )}
                    >
                      <Icon className={cn("h-4 w-4 shrink-0", isActive ? "text-violet-400" : "text-zinc-500")} />
                      {label}
                      {isActive && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-violet-400" />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="shrink-0 border-t border-white/8 px-3 py-3">
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-zinc-500 hover:bg-white/5 hover:text-zinc-300 transition-colors"
        >
          <Code2 className="h-4 w-4 shrink-0" />
          Back to Site
          <ChevronLeft className="ml-auto h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <aside className="hidden w-64 shrink-0 border-r border-white/8 bg-zinc-900 lg:block">
        {inner}
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden" onClick={onClose} aria-hidden />
          <aside className="fixed inset-y-0 left-0 z-50 w-64 border-r border-white/8 bg-zinc-900 lg:hidden">
            {inner}
          </aside>
        </>
      )}
    </>
  );
}
