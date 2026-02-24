"use client";

import {
  AlertTriangle,
  Bell,
  Camera,
  Check,
  ChevronRight,
  Eye,
  EyeOff,
  Flame,
  Github,
  Globe,
  KeyRound,
  Linkedin,
  Loader2,
  Lock,
  LogOut,
  Mail,
  MapPin,
  Save,
  Shield,
  Trash2,
  Trophy,
  Twitter,
  User,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { TechIcon } from "@/components/ui/TechIcon";
import { useAuth } from "@/context/AuthContext";
import { tracks } from "@/data/courses";
import { cn, formatNumber, getInitials } from "@/lib/utils";

// ─── Constants ────────────────────────────────────────────────────────────────

const TABS = [
  "Profile",
  "Account",
  "Notifications",
  "Privacy & Security",
] as const;
type Tab = (typeof TABS)[number];

const AVATAR_GRADIENTS = [
  "from-violet-600 to-indigo-700",
  "from-pink-600 to-rose-600",
  "from-cyan-500 to-blue-600",
  "from-emerald-500 to-teal-600",
  "from-amber-500 to-orange-600",
  "from-fuchsia-600 to-purple-700",
  "from-lime-500 to-green-600",
  "from-red-500 to-rose-700",
] as const;

const ENROLLED_TRACK_IDS = ["1", "14", "32"];
const MOCK_PROGRESS: Record<string, number> = { "1": 68, "14": 32, "32": 15 };
const MOCK_STREAK = 7;
const MOCK_XP = 3420;
const MOCK_LEVEL = 6;
const XP_TO_NEXT = MOCK_LEVEL * MOCK_LEVEL * 100 + 100;

const ACHIEVEMENTS = [
  {
    id: "a1",
    icon: Flame,
    label: "7-Day Streak",
    color: "#f59e0b",
    earned: true,
  },
  {
    id: "a2",
    icon: Trophy,
    label: "First Course",
    color: "#8b5cf6",
    earned: true,
  },
  { id: "a3", icon: Zap, label: "Speed Coder", color: "#06b6d4", earned: true },
  {
    id: "a4",
    icon: Shield,
    label: "100 XP Club",
    color: "#10b981",
    earned: true,
  },
  {
    id: "a5",
    icon: Globe,
    label: "Global Learner",
    color: "#f43f5e",
    earned: false,
  },
  {
    id: "a6",
    icon: KeyRound,
    label: "Problem Solver",
    color: "#f97316",
    earned: false,
  },
];

// ─── Profile form state types ──────────────────────────────────────────────

interface ProfileFields {
  displayName: string;
  username: string;
  bio: string;
  location: string;
  website: string;
  github: string;
  twitter: string;
  linkedin: string;
  avatarGradient: string;
}

type ProfileAction =
  | { type: "SET_FIELD"; field: keyof ProfileFields; value: string }
  | { type: "RESET"; payload: ProfileFields };

function profileReducer(
  state: ProfileFields,
  action: ProfileAction,
): ProfileFields {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return action.payload;
    default:
      return state;
  }
}

interface NotificationPrefs {
  courseUpdates: boolean;
  weeklyDigest: boolean;
  achievementAlerts: boolean;
  streakReminders: boolean;
  newCourses: boolean;
  communityReplies: boolean;
  marketingEmails: boolean;
}

// ─── Sub-components ────────────────────────────────────────────────────────

function SectionHeading({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      {description && (
        <p className="mt-0.5 text-sm text-zinc-400">{description}</p>
      )}
    </div>
  );
}

function Toggle({
  checked,
  onChange,
  id,
  label,
  description,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  id: string;
  label: string;
  description?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-4 border-b border-white/6 last:border-0">
      <div className="space-y-0.5">
        <label
          htmlFor={id}
          className="text-sm font-medium text-zinc-200 cursor-pointer"
        >
          {label}
        </label>
        {description && <p className="text-xs text-zinc-500">{description}</p>}
      </div>
      <button
        type="button"
        id={id}
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950",
          checked ? "bg-violet-600" : "bg-white/15",
        )}
      >
        <span
          className={cn(
            "inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200",
            checked ? "translate-x-6" : "translate-x-1",
          )}
        />
      </button>
    </div>
  );
}

function PasswordField({
  label,
  id,
  value,
  onChange,
  error,
  hint,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  hint?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <Input
      id={id}
      label={label}
      type={show ? "text" : "password"}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      error={error}
      hint={hint}
      autoComplete="new-password"
      rightAddon={
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="text-zinc-400 hover:text-zinc-200 transition-colors focus-visible:outline-none"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      }
    />
  );
}

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
  const initialProfile: ProfileFields = {
    displayName: user?.name ?? "",
    username: user?.email?.split("@")[0] ?? "",
    bio: "Full-stack developer passionate about TypeScript, open source, and building things that matter.",
    location: "San Francisco, CA",
    website: "https://alexdev.io",
    github: "alexdev",
    twitter: "alexdev_",
    linkedin: "alex-dev",
    avatarGradient: AVATAR_GRADIENTS[0],
  };

  const [profile, dispatch] = useReducer(profileReducer, initialProfile);
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

  const enrolledTracks = tracks.filter((t) =>
    ENROLLED_TRACK_IDS.includes(t.id),
  );
  const xpPercent = Math.min(
    100,
    Math.round(
      (MOCK_XP % (XP_TO_NEXT === 0 ? 1 : XP_TO_NEXT)) / (XP_TO_NEXT / 100),
    ),
  );

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
                    value: formatNumber(MOCK_XP),
                    icon: Zap,
                    color: "text-violet-400",
                  },
                  {
                    label: "Level",
                    value: String(MOCK_LEVEL),
                    icon: Trophy,
                    color: "text-amber-400",
                  },
                  {
                    label: "Streak",
                    value: `${MOCK_STREAK}d`,
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
                  Level {MOCK_LEVEL} → Level {MOCK_LEVEL + 1}
                </span>
                <span>
                  {formatNumber(MOCK_XP)} / {formatNumber(XP_TO_NEXT)} XP
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
              {ACHIEVEMENTS.filter((a) => a.earned).length} /{" "}
              {ACHIEVEMENTS.length} earned
            </Badge>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
            {ACHIEVEMENTS.map(({ id, icon: Icon, label, color, earned }) => (
              <div
                key={id}
                title={label}
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
                  {label}
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
            {/* ── Profile tab ───────────────────────────────────────────────── */}
            {activeTab === "Profile" && (
              <form onSubmit={saveProfile} noValidate>
                <Card>
                  <SectionHeading
                    title="Public Profile"
                    description="This information is visible to other learners on the platform."
                  />

                  {/* Avatar color picker */}
                  <div className="mb-6 space-y-2">
                    <p className="text-sm font-medium text-zinc-300">
                      Avatar Color
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {AVATAR_GRADIENTS.map((g) => (
                        <button
                          key={g}
                          type="button"
                          onClick={() =>
                            dispatch({
                              type: "SET_FIELD",
                              field: "avatarGradient",
                              value: g,
                            })
                          }
                          className={cn(
                            "h-8 w-8 rounded-full bg-linear-to-br transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950",
                            g,
                            profile.avatarGradient === g &&
                              "ring-2 ring-white ring-offset-2 ring-offset-zinc-950 scale-110",
                          )}
                          aria-label={`Select gradient ${g}`}
                          aria-pressed={profile.avatarGradient === g}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Input
                      label="Display Name"
                      value={profile.displayName}
                      onChange={(e) => setField("displayName")(e.target.value)}
                      error={profileErrors.displayName}
                      placeholder="Alex Dev"
                      autoComplete="name"
                      leftAddon={<User className="h-4 w-4" />}
                    />
                    <Input
                      label="Username"
                      value={profile.username}
                      onChange={(e) =>
                        setField("username")(
                          e.target.value
                            .toLowerCase()
                            .replace(/[^a-z0-9_.-]/g, ""),
                        )
                      }
                      error={profileErrors.username}
                      placeholder="alexdev"
                      autoComplete="username"
                      leftAddon={
                        <span className="text-xs font-medium text-zinc-500">
                          @
                        </span>
                      }
                    />
                  </div>

                  <div className="mt-5">
                    <label
                      htmlFor="bio"
                      className="block text-sm font-medium text-zinc-300 mb-1.5"
                    >
                      Bio
                    </label>
                    <div className="relative">
                      <textarea
                        id="bio"
                        value={profile.bio}
                        onChange={(e) => setField("bio")(e.target.value)}
                        maxLength={200}
                        rows={3}
                        placeholder="Tell the community a bit about yourself…"
                        className={cn(
                          "w-full resize-none rounded-xl border bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-zinc-500",
                          "transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent",
                          profileErrors.bio
                            ? "border-red-500/60"
                            : "border-white/10 hover:border-white/20",
                        )}
                        aria-describedby="bio-count"
                      />
                      <span
                        id="bio-count"
                        className={cn(
                          "absolute bottom-2 right-3 text-xs",
                          profile.bio.length > 180
                            ? "text-amber-400"
                            : "text-zinc-600",
                        )}
                        aria-live="polite"
                      >
                        {profile.bio.length}/200
                      </span>
                    </div>
                    {profileErrors.bio && (
                      <p className="mt-1 text-xs text-red-400" role="alert">
                        {profileErrors.bio}
                      </p>
                    )}
                  </div>

                  <div className="mt-5 grid gap-5 sm:grid-cols-2">
                    <Input
                      label="Location"
                      value={profile.location}
                      onChange={(e) => setField("location")(e.target.value)}
                      placeholder="City, Country"
                      leftAddon={<MapPin className="h-4 w-4" />}
                    />
                    <Input
                      label="Website"
                      value={profile.website}
                      onChange={(e) => setField("website")(e.target.value)}
                      error={profileErrors.website}
                      type="url"
                      placeholder="https://yoursite.com"
                      leftAddon={<Globe className="h-4 w-4" />}
                    />
                  </div>

                  {/* Social links */}
                  <div className="mt-6 space-y-2">
                    <p className="text-sm font-medium text-zinc-300">
                      Social Links
                    </p>
                    <div className="grid gap-4 sm:grid-cols-3">
                      <Input
                        label="GitHub"
                        value={profile.github}
                        onChange={(e) => setField("github")(e.target.value)}
                        placeholder="username"
                        leftAddon={<Github className="h-4 w-4" />}
                      />
                      <Input
                        label="Twitter / X"
                        value={profile.twitter}
                        onChange={(e) => setField("twitter")(e.target.value)}
                        placeholder="handle"
                        leftAddon={<Twitter className="h-4 w-4" />}
                      />
                      <Input
                        label="LinkedIn"
                        value={profile.linkedin}
                        onChange={(e) => setField("linkedin")(e.target.value)}
                        placeholder="slug"
                        leftAddon={<Linkedin className="h-4 w-4" />}
                      />
                    </div>
                  </div>

                  {/* Enrolled courses snapshot */}
                  <div className="mt-6 space-y-3">
                    <p className="text-sm font-medium text-zinc-300">
                      Enrolled Courses
                    </p>
                    <div className="space-y-2">
                      {enrolledTracks.map((t) => (
                        <div
                          key={t.id}
                          className="flex items-center gap-3 rounded-xl border border-white/6 bg-white/3 px-4 py-3"
                        >
                          <div className="flex h-9 w-9 items-center justify-center">
                            <TechIcon slug={t.slug} size={28} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-zinc-200">
                              {t.title}
                            </p>
                            <ProgressBar
                              value={MOCK_PROGRESS[t.id] ?? 0}
                              size="sm"
                              showPercent
                              color="violet"
                              className="mt-1"
                            />
                          </div>
                          <Badge
                            variant={
                              MOCK_PROGRESS[t.id] === 100
                                ? "success"
                                : "default"
                            }
                          >
                            {MOCK_PROGRESS[t.id] ?? 0}%
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Save button */}
                  <div className="mt-8 flex items-center justify-end gap-3">
                    {profileSaved && (
                      <output className="flex items-center gap-1.5 text-sm text-emerald-400">
                        <Check className="h-4 w-4" /> Profile saved
                      </output>
                    )}
                    <Button
                      type="submit"
                      isLoading={profileSaving}
                      leftIcon={<Save className="h-4 w-4" />}
                    >
                      {profileSaving ? "Saving…" : "Save Profile"}
                    </Button>
                  </div>
                </Card>
              </form>
            )}

            {/* ── Account tab ───────────────────────────────────────────────── */}
            {activeTab === "Account" && (
              <div className="space-y-6">
                {/* Email */}
                <Card>
                  <SectionHeading
                    title="Email Address"
                    description="Your login email and where we send important notifications."
                  />
                  <form onSubmit={changeEmail} noValidate className="space-y-4">
                    <Input
                      label="Email"
                      type="email"
                      value={emailValue}
                      onChange={(e) => {
                        setEmailValue(e.target.value);
                        setEmailError("");
                      }}
                      error={emailError}
                      autoComplete="email"
                      leftAddon={<Mail className="h-4 w-4" />}
                    />
                    <div className="flex items-center justify-end gap-3">
                      {emailSaved && (
                        <output className="flex items-center gap-1.5 text-sm text-emerald-400">
                          <Check className="h-4 w-4" /> Email updated
                        </output>
                      )}
                      <Button type="submit" isLoading={emailSaving} size="sm">
                        {emailSaving ? "Saving…" : "Update email"}
                      </Button>
                    </div>
                  </form>
                </Card>

                {/* Password */}
                <Card>
                  <SectionHeading
                    title="Change Password"
                    description="Use a strong password with at least 8 characters, including letters and numbers."
                  />
                  <form
                    onSubmit={changePassword}
                    noValidate
                    className="space-y-4"
                  >
                    <PasswordField
                      id="current-password"
                      label="Current Password"
                      value={currentPw}
                      onChange={setCurrentPw}
                      error={pwErrors.currentPw}
                    />
                    <PasswordField
                      id="new-password"
                      label="New Password"
                      value={newPw}
                      onChange={setNewPw}
                      error={pwErrors.newPw}
                      hint="Minimum 8 characters"
                    />
                    <PasswordField
                      id="confirm-password"
                      label="Confirm New Password"
                      value={confirmPw}
                      onChange={setConfirmPw}
                      error={pwErrors.confirmPw}
                    />
                    {/* Strength indicator */}
                    {newPw.length > 0 && <PasswordStrength password={newPw} />}
                    <div className="flex items-center justify-end gap-3 pt-1">
                      {pwSaved && (
                        <output className="flex items-center gap-1.5 text-sm text-emerald-400">
                          <Check className="h-4 w-4" /> Password updated
                        </output>
                      )}
                      <Button
                        type="submit"
                        isLoading={pwSaving}
                        size="sm"
                        leftIcon={<KeyRound className="h-4 w-4" />}
                      >
                        {pwSaving ? "Updating…" : "Update password"}
                      </Button>
                    </div>
                  </form>
                </Card>

                {/* Connected accounts */}
                <Card>
                  <SectionHeading
                    title="Connected Accounts"
                    description="Link OAuth providers for faster sign-in."
                  />
                  <div className="space-y-3">
                    {[
                      {
                        provider: "GitHub",
                        icon: Github,
                        connected: false,
                        color: "text-zinc-300",
                      },
                      {
                        provider: "Google",
                        icon: Globe,
                        connected: false,
                        color: "text-zinc-300",
                      },
                    ].map(({ provider, icon: Icon, connected }) => (
                      <div
                        key={provider}
                        className="flex items-center justify-between rounded-xl border border-white/8 px-4 py-3"
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="h-5 w-5 text-zinc-400" />
                          <div>
                            <p className="text-sm font-medium text-zinc-200">
                              {provider}
                            </p>
                            <p className="text-xs text-zinc-500">
                              {connected ? "Connected" : "Not connected"}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant={connected ? "danger" : "outline"}
                          size="sm"
                        >
                          {connected ? "Disconnect" : "Connect"}
                        </Button>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Sign-out everywhere */}
                <Card>
                  <SectionHeading
                    title="Active Sessions"
                    description="Sign out of all other browsers and devices."
                  />
                  <div className="flex items-center justify-between rounded-xl border border-white/8 bg-white/3 px-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-zinc-200">
                        This device
                      </p>
                      <p className="text-xs text-zinc-500">
                        Current session — {new Date().toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant="success">Active</Badge>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button
                      variant="secondary"
                      size="sm"
                      leftIcon={<LogOut className="h-4 w-4" />}
                      onClick={() => {
                        logout();
                        router.replace("/login");
                      }}
                    >
                      Sign out everywhere
                    </Button>
                  </div>
                </Card>
              </div>
            )}

            {/* ── Notifications tab ─────────────────────────────────────────── */}
            {activeTab === "Notifications" && (
              <form onSubmit={saveNotifs}>
                <Card>
                  <SectionHeading
                    title="Notification Preferences"
                    description="Choose which emails and alerts you receive from CodeLearn."
                  />

                  <div className="mb-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                      Learning
                    </p>
                  </div>
                  <Toggle
                    id="notif-course-updates"
                    label="Course updates"
                    description="New lessons, corrections, and content updates in your enrolled courses."
                    checked={notifs.courseUpdates}
                    onChange={(v) =>
                      setNotifs((p) => ({ ...p, courseUpdates: v }))
                    }
                  />
                  <Toggle
                    id="notif-achievements"
                    label="Achievement alerts"
                    description="Get notified when you unlock a new badge or milestone."
                    checked={notifs.achievementAlerts}
                    onChange={(v) =>
                      setNotifs((p) => ({ ...p, achievementAlerts: v }))
                    }
                  />
                  <Toggle
                    id="notif-streak"
                    label="Streak reminders"
                    description="Daily nudge to keep your learning streak alive."
                    checked={notifs.streakReminders}
                    onChange={(v) =>
                      setNotifs((p) => ({ ...p, streakReminders: v }))
                    }
                  />

                  <div className="mb-4 mt-6">
                    <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                      Digest & Discovery
                    </p>
                  </div>
                  <Toggle
                    id="notif-weekly"
                    label="Weekly learning digest"
                    description="A summary of your progress, tips, and recommended lessons every Monday."
                    checked={notifs.weeklyDigest}
                    onChange={(v) =>
                      setNotifs((p) => ({ ...p, weeklyDigest: v }))
                    }
                  />
                  <Toggle
                    id="notif-new-courses"
                    label="New course announcements"
                    description="Be the first to know when a new track launches."
                    checked={notifs.newCourses}
                    onChange={(v) =>
                      setNotifs((p) => ({ ...p, newCourses: v }))
                    }
                  />

                  <div className="mb-4 mt-6">
                    <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                      Community
                    </p>
                  </div>
                  <Toggle
                    id="notif-community"
                    label="Community replies"
                    description="Email when someone replies to your forum posts or solutions."
                    checked={notifs.communityReplies}
                    onChange={(v) =>
                      setNotifs((p) => ({ ...p, communityReplies: v }))
                    }
                  />

                  <div className="mb-4 mt-6">
                    <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                      Optional
                    </p>
                  </div>
                  <Toggle
                    id="notif-marketing"
                    label="Product news & offers"
                    description="Occasional emails about promotions, new features, and special events."
                    checked={notifs.marketingEmails}
                    onChange={(v) =>
                      setNotifs((p) => ({ ...p, marketingEmails: v }))
                    }
                  />

                  <div className="mt-8 flex items-center justify-end gap-3">
                    {notifsSaved && (
                      <output className="flex items-center gap-1.5 text-sm text-emerald-400">
                        <Check className="h-4 w-4" /> Preferences saved
                      </output>
                    )}
                    <Button
                      type="submit"
                      isLoading={notifsSaving}
                      leftIcon={<Save className="h-4 w-4" />}
                    >
                      {notifsSaving ? "Saving…" : "Save preferences"}
                    </Button>
                  </div>
                </Card>
              </form>
            )}

            {/* ── Privacy & Security tab ────────────────────────────────────── */}
            {activeTab === "Privacy & Security" && (
              <div className="space-y-6">
                {/* Profile visibility */}
                <Card>
                  <SectionHeading
                    title="Profile Visibility"
                    description="Control who can see your public profile."
                  />
                  <div className="space-y-2">
                    {[
                      {
                        id: "public",
                        label: "Public",
                        desc: "Anyone can view your profile and progress.",
                      },
                      {
                        id: "learners",
                        label: "Learners only",
                        desc: "Only signed-in CodeLearn members can view your profile.",
                      },
                      {
                        id: "private",
                        label: "Private",
                        desc: "Only you can see your profile.",
                      },
                    ].map(({ id, label, desc }) => (
                      <label
                        key={id}
                        htmlFor={`vis-${id}`}
                        className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/8 bg-white/3 px-4 py-3 transition-colors hover:bg-white/5 has-checked:border-violet-500/40 has-checked:bg-violet-500/8"
                      >
                        <input
                          id={`vis-${id}`}
                          type="radio"
                          name="visibility"
                          defaultChecked={id === "public"}
                          className="mt-0.5 accent-violet-500"
                        />
                        <div>
                          <p className="text-sm font-medium text-zinc-200">
                            {label}
                          </p>
                          <p className="text-xs text-zinc-500">{desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </Card>

                {/* Two-factor auth */}
                <Card>
                  <SectionHeading
                    title="Two-Factor Authentication"
                    description="Add an extra layer of security to your account."
                  />
                  <div className="flex items-center justify-between rounded-xl border border-white/8 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/15">
                        <Shield className="h-4.5 w-4.5 text-amber-400" />
                      </span>
                      <div>
                        <p className="text-sm font-medium text-zinc-200">
                          Authenticator App
                        </p>
                        <p className="text-xs text-zinc-500">
                          Not enabled — greatly increases account security.
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Enable 2FA
                    </Button>
                  </div>
                </Card>

                {/* Active sessions */}
                <Card>
                  <SectionHeading
                    title="Login History"
                    description="Recent sign-in events on your account."
                  />
                  <div className="space-y-2">
                    {[
                      {
                        device: "Chrome on macOS",
                        location: "San Francisco, US",
                        time: "Just now",
                        current: true,
                      },
                      {
                        device: "Safari on iPhone",
                        location: "San Francisco, US",
                        time: "2 hours ago",
                        current: false,
                      },
                      {
                        device: "Firefox on Windows",
                        location: "New York, US",
                        time: "3 days ago",
                        current: false,
                      },
                    ].map(({ device, location, time, current }) => (
                      <div
                        key={device + time}
                        className="flex items-center justify-between rounded-xl border border-white/6 px-4 py-2.5"
                      >
                        <div>
                          <p className="text-sm text-zinc-200">{device}</p>
                          <p className="text-xs text-zinc-500">
                            {location} · {time}
                          </p>
                        </div>
                        {current ? (
                          <Badge variant="success">Current</Badge>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs text-red-400 hover:bg-red-500/10"
                          >
                            Revoke
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Danger zone */}
                <Card className="border-red-500/20 bg-red-500/4">
                  <div className="mb-4 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                    <h2 className="text-lg font-semibold text-red-400">
                      Danger Zone
                    </h2>
                  </div>
                  <p className="mb-4 text-sm text-zinc-400">
                    Permanently delete your CodeLearn account. This removes all
                    progress, achievements, and data associated with your
                    account and{" "}
                    <strong className="text-zinc-200">cannot be undone</strong>.
                  </p>

                  {!showDeletePanel ? (
                    <Button
                      variant="danger"
                      size="sm"
                      leftIcon={<Trash2 className="h-4 w-4" />}
                      onClick={() => setShowDeletePanel(true)}
                    >
                      Delete my account
                    </Button>
                  ) : (
                    <div className="space-y-4 rounded-xl border border-red-500/30 bg-red-500/8 p-4">
                      <p className="text-sm text-red-300">
                        To confirm, type{" "}
                        <strong className="font-mono text-red-200">
                          DELETE
                        </strong>{" "}
                        below.
                      </p>
                      <Input
                        value={deleteConfirm}
                        onChange={(e) => setDeleteConfirm(e.target.value)}
                        placeholder="Type DELETE to confirm"
                        className="border-red-500/40 focus:ring-red-500"
                        aria-label="Confirm account deletion"
                      />
                      <div className="flex gap-3">
                        <Button
                          variant="danger"
                          size="sm"
                          isLoading={deleting}
                          disabled={deleteConfirm !== "DELETE"}
                          leftIcon={<Trash2 className="h-4 w-4" />}
                          onClick={deleteAccount}
                        >
                          {deleting
                            ? "Deleting…"
                            : "Permanently delete account"}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setShowDeletePanel(false);
                            setDeleteConfirm("");
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

// ─── Password strength meter ───────────────────────────────────────────────

function PasswordStrength({ password }: { password: string }) {
  const score = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
    password.length >= 14,
  ].filter(Boolean).length;

  const levels = [
    { label: "Weak", color: "bg-red-500" },
    { label: "Fair", color: "bg-amber-500" },
    { label: "Good", color: "bg-yellow-400" },
    { label: "Strong", color: "bg-emerald-500" },
    { label: "Very strong", color: "bg-emerald-400" },
  ];
  const { label, color } = levels[score - 1] ?? levels[0];

  return (
    <output
      className="space-y-1.5"
      aria-live="polite"
      aria-label={`Password strength: ${label}`}
    >
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <div
            key={n}
            className={cn(
              "h-1.5 flex-1 rounded-full transition-all duration-300",
              n <= score ? color : "bg-white/10",
            )}
          />
        ))}
      </div>
      <p
        className={cn(
          "text-xs font-medium",
          score >= 4
            ? "text-emerald-400"
            : score >= 3
              ? "text-yellow-400"
              : score >= 2
                ? "text-amber-400"
                : "text-red-400",
        )}
      >
        {label}
      </p>
    </output>
  );
}
