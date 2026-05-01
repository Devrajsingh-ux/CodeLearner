"use client";

import { motion } from "framer-motion";
import {
  Bell,
  Camera,
  CheckCircle2,
  Copy,
  Flame,
  Github,
  Globe,
  Lock,
  Mail,
  MapPin,
  Shield,
  Sparkles,
  Trophy,
  Twitter,
  User,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import {
  CircularProgress,
  CountUpValue,
  GlassPanel,
  StatTile,
  TabChip,
} from "@/components/profile/ProfileUI";
import { Badge } from "@/ui/components/Badge";
import { ProgressBar } from "@/ui/components/ProgressBar";
import { useAuth } from "@/context/AuthContext";
import { type AchievementContext, ALL_ACHIEVEMENTS } from "@/data/achievements";
import { cn, formatNumber, getInitials } from "@/lib/utils";
import {
  AVATAR_GRADIENTS,
  type EnrolledTrack,
  getTier,
  type NotificationPrefs,
  type ProfileFields,
  profileReducer,
} from "./_shared";
import { AccountTab } from "./accounts/AccountTab";
import { NotificationsTab } from "./notifications/NotificationsTab";
import { PrivacyTab } from "./privacy&security/PrivacyTab";
import { ProfileTab } from "./profile-edits/ProfileTab";

const TABS = [
  "Profile",
  "Account",
  "Notifications",
  "Privacy & Security",
] as const;
type Tab = (typeof TABS)[number];
const CALENDAR_WEEKS = Array.from({ length: 13 }, (_, i) => `week-${i}`);
const CALENDAR_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function getSafeUrl(url: string): string {
  if (!url) return "";
  return /^https?:\/\//.test(url) ? url : `https://${url}`;
}

export default function ProfilePage() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const [activeTab, setActiveTab] = useState<Tab>("Profile");
  const [showAllAchievements, setShowAllAchievements] = useState(false);
  const [shareToast, setShareToast] = useState(false);
  const [tracksLoading, setTracksLoading] = useState(true);
  const [enrolledTracks, setEnrolledTracks] = useState<EnrolledTrack[]>([]);

  useEffect(() => {
    if (!isLoading && !user) router.replace("/login");
  }, [user, isLoading, router]);

  const [profile, dispatch] = useReducer(profileReducer, {
    displayName: "",
    username: "",
    bio: "",
    location: "",
    website: "",
    github: "",
    twitter: "",
    linkedin: "",
    avatarGradient: AVATAR_GRADIENTS[0],
  } as ProfileFields);

  useEffect(() => {
    if (!user) return;
    dispatch({ type: "SET_FIELD", field: "displayName", value: user.name });
    dispatch({ type: "SET_FIELD", field: "username", value: user.username });
  }, [user?.id, user]);

  const setField = useCallback(
    (field: keyof ProfileFields) => (value: string) =>
      dispatch({ type: "SET_FIELD", field, value }),
    [],
  );

  useEffect(() => {
    let cancelled = false;

    async function loadTracks() {
      setTracksLoading(true);
      try {
        const res = await fetch("/api/courses", { cache: "no-store" });
        const json = await res.json();
        const list = Array.isArray(json.courses) ? json.courses : [];
        if (cancelled) return;
        const mapped: EnrolledTrack[] = list
          .slice(0, 6)
          .map((item: unknown) => {
            const t = (item ?? {}) as Record<string, unknown>;
            return {
              id: String(t.id ?? ""),
              slug: String(t.slug ?? ""),
              title: String(t.title ?? ""),
              lessonsCount: Number(t.lessonsCount || 0),
              icon: String(t.icon ?? ""),
              color: String(t.color ?? "#8b5cf6"),
              category: String(t.category ?? ""),
              enrolledCount: Number(t.enrolledCount || 0),
              rating: Number(t.rating || 0),
              duration: String(t.duration ?? "0h"),
            };
          });
        setEnrolledTracks(mapped);
      } catch {
        if (!cancelled) setEnrolledTracks([]);
      } finally {
        if (!cancelled) setTracksLoading(false);
      }
    }

    if (user) loadTracks();
    return () => {
      cancelled = true;
    };
  }, [user]);

  const authUser =
    user ??
    ({
      id: "",
      name: "Learner",
      email: "",
      username: "learner",
      role: "student",
      xp: 0,
      level: 1,
      streak: 0,
    } as const);

  const [profileSaving, setProfileSaving] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);
  const [profileErrors, setProfileErrors] = useState<
    Partial<Record<keyof ProfileFields, string>>
  >({});

  function validateProfile(): boolean {
    const errs: typeof profileErrors = {};
    if (!profile.displayName.trim() || profile.displayName.trim().length < 2)
      errs.displayName = "Display name must be at least 2 characters.";
    if (
      !profile.username.trim() ||
      !/^[a-z0-9_.-]{3,20}$/.test(profile.username.toLowerCase())
    )
      errs.username = "Username: 3-20 chars, letters, numbers, _, - or . only.";
    if (profile.bio.length > 200)
      errs.bio = "Bio must be 200 characters or fewer.";
    if (profile.website && !/^https?:\/\/.{3,}/.test(profile.website))
      errs.website = "Enter a valid URL starting with http:// or https://";
    setProfileErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    if (!validateProfile()) return;
    setProfileSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setProfileSaving(false);
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2500);
  }

  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [pwSaving, setPwSaving] = useState(false);
  const [pwSaved, setPwSaved] = useState(false);
  const [pwErrors, setPwErrors] = useState<{
    currentPw?: string;
    newPw?: string;
    confirmPw?: string;
  }>({});

  async function changePassword(e: React.FormEvent) {
    e.preventDefault();
    const errs: typeof pwErrors = {};
    if (!currentPw) errs.currentPw = "Enter your current password.";
    if (newPw.length < 8)
      errs.newPw = "New password must be at least 8 characters.";
    if (newPw !== confirmPw) errs.confirmPw = "Passwords do not match.";
    setPwErrors(errs);
    if (Object.keys(errs).length) return;
    setPwSaving(true);
    await new Promise((r) => setTimeout(r, 900));
    setPwSaving(false);
    setPwSaved(true);
    setCurrentPw("");
    setNewPw("");
    setConfirmPw("");
    setTimeout(() => setPwSaved(false), 2500);
  }

  const [emailValue, setEmailValue] = useState(user?.email ?? "");
  const [emailSaving, setEmailSaving] = useState(false);
  const [emailSaved, setEmailSaved] = useState(false);
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    if (user?.email) setEmailValue(user.email);
  }, [user?.email]);

  async function changeEmail(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      setEmailError("Enter a valid email address.");
      return;
    }
    setEmailError("");
    setEmailSaving(true);
    await new Promise((r) => setTimeout(r, 700));
    setEmailSaving(false);
    setEmailSaved(true);
    setTimeout(() => setEmailSaved(false), 2500);
  }

  const [notifs, setNotifs] = useState<NotificationPrefs>({
    muteAll: false,
    frequency: "daily",
    courseUpdates: true,
    weeklyDigest: true,
    achievementAlerts: true,
    streakReminders: true,
    newCourses: false,
    communityReplies: true,
    marketingEmails: false,
  });
  const [notifsSaving, setNotifsSaving] = useState(false);
  const [notifsSaved, setNotifsSaved] = useState(false);

  async function saveNotifs(e: React.FormEvent) {
    e.preventDefault();
    setNotifsSaving(true);
    await new Promise((r) => setTimeout(r, 700));
    setNotifsSaving(false);
    setNotifsSaved(true);
    setTimeout(() => setNotifsSaved(false), 2500);
  }

  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [showDeletePanel, setShowDeletePanel] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function deleteAccount() {
    if (deleteConfirm !== "DELETE") return;
    setDeleting(true);
    await new Promise((r) => setTimeout(r, 1200));
    await logout();
    router.replace("/");
  }

  async function handleShareProfile() {
    const shareUrl = `${window.location.origin}/profile`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: "My CodeLearner profile",
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
      }
      setShareToast(true);
      setTimeout(() => setShareToast(false), 1800);
    } catch {
      // no-op for user-cancelled share dialog
    }
  }

  const tier = getTier(authUser.level);
  const xpForCurrentLevel = (authUser.level - 1) ** 2 * 100;
  const xpForNextLevel = authUser.level ** 2 * 100;
  const xpInCurrentLevel = Math.max(0, authUser.xp - xpForCurrentLevel);
  const xpNeededToAdvance = xpForNextLevel - xpForCurrentLevel;
  const xpPercent = Math.min(
    100,
    xpNeededToAdvance === 0
      ? 100
      : Math.round((xpInCurrentLevel / xpNeededToAdvance) * 100),
  );

  const lessonsCompleted = Math.max(
    0,
    Math.floor((authUser.level + enrolledTracks.length) * 3.8),
  );
  const problemsSolved = Math.max(0, Math.floor(authUser.xp / 85));

  const achievementCtx: AchievementContext = {
    xp: authUser.xp,
    level: authUser.level,
    streak: authUser.streak,
    enrolledCoursesCount: enrolledTracks.length,
    completedLessonsCount: lessonsCompleted,
    solvedProblemsCount: problemsSolved,
    hasGithub: profile.github.trim().length > 0,
    hasTwitter: profile.twitter.trim().length > 0,
    hasLinkedin: profile.linkedin.trim().length > 0,
  };

  const achievements = ALL_ACHIEVEMENTS.map((a) => ({
    ...a,
    earned: a.isEarned(achievementCtx),
  }));
  const earnedAchievements = achievements.filter((a) => a.earned);
  const lockedAchievements = achievements.filter((a) => !a.earned);
  const featuredAchievement =
    earnedAchievements[earnedAchievements.length - 1] ?? lockedAchievements[0];
  const visibleAchievements = showAllAchievements
    ? achievements
    : achievements.slice(0, 10);

  const activityCells = useMemo(() => {
    return Array.from({ length: 13 * 7 }).map((_, i) => {
      const intensity = Math.max(
        0,
        ((i + authUser.streak + authUser.level) % 5) - 1,
      );
      const minutes = intensity === 0 ? 0 : intensity * 15 + (i % 3) * 5;
      return { intensity, minutes };
    });
  }, [authUser.level, authUser.streak]);

  const stats = [
    {
      key: "xp",
      label: "Total XP",
      value: <CountUpValue value={authUser.xp} compact />,
      icon: <Zap className="h-4.5 w-4.5 text-violet-300" />,
      accent: "#8b5cf6",
      trend: "+12% this week",
    },
    {
      key: "level",
      label: "Level",
      value: <CountUpValue value={authUser.level} />,
      icon: <Trophy className="h-4.5 w-4.5 text-amber-300" />,
      accent: "#f59e0b",
      trend: `${formatNumber(xpForNextLevel - authUser.xp)} XP to next`,
    },
    {
      key: "streak",
      label: "Streak Days",
      value: <CountUpValue value={authUser.streak} />,
      icon: <Flame className="h-4.5 w-4.5 text-amber-300" />,
      accent: "#f59e0b",
      trend: "Keep the fire alive",
    },
    {
      key: "courses",
      label: "Courses Enrolled",
      value: <CountUpValue value={enrolledTracks.length} />,
      icon: <Shield className="h-4.5 w-4.5 text-cyan-300" />,
      accent: "#06b6d4",
      trend: tracksLoading ? "Syncing..." : "Active tracks",
    },
    {
      key: "lessons",
      label: "Lessons Completed",
      value: <CountUpValue value={lessonsCompleted} />,
      icon: <CheckCircle2 className="h-4.5 w-4.5 text-emerald-300" />,
      accent: "#22c55e",
      trend: "Daily momentum",
    },
    {
      key: "problems",
      label: "Problems Solved",
      value: <CountUpValue value={problemsSolved} />,
      icon: <Sparkles className="h-4.5 w-4.5 text-violet-300" />,
      accent: "#8b5cf6",
      trend: "Sharpening logic",
    },
  ];

  if (isLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-violet-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 pb-28 pt-24 text-zinc-100 lg:pb-14">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/3 h-[28rem] w-[28rem] rounded-full bg-violet-500/12 blur-3xl" />
        <div className="absolute top-1/3 right-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-20 h-72 w-72 rounded-full bg-amber-500/8 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <GlassPanel className="mb-6 overflow-hidden p-0">
          <div className="relative h-40 bg-linear-to-r from-violet-900/70 via-indigo-900/65 to-cyan-900/60">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(139,92,246,.25),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(6,182,212,.22),transparent_45%)]" />
          </div>

          <div className="relative px-5 pb-5 sm:px-6 sm:pb-6">
            <div className="-mt-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="flex items-end gap-4">
                <div className="group relative">
                  <div
                    className={cn(
                      "flex h-24 w-24 items-center justify-center rounded-full bg-linear-to-br ring-4 ring-zinc-950 text-2xl font-bold text-white shadow-2xl shadow-violet-500/25 transition-transform duration-300 group-hover:scale-105",
                      profile.avatarGradient,
                    )}
                    aria-label={`Avatar for ${user.name}`}
                    role="img"
                  >
                    {getInitials(profile.displayName || user.name)}
                  </div>
                  <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-zinc-950 bg-emerald-400" />
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="absolute inset-0 hidden items-center justify-center rounded-full bg-black/45 text-white group-hover:flex focus-visible:flex"
                    aria-label="Change avatar"
                  >
                    <Camera className="h-5 w-5" />
                  </button>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/avif"
                    className="hidden"
                  />
                </div>

                <div className="pb-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                      {profile.displayName || user.name}
                    </h1>
                    <Badge variant="info">Verified learner</Badge>
                  </div>
                  <p className="text-sm text-zinc-400">
                    @{profile.username || user.username}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full border border-violet-500/30 bg-violet-500/12 px-2 py-0.5 text-xs font-semibold text-violet-300">
                      <Trophy className="h-3.5 w-3.5" /> Level {user.level}
                    </span>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-semibold",
                        tier.color,
                        "border-white/15 bg-white/8",
                      )}
                    >
                      Tier {tier.name}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-xs font-semibold text-amber-300 animate-[pulse_2.4s_ease-in-out_infinite]">
                      <Flame className="h-3.5 w-3.5" /> {user.streak}-day streak
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 lg:pb-1">
                <button
                  type="button"
                  onClick={handleShareProfile}
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/15 bg-white/7 px-3 py-2 text-sm font-medium text-zinc-100 transition hover:bg-white/12"
                >
                  <Copy className="h-4 w-4" /> Share Profile
                </button>
                <Link
                  href="/learn"
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-violet-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-violet-500"
                >
                  <Sparkles className="h-4 w-4" /> Continue Learning
                </Link>
              </div>
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_auto]">
              <div>
                {profile.bio ? (
                  <p className="max-w-3xl whitespace-pre-wrap text-sm leading-relaxed text-zinc-300">
                    {profile.bio}
                  </p>
                ) : (
                  <p className="text-sm text-zinc-500">
                    Add a bio in Profile tab to showcase your coding journey.
                  </p>
                )}

                <div className="mt-3 flex flex-wrap gap-2">
                  {profile.location ? (
                    <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/6 px-2 py-1 text-xs text-zinc-300">
                      <MapPin className="h-3.5 w-3.5 text-zinc-500" />{" "}
                      {profile.location}
                    </span>
                  ) : null}
                  {profile.website ? (
                    <a
                      href={getSafeUrl(profile.website)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-full border border-violet-500/25 bg-violet-500/10 px-2 py-1 text-xs text-violet-200 hover:bg-violet-500/20"
                    >
                      <Globe className="h-3.5 w-3.5" />{" "}
                      {profile.website.replace(/^https?:\/\//, "")}
                    </a>
                  ) : null}
                  {profile.github ? (
                    <a
                      href={`https://github.com/${profile.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/6 px-2 py-1 text-xs text-zinc-300 hover:text-white"
                    >
                      <Github className="h-3.5 w-3.5" /> {profile.github}
                    </a>
                  ) : null}
                  {profile.twitter ? (
                    <a
                      href={`https://twitter.com/${profile.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-full border border-cyan-500/25 bg-cyan-500/10 px-2 py-1 text-xs text-cyan-200"
                    >
                      <Twitter className="h-3.5 w-3.5" /> @{profile.twitter}
                    </a>
                  ) : null}
                </div>
              </div>

              <div className="min-w-[240px] rounded-2xl border border-white/10 bg-zinc-900/35 p-4">
                <p className="mb-2 text-xs uppercase tracking-[0.2em] text-zinc-500">
                  XP Burst
                </p>
                <p className="text-2xl font-bold text-white">
                  <CountUpValue value={user.xp} compact /> XP
                </p>
                <div className="mt-2">
                  <ProgressBar value={xpPercent} size="sm" color="violet" />
                  <p className="mt-1 text-xs text-zinc-500">
                    {formatNumber(xpInCurrentLevel)} /{" "}
                    {formatNumber(xpNeededToAdvance)} to next level
                  </p>
                </div>
              </div>
            </div>
          </div>
        </GlassPanel>

        <section className="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {stats.map((item) => (
            <StatTile
              key={item.key}
              icon={item.icon}
              label={item.label}
              value={item.value}
              accent={item.accent}
              trend={item.trend}
            />
          ))}
        </section>

        <section className="mb-6 grid gap-5 xl:grid-cols-3">
          <GlassPanel className="p-5 xl:col-span-1">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Level Progress</h2>
              <Badge variant="purple">Level {user.level}</Badge>
            </div>
            <div className="flex items-center justify-center py-2">
              <CircularProgress
                value={xpInCurrentLevel}
                total={xpNeededToAdvance}
                label="toward next"
              />
            </div>
            <p className="mt-3 text-center text-sm text-zinc-400">
              <span className="font-semibold text-violet-300">
                {formatNumber(xpForNextLevel - user.xp)} XP
              </span>{" "}
              needed for Level {user.level + 1}
            </p>
            <div className="mt-4 rounded-xl border border-white/10 bg-zinc-900/30 p-3 text-xs text-zinc-400">
              Tier ladder: Bronze, Silver, Gold, Platinum, Diamond
            </div>
          </GlassPanel>

          <GlassPanel className="p-5 xl:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Achievements Showcase</h2>
              <button
                type="button"
                onClick={() => setShowAllAchievements((v) => !v)}
                className="text-xs text-violet-300 hover:text-violet-200"
              >
                {showAllAchievements ? "Show less" : "View all"}
              </button>
            </div>

            {featuredAchievement ? (
              <div className="mb-4 rounded-2xl border border-white/10 bg-zinc-900/35 p-4">
                <p className="mb-1 text-xs uppercase tracking-[0.2em] text-zinc-500">
                  Featured
                </p>
                <div className="flex items-center gap-3">
                  <span
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl"
                    style={{
                      backgroundColor: `${featuredAchievement.color}22`,
                    }}
                  >
                    <featuredAchievement.icon
                      className="h-5 w-5"
                      style={{ color: featuredAchievement.color }}
                    />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-zinc-100">
                      {featuredAchievement.title}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {featuredAchievement.task}
                    </p>
                  </div>
                </div>
              </div>
            ) : null}

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-5">
              {visibleAchievements.map((a) => (
                <div
                  key={a.id}
                  title={a.earned ? a.description : `Locked: ${a.task}`}
                  className={cn(
                    "rounded-xl border px-2 py-2.5 text-center",
                    a.earned
                      ? "border-white/15 bg-white/8"
                      : "border-white/8 bg-white/2 opacity-45 grayscale",
                  )}
                >
                  <span
                    className="mx-auto mb-1 inline-flex h-8 w-8 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${a.color}20` }}
                  >
                    <a.icon className="h-4 w-4" style={{ color: a.color }} />
                  </span>
                  <p className="line-clamp-2 text-[11px] font-medium text-zinc-200">
                    {a.title}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-zinc-500">
              <span>
                {earnedAchievements.length}/{achievements.length} earned
              </span>
              <span>{lockedAchievements.length} locked</span>
            </div>
          </GlassPanel>
        </section>

        <section className="mb-6 grid gap-5 xl:grid-cols-3">
          <GlassPanel className="p-5 xl:col-span-2">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Activity Calendar</h2>
              <Badge variant="info">Quarterly view</Badge>
            </div>
            <div className="grid grid-cols-13 gap-1.5">
              {CALENDAR_WEEKS.map((weekKey, col) => (
                <div key={weekKey} className="grid gap-1.5">
                  {CALENDAR_DAYS.map((day, row) => {
                    const idx = col * 7 + row;
                    const cell = activityCells[idx];
                    const color =
                      cell.intensity === 0
                        ? "bg-white/6"
                        : cell.intensity === 1
                          ? "bg-violet-500/30"
                          : cell.intensity === 2
                            ? "bg-violet-500/50"
                            : cell.intensity === 3
                              ? "bg-violet-500/75"
                              : "bg-violet-500";
                    return (
                      <div
                        key={`${weekKey}-${day}`}
                        className={cn(
                          "h-4 rounded-sm transition hover:scale-110",
                          color,
                        )}
                        title={`${cell.minutes} mins active`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-zinc-500">
              No activity yet? Complete lessons to fill your calendar.
            </p>
          </GlassPanel>

          <GlassPanel className="p-5 xl:col-span-1">
            <h2 className="mb-3 text-lg font-semibold">Learning Highlights</h2>
            {tracksLoading ? (
              <div className="space-y-2">
                {["s1", "s2", "s3"].map((id) => (
                  <div
                    key={id}
                    className="h-16 animate-pulse rounded-xl border border-white/10 bg-white/6"
                  />
                ))}
              </div>
            ) : enrolledTracks.length === 0 ? (
              <div className="rounded-xl border border-dashed border-violet-500/35 bg-violet-500/8 p-4 text-sm text-zinc-300">
                Explore courses to get started.
              </div>
            ) : (
              <div className="space-y-2">
                {enrolledTracks.slice(0, 3).map((t, idx) => (
                  <Link
                    key={t.id}
                    href={`/learn/${t.slug}`}
                    className="block rounded-xl border border-white/10 bg-zinc-900/35 p-3 hover:border-violet-500/30"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-medium text-zinc-100">
                        {t.title}
                      </p>
                      <span className="text-xs text-zinc-500">
                        {t.duration}
                      </span>
                    </div>
                    <div className="mt-2">
                      <ProgressBar
                        value={Math.min(95, 20 + idx * 17)}
                        size="sm"
                        color="violet"
                      />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </GlassPanel>
        </section>

        <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-3xl border border-white/10 bg-white/4 p-3 backdrop-blur-md">
              {TABS.map((tab) => (
                <TabChip
                  key={tab}
                  active={activeTab === tab}
                  onClick={() => setActiveTab(tab)}
                  icon={
                    tab === "Profile" ? (
                      <User className="h-4 w-4" />
                    ) : tab === "Account" ? (
                      <Mail className="h-4 w-4" />
                    ) : tab === "Notifications" ? (
                      <Bell className="h-4 w-4" />
                    ) : (
                      <Lock className="h-4 w-4" />
                    )
                  }
                  badge={tab === "Notifications" ? "3" : undefined}
                >
                  {tab}
                </TabChip>
              ))}
            </div>
          </aside>

          <section className="min-w-0">
            <div className="mb-3 overflow-x-auto pb-1 lg:hidden">
              <div className="flex min-w-max gap-2">
                {TABS.map((tab) => (
                  <TabChip
                    key={tab}
                    active={activeTab === tab}
                    onClick={() => {
                      setActiveTab(tab);
                    }}
                  >
                    {tab}
                  </TabChip>
                ))}
              </div>
            </div>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22 }}
            >
              {activeTab === "Profile" ? (
                <ProfileTab
                  profile={profile}
                  setField={setField}
                  onAvatarGradient={(g: string) =>
                    dispatch({
                      type: "SET_FIELD",
                      field: "avatarGradient",
                      value: g,
                    })
                  }
                  profileErrors={profileErrors}
                  profileSaving={profileSaving}
                  profileSaved={profileSaved}
                  onSubmit={saveProfile}
                  enrolledTracks={enrolledTracks}
                />
              ) : null}

              {activeTab === "Account" ? (
                <AccountTab
                  emailValue={emailValue}
                  setEmailValue={setEmailValue}
                  emailError={emailError}
                  setEmailError={setEmailError}
                  emailSaving={emailSaving}
                  emailSaved={emailSaved}
                  onChangeEmail={changeEmail}
                  currentPw={currentPw}
                  setCurrentPw={setCurrentPw}
                  newPw={newPw}
                  setNewPw={setNewPw}
                  confirmPw={confirmPw}
                  setConfirmPw={setConfirmPw}
                  pwErrors={pwErrors}
                  pwSaving={pwSaving}
                  pwSaved={pwSaved}
                  onChangePassword={changePassword}
                  currentSessionDate={new Date().toLocaleDateString()}
                  onLogout={async () => {
                    await logout();
                    router.replace("/login");
                  }}
                />
              ) : null}

              {activeTab === "Notifications" ? (
                <NotificationsTab
                  notifs={notifs}
                  setNotifs={setNotifs}
                  notifsSaving={notifsSaving}
                  notifsSaved={notifsSaved}
                  onSubmit={saveNotifs}
                />
              ) : null}

              {activeTab === "Privacy & Security" ? (
                <PrivacyTab
                  deleteConfirm={deleteConfirm}
                  setDeleteConfirm={setDeleteConfirm}
                  showDeletePanel={showDeletePanel}
                  setShowDeletePanel={setShowDeletePanel}
                  deleting={deleting}
                  onDeleteAccount={deleteAccount}
                />
              ) : null}
            </motion.div>
          </section>
        </div>
      </div>

      <div className="fixed bottom-3 left-1/2 z-40 w-[calc(100%-1.5rem)] max-w-md -translate-x-1/2 rounded-2xl border border-white/15 bg-zinc-900/85 p-2 backdrop-blur-md lg:hidden">
        <div className="grid grid-cols-4 gap-1">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => {
                setActiveTab(tab);
              }}
              className={cn(
                "min-h-11 rounded-xl px-2 text-[11px] font-medium",
                activeTab === tab
                  ? "bg-violet-500/20 text-violet-200"
                  : "text-zinc-400",
              )}
            >
              {tab === "Privacy & Security" ? "Privacy" : tab}
            </button>
          ))}
        </div>
      </div>

      {shareToast ? (
        <div className="fixed bottom-24 right-4 z-50 rounded-xl border border-white/10 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 shadow-2xl shadow-black/40 lg:bottom-6">
          Profile link copied
        </div>
      ) : null}
    </main>
  );
}
