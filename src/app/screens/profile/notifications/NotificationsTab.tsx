"use client";

import { Check, Save } from "lucide-react";
import { Button } from "@/ui/components/Button";
import { Card } from "@/ui/components/Card";
import { type NotificationPrefs, SectionHeading, Toggle } from "../_shared";

interface NotificationsTabProps {
  notifs: NotificationPrefs;
  setNotifs: React.Dispatch<React.SetStateAction<NotificationPrefs>>;
  notifsSaving: boolean;
  notifsSaved: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export function NotificationsTab({
  notifs,
  setNotifs,
  notifsSaving,
  notifsSaved,
  onSubmit,
}: NotificationsTabProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <Card className="rounded-3xl border-white/10 bg-white/4">
        <SectionHeading
          title="Notification Center"
          description="Control learning, community, and product updates with delivery preferences."
        />

        <div className="mb-5 rounded-2xl border border-cyan-500/25 bg-cyan-500/10 p-3">
          <Toggle
            id="notif-mute-all"
            label="Mute all notifications"
            description="Temporarily disable all emails and in-app alerts."
            checked={notifs.muteAll}
            onChange={(v) => setNotifs((p) => ({ ...p, muteAll: v }))}
          />

          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {["instant", "daily", "weekly"].map((freq) => (
              <button
                key={freq}
                type="button"
                onClick={() =>
                  setNotifs((p) => ({
                    ...p,
                    frequency: freq as NotificationPrefs["frequency"],
                  }))
                }
                className={[
                  "rounded-xl border px-3 py-2 text-sm capitalize transition",
                  notifs.frequency === freq
                    ? "border-violet-500/40 bg-violet-500/15 text-violet-200"
                    : "border-white/10 bg-zinc-900/30 text-zinc-400 hover:text-zinc-200",
                ].join(" ")}
              >
                {freq} digest
              </button>
            ))}
          </div>
        </div>

        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
          Learning
        </p>
        <Toggle
          id="notif-course-updates"
          label="Course updates"
          description="New lessons and updates in enrolled tracks."
          checked={notifs.courseUpdates}
          onChange={(v) => setNotifs((p) => ({ ...p, courseUpdates: v }))}
        />
        <Toggle
          id="notif-achievements"
          label="Achievement alerts"
          description="Notify me when I unlock a new badge."
          checked={notifs.achievementAlerts}
          onChange={(v) => setNotifs((p) => ({ ...p, achievementAlerts: v }))}
        />
        <Toggle
          id="notif-streak"
          label="Streak reminders"
          description="Daily nudges to keep your streak alive."
          checked={notifs.streakReminders}
          onChange={(v) => setNotifs((p) => ({ ...p, streakReminders: v }))}
        />

        <p className="mb-2 mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
          Community
        </p>
        <Toggle
          id="notif-community"
          label="Community replies"
          description="Alerts for comments and replies on your posts."
          checked={notifs.communityReplies}
          onChange={(v) => setNotifs((p) => ({ ...p, communityReplies: v }))}
        />

        <p className="mb-2 mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
          Discovery & Marketing
        </p>
        <Toggle
          id="notif-weekly"
          label="Weekly digest"
          description="Summary of progress and suggested content."
          checked={notifs.weeklyDigest}
          onChange={(v) => setNotifs((p) => ({ ...p, weeklyDigest: v }))}
        />
        <Toggle
          id="notif-new-courses"
          label="New course launches"
          description="Announcements for fresh courses and tracks."
          checked={notifs.newCourses}
          onChange={(v) => setNotifs((p) => ({ ...p, newCourses: v }))}
        />
        <Toggle
          id="notif-marketing"
          label="Product offers"
          description="Promotions, events, and special notices."
          checked={notifs.marketingEmails}
          onChange={(v) => setNotifs((p) => ({ ...p, marketingEmails: v }))}
        />

        <div className="mt-7 flex items-center justify-end gap-3">
          {notifsSaved ? (
            <output className="inline-flex items-center gap-1.5 text-sm text-emerald-400">
              <Check className="h-4 w-4" /> Preferences saved
            </output>
          ) : null}
          <Button
            type="submit"
            isLoading={notifsSaving}
            leftIcon={<Save className="h-4 w-4" />}
          >
            {notifsSaving ? "Saving..." : "Save Preferences"}
          </Button>
        </div>
      </Card>
    </form>
  );
}
