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

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  register: (
    name: string,
    email: string,
    password: string,
  ) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_KEY = "cl_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Attempt to restore cached user immediately
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw) as AuthUser);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }

    // Verify session with Appwrite and refresh user info
    (async () => {
      try {
        const acct = await account.get();
        const mapped: AuthUser = {
          id: (acct as any).$id || (acct as any).id || "",
          name: (acct as any).name || "",
          email: (acct as any).email || "",
          role: "student",
        };
        setUser(mapped);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mapped));
      } catch {
        // no active session or error — keep cached user if any
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const persist = useCallback((u: AuthUser | null) => {
    setUser(u);
    if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    else localStorage.removeItem(STORAGE_KEY);
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        // authenticate the user via email+password session
        // Appwrite JS SDK exposes `createEmailPasswordSession` in this version
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
        persist(mapped);
        return {};
      } catch (err: any) {
        const msg = err?.message || "Login failed";
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
      if (password.length < 8)
        return { error: "Password must be at least 8 characters." };

      try {
        // Create a new Appwrite account. Use 'unique()' to let Appwrite generate an id
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await account.create("unique()", email, password, name);

        // After creating an account, create a session to sign the user in
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
        persist(mapped);
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
    persist(null);
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
