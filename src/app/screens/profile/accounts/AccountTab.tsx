"use client";

import {
  Check,
  Eye,
  EyeOff,
  KeyRound,
  Laptop,
  LogOut,
  Mail,
  Shield,
  Smartphone,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/ui/components/Badge";
import { Button } from "@/ui/components/Button";
import { Card } from "@/ui/components/Card";
import { Input } from "@/ui/components/Input";
import { SectionHeading } from "../_shared";

function PasswordField({
  label,
  id,
  value,
  onChange,
  error,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
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
      autoComplete="new-password"
      rightAddon={
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="text-zinc-400 hover:text-zinc-200"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      }
    />
  );
}

function PasswordStrength({ password }: { password: string }) {
  const score = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
    password.length >= 14,
  ].filter(Boolean).length;

  const label =
    score >= 5
      ? "Very strong"
      : score >= 4
        ? "Strong"
        : score >= 3
          ? "Good"
          : score >= 2
            ? "Fair"
            : "Weak";

  return (
    <div className="space-y-1.5">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <span
            key={n}
            className={[
              "h-1.5 flex-1 rounded-full transition-all",
              n <= score
                ? score >= 4
                  ? "bg-emerald-500"
                  : score >= 3
                    ? "bg-amber-400"
                    : "bg-red-500"
                : "bg-white/10",
            ].join(" ")}
          />
        ))}
      </div>
      <p className="text-xs text-zinc-400">Strength: {label}</p>
    </div>
  );
}

interface AccountTabProps {
  emailValue: string;
  setEmailValue: (v: string) => void;
  emailError: string;
  setEmailError: (v: string) => void;
  emailSaving: boolean;
  emailSaved: boolean;
  onChangeEmail: (e: React.FormEvent) => void;
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
  currentSessionDate: string;
  onLogout: () => void;
}

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
  const sessionItems = useMemo(
    () => [
      {
        id: "sess-1",
        name: "Current device",
        details: `Chrome on Linux · ${currentSessionDate}`,
        icon: Laptop,
        current: true,
      },
      {
        id: "sess-2",
        name: "Mobile app",
        details: "Android device · 2 hours ago",
        icon: Smartphone,
        current: false,
      },
    ],
    [currentSessionDate],
  );

  return (
    <div className="space-y-5">
      <Card className="rounded-3xl border-white/10 bg-white/4">
        <SectionHeading
          title="Email & Verification"
          description="Change your login email and keep your account verified."
        />
        <form onSubmit={onChangeEmail} noValidate className="space-y-4">
          <Input
            label="Primary email"
            type="email"
            value={emailValue}
            onChange={(e) => {
              setEmailValue(e.target.value);
              setEmailError("");
            }}
            error={emailError}
            leftAddon={<Mail className="h-4 w-4" />}
          />
          <div className="flex items-center justify-end gap-3">
            {emailSaved ? (
              <output className="inline-flex items-center gap-1.5 text-sm text-emerald-400">
                <Check className="h-4 w-4" /> Email updated
              </output>
            ) : null}
            <Button type="submit" isLoading={emailSaving} size="sm">
              {emailSaving ? "Saving..." : "Update Email"}
            </Button>
          </div>
        </form>
      </Card>

      <Card className="rounded-3xl border-white/10 bg-white/4">
        <SectionHeading
          title="Password"
          description="Use a strong password and rotate it regularly."
        />
        <form onSubmit={onChangePassword} noValidate className="space-y-4">
          <PasswordField
            id="current-password"
            label="Current password"
            value={currentPw}
            onChange={setCurrentPw}
            error={pwErrors.currentPw}
          />
          <PasswordField
            id="new-password"
            label="New password"
            value={newPw}
            onChange={setNewPw}
            error={pwErrors.newPw}
          />
          <PasswordField
            id="confirm-password"
            label="Confirm password"
            value={confirmPw}
            onChange={setConfirmPw}
            error={pwErrors.confirmPw}
          />
          {newPw ? <PasswordStrength password={newPw} /> : null}
          <div className="flex items-center justify-end gap-3">
            {pwSaved ? (
              <output className="inline-flex items-center gap-1.5 text-sm text-emerald-400">
                <Check className="h-4 w-4" /> Password changed
              </output>
            ) : null}
            <Button
              type="submit"
              isLoading={pwSaving}
              size="sm"
              leftIcon={<KeyRound className="h-4 w-4" />}
            >
              {pwSaving ? "Updating..." : "Update Password"}
            </Button>
          </div>
        </form>
      </Card>

      <Card className="rounded-3xl border-white/10 bg-white/4">
        <SectionHeading
          title="Session Management"
          description="Review active devices and secure your sessions."
        />
        <div className="space-y-2">
          {sessionItems.map(({ id, name, details, icon: Icon, current }) => (
            <div
              key={id}
              className="flex items-center justify-between rounded-xl border border-white/8 bg-zinc-900/30 px-3 py-2.5"
            >
              <div className="flex items-center gap-2.5">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/15">
                  <Icon className="h-4 w-4 text-cyan-300" />
                </span>
                <div>
                  <p className="text-sm font-medium text-zinc-200">{name}</p>
                  <p className="text-xs text-zinc-500">{details}</p>
                </div>
              </div>
              {current ? (
                <Badge variant="success">Current</Badge>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-red-300"
                >
                  Revoke
                </Button>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between rounded-xl border border-amber-500/25 bg-amber-500/10 px-3 py-2.5">
          <p className="text-xs text-amber-200">
            Signing out everywhere removes access on all devices.
          </p>
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<LogOut className="h-4 w-4" />}
            onClick={onLogout}
          >
            Sign Out All
          </Button>
        </div>
      </Card>

      <Card className="rounded-3xl border-red-500/30 bg-red-500/8">
        <SectionHeading
          title="Account Safety"
          description="Keep your account protected with additional checks."
        />
        <div className="flex items-center justify-between rounded-xl border border-white/8 bg-zinc-900/35 px-3 py-2.5">
          <div className="flex items-center gap-2">
            <Shield className="h-4.5 w-4.5 text-amber-300" />
            <p className="text-sm text-zinc-200">
              Two-factor authentication not enabled
            </p>
          </div>
          <Button variant="outline" size="sm">
            Enable 2FA
          </Button>
        </div>
      </Card>
    </div>
  );
}
