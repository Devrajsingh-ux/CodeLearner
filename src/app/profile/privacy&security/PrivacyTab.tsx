"use client";

import {
  AlertTriangle,
  Download,
  Eye,
  Lock,
  Shield,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { SectionHeading, Toggle } from "../_shared";

interface PrivacyTabProps {
  deleteConfirm: string;
  setDeleteConfirm: (v: string) => void;
  showDeletePanel: boolean;
  setShowDeletePanel: (v: boolean) => void;
  deleting: boolean;
  onDeleteAccount: () => void;
}

export function PrivacyTab({
  deleteConfirm,
  setDeleteConfirm,
  showDeletePanel,
  setShowDeletePanel,
  deleting,
  onDeleteAccount,
}: PrivacyTabProps) {
  const [visibility, setVisibility] = useState<
    "public" | "friends" | "private"
  >("public");
  const [showStats, setShowStats] = useState(true);
  const [showStreak, setShowStreak] = useState(true);
  const [showAchievements, setShowAchievements] = useState(true);

  return (
    <div className="space-y-5">
      <Card className="rounded-3xl border-white/10 bg-white/4">
        <SectionHeading
          title="Profile Privacy"
          description="Control who can see your profile, stats, and activity."
        />

        <div className="grid gap-2 sm:grid-cols-3">
          {[
            { id: "public", label: "Public", desc: "Visible to everyone" },
            { id: "friends", label: "Friends", desc: "Visible to connections" },
            { id: "private", label: "Private", desc: "Visible only to you" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setVisibility(item.id as typeof visibility)}
              className={[
                "rounded-xl border px-3 py-2 text-left transition",
                visibility === item.id
                  ? "border-violet-500/40 bg-violet-500/15"
                  : "border-white/10 bg-zinc-900/30",
              ].join(" ")}
            >
              <p className="text-sm font-semibold text-zinc-100">
                {item.label}
              </p>
              <p className="text-xs text-zinc-500">{item.desc}</p>
            </button>
          ))}
        </div>

        <div className="mt-5 space-y-1">
          <Toggle
            id="privacy-show-stats"
            label="Show XP and level"
            description="Allow profile visitors to view your XP and level progress."
            checked={showStats}
            onChange={setShowStats}
          />
          <Toggle
            id="privacy-show-streak"
            label="Show streak"
            description="Display your learning streak on your profile card."
            checked={showStreak}
            onChange={setShowStreak}
          />
          <Toggle
            id="privacy-show-badges"
            label="Show achievements"
            description="Display earned badges and unlock progress publicly."
            checked={showAchievements}
            onChange={setShowAchievements}
          />
        </div>
      </Card>

      <Card className="rounded-3xl border-white/10 bg-white/4">
        <SectionHeading
          title="Security"
          description="Enhance your account protection settings."
        />

        <div className="space-y-2">
          <div className="flex items-center justify-between rounded-xl border border-white/8 bg-zinc-900/35 px-3 py-2.5">
            <div className="flex items-center gap-2.5">
              <Shield className="h-4.5 w-4.5 text-amber-300" />
              <div>
                <p className="text-sm text-zinc-100">
                  Two-factor authentication
                </p>
                <p className="text-xs text-zinc-500">
                  Add authenticator app verification.
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Enable
            </Button>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-white/8 bg-zinc-900/35 px-3 py-2.5">
            <div className="flex items-center gap-2.5">
              <Eye className="h-4.5 w-4.5 text-cyan-300" />
              <div>
                <p className="text-sm text-zinc-100">Login alerts</p>
                <p className="text-xs text-zinc-500">
                  Email alert for suspicious logins.
                </p>
              </div>
            </div>
            <Badge variant="success">Enabled</Badge>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-white/8 bg-zinc-900/35 px-3 py-2.5">
            <div className="flex items-center gap-2.5">
              <Download className="h-4.5 w-4.5 text-violet-300" />
              <div>
                <p className="text-sm text-zinc-100">Export account data</p>
                <p className="text-xs text-zinc-500">
                  Download profile and progress records.
                </p>
              </div>
            </div>
            <Button variant="secondary" size="sm">
              Request Export
            </Button>
          </div>
        </div>
      </Card>

      <Card className="rounded-3xl border-red-500/30 bg-red-500/8">
        <SectionHeading
          title="Danger Zone"
          description="Deleting your account is irreversible and removes all progress data."
        />

        <div className="mb-4 rounded-xl border border-red-500/35 bg-red-500/10 px-3 py-2.5 text-sm text-red-200">
          <p className="inline-flex items-center gap-2 font-medium">
            <AlertTriangle className="h-4 w-4" />
            This action permanently deletes your profile, badges, stats, and
            saved progress.
          </p>
        </div>

        {!showDeletePanel ? (
          <Button
            variant="danger"
            size="sm"
            leftIcon={<Trash2 className="h-4 w-4" />}
            onClick={() => setShowDeletePanel(true)}
          >
            Delete Account
          </Button>
        ) : (
          <div className="space-y-4 rounded-xl border border-red-500/35 bg-red-500/12 p-4">
            <p className="text-sm text-red-200">
              Type <span className="font-mono font-bold">DELETE</span> to
              confirm.
            </p>
            <Input
              value={deleteConfirm}
              onChange={(e) => setDeleteConfirm(e.target.value)}
              placeholder="Type DELETE"
              className="border-red-500/40"
            />
            <div className="flex flex-wrap gap-2">
              <Button
                variant="danger"
                size="sm"
                isLoading={deleting}
                disabled={deleteConfirm !== "DELETE"}
                leftIcon={<Lock className="h-4 w-4" />}
                onClick={onDeleteAccount}
              >
                {deleting ? "Deleting..." : "Permanently Delete"}
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
  );
}
