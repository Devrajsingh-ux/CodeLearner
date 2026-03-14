"use client";

import {
  Bell,
  Camera,
  ChevronRight,
  Flame,
  Github,
  Globe,
  Lock,
  Loader2,
  Mail,
  MapPin,
  Shield,
  Trophy,
  Twitter,
  User,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useAuth } from "@/context/AuthContext";
import { cn, formatNumber, getInitials } from "@/lib/utils";
import { ALL_ACHIEVEMENTS, type AchievementContext } from "@/data/achievements";
import {
  AVATAR_GRADIENTS,
  profileReducer,
  type EnrolledTrack,
  type NotificationPrefs,
  type ProfileFields,
} from "./_shared";
import { ProfileTab } from "./profile-edits/ProfileTab";
import { AccountTab } from "./accounts/AccountTab";
import { NotificationsTab } from "./notifications/NotificationsTab";
import { PrivacyTab } from "./privacy&security/PrivacyTab";

// ─── Tab config ───────────────────────────────────────────────────────────────

const TABS = ["Profile", "Account", "Notifications", "Privacy & Security"] as const;
type Tab = (typeof TABS)[number];

// ─── Main Page ──────────────────────────────────────────────────────────────

export default function ProfilePage() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  // ── Auth guard
  useEffect(() => {
    if (!isLoading && !user) router.replace("/login");
  }, [user, isLoading, router]);

  // ── Tabs
  const [activeTab, setActiveTab] = useState<Tab>("Profile");

  // ── Profile form
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

  // Sync display name and username from Appwrite once the user session is loaded.
  // useReducer initializes before the async session resolves, so we must
  // explicitly reset these two fields when user becomes available.
  useEffect(() => {
    if (!user) return;
    dispatch({ type: "SET_FIELD", field: "displayName", value: user.name });
    dispatch({ type: "SET_FIELD", field: "username", value: user.username });
  }, [user?.id]); // re-run only when the logged-in identity changes

  const setField = useCallback(
    (field: keyof ProfileFields) => (value: string) =>
      dispatch({ type: "SET_FIELD", field, value }),
    [],
  );

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
      errs.username = "Username: 3–20 chars, letters, numbers, _, - or . only.";
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
    // Simulate API call — replace with server action in production
    await new Promise((r) => setTimeout(r, 800));
    setProfileSaving(false);
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2500);
  }

  // ── Account / password change
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

  // ── Email change
  const [emailValue, setEmailValue] = useState(user?.email ?? "");
  const [emailSaving, setEmailSaving] = useState(false);
  const [emailSaved, setEmailSaved] = useState(false);
  const [emailError, setEmailError] = useState("");

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

  // ── Notification preferences
  const [notifs, setNotifs] = useState<NotificationPrefs>({
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

  // ── Delete account
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [showDeletePanel, setShowDeletePanel] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function deleteAccount() {
    if (deleteConfirm !== "DELETE") return;
    setDeleting(true);
    await new Promise((r) => setTimeout(r, 1200));
    logout();
    router.replace("/");
  }

  // ── Loading skeleton
  if (isLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <Loader2 className="h-8 w-8 animate-spin text-violet-500" />
      </div>
    );
  }

  // Enrollment not yet implemented — derive from empty list
  const enrolledTracks: Array<{ id: string; slug: string; title: string; lessonsCount: number; icon: string; color: string; category: string; enrolledCount: number; rating: number; duration: string }> = [];

  // XP level thresholds: XP needed to *reach* level N = (N-1)² × 100
  // e.g. L1=0, L2=100, L3=400, L4=900, L5=1600 …
  const xpForCurrentLevel = Math.pow(user.level - 1, 2) * 100;
  const xpForNextLevel    = Math.pow(user.level, 2) * 100;
  const xpInCurrentLevel  = Math.max(0, user.xp - xpForCurrentLevel);
  const xpNeededToAdvance = xpForNextLevel - xpForCurrentLevel; // = (2×level − 1) × 100
  const xpPercent = Math.min(
    100,
    xpNeededToAdvance === 0 ? 100 : Math.round((xpInCurrentLevel / xpNeededToAdvance) * 100),
  );

  const achievementCtx: AchievementContext = {
    xp: user.xp,
    level: user.level,
    streak: user.streak,
    enrolledCoursesCount: enrolledTracks.length,
    completedLessonsCount: 0, // TODO: wire to real lesson progress data
    solvedProblemsCount: 0,   // TODO: wire to real problem solve data
    hasGithub: profile.github.trim().length > 0,
    hasTwitter: profile.twitter.trim().length > 0,
    hasLinkedin: profile.linkedin.trim().length > 0,
  };

  const achievements = ALL_ACHIEVEMENTS.map((a) => ({
    ...a,
    earned: a.isEarned(achievementCtx),
  }));

  return (
    <main className="min-h-screen bg-zinc-950 pb-20 pt-28">
      {/* Page chrome */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-violet-600/8 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-indigo-600/6 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* ── Profile hero card ───────────────────────────────────────────── */}
        <Card className="mb-8 overflow-hidden p-0">
          {/* Banner */}
          <div className="relative h-32 bg-linear-to-r from-violet-900/60 via-indigo-900/60 to-zinc-900">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC4yIiBvcGFjaXR5PSIwLjA4Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-60" />
          </div>

          {/* Avatar row */}
          <div className="relative px-6 pb-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="-mt-10 flex items-end gap-4">
                {/* Avatar with upload button */}
                <div className="relative">
                  <div
                    role="img"
                    className={cn(
                      "flex h-20 w-20 items-center justify-center rounded-full",
                      "bg-linear-to-br ring-4 ring-zinc-950 text-2xl font-bold text-white shadow-xl",
                      profile.avatarGradient,
                    )}
                    aria-label={`Avatar for ${user.name}`}
                  >
                    {getInitials(profile.displayName || user.name)}
                  </div>
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-zinc-800 text-zinc-300 transition-colors hover:bg-zinc-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                    aria-label="Change avatar"
                  >
                    <Camera className="h-3.5 w-3.5" />
                  </button>
                  {/* Hidden file input — in prod wire to upload API */}
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/avif"
                    className="hidden"
                  />
                </div>

                {/* Name + badge */}
                <div className="mb-1">
                  <h1 className="text-xl font-bold text-white">
                    {profile.displayName || user.name}
                  </h1>
                  <p className="text-sm text-zinc-400">@{profile.username}</p>
                </div>
              </div>

              {/* Stats strip */}
              <div className="flex flex-wrap gap-3 sm:mb-1">
                {[
                  {
                    label: "XP",
                    value: formatNumber(user.xp),
                    icon: Zap,
                    color: "text-violet-400",
                  },
                  {
                    label: "Level",
                    value: String(user.level),
                    icon: Trophy,
                    color: "text-amber-400",
                  },
                  {
                    label: "Streak",
                    value: `${user.streak}d`,
                    icon: Flame,
                    color: "text-orange-400",
                  },
                  {
                    label: "Courses",
                    value: String(enrolledTracks.length),
                    icon: Shield,
                    color: "text-cyan-400",
                  },
                ].map(({ label, value, icon: Icon, color }) => (
                  <div
                    key={label}
                    className="flex items-center gap-1.5 rounded-xl border border-white/8 bg-white/4 px-3 py-1.5"
                  >
                    <Icon className={cn("h-3.5 w-3.5", color)} />
                    <span className="text-sm font-semibold text-white">
                      {value}
                    </span>
                    <span className="text-xs text-zinc-500">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* XP Progress to next level */}
            <div className="mt-4">
              <div className="mb-1.5 flex items-center justify-between text-xs text-zinc-500">
                <span>
                  Level {user.level} → Level {user.level + 1}
                </span>
                <span>
                  {formatNumber(xpInCurrentLevel)} / {formatNumber(xpNeededToAdvance)} XP
                </span>
              </div>
              <ProgressBar value={xpPercent} size="sm" color="violet" />
            </div>

            {/* Bio */}
            {profile.bio && (
              <p className="mt-3 text-sm text-zinc-400 leading-relaxed max-w-xl">
                {profile.bio}
              </p>
            )}

            {/* Meta links */}
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
              {profile.location && (
                <span className="flex items-center gap-1. text-xs text-zinc-500">
                  <MapPin className="h-3.5 w-3.5" /> {profile.location}
                </span>
              )}
              {profile.website && (
                <a
                  href={profile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 transition-colors"
                >
                  <Globe className="h-3.5 w-3.5" />{" "}
                  {profile.website.replace(/^https?:\/\//, "")}
                </a>
              )}
              {profile.github && (
                <a
                  href={`https://github.com/${profile.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-zinc-400 hover:text-white transition-colors"
                >
                  <Github className="h-3.5 w-3.5" /> {profile.github}
                </a>
              )}
              {profile.twitter && (
                <a
                  href={`https://twitter.com/${profile.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-zinc-400 hover:text-sky-400 transition-colors"
                >
                  <Twitter className="h-3.5 w-3.5" /> @{profile.twitter}
                </a>
              )}
            </div>
          </div>
        </Card>

        {/* ── Achievements ──────────────────────────────────────────────────  */}
        <Card className="mb-8" padding="sm">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold text-zinc-200">Achievements</p>
            <Badge variant="purple">
              {achievements.filter((a) => a.earned).length} /{" "}
              {achievements.length} earned
            </Badge>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
            {achievements.map(({ id, icon: Icon, title, task, color, earned }) => (
              <div
                key={id}
                title={`${title} — ${task}`}
                className={cn(
                  "flex flex-col items-center gap-1.5 rounded-xl px-2 py-3 text-center transition-all",
                  earned
                    ? "bg-white/6 border border-white/10"
                    : "bg-white/2 border border-white/5 opacity-40 grayscale",
                )}
              >
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-full"
                  style={{ backgroundColor: `${color}20` }}
                >
                  <Icon className="h-4.5 w-4.5" style={{ color }} />
                </span>
                <span className="text-xs font-medium leading-tight text-zinc-300">
                  {title}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* ── Tab layout ────────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Sidebar nav */}
          <nav
            aria-label="Profile settings navigation"
            className="flex shrink-0 flex-row gap-1 overflow-x-auto lg:w-52 lg:flex-col"
          >
            {TABS.map((tab) => (
              <button
                type="button"
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "flex items-center justify-between whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-medium transition-all",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500",
                  activeTab === tab
                    ? "bg-violet-500/15 text-violet-400"
                    : "text-zinc-400 hover:bg-white/6 hover:text-white",
                )}
                aria-current={activeTab === tab ? "page" : undefined}
              >
                <span className="flex items-center gap-2">
                  {tab === "Profile" && <User className="h-4 w-4" />}
                  {tab === "Account" && <Mail className="h-4 w-4" />}
                  {tab === "Notifications" && <Bell className="h-4 w-4" />}
                  {tab === "Privacy & Security" && <Lock className="h-4 w-4" />}
                  {tab}
                </span>
                {activeTab === tab && (
                  <ChevronRight className="hidden h-4 w-4 lg:block" />
                )}
              </button>
            ))}
          </nav>

          {/* Panel */}
          <div className="min-w-0 flex-1">
            {activeTab === "Profile" && (
              <ProfileTab
                profile={profile}
                setField={setField}
                onAvatarGradient={(g) =>
                  dispatch({ type: "SET_FIELD", field: "avatarGradient", value: g })
                }
                profileErrors={profileErrors}
                profileSaving={profileSaving}
                profileSaved={profileSaved}
                onSubmit={saveProfile}
                enrolledTracks={enrolledTracks}
              />
            )}



            {activeTab === "Account" && (
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
                onLogout={async () => { await logout(); router.replace("/login"); }}
              />
            )}

            {activeTab === "Notifications" && (
              <NotificationsTab
                notifs={notifs}
                setNotifs={setNotifs}
                notifsSaving={notifsSaving}
                notifsSaved={notifsSaved}
                onSubmit={saveNotifs}
              />
            )}

            {activeTab === "Privacy & Security" && (
              <PrivacyTab
                deleteConfirm={deleteConfirm}
                setDeleteConfirm={setDeleteConfirm}
                showDeletePanel={showDeletePanel}
                setShowDeletePanel={setShowDeletePanel}
                deleting={deleting}
                onDeleteAccount={deleteAccount}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}


