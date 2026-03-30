"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { AuthUser } from "@/types";
import { account, ID } from "@/lib/appwrite";
import {
  checkRateLimit,
  clearAttempts,
  recordFailedAttempt,
} from "@/lib/rateLimit";

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  register: (
    name: string,
    email: string,
    password: string,
  ) => Promise<{ error?: string; needsVerification?: boolean }>;
  logout: () => Promise<void>;
  /** Re-fetches the current Appwrite session and updates context state. */
  reloadUser: () => Promise<AuthUser | null>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Map Appwrite account → AuthUser ─────────────────────────────────────────

function mapAuthUser(
  acct: any,
  prefs: Record<string, any>,
  fallback?: { name?: string; email?: string; role?: AuthUser["role"]; username?: string },
): AuthUser {
  const role: AuthUser["role"] =
    prefs.role === "admin" || prefs.role === "instructor"
      ? prefs.role
      : fallback?.role ?? "student";
  const resolvedEmail = acct.email || fallback?.email || "";
  // username preference takes priority; fall back to the supplied fallback, then email prefix
  const username =
    (typeof prefs.username === "string" && prefs.username.trim())
      ? prefs.username.trim()
      : (fallback?.username?.trim() || resolvedEmail.split("@")[0] || "");
  return {
    id: acct.$id ?? acct.id ?? "",
    name: acct.name || fallback?.name || "",
    email: resolvedEmail,
    username,
    role,
    xp: typeof prefs.xp === "number" ? prefs.xp : 0,
    level: typeof prefs.level === "number" && prefs.level >= 1 ? prefs.level : 1,
    streak: typeof prefs.streak === "number" ? prefs.streak : 0,
  };
}

// ─── Session helpers (HttpOnly cookie via /api/auth/session) ─────────────────

async function fetchSession(): Promise<AuthUser | null> {
  try {
    const res = await fetch("/api/auth/session", { credentials: "same-origin" });
    const data = await res.json();
    return data?.user ?? null;
  } catch {
    return null;
  }
}

async function saveSession(u: AuthUser): Promise<void> {
  try {
    await fetch("/api/auth/session", {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: u }),
    });
  } catch {}
}

async function clearSession(): Promise<void> {
  try {
    await fetch("/api/auth/session", {
      method: "DELETE",
      credentials: "same-origin",
    });
  } catch {}
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Restore session from HttpOnly cookie (no localStorage)
    (async () => {
      try {
        // Try cookie session first (fast, no Appwrite round-trip)
        const cached = await fetchSession();
        if (cached) setUser(cached);

        // Verify with Appwrite and refresh (read prefs.role too)
        const acct = await account.get();
        const prefs = (acct as any).prefs ?? {};
        const mapped = mapAuthUser(acct, prefs);
        setUser(mapped);
        await saveSession(mapped);
      } catch {
        // No active Appwrite session — clear stale cookie
        await clearSession();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const persist = useCallback(async (u: AuthUser | null) => {
    setUser(u);
    if (u) await saveSession(u);
    else await clearSession();
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      // ── Rate limit / lockout check ──────────────────────────────────────
      const rl = checkRateLimit(email);
      if (rl.blocked) return { error: rl.message ?? "Account temporarily locked." };

      try {
        // Ensure no existing session is active before creating a new one
        try {
          // @ts-ignore
          await account.deleteSession("current");
        } catch {}

        await account.createEmailPasswordSession(email, password);
        const acct = await account.get();
        const prefs = (acct as any).prefs ?? {};
        const mapped = mapAuthUser(acct, prefs);
        clearAttempts(email); // success — reset counter
        await persist(mapped);
        return {};
      } catch (err: any) {
        const result = recordFailedAttempt(email);
        if (result.locked) {
          return { error: "Account locked after too many failed attempts. Try again in 15 minutes." };
        }
        const warning = result.warning ? ` (${result.warning})` : "";
        const msg = (err?.message || "Invalid email or password.") + warning;
        return { error: msg };
      }
    },
    [persist],
  );

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      if (!name.trim() || name.trim().length < 2)
        return { error: "Name must be at least 2 characters." };
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        return { error: "Enter a valid email address." };

      // ── Strong password enforcement ─────────────────────────────────────
      if (password.length < 12)
        return { error: "Password must be at least 12 characters." };
      if (!/[A-Z]/.test(password))
        return { error: "Password must contain at least one uppercase letter." };
      if (!/[a-z]/.test(password))
        return { error: "Password must contain at least one lowercase letter." };
      if (!/[0-9]/.test(password))
        return { error: "Password must contain at least one number." };
      if (!/[^A-Za-z0-9]/.test(password))
        return { error: "Password must contain at least one special character." };

      // ── Rate limit check ────────────────────────────────────────────────
      const rl = checkRateLimit(email);
      if (rl.blocked) return { error: rl.message ?? "Too many attempts." };

      try {
        // Create a new Appwrite account — ID.unique() generates a valid unique ID
        const created = await account.create(ID.unique(), email, password, name);

        // Ensure no existing session is active before creating a new one
        try {
          // @ts-ignore
          await account.deleteSession("current");
        } catch {}

        // Auto sign-in so we can call createEmailVerification (requires active session)
        await account.createEmailPasswordSession(email, password);

        // Persist username (derived from name) in Appwrite account prefs
        const derivedUsername = name.trim().toLowerCase().replace(/[^a-z0-9_.-]/g, "").slice(0, 20) || email.split("@")[0];
        try {
          await account.updatePrefs({ username: derivedUsername, xp: 0, level: 1, streak: 0, role: "student" });
        } catch {}

        // Send email verification link
        try {
          // Fetch siteUrl from live platform settings; fall back to current origin
          let siteUrl = window.location.origin;
          try {
            const cfg = await fetch("/api/admin/settings", { credentials: "same-origin" });
            const cfgData = await cfg.json();
            if (cfgData?.settings?.siteUrl) siteUrl = cfgData.settings.siteUrl;
          } catch {}
          await account.createEmailVerification(`${siteUrl}/verify`);
        } catch (verr) {
          // non-fatal — log and continue
          console.error("createEmailVerification failed", verr);
        }

        // If platform requires verification, do not auto-create session — ask user to verify
        let enableEmailVerification = false;
        try {
          const cfg = await fetch("/api/admin/settings", { credentials: "same-origin" });
          const cfgData = await cfg.json();
          enableEmailVerification = cfgData?.settings?.enableEmailVerification ?? false;
        } catch {}
        if (enableEmailVerification) {
          const mapped: AuthUser = {
            id: (created as any).$id || (created as any).id || "",
            name: name,
            email: email,
            username: derivedUsername,
            role: "student",
            xp: 0,
            level: 1,
            streak: 0,
          };
          await persist(mapped);
          return { needsVerification: true };
        }

        // Session was already created above — just fetch the account details
        const acct = await account.get();
        const prefs = (acct as any).prefs ?? {};
        const mapped = mapAuthUser(acct, prefs, { name, email, role: "student", username: derivedUsername });
        clearAttempts(email);
        await persist(mapped);
        return {};
      } catch (err: any) {
        const msg = err?.message || "Registration failed";
        return { error: msg };
      }
    },
    [persist],
  );

  const reloadUser = useCallback(async (): Promise<AuthUser | null> => {
    try {
      const acct = await account.get();
      const prefs = (acct as any).prefs ?? {};
      const mapped = mapAuthUser(acct, prefs);
      setUser(mapped);
      await saveSession(mapped);
      return mapped;
    } catch {
      setUser(null);
      await clearSession();
      return null;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await account.deleteSession("current");
    } catch {
      // ignore errors
    }
    await persist(null);
  }, [persist]);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, reloadUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
