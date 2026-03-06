"use client";

import { Bell, LogOut, Menu, Search, Settings, User } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";

const PAGE_TITLES: Record<string, string> = {
  "/admin/dashboard": "Dashboard",
  "/admin/users": "User Management",
  "/admin/courses": "Course Management",
  "/admin/lessons": "Lesson Management",
  "/admin/analytics": "Analytics",
  "/admin/settings": "Settings",
};

interface AdminHeaderProps {
  pathname: string;
  onMenuClick: () => void;
}

export function AdminHeader({ pathname, onMenuClick }: AdminHeaderProps) {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [query, setQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const title = PAGE_TITLES[pathname] ?? "Admin";

  return (
    <header className="flex h-16 shrink-0 items-center gap-3 border-b border-white/8 bg-zinc-900/80 px-4 backdrop-blur-md">
      {/* Mobile menu toggle */}
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open sidebar"
        className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-400 hover:bg-white/8 hover:text-white transition-colors lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Page title */}
      <h1 className="text-sm font-semibold text-white lg:text-base">{title}</h1>

      {/* Search */}
      <div className="ml-auto hidden items-center gap-1.5 rounded-xl border border-white/8 bg-white/4 px-3 py-1.5 focus-within:border-violet-500/60 focus-within:ring-2 focus-within:ring-violet-500/20 transition-all sm:flex">
        <Search className="h-3.5 w-3.5 shrink-0 text-zinc-500" />
        <input
          type="search"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-40 bg-transparent text-xs text-zinc-300 placeholder:text-zinc-600 outline-none"
        />
      </div>

      {/* Notifications */}
      <button
        type="button"
        aria-label="Notifications"
        className="relative flex h-9 w-9 items-center justify-center rounded-lg text-zinc-400 hover:bg-white/8 hover:text-white transition-colors"
      >
        <Bell className="h-4 w-4" />
        <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-violet-500 ring-1 ring-zinc-900" />
      </button>

      {/* User dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setDropdownOpen((v) => !v)}
          aria-haspopup="true"
          aria-expanded={dropdownOpen}
          className="flex h-9 items-center gap-2 rounded-xl px-2 text-zinc-400 hover:bg-white/8 hover:text-white transition-colors"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-600 text-xs font-bold text-white">
            {user?.avatar ?? "A"}
          </span>
          <span className="hidden text-xs font-medium text-zinc-300 lg:block">{user?.name ?? "Admin"}</span>
        </button>

        {dropdownOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setDropdownOpen(false)}
              aria-hidden
            />
            <div className="absolute right-0 top-11 z-20 w-48 rounded-2xl border border-white/8 bg-zinc-900 p-1 shadow-2xl shadow-black/40">
              <div className="border-b border-white/8 px-3 py-2.5 mb-1">
                <p className="text-xs font-semibold text-white truncate">{user?.name}</p>
                <p className="text-[11px] text-zinc-500 truncate">{user?.email}</p>
              </div>
              <Link
                href="/profile"
                onClick={() => setDropdownOpen(false)}
                className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs text-zinc-400 hover:bg-white/5 hover:text-zinc-200 transition-colors"
              >
                <User className="h-3.5 w-3.5" />
                Profile
              </Link>
              <Link
                href="/admin/settings"
                onClick={() => setDropdownOpen(false)}
                className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs text-zinc-400 hover:bg-white/5 hover:text-zinc-200 transition-colors"
              >
                <Settings className="h-3.5 w-3.5" />
                Settings
              </Link>
              <div className="my-1 border-t border-white/8" />
              <button
                type="button"
                onClick={() => { setDropdownOpen(false); logout(); }}
                className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sign out
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
