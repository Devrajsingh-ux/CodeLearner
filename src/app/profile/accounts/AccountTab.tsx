"use client";

import {
  Check,
  Eye,
  EyeOff,
  Github,
  Globe,
  KeyRound,
  LogOut,
  Mail,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";
import { SectionHeading } from "../_shared";

// ─── PasswordField ────────────────────────────────────────────────────────────

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

// ─── PasswordStrength ─────────────────────────────────────────────────────────

function PasswordStrength({ password }: { password: string }) {
  const score = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
    password.length >= 14,
  ].filter(Boolean).length;

  const levels = [
    { label: "Weak",       color: "bg-red-500"     },
    { label: "Fair",       color: "bg-amber-500"   },
    { label: "Good",       color: "bg-yellow-400"  },
    { label: "Strong",     color: "bg-emerald-500" },
    { label: "Very strong",color: "bg-emerald-400" },
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

// ─── Props ────────────────────────────────────────────────────────────────────

interface AccountTabProps {
  // Email
  emailValue: string;
  setEmailValue: (v: string) => void;
  emailError: string;
  setEmailError: (v: string) => void;
  emailSaving: boolean;
  emailSaved: boolean;
  onChangeEmail: (e: React.FormEvent) => void;
  // Password
  currentPw: string;
  setCurrentPw: (v: string) => void;
  newPw: string;
  setNewPw: (v: string) => void;
  confirmPw: string;
  setConfirmPw: (v: string) => void;
  pwErrors: { currentPw?: string; newPw?: string; confirmPw?: string };
  pwSaving: boolean;
  pwSaved: boolean;
  onChangePassword: (e: React.FormEvent) => void;
  // Session
  currentSessionDate: string;
  onLogout: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function AccountTab({
  emailValue,
  setEmailValue,
  emailError,
  setEmailError,
  emailSaving,
  emailSaved,
  onChangeEmail,
  currentPw,
  setCurrentPw,
  newPw,
  setNewPw,
  confirmPw,
  setConfirmPw,
  pwErrors,
  pwSaving,
  pwSaved,
  onChangePassword,
  currentSessionDate,
  onLogout,
}: AccountTabProps) {
  return (
    <div className="space-y-6">
      {/* Email */}
      <Card>
        <SectionHeading
          title="Email Address"
          description="Your login email and where we send important notifications."
        />
        <form onSubmit={onChangeEmail} noValidate className="space-y-4">
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
        <form onSubmit={onChangePassword} noValidate className="space-y-4">
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
            { provider: "GitHub", icon: Github, connected: false },
            { provider: "Google", icon: Globe,  connected: false },
          ].map(({ provider, icon: Icon, connected }) => (
            <div
              key={provider}
              className="flex items-center justify-between rounded-xl border border-white/8 px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <Icon className="h-5 w-5 text-zinc-400" />
                <div>
                  <p className="text-sm font-medium text-zinc-200">{provider}</p>
                  <p className="text-xs text-zinc-500">
                    {connected ? "Connected" : "Not connected"}
                  </p>
                </div>
              </div>
              <Button variant={connected ? "danger" : "outline"} size="sm">
                {connected ? "Disconnect" : "Connect"}
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Active session */}
      <Card>
        <SectionHeading
          title="Active Sessions"
          description="Sign out of all other browsers and devices."
        />
        <div className="flex items-center justify-between rounded-xl border border-white/8 bg-white/3 px-4 py-3">
          <div>
            <p className="text-sm font-medium text-zinc-200">This device</p>
            <p className="text-xs text-zinc-500">
              Current session — {currentSessionDate}
            </p>
          </div>
          <Badge variant="success">Active</Badge>
        </div>
        <div className="mt-4 flex justify-end">
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<LogOut className="h-4 w-4" />}
            onClick={onLogout}
          >
            Sign out everywhere
          </Button>
        </div>
      </Card>
    </div>
  );
}
