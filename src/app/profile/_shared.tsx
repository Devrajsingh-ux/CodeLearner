"use client";

import { cn } from "@/lib/utils";

// ─── Constants ────────────────────────────────────────────────────────────────

export const AVATAR_GRADIENTS = [
  "from-violet-600 to-indigo-700",
  "from-pink-600 to-rose-600",
  "from-cyan-500 to-blue-600",
  "from-emerald-500 to-teal-600",
  "from-amber-500 to-orange-600",
  "from-fuchsia-600 to-purple-700",
  "from-lime-500 to-green-600",
  "from-red-500 to-rose-700",
] as const;

// ─── Profile form types ───────────────────────────────────────────────────────

export interface ProfileFields {
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

export type ProfileAction =
  | { type: "SET_FIELD"; field: keyof ProfileFields; value: string }
  | { type: "RESET"; payload: ProfileFields };

export function profileReducer(
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

// ─── Notification preferences ─────────────────────────────────────────────────

export interface NotificationPrefs {
  muteAll: boolean;
  frequency: "instant" | "daily" | "weekly";
  courseUpdates: boolean;
  weeklyDigest: boolean;
  achievementAlerts: boolean;
  streakReminders: boolean;
  newCourses: boolean;
  communityReplies: boolean;
  marketingEmails: boolean;
}

export function getTier(level: number): {
  name: "Bronze" | "Silver" | "Gold" | "Platinum" | "Diamond";
  color: string;
} {
  if (level >= 25) return { name: "Diamond", color: "text-cyan-300" };
  if (level >= 16) return { name: "Platinum", color: "text-violet-300" };
  if (level >= 10) return { name: "Gold", color: "text-amber-300" };
  if (level >= 5) return { name: "Silver", color: "text-zinc-300" };
  return { name: "Bronze", color: "text-orange-300" };
}

// ─── Enrolled track shape (placeholder until enrollment is wired) ─────────────

export interface EnrolledTrack {
  id: string;
  slug: string;
  title: string;
  lessonsCount: number;
  icon: string;
  color: string;
  category: string;
  enrolledCount: number;
  rating: number;
  duration: string;
}

// ─── Shared UI sub-components ─────────────────────────────────────────────────

export function SectionHeading({
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

export function Toggle({
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
