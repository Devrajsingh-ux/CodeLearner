"use client";

import { Check, Save } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeading, Toggle, type NotificationPrefs } from "../_shared";

// ─── Props ────────────────────────────────────────────────────────────────────

interface NotificationsTabProps {
  notifs: NotificationPrefs;
  setNotifs: React.Dispatch<React.SetStateAction<NotificationPrefs>>;
  notifsSaving: boolean;
  notifsSaved: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function NotificationsTab({
  notifs,
  setNotifs,
  notifsSaving,
  notifsSaved,
  onSubmit,
}: NotificationsTabProps) {
  return (
    <form onSubmit={onSubmit}>
      <Card>
        <SectionHeading
          title="Notification Preferences"
          description="Choose which emails and alerts you receive from Zentax."
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
          onChange={(v) => setNotifs((p) => ({ ...p, courseUpdates: v }))}
        />
        <Toggle
          id="notif-achievements"
          label="Achievement alerts"
          description="Get notified when you unlock a new badge or milestone."
          checked={notifs.achievementAlerts}
          onChange={(v) => setNotifs((p) => ({ ...p, achievementAlerts: v }))}
        />
        <Toggle
          id="notif-streak"
          label="Streak reminders"
          description="Daily nudge to keep your learning streak alive."
          checked={notifs.streakReminders}
          onChange={(v) => setNotifs((p) => ({ ...p, streakReminders: v }))}
        />

        <div className="mb-4 mt-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Digest &amp; Discovery
          </p>
        </div>
        <Toggle
          id="notif-weekly"
          label="Weekly learning digest"
          description="A summary of your progress, tips, and recommended lessons every Monday."
          checked={notifs.weeklyDigest}
          onChange={(v) => setNotifs((p) => ({ ...p, weeklyDigest: v }))}
        />
        <Toggle
          id="notif-new-courses"
          label="New course announcements"
          description="Be the first to know when a new track launches."
          checked={notifs.newCourses}
          onChange={(v) => setNotifs((p) => ({ ...p, newCourses: v }))}
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
          onChange={(v) => setNotifs((p) => ({ ...p, communityReplies: v }))}
        />

        <div className="mb-4 mt-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Optional
          </p>
        </div>
        <Toggle
          id="notif-marketing"
          label="Product news &amp; offers"
          description="Occasional emails about promotions, new features, and special events."
          checked={notifs.marketingEmails}
          onChange={(v) => setNotifs((p) => ({ ...p, marketingEmails: v }))}
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
  );
}
