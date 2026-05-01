import { errors, jwtVerify, SignJWT } from "jose";
import { createHash } from "node:crypto";
import type { NextRequest } from "next/server";
import { createClient, type RedisClientType } from "redis";
import { logAdminAction, logSecurityEvent } from "@/security/audit";

let cachedJwtSecret: Uint8Array | null = null;

function getJwtSecret(): Uint8Array {
  if (cachedJwtSecret) {
    return cachedJwtSecret;
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "CRITICAL: JWT_SECRET environment variable is not set. This is required for secure authentication.",
      );
    }

    console.warn(
      "WARNING: Using default JWT secret. Set JWT_SECRET in production!",
    );
    cachedJwtSecret = new TextEncoder().encode(
      "dev-only-secret-change-in-production-min-32-chars",
    );
    return cachedJwtSecret;
  }

  if (secret.length < 32) {
    throw new Error("JWT_SECRET must be at least 32 characters long for security.");
  }

  cachedJwtSecret = new TextEncoder().encode(secret);
  return cachedJwtSecret;
}

const JWT_ALGORITHM = "HS256";
const ACCESS_TOKEN_EXPIRES = "15m";
const REFRESH_TOKEN_EXPIRES = "7d";
const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

let tokenStore: RedisClientType | null = null;
let tokenStoreReady = false;
let tokenStoreAttempts = 0;
const localRevokedRefreshTokens = new Map<string, number>();

function tokenFingerprint(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

async function getTokenStore(): Promise<RedisClientType | null> {
  if (tokenStoreReady && tokenStore) return tokenStore;
  if (tokenStoreAttempts >= 2) return null;

  tokenStoreAttempts += 1;
  try {
    tokenStore = createClient({ url: REDIS_URL }) as RedisClientType;
    tokenStore.on("error", () => {
      tokenStoreReady = false;
    });
    await tokenStore.connect();
    tokenStoreReady = true;
    return tokenStore;
  } catch {
    tokenStoreReady = false;
    return null;
  }
}

async function isRefreshTokenRevoked(token: string): Promise<boolean> {
  const fingerprint = tokenFingerprint(token);
  const now = Math.floor(Date.now() / 1000);

  const localExpiry = localRevokedRefreshTokens.get(fingerprint);
  if (localExpiry && localExpiry > now) {
    return true;
  }
  if (localExpiry && localExpiry <= now) {
    localRevokedRefreshTokens.delete(fingerprint);
  }

  const store = await getTokenStore();
  if (!store) return false;

  const exists = await store.get(`auth:revoked:refresh:${fingerprint}`);
  return exists === "1";
}

async function revokeRefreshToken(token: string, exp?: number): Promise<void> {
  const fingerprint = tokenFingerprint(token);
  let expiry = exp;

  if (!expiry) {
    const payload = await verifyToken(token);
    expiry = payload?.exp;
  }

  if (!expiry) return;

  const now = Math.floor(Date.now() / 1000);
  const ttl = Math.max(1, expiry - now);
  localRevokedRefreshTokens.set(fingerprint, expiry);

  const store = await getTokenStore();
  if (!store) return;
  await store.setEx(`auth:revoked:refresh:${fingerprint}`, ttl, "1");
}

export interface User {
  id: string;
  email?: string;
  role?: string;
  name?: string;
  xp?: number;
  level?: number;
  streak?: number;
}

export interface TokenPayload extends User {
  type: "access" | "refresh";
  iat: number;
  exp: number;
}

export async function generateAccessToken(user: User): Promise<string> {
  const secret = getJwtSecret();
  return new SignJWT({ ...user, type: "access" })
    .setProtectedHeader({ alg: JWT_ALGORITHM })
    .setIssuedAt()
    .setExpirationTime(ACCESS_TOKEN_EXPIRES)
    .sign(secret);
}

export async function generateRefreshToken(user: User): Promise<string> {
  const secret = getJwtSecret();
  return new SignJWT({ ...user, type: "refresh" })
    .setProtectedHeader({ alg: JWT_ALGORITHM })
    .setIssuedAt()
    .setExpirationTime(REFRESH_TOKEN_EXPIRES)
    .sign(secret);
}

export async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    const secret = getJwtSecret();
    const { payload } = await jwtVerify(token, secret);
    return payload as unknown as TokenPayload;
  } catch (error) {
    if (!(error instanceof errors.JWTExpired)) {
      console.error(
        "JWT verification failed:",
        error instanceof Error ? error.message : "Unknown error",
      );
    }
    return null;
  }
}

export async function getUserFromSession(
  request: NextRequest,
): Promise<User | null> {
  try {
    const accessToken = request.cookies.get("cl_access_token")?.value;

    if (accessToken) {
      const payload = await verifyToken(accessToken);

      if (payload && payload.type === "access") {
        return {
          id: payload.id,
          email: payload.email,
          role: payload.role,
          name: payload.name,
          xp: payload.xp,
          level: payload.level,
          streak: payload.streak,
        };
      }
    }

    const legacyCookie = request.cookies.get("cl_session")?.value;
    if (legacyCookie) {
      try {
        const parsed = JSON.parse(legacyCookie) as User & { id?: string };
        if (parsed.id) {
          return {
            id: parsed.id,
            email: parsed.email,
            role: parsed.role || "user",
            name: parsed.name,
            xp: parsed.xp,
            level: parsed.level,
            streak: parsed.streak,
          };
        }
      } catch {
        // Invalid legacy cookie
      }
    }

    return null;
  } catch (error) {
    console.error(
      "Session validation error:",
      error instanceof Error ? error.message : "Unknown error",
    );
    return null;
  }
}

const COOKIE_CONFIG = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/",
} as const;

export function setAuthCookies(accessToken: string, refreshToken: string) {
  return {
    accessTokenCookie: {
      name: "cl_access_token",
      value: accessToken,
      options: {
        ...COOKIE_CONFIG,
        maxAge: 15 * 60,
      },
    },
    refreshTokenCookie: {
      name: "cl_refresh_token",
      value: refreshToken,
      options: {
        ...COOKIE_CONFIG,
        maxAge: 7 * 24 * 60 * 60,
      },
    },
  };
}

export function clearAuthCookies() {
  return [
    {
      name: "cl_access_token",
      value: "",
      options: { ...COOKIE_CONFIG, maxAge: 0 },
    },
    {
      name: "cl_refresh_token",
      value: "",
      options: { ...COOKIE_CONFIG, maxAge: 0 },
    },
    {
      name: "cl_session",
      value: "",
      options: { ...COOKIE_CONFIG, maxAge: 0 },
    },
  ];
}

export async function refreshAccessToken(refreshToken: string): Promise<{
  accessToken: string;
  newRefreshToken: string;
  user: User;
} | null> {
  try {
    if (await isRefreshTokenRevoked(refreshToken)) {
      return null;
    }

    const payload = await verifyToken(refreshToken);

    if (!payload || payload.type !== "refresh") {
      return null;
    }

    const user: User = {
      id: payload.id,
      email: payload.email,
      role: payload.role,
      name: payload.name,
      xp: payload.xp,
      level: payload.level,
      streak: payload.streak,
    };

    const newAccessToken = await generateAccessToken(user);
    const newRefreshToken = await generateRefreshToken(user);
    await revokeRefreshToken(refreshToken, payload.exp);

    return {
      accessToken: newAccessToken,
      newRefreshToken,
      user,
    };
  } catch (error) {
    console.error(
      "Token refresh failed:",
      error instanceof Error ? error.message : "Unknown error",
    );
    return null;
  }
}

export async function requireAdminAuth(
  request: NextRequest,
): Promise<User | null> {
  const user = await getUserFromSession(request);
  const path = request.nextUrl.pathname;

  if (!user || user.role !== "admin") {
    if (path.startsWith("/api/admin")) {
      logSecurityEvent(request, {
        category: "admin",
        action: "admin_auth_denied",
        level: "warn",
        actorId: user?.id,
        outcome: "blocked",
        details: { role: user?.role || "anonymous" },
      });
    }
    return null;
  }

  if (path.startsWith("/api/admin")) {
    logAdminAction(request, user.id, "admin_auth_granted", {
      role: user.role,
    });
  }

  return user;
}

export function isTokenExpiringSoon(payload: TokenPayload): boolean {
  const fiveMinutesFromNow = Math.floor(Date.now() / 1000) + 5 * 60;
  return payload.exp <= fiveMinutesFromNow;
}
