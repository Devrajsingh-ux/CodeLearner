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
import { account } from "@/lib/appwrite";
import { DEFAULT_SETTINGS } from "@/data/admin";
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
}

const AuthContext = createContext<AuthContextValue | null>(null);

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

        // Verify with Appwrite and refresh
        const acct = await account.get();
        const mapped: AuthUser = {
          id: (acct as any).$id || (acct as any).id || "",
          name: (acct as any).name || "",
          email: (acct as any).email || "",
          role: "student",
        };
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await account.createEmailPasswordSession(email, password);
        const acct = await account.get();
        const mapped: AuthUser = {
          id: (acct as any).$id || (acct as any).id || "",
          name: (acct as any).name || "",
          email: (acct as any).email || "",
          role: "student",
        };
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
        // Create a new Appwrite account. Use 'unique()' to let Appwrite generate an id
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const created = await account.create("unique()", email, password, name);

        // Send email verification link (Appwrite will include userId+secret in redirect)
        try {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          await account.createEmailVerification({ url: `${DEFAULT_SETTINGS.siteUrl}/auth/verify` });
        } catch (verr) {
          // non-fatal — log and continue
          console.error("createEmailVerification failed", verr);
        }

        // If platform requires verification, do not auto-create session — ask user to verify
        if (DEFAULT_SETTINGS.enableEmailVerification) {
          const mapped: AuthUser = {
            id: (created as any).$id || (created as any).id || "",
            name: name,
            email: email,
            role: "student",
          };
          await persist(mapped);
          return { needsVerification: true };
        }

        // Otherwise sign the user in and persist
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await account.createEmailPasswordSession(email, password);
        const acct = await account.get();
        const mapped: AuthUser = {
          id: (acct as any).$id || (acct as any).id || "",
          name: (acct as any).name || name,
          email: (acct as any).email || email,
          role: "student",
        };
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

  const logout = useCallback(async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await account.deleteSession("current");
    } catch {
      // ignore errors
    }
    await persist(null);
  }, [persist]);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
