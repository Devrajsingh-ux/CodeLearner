"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Bell,
  BookOpen,
  ChevronDown,
  Code2,
  Flame,
  FolderKanban,
  Gauge,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  Settings,
  Sparkles,
  Target,
  Trophy,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Avatar } from "@/ui/components/Avatar";
import { Button } from "@/ui/components/Button";
import { useAuth } from "@/context/AuthContext";
import { CATEGORIES } from "@/data/courses";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/learn", label: "Courses" },
  { href: "/problems", label: "Problems" },
  { href: "/#features", label: "Features" },
  { href: "/#testimonials", label: "Reviews" },
] as const;

const trendingSearches = [
  "React",
  "TypeScript",
  "System Design",
  "Data Structures",
] as const;

const keyboardHint =
  typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform)
    ? "Cmd+K"
    : "Ctrl+K";

function isActiveRoute(pathname: string, href: string, hash?: string) {
  if (href.includes("#")) {
    const [base, anchor] = href.split("#");
    if (pathname !== base) return false;
    return anchor === (hash || "");
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();

  const [currentHash, setCurrentHash] = useState("");

  useEffect(() => {
    function onHashChange() {
      setCurrentHash(window.location.hash.replace(/^#/, ""));
    }
    onHashChange();
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);


  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [coursesMenuOpen, setCoursesMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([
    "Python",
    "Next.js",
  ]);
  const [notifications, setNotifications] = useState<Array<{
    id: string;
    title: string;
    description: string;
    unread: boolean;
    link?: string | null;
    createdAt?: string | null;
  }>>([]);
  const [notificationsLoading, setNotificationsLoading] = useState(false);

  const mobilePanelRef = useRef<HTMLDivElement | null>(null);
  const desktopMenusRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const unreadCount = notifications.filter((item) => item.unread).length;

  async function fetchNotifications() {
    if (!user) return;
    setNotificationsLoading(true);
    try {
      const res = await fetch("/api/notifications", { credentials: "same-origin" });
      if (res.ok) {
        const data = await res.json();
        setNotifications(Array.isArray(data.notifications) ? data.notifications : []);
      } else {
        console.error("Failed to load notifications", await res.text());
      }
    } catch (err) {
      console.error("Failed to fetch notifications", err);
    } finally {
      setNotificationsLoading(false);
    }
  }

  const searchSuggestions = useMemo(() => {
    const pool = [
      ...trendingSearches,
      ...CATEGORIES,
      "Beginner friendly",
      "Cloud",
      "Backend",
      "Interview prep",
    ];

    if (!searchQuery.trim()) {
      return pool.slice(0, 6);
    }

    return pool
      .filter((item) =>
        item.toLowerCase().includes(searchQuery.trim().toLowerCase()),
      )
      .slice(0, 6);
  }, [searchQuery]);

  const userInitials =
    user?.avatar ??
    user?.name
      .split(" ")
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!pathname) {
      return;
    }
    setMobileOpen(false);
    setCoursesMenuOpen(false);
    setSearchOpen(false);
    setNotificationsOpen(false);
    setUserMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (notificationsOpen) {
      fetchNotifications();
    }
  }, [notificationsOpen]);

  // Poll for new notifications in background when user is present
  useEffect(() => {
    if (!user) return;

    // initial fetch
    fetchNotifications();

    const id = window.setInterval(() => {
      fetchNotifications();
    }, 30_000);

    return () => clearInterval(id);
  }, [user]);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      const containers = [
        desktopMenusRef.current,
        searchRef.current,
        mobilePanelRef.current,
      ];

      // If no container is present, bail out.
      if (!containers.some(Boolean)) return;

      const clickedInside = containers.some((el) => el?.contains(event.target as Node));
      if (!clickedInside) {
        setCoursesMenuOpen(false);
        setSearchOpen(false);
        setNotificationsOpen(false);
        setUserMenuOpen(false);
      }
    }

    function onEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setCoursesMenuOpen(false);
        setSearchOpen(false);
        setNotificationsOpen(false);
        setUserMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onEscape);

    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onEscape);
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen || !mobilePanelRef.current) {
      return;
    }

    const focusable = mobilePanelRef.current.querySelectorAll<HTMLElement>(
      "a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex='-1'])",
    );

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }

      if (event.key !== "Tab" || focusable.length < 2) {
        return;
      }

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  useEffect(() => {
    if (searchOpen) {
      // focus the input when the search popover opens
      // use a micro task to wait for element to mount
      setTimeout(() => searchInputRef.current?.focus(), 0);
    }
  }, [searchOpen]);

  useEffect(() => {
    function onShortcut(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
    }

    document.addEventListener("keydown", onShortcut);
    return () => document.removeEventListener("keydown", onShortcut);
  }, []);

  async function handleLogout() {
    await logout();
    setUserMenuOpen(false);
    router.push("/");
  }

  function runSearch(value: string) {
    const normalized = value.trim();
    if (!normalized) {
      router.push("/learn");
      return;
    }

    setRecentSearches((current) =>
      [
        normalized,
        ...current.filter(
          (item) => item.toLowerCase() !== normalized.toLowerCase(),
        ),
      ].slice(0, 5),
    );

    router.push(`/learn?q=${encodeURIComponent(normalized)}`);
    setSearchOpen(false);
  }

  function markAllRead() {
    // Optimistic update
    setNotifications((prev) => prev.map((item) => ({ ...item, unread: false })));
    fetch("/api/notifications/mark-all", { method: "POST", credentials: "same-origin" }).catch((err) => {
      console.error("Failed to mark all read:", err);
      // Re-fetch to restore accurate state
      fetchNotifications();
    });
  }

  async function handleNotificationClick(item: { id: string; unread: boolean; link?: string | null }) {
    // Mark read if unread
    if (item.unread) {
      // Optimistic UI
      setNotifications((prev) => prev.map((n) => (n.id === item.id ? { ...n, unread: false } : n)));
      try {
        await fetch(`/api/notifications/${item.id}`, {
          method: "PATCH",
          credentials: "same-origin",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ unread: false }),
        });
      } catch (err) {
        console.error("Failed to mark notification read:", err);
        fetchNotifications();
      }
    }

    // Navigate if link provided
    if (item.link) {
      try {
        router.push(item.link);
      } catch {
        // ignore
      }
    }
    setNotificationsOpen(false);
  }

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "border-b border-white/10 bg-zinc-950/78 backdrop-blur-2xl shadow-[0_16px_48px_-24px_rgba(0,0,0,0.95)]"
          : "bg-transparent",
      )}
    >
      <a
        href="#main-content"
        className="sr-only left-3 top-2 rounded-lg bg-violet-500 px-3 py-2 text-sm font-semibold text-white focus:not-sr-only focus:absolute focus:z-[60]"
      >
        Skip to content
      </a>

      <nav
        className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <Link href="/" className="group flex items-center gap-2.5">
          <motion.span
            animate={prefersReducedMotion ? undefined : { scale: [1, 1.04, 1] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
            className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-violet-600 to-cyan-500 shadow-lg shadow-violet-500/35 transition-all duration-200 group-hover:scale-105"
          >
            <Code2 className="h-4 w-4 text-white" />
            <span className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-inset ring-white/20" />
          </motion.span>
          <span className="bg-linear-to-r from-violet-300 to-cyan-300 bg-clip-text text-lg font-extrabold tracking-tight text-transparent">
            Zentax
          </span>
        </Link>

        <div
          ref={desktopMenusRef}
          className="hidden items-center gap-2 md:flex"
        >
          <div className="relative">
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={coursesMenuOpen}
              onMouseEnter={() => setCoursesMenuOpen(true)}
              onClick={() => setCoursesMenuOpen((open) => !open)}
              className="group inline-flex h-10 items-center gap-1.5 rounded-xl px-3 text-sm font-semibold text-zinc-300 transition hover:bg-white/8 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
            >
              Courses
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform",
                  coursesMenuOpen && "rotate-180",
                )}
              />
              <span className="absolute inset-x-3 bottom-1 h-px origin-left scale-x-0 bg-linear-to-r from-violet-400 to-cyan-400 transition-transform duration-200 group-hover:scale-x-100" />
            </button>

            <AnimatePresence>
              {coursesMenuOpen ? (
                <motion.div
                  initial={
                    prefersReducedMotion ? undefined : { opacity: 0, y: 8 }
                  }
                  animate={
                    prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
                  }
                  exit={prefersReducedMotion ? undefined : { opacity: 0, y: 6 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute left-0 top-12 z-50 w-[520px] rounded-2xl border border-white/10 bg-zinc-900/90 p-4 shadow-2xl shadow-black/50 backdrop-blur-2xl"
                  onMouseLeave={() => setCoursesMenuOpen(false)}
                  role="menu"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                      Browse Categories
                    </p>
                    <Link
                      href="/learn"
                      className="text-xs font-semibold text-cyan-300 hover:text-cyan-200"
                      onClick={() => setCoursesMenuOpen(false)}
                    >
                      View all
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {CATEGORIES.map((category) => (
                      <Link
                        key={category}
                        href={`/learn?category=${encodeURIComponent(category)}`}
                        className="rounded-xl border border-white/6 bg-white/3 px-3 py-2 text-sm font-medium text-zinc-200 transition hover:border-violet-400/50 hover:bg-violet-500/10"
                        onClick={() => setCoursesMenuOpen(false)}
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          {navLinks
            .filter((item) => item.label !== "Courses")
            .map((item) => {
              // Hide Problems link on the home page, and only show it to logged-in users.
              if (item.label === "Problems" && (pathname === "/" || !user)) {
                return null;
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group relative inline-flex h-10 items-center rounded-xl px-3 text-sm font-semibold transition",
                    isActiveRoute(pathname, item.href, currentHash)
                      ? "bg-violet-500/15 text-violet-300"
                      : "text-zinc-300 hover:bg-white/8 hover:text-white",
                  )}
                >
                  {item.label}
                  <span className="absolute inset-x-3 bottom-1 h-px origin-left scale-x-0 bg-linear-to-r from-violet-400 to-cyan-400 transition-transform duration-200 group-hover:scale-x-100" />
                </Link>
              );
            })}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setSearchOpen((open) => !open);
                setCoursesMenuOpen(false);
              }}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-zinc-900/70 text-zinc-300 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
              aria-label="Open search"
              aria-expanded={searchOpen}
            >
              <Search className="h-4 w-4" />
            </button>

            <AnimatePresence>
              {searchOpen ? (
                <motion.div
                  ref={searchRef}
                  initial={
                    prefersReducedMotion ? undefined : { opacity: 0, y: 8 }
                  }
                  animate={
                    prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
                  }
                  exit={prefersReducedMotion ? undefined : { opacity: 0, y: 6 }}
                  transition={{ duration: 0.16, ease: "easeOut" }}
                  className="absolute right-0 top-12 z-50 w-[360px] rounded-2xl border border-white/10 bg-zinc-900/95 p-3 shadow-2xl shadow-black/50 backdrop-blur-2xl"
                >
                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      runSearch(searchQuery);
                    }}
                    className="mb-3"
                  >
                    <label htmlFor="global-search" className="sr-only">
                      Search courses
                    </label>
                    <div className="flex items-center rounded-xl border border-white/10 bg-zinc-950/70 px-3">
                      <Search className="h-4 w-4 text-zinc-500" />
                      <input
                        id="global-search"
                        ref={searchInputRef}
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        className="h-10 w-full bg-transparent pl-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
                        placeholder="Search tracks, topics, tags"
                      />
                      <span className="rounded-md bg-zinc-800 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-400">
                        {keyboardHint}
                      </span>
                    </div>
                  </form>

                  <p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-zinc-500">
                    Suggestions
                  </p>
                  <div className="mb-3 flex flex-wrap gap-1.5">
                    {searchSuggestions.map((suggestion) => (
                      <button
                        type="button"
                        key={suggestion}
                        onClick={() => runSearch(suggestion)}
                        className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-semibold text-zinc-300 transition hover:border-cyan-400/40 hover:text-cyan-200"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>

                  <p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-zinc-500">
                    Recent
                  </p>
                  <div className="space-y-1">
                    {recentSearches.map((item) => (
                      <button
                        type="button"
                        key={item}
                        onClick={() => runSearch(item)}
                        className="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left text-sm text-zinc-300 transition hover:bg-white/6 hover:text-white"
                      >
                        {item}
                        <Sparkles className="h-3.5 w-3.5 text-zinc-500" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          {user ? (
            <>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setNotificationsOpen((open) => !open);
                    setUserMenuOpen(false);
                  }}
                  className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-zinc-900/70 text-zinc-300 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                  aria-label="Notifications"
                  aria-expanded={notificationsOpen}
                >
                  <Bell className="h-4 w-4" />
                  {unreadCount > 0 ? (
                    <span className="absolute -right-1.5 -top-1.5 flex items-center justify-center rounded-full bg-amber-400 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-900">
                      {unreadCount > 99 ? '99+' : unreadCount}
                    </span>
                  ) : null}
                </button>

                <AnimatePresence>
                  {notificationsOpen ? (
                    <motion.div
                      initial={
                        prefersReducedMotion ? undefined : { opacity: 0, y: 8 }
                      }
                      animate={
                        prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
                      }
                      exit={
                        prefersReducedMotion ? undefined : { opacity: 0, y: 6 }
                      }
                      transition={{ duration: 0.16, ease: "easeOut" }}
                      className="absolute right-0 top-12 z-50 w-[340px] rounded-2xl border border-white/10 bg-zinc-900/95 p-3 shadow-2xl shadow-black/50 backdrop-blur-2xl"
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <p className="text-sm font-semibold text-white">
                          Notifications
                        </p>
                        <button
                          type="button"
                          onClick={markAllRead}
                          className="text-xs font-semibold text-cyan-300 hover:text-cyan-200"
                        >
                          Mark all read
                        </button>
                      </div>

                      <div className="max-h-72 space-y-1 overflow-y-auto pr-1">
                        {notificationsLoading ? (
                          <div className="space-y-2">
                            <div className="h-10 w-full animate-pulse rounded-lg bg-white/6" />
                            <div className="h-10 w-full animate-pulse rounded-lg bg-white/6" />
                            <div className="h-10 w-full animate-pulse rounded-lg bg-white/6" />
                          </div>
                        ) : notifications.length === 0 ? (
                          <p className="text-sm text-zinc-500">No notifications</p>
                        ) : (
                          notifications.map((item) => (
                            <button
                              type="button"
                              key={item.id}
                              onClick={() => handleNotificationClick(item)}
                              className="w-full rounded-xl border border-white/6 bg-white/3 px-3 py-2 text-left transition hover:border-violet-400/40 hover:bg-violet-500/8"
                            >
                              <div className="mb-1 flex items-start justify-between gap-2">
                                <p className="text-sm font-semibold text-zinc-100">
                                  {item.title}
                                </p>
                                {item.unread ? (
                                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-400" />
                                ) : null}
                              </div>
                              <p className="text-xs text-zinc-400">
                                {item.description}
                              </p>
                            </button>
                          ))
                        )}
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setUserMenuOpen((open) => !open);
                    setNotificationsOpen(false);
                  }}
                  className="flex items-center gap-2 rounded-xl px-2 py-1.5 text-sm transition-colors hover:bg-white/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                  aria-expanded={userMenuOpen}
                  aria-haspopup="menu"
                >
                  <span className="relative">
                    <Avatar
                      initials={userInitials}
                      size="sm"
                      className="ring-violet-500/40"
                    />
                    <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border border-zinc-950 bg-emerald-400" />
                  </span>
                  <span className="font-medium text-zinc-200">
                    {user.name.split(" ")[0]}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-zinc-400 transition-transform",
                      userMenuOpen && "rotate-180",
                    )}
                  />
                </button>

                <AnimatePresence>
                  {userMenuOpen ? (
                    <motion.div
                      initial={
                        prefersReducedMotion ? undefined : { opacity: 0, y: 8 }
                      }
                      animate={
                        prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
                      }
                      exit={
                        prefersReducedMotion ? undefined : { opacity: 0, y: 6 }
                      }
                      transition={{ duration: 0.16, ease: "easeOut" }}
                      className="absolute right-0 mt-2 w-72 rounded-2xl border border-white/10 bg-zinc-900/95 p-2 shadow-2xl shadow-black/40 backdrop-blur-2xl"
                      role="menu"
                    >
                      <div className="mb-2 rounded-xl border border-white/8 bg-white/4 p-3">
                        <p className="text-sm font-semibold text-white">
                          {user.name}
                        </p>
                        <p className="truncate text-xs text-zinc-500">
                          {user.email}
                        </p>
                        <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                          <div className="rounded-lg bg-zinc-950/70 py-2">
                            <p className="text-[10px] uppercase tracking-widest text-zinc-500">
                              XP
                            </p>
                            <p className="mt-1 text-sm font-bold text-violet-300">
                              {user.xp}
                            </p>
                          </div>
                          <div className="rounded-lg bg-zinc-950/70 py-2">
                            <p className="text-[10px] uppercase tracking-widest text-zinc-500">
                              Level
                            </p>
                            <p className="mt-1 text-sm font-bold text-cyan-300">
                              {user.level}
                            </p>
                          </div>
                          <div className="rounded-lg bg-zinc-950/70 py-2">
                            <p className="text-[10px] uppercase tracking-widest text-zinc-500">
                              Streak
                            </p>
                            <p className="mt-1 inline-flex items-center gap-1 text-sm font-bold text-amber-300">
                              <Flame className="h-3 w-3" /> {user.streak}
                            </p>
                          </div>
                        </div>
                      </div>

                      {[
                        {
                          href: "/dashboard",
                          icon: LayoutDashboard,
                          label: "Dashboard",
                        },
                        {
                          href: "/learn",
                          icon: GraduationCap,
                          label: "My Courses",
                        },
                        { href: "/profile", icon: User, label: "Profile" },
                        {
                          href: "/profile/privacy&security",
                          icon: Settings,
                          label: "Settings",
                        },
                      ].map(({ href, icon: Icon, label }) => (
                        <Link
                          key={href}
                          href={href}
                          role="menuitem"
                          className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-zinc-300 transition-colors hover:bg-white/8 hover:text-white"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <Icon className="h-4 w-4" />
                          {label}
                        </Link>
                      ))}

                      <div className="mt-1 border-t border-white/8 pt-1">
                        <button
                          type="button"
                          role="menuitem"
                          onClick={handleLogout}
                          className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-red-400 transition-colors hover:bg-red-500/10"
                        >
                          <LogOut className="h-4 w-4" />
                          Sign out
                        </button>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-10 rounded-xl border border-white/10 bg-zinc-900/60 px-4 text-zinc-200 hover:bg-white/10"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  type="button"
                  size="sm"
                  className="h-10 rounded-xl px-4 font-semibold shadow-violet-500/40"
                >
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-zinc-900/80 text-zinc-300 transition hover:bg-white/10 hover:text-white md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
          onClick={() => setMobileOpen((open) => !open)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-drawer"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          <motion.span
            initial={false}
            animate={mobileOpen ? { rotate: 180 } : { rotate: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </motion.span>
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={prefersReducedMotion ? undefined : { opacity: 0 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-zinc-950/70 backdrop-blur-md md:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              id="mobile-nav-drawer"
              ref={mobilePanelRef}
              initial={prefersReducedMotion ? undefined : { x: "100%" }}
              animate={prefersReducedMotion ? undefined : { x: 0 }}
              exit={prefersReducedMotion ? undefined : { x: "100%" }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              className="ml-auto flex h-full w-full max-w-sm flex-col overflow-y-auto border-l border-white/10 bg-zinc-950/95 p-4"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-5 flex items-center justify-between">
                <p className="text-sm font-bold uppercase tracking-widest text-zinc-500">
                  Navigation
                </p>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-zinc-900 text-zinc-300"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mb-4 rounded-2xl border border-white/10 bg-zinc-900/50 p-3">
                <label htmlFor="mobile-search" className="sr-only">
                  Search courses
                </label>
                <div className="flex items-center rounded-xl border border-white/10 bg-zinc-950 px-3">
                  <Search className="h-4 w-4 text-zinc-500" />
                  <input
                    id="mobile-search"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search learning paths"
                    className="h-10 w-full bg-transparent pl-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => runSearch(searchQuery)}
                  className="mt-2 inline-flex h-10 w-full items-center justify-center rounded-xl bg-linear-to-r from-violet-600 to-cyan-600 text-sm font-semibold text-white"
                >
                  Search
                </button>
              </div>

              <div className="space-y-2">
                {navLinks.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={
                      prefersReducedMotion ? undefined : { opacity: 0, x: 16 }
                    }
                    animate={
                      prefersReducedMotion ? undefined : { opacity: 1, x: 0 }
                    }
                    transition={{ delay: index * 0.04, duration: 0.18 }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "flex min-h-11 items-center justify-between rounded-xl border border-white/8 px-4 py-2 text-base font-semibold transition",
                        isActiveRoute(pathname, item.href)
                          ? "bg-violet-500/15 text-violet-300"
                          : "bg-white/3 text-zinc-200 hover:bg-white/10",
                      )}
                    >
                      {item.label}
                      <ChevronDown className="h-4 w-4 -rotate-90 text-zinc-500" />
                    </Link>
                  </motion.div>
                ))}
              </div>

              {user ? (
                <div className="mt-5 space-y-3 border-t border-white/10 pt-4">
                  <div className="rounded-2xl border border-white/10 bg-white/4 p-3">
                    <div className="mb-2 flex items-center gap-3">
                      <Avatar initials={userInitials} size="md" />
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {user.name}
                        </p>
                        <p className="text-xs text-zinc-500">{user.email}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="rounded-lg bg-zinc-950/70 px-2 py-2 text-center">
                        <Target className="mx-auto h-3.5 w-3.5 text-violet-300" />
                        <p className="mt-1 text-xs font-semibold text-zinc-300">
                          XP {user.xp}
                        </p>
                      </div>
                      <div className="rounded-lg bg-zinc-950/70 px-2 py-2 text-center">
                        <Trophy className="mx-auto h-3.5 w-3.5 text-cyan-300" />
                        <p className="mt-1 text-xs font-semibold text-zinc-300">
                          Lv {user.level}
                        </p>
                      </div>
                      <div className="rounded-lg bg-zinc-950/70 px-2 py-2 text-center">
                        <Flame className="mx-auto h-3.5 w-3.5 text-amber-300" />
                        <p className="mt-1 text-xs font-semibold text-zinc-300">
                          {user.streak}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/dashboard"
                    className="flex min-h-11 items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-zinc-200"
                  >
                    <Gauge className="h-4 w-4 text-violet-300" /> Dashboard
                  </Link>
                  <Link
                    href="/learn"
                    className="flex min-h-11 items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-zinc-200"
                  >
                    <BookOpen className="h-4 w-4 text-cyan-300" /> My Courses
                  </Link>
                  <Link
                    href="/profile"
                    className="flex min-h-11 items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-zinc-200"
                  >
                    <User className="h-4 w-4 text-zinc-300" /> Profile
                  </Link>
                  <Link
                    href="/profile/privacy&security"
                    className="flex min-h-11 items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-zinc-200"
                  >
                    <Settings className="h-4 w-4 text-zinc-300" /> Settings
                  </Link>
                  <Button
                    type="button"
                    variant="danger"
                    size="md"
                    onClick={handleLogout}
                    className="w-full justify-center"
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Sign out
                  </Button>
                </div>
              ) : (
                <div className="mt-5 space-y-3 border-t border-white/10 pt-4">
                  <Link href="/login" className="block">
                    <Button
                      type="button"
                      variant="secondary"
                      size="md"
                      className="w-full"
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/register" className="block">
                    <Button type="button" size="md" className="w-full">
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}

              <div className="mt-6 rounded-2xl border border-cyan-500/20 bg-cyan-500/8 p-3">
                <div className="flex items-center gap-2 text-cyan-300">
                  <FolderKanban className="h-4 w-4" />
                  <p className="text-sm font-semibold">Trending Topics</p>
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {trendingSearches.map((topic) => (
                    <button
                      type="button"
                      key={topic}
                      onClick={() => runSearch(topic)}
                      className="rounded-full border border-cyan-300/20 px-2 py-1 text-xs font-semibold text-cyan-100"
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
