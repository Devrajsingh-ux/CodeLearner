"use client";

import { AlertTriangle, Shield, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { SectionHeading } from "../_shared";

// ─── Props ────────────────────────────────────────────────────────────────────

interface PrivacyTabProps {
  deleteConfirm: string;
  setDeleteConfirm: (v: string) => void;
  showDeletePanel: boolean;
  setShowDeletePanel: (v: boolean) => void;
  deleting: boolean;
  onDeleteAccount: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function PrivacyTab({
  deleteConfirm,
  setDeleteConfirm,
  showDeletePanel,
  setShowDeletePanel,
  deleting,
  onDeleteAccount,
}: PrivacyTabProps) {
  return (
    <div className="space-y-6">
      {/* Profile visibility */}
      <Card>
        <SectionHeading
          title="Profile Visibility"
          description="Control who can see your public profile."
        />
        <div className="space-y-2">
          {[
            { id: "public",   label: "Public",        desc: "Anyone can view your profile and progress." },
            { id: "learners", label: "Learners only",  desc: "Only signed-in Zentax members can view your profile." },
            { id: "private",  label: "Private",        desc: "Only you can see your profile." },
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
                <p className="text-sm font-medium text-zinc-200">{label}</p>
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

      {/* Login history */}
      <Card>
        <SectionHeading
          title="Login History"
          description="Recent sign-in events on your account."
        />
        <div className="space-y-2">
          {[
            { device: "Chrome on macOS",   location: "San Francisco, US", time: "Just now",    current: true  },
            { device: "Safari on iPhone",  location: "San Francisco, US", time: "2 hours ago", current: false },
            { device: "Firefox on Windows",location: "New York, US",      time: "3 days ago",  current: false },
          ].map(({ device, location, time, current }) => (
            <div
              key={device + time}
              className="flex items-center justify-between rounded-xl border border-white/6 px-4 py-2.5"
            >
              <div>
                <p className="text-sm text-zinc-200">{device}</p>
                <p className="text-xs text-zinc-500">{location} · {time}</p>
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
          <h2 className="text-lg font-semibold text-red-400">Danger Zone</h2>
        </div>
        <p className="mb-4 text-sm text-zinc-400">
          Permanently delete your Zentax account. This removes all progress,
          achievements, and data associated with your account and{" "}
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
              <strong className="font-mono text-red-200">DELETE</strong> below.
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
                onClick={onDeleteAccount}
              >
                {deleting ? "Deleting…" : "Permanently delete account"}
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
