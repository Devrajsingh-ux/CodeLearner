"use client";

import { motion } from "framer-motion";
import {
  Check,
  Github,
  Globe,
  Linkedin,
  MapPin,
  Save,
  Sparkles,
  Twitter,
  User,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/ui/components/Badge";
import { Button } from "@/ui/components/Button";
import { Card } from "@/ui/components/Card";
import { Input } from "@/ui/components/Input";
import { ProgressBar } from "@/ui/components/ProgressBar";
import { TechIcon } from "@/ui/components/TechIcon";
import { cn } from "@/lib/utils";
import {
  AVATAR_GRADIENTS,
  type EnrolledTrack,
  type ProfileFields,
  SectionHeading,
} from "../_shared";

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
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <Card className="rounded-3xl border-white/10 bg-white/4">
        <SectionHeading
          title="Edit Public Profile"
          description="Customize how your profile appears to the CodeLearner community."
        />

        <div className="mb-6 rounded-2xl border border-white/10 bg-zinc-900/30 p-4">
          <p className="mb-3 text-sm font-medium text-zinc-200">
            Avatar Gradient
          </p>
          <div className="flex flex-wrap gap-2">
            {AVATAR_GRADIENTS.map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => onAvatarGradient(g)}
                className={cn(
                  "h-9 w-9 rounded-full bg-linear-to-br transition-transform hover:scale-110",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950",
                  g,
                  profile.avatarGradient === g &&
                    "ring-2 ring-white ring-offset-2 ring-offset-zinc-950 scale-110",
                )}
                aria-label={`Select ${g}`}
                aria-pressed={profile.avatarGradient === g}
              />
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Display Name"
            value={profile.displayName}
            onChange={(e) => setField("displayName")(e.target.value)}
            error={profileErrors.displayName}
            placeholder="Your name"
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
              <span className="text-xs font-semibold text-zinc-500">@</span>
            }
          />
        </div>

        <div className="mt-4">
          <label
            htmlFor="bio"
            className="mb-1.5 block text-sm font-medium text-zinc-300"
          >
            Bio (Markdown supported)
          </label>
          <textarea
            id="bio"
            value={profile.bio}
            onChange={(e) => setField("bio")(e.target.value)}
            rows={4}
            maxLength={200}
            placeholder="Write about your coding goals, interests, and what you are building..."
            className={cn(
              "w-full resize-none rounded-xl border bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-zinc-500",
              "transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent",
              profileErrors.bio
                ? "border-red-500/60"
                : "border-white/10 hover:border-white/20",
            )}
          />
          <div className="mt-1 flex items-center justify-between text-xs">
            {profileErrors.bio ? (
              <p className="text-red-400" role="alert">
                {profileErrors.bio}
              </p>
            ) : (
              <p className="text-zinc-600">
                Tip: Use short, clear lines for better readability.
              </p>
            )}
            <p
              className={cn(
                profile.bio.length > 180 ? "text-amber-400" : "text-zinc-600",
              )}
            >
              {profile.bio.length}/200
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
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
            placeholder="https://your-portfolio.com"
            leftAddon={<Globe className="h-4 w-4" />}
          />
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-3">
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

        <div className="mt-8 flex items-center justify-end gap-3">
          {profileSaved ? (
            <output className="inline-flex items-center gap-1.5 text-sm text-emerald-400">
              <Check className="h-4 w-4" /> Saved
            </output>
          ) : null}
          <Button
            type="submit"
            isLoading={profileSaving}
            leftIcon={<Save className="h-4 w-4" />}
          >
            {profileSaving ? "Saving..." : "Save Profile"}
          </Button>
        </div>
      </Card>

      <Card className="rounded-3xl border-white/10 bg-white/4">
        <div className="mb-3 flex items-center justify-between">
          <SectionHeading
            title="Enrolled Courses"
            description="Continue where you left off."
          />
          <Badge variant="purple">{enrolledTracks.length}</Badge>
        </div>

        {enrolledTracks.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-violet-500/35 bg-violet-500/8 p-5 text-center">
            <Sparkles className="mx-auto mb-2 h-6 w-6 text-violet-300" />
            <p className="font-semibold text-zinc-100">
              Explore courses to get started
            </p>
            <p className="mt-1 text-sm text-zinc-400">
              Your active tracks will appear here with progress.
            </p>
            <Link
              href="/learn"
              className="mt-3 inline-flex rounded-xl bg-violet-600 px-3 py-2 text-sm font-semibold text-white hover:bg-violet-500"
            >
              Browse Courses
            </Link>
          </div>
        ) : (
          <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-1">
            {enrolledTracks.map((track, idx) => {
              const progress = Math.min(95, 18 + idx * 11);
              return (
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="min-w-[17rem] rounded-2xl border border-white/10 bg-zinc-900/35 p-3"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <TechIcon slug={track.slug} size={20} />
                    <p className="truncate text-sm font-medium text-zinc-100">
                      {track.title}
                    </p>
                  </div>
                  <ProgressBar
                    value={progress}
                    size="sm"
                    color="violet"
                    showPercent
                  />
                  <p className="mt-1 text-xs text-zinc-500">
                    {track.lessonsCount} lessons
                  </p>
                </motion.div>
              );
            })}
          </div>
        )}
      </Card>
    </form>
  );
}
