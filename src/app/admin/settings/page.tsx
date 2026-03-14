"use client";

import { Check, Info, Loader2, Save } from "lucide-react";
import { useEffect, useState } from "react";
import type { PlatformSettings } from "@/data/admin";

const EMPTY_SETTINGS: PlatformSettings = {
  platformName: "",
  siteUrl: "",
  supportEmail: "",
  registrationOpen: true,
  maintenanceMode: false,
  featuredCourseCount: 6,
  maxFreeCoursesPerUser: 3,
  enableOAuthGitHub: false,
  enableOAuthGoogle: false,
  enableEmailVerification: false,
  smtpHost: "",
  analyticsId: "",
};
import { cn } from "@/lib/utils";

// ─── Reusable input widgets ───────────────────────────────────────────────────

function SettingRow({
  label,
  description,
  children,
}: {
  label: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 border-b border-white/6 py-5 last:border-0 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-zinc-200">{label}</p>
        {description && (
          <p className="mt-0.5 text-xs text-zinc-500">{description}</p>
        )}
      </div>
      <div className="shrink-0 sm:w-72">{children}</div>
    </div>
  );
}

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950",
        checked ? "bg-violet-600" : "bg-zinc-700",
      )}
    >
      <span
        className={cn(
          "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition duration-200",
          checked ? "translate-x-5" : "translate-x-0.5",
        )}
      />
    </button>
  );
}

function TextInput({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-xl border border-white/8 bg-zinc-900 px-3 py-2 text-sm text-zinc-300 outline-none transition-colors placeholder:text-zinc-600 focus:border-violet-500"
    />
  );
}

function NumberInput({
  value,
  onChange,
  min,
  max,
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <input
      type="number"
      value={value}
      min={min}
      max={max}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full rounded-xl border border-white/8 bg-zinc-900 px-3 py-2 text-sm text-zinc-300 outline-none focus:border-violet-500"
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<PlatformSettings>(EMPTY_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [activeSection, setActiveSection] = useState<
    "general" | "auth" | "content" | "integrations"
  >("general");

  useEffect(() => {
    fetch("/api/admin/settings", { credentials: "same-origin" })
      .then((r) => r.json())
      .then((d) => setSettings(d.settings ?? EMPTY_SETTINGS))
      .catch(() => setSettings(EMPTY_SETTINGS))
      .finally(() => setIsLoading(false));
  }, []);

  function update<K extends keyof PlatformSettings>(
    key: K,
    value: PlatformSettings[K],
  ) {
    setSettings((prev: PlatformSettings) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  async function handleSave() {
    setIsSaving(true);
    setError("");
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (!res.ok) throw new Error(await res.text());
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e: any) {
      setError(e.message ?? "Failed to save settings");
    } finally {
      setIsSaving(false);
    }
  }

  const SECTIONS = [
    { id: "general", label: "General" },
    { id: "auth", label: "Authentication" },
    { id: "content", label: "Content" },
    { id: "integrations", label: "Integrations" },
  ] as const;

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Platform Settings</h2>
          <p className="mt-1 text-sm text-zinc-500">
            {isLoading ? "Loading settings…" : "Configure global behaviour for Zentax."}
          </p>
        </div>
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving || isLoading}
          className={cn(
            "flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all disabled:opacity-60",
            saved
              ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
              : "bg-violet-600 text-white hover:bg-violet-500 shadow-lg shadow-violet-500/20",
          )}
        >
          {isSaving ? (
            <><Loader2 className="h-4 w-4 animate-spin" /> Saving…</>
          ) : saved ? (
            <><Check className="h-4 w-4" /> Saved!</>
          ) : (
            <><Save className="h-4 w-4" /> Save Changes</>
          )}
        </button>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</div>
      )}

      {/* Maintenance warning banner */}
      {settings.maintenanceMode && (
        <div className="flex items-start gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
          <div>
            <p className="text-sm font-semibold text-amber-300">
              Maintenance Mode is ON
            </p>
            <p className="mt-0.5 text-xs text-amber-400/80">
              The platform is currently inaccessible to regular users. Only
              admins can log in.
            </p>
          </div>
        </div>
      )}

      {/* Tab bar */}
      <div className="flex gap-1 overflow-x-auto rounded-2xl border border-white/6 bg-zinc-900 p-1">
        {SECTIONS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => setActiveSection(id)}
            className={cn(
              "shrink-0 rounded-xl px-4 py-2 text-sm font-medium transition-all",
              activeSection === id
                ? "bg-violet-600 text-white shadow"
                : "text-zinc-400 hover:text-zinc-200",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ── General ───────────────────────────────────────────── */}
      {activeSection === "general" && (
        <section className="rounded-2xl border border-white/6 bg-zinc-900 px-5">
          <SettingRow
            label="Platform Name"
            description="Shown in browser tabs, emails, and metadata."
          >
            <TextInput
              value={settings.platformName}
              onChange={(v) => update("platformName", v)}
              placeholder="e.g. Zentax"
            />
          </SettingRow>

          <SettingRow
            label="Site URL"
            description="The canonical public URL of your platform."
          >
            <TextInput
              value={settings.siteUrl}
              onChange={(v) => update("siteUrl", v)}
              placeholder="https://zentax.io"
              type="url"
            />
          </SettingRow>

          <SettingRow
            label="Support Email"
            description="Shown in footer and error pages."
          >
            <TextInput
              value={settings.supportEmail}
              onChange={(v) => update("supportEmail", v)}
              placeholder="support@zentax.io"
              type="email"
            />
          </SettingRow>

          <SettingRow
            label="Maintenance Mode"
            description="Lock out all non-admin users from the platform."
          >
            <div className="flex items-center gap-3">
              <Toggle
                checked={settings.maintenanceMode}
                onChange={(v) => update("maintenanceMode", v)}
                label="Maintenance mode"
              />
              <span
                className={cn(
                  "text-xs font-semibold",
                  settings.maintenanceMode ? "text-amber-400" : "text-zinc-500",
                )}
              >
                {settings.maintenanceMode ? "Enabled" : "Disabled"}
              </span>
            </div>
          </SettingRow>
        </section>
      )}

      {/* ── Authentication ─────────────────────────────────────── */}
      {activeSection === "auth" && (
        <section className="rounded-2xl border border-white/6 bg-zinc-900 px-5">
          <SettingRow
            label="Open Registration"
            description="Allow new users to sign up. Disable to make the platform invite-only."
          >
            <div className="flex items-center gap-3">
              <Toggle
                checked={settings.registrationOpen}
                onChange={(v) => update("registrationOpen", v)}
                label="Registration open"
              />
              <span
                className={cn(
                  "text-xs font-semibold",
                  settings.registrationOpen
                    ? "text-emerald-400"
                    : "text-red-400",
                )}
              >
                {settings.registrationOpen ? "Open" : "Closed"}
              </span>
            </div>
          </SettingRow>

          <SettingRow
            label="Email Verification"
            description="Require new users to verify their email before accessing the platform."
          >
            <div className="flex items-center gap-3">
              <Toggle
                checked={settings.enableEmailVerification}
                onChange={(v) => update("enableEmailVerification", v)}
                label="Email verification"
              />
              <span className="text-xs text-zinc-500">
                {settings.enableEmailVerification ? "Required" : "Optional"}
              </span>
            </div>
          </SettingRow>

          <SettingRow
            label="GitHub OAuth"
            description="Let users sign in with their GitHub account."
          >
            <div className="flex items-center gap-3">
              <Toggle
                checked={settings.enableOAuthGitHub}
                onChange={(v) => update("enableOAuthGitHub", v)}
                label="GitHub OAuth"
              />
              <span className="text-xs text-zinc-500">
                {settings.enableOAuthGitHub ? "Enabled" : "Disabled"}
              </span>
            </div>
          </SettingRow>

          <SettingRow
            label="Google OAuth"
            description="Let users sign in with their Google account."
          >
            <div className="flex items-center gap-3">
              <Toggle
                checked={settings.enableOAuthGoogle}
                onChange={(v) => update("enableOAuthGoogle", v)}
                label="Google OAuth"
              />
              <span className="text-xs text-zinc-500">
                {settings.enableOAuthGoogle ? "Enabled" : "Disabled"}
              </span>
            </div>
          </SettingRow>
        </section>
      )}

      {/* ── Content ────────────────────────────────────────────── */}
      {activeSection === "content" && (
        <section className="rounded-2xl border border-white/6 bg-zinc-900 px-5">
          <SettingRow
            label="Featured Course Count"
            description="How many courses appear in the 'Featured' grid on the home page."
          >
            <NumberInput
              value={settings.featuredCourseCount}
              onChange={(v) => update("featuredCourseCount", v)}
              min={1}
              max={12}
            />
          </SettingRow>

          <SettingRow
            label="Max Free Courses / User"
            description="Users on the free plan can enrol in up to this many courses."
          >
            <NumberInput
              value={settings.maxFreeCoursesPerUser}
              onChange={(v) => update("maxFreeCoursesPerUser", v)}
              min={1}
              max={20}
            />
          </SettingRow>
        </section>
      )}

      {/* ── Integrations ───────────────────────────────────────── */}
      {activeSection === "integrations" && (
        <section className="rounded-2xl border border-white/6 bg-zinc-900 px-5">
          <SettingRow
            label="SMTP Host"
            description="Outbound mail server for transactional emails."
          >
            <TextInput
              value={settings.smtpHost}
              onChange={(v) => update("smtpHost", v)}
              placeholder="smtp.sendgrid.net"
            />
          </SettingRow>

          <SettingRow
            label="Analytics Tracking ID"
            description="Google Analytics / Plausible measurement ID."
          >
            <TextInput
              value={settings.analyticsId}
              onChange={(v) => update("analyticsId", v)}
              placeholder="G-XXXXXXXXXX"
            />
          </SettingRow>

          <SettingRow
            label="API Base URL"
            description="Backend REST/GraphQL API endpoint (read-only)."
          >
            <div className="flex items-center gap-2 rounded-xl border border-white/8 bg-zinc-950 px-3 py-2">
              <span className="flex-1 truncate text-sm text-zinc-500 select-all">
                {settings.siteUrl}/api
              </span>
              <span className="rounded-md bg-zinc-800 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-zinc-500">
                Read-only
              </span>
            </div>
          </SettingRow>
        </section>
      )}

      {/* Sticky save bar (mobile-friendly) */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving || isLoading}
          className={cn(
            "flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all disabled:opacity-60",
            saved
              ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
              : "bg-violet-600 text-white hover:bg-violet-500 shadow-lg shadow-violet-500/20",
          )}
        >
          {isSaving ? (
            <><Loader2 className="h-4 w-4 animate-spin" /> Saving…</>
          ) : saved ? (
            <><Check className="h-4 w-4" /> Saved!</>
          ) : (
            <><Save className="h-4 w-4" /> Save Changes</>
          )}
        </button>
      </div>
    </div>
  );
}
