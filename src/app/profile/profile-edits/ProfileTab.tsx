"use client";

import { Check, Github, Globe, Linkedin, MapPin, Save, Twitter, User } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { TechIcon } from "@/components/ui/TechIcon";
import { cn } from "@/lib/utils";
import {
  AVATAR_GRADIENTS,
  SectionHeading,
  type EnrolledTrack,
  type ProfileFields,
} from "../_shared";

// ─── Props ────────────────────────────────────────────────────────────────────

interface ProfileTabProps {
  profile: ProfileFields;
  setField: (field: keyof ProfileFields) => (value: string) => void;
  onAvatarGradient: (gradient: string) => void;
  profileErrors: Partial<Record<keyof ProfileFields, string>>;
  profileSaving: boolean;
  profileSaved: boolean;
  onSubmit: (e: React.FormEvent) => void;
  enrolledTracks: EnrolledTrack[];
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ProfileTab({
  profile,
  setField,
  onAvatarGradient,
  profileErrors,
  profileSaving,
  profileSaved,
  onSubmit,
  enrolledTracks,
}: ProfileTabProps) {
  return (
    <form onSubmit={onSubmit} noValidate>
      <Card>
        <SectionHeading
          title="Public Profile"
          description="This information is visible to other learners on the platform."
        />

        {/* Avatar color picker */}
        <div className="mb-6 space-y-2">
          <p className="text-sm font-medium text-zinc-300">Avatar Color</p>
          <div className="flex flex-wrap gap-2">
            {AVATAR_GRADIENTS.map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => onAvatarGradient(g)}
                className={cn(
                  "h-8 w-8 rounded-full bg-linear-to-br transition-transform hover:scale-110",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950",
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

        {/* Display name + username */}
        <div className="grid gap-5 sm:grid-cols-2">
          <Input
            label="Display Name"
            value={profile.displayName}
            onChange={(e) => setField("displayName")(e.target.value)}
            error={profileErrors.displayName}
            placeholder="Name"
            autoComplete="name"
            leftAddon={<User className="h-4 w-4" />}
          />
          <Input
            label="Username"
            value={profile.username}
            onChange={(e) =>
              setField("username")(
                e.target.value.toLowerCase().replace(/[^a-z0-9_.-]/g, ""),
              )
            }
            error={profileErrors.username}
            placeholder="username"
            autoComplete="username"
            leftAddon={
              <span className="text-xs font-medium text-zinc-500">@</span>
            }
          />
        </div>

        {/* Bio */}
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
                profile.bio.length > 180 ? "text-amber-400" : "text-zinc-600",
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

        {/* Location + website */}
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
          <p className="text-sm font-medium text-zinc-300">Social Links</p>
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

        {/* Enrolled courses */}
        <div className="mt-6 space-y-3">
          <p className="text-sm font-medium text-zinc-300">Enrolled Courses</p>
          <div className="space-y-2">
            {enrolledTracks.length === 0 ? (
              <p className="rounded-xl border border-white/6 bg-white/3 px-4 py-3 text-sm text-zinc-500">
                You haven't enrolled in any courses yet.
              </p>
            ) : (
              enrolledTracks.map((t) => (
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
                      value={0}
                      size="sm"
                      showPercent
                      color="violet"
                      className="mt-1"
                    />
                  </div>
                  <Badge variant="default">0%</Badge>
                </div>
              ))
            )}
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
  );
}
