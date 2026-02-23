"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { AuthUser } from "@/types";

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<{ error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_KEY = "cl_user";

// Demo accounts for local dev — replace with real API calls in production.
const DEMO_USERS: Array<AuthUser & { password: string }> = [
  {
    id: "u1",
    name: "Alex Dev",
    email: "demo@codelearn.io",
    password: "demo1234",
    role: "student",
    avatar: "AD",
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw) as AuthUser);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const persist = useCallback((u: AuthUser | null) => {
    setUser(u);
    if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    else localStorage.removeItem(STORAGE_KEY);
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      // TODO: replace with `POST /api/auth/login` server action
      await new Promise((r) => setTimeout(r, 700));
      const found = DEMO_USERS.find(
        (u) => u.email === email && u.password === password
      );
      if (!found) return { error: "Invalid email or password." };
      const { password: _pw, ...safe } = found;
      persist(safe);
      return {};
    },
    [persist]
  );

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      // TODO: replace with `POST /api/auth/register` server action
      await new Promise((r) => setTimeout(r, 900));
      if (!name.trim() || name.trim().length < 2)
        return { error: "Name must be at least 2 characters." };
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        return { error: "Enter a valid email address." };
      if (password.length < 8)
        return { error: "Password must be at least 8 characters." };

      const newUser: AuthUser = {
        id: `u_${Date.now()}`,
        name: name.trim(),
        email: email.toLowerCase(),
        role: "student",
        avatar: name
          .trim()
          .split(" ")
          .slice(0, 2)
          .map((p) => p[0]?.toUpperCase())
          .join(""),
      };
      persist(newUser);
      return {};
    },
    [persist]
  );

  const logout = useCallback(() => persist(null), [persist]);

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
