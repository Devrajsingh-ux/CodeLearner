/**
 * Secure JWT-based authentication system
 * Replaces the unsafe unsigned JSON cookies
 */

import { SignJWT, jwtVerify, errors } from 'jose';
import { NextRequest } from 'next/server';

// Cache the encoded JWT secret to avoid re-encoding on every operation
let _cachedJwtSecret: Uint8Array | null = null;

/**
 * Get JWT secret from environment with caching for performance.
 * CRITICAL: JWT_SECRET must be set in production.
 */
function getJwtSecret(): Uint8Array {
  // Return cached secret if available
  if (_cachedJwtSecret) {
    return _cachedJwtSecret;
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('CRITICAL: JWT_SECRET environment variable is not set. This is required for secure authentication.');
    }
    // Development fallback - DO NOT use in production
    console.warn('WARNING: Using default JWT secret. Set JWT_SECRET in production!');
    _cachedJwtSecret = new TextEncoder().encode('dev-only-secret-change-in-production-min-32-chars');
    return _cachedJwtSecret;
  }

  // Validate secret strength
  if (secret.length < 32) {
    throw new Error('JWT_SECRET must be at least 32 characters long for security.');
  }

  // Cache the encoded secret for performance
  _cachedJwtSecret = new TextEncoder().encode(secret);
  return _cachedJwtSecret;
}

const JWT_ALGORITHM = 'HS256';
const ACCESS_TOKEN_EXPIRES = '15m'; // 15 minutes
const REFRESH_TOKEN_EXPIRES = '7d'; // 7 days

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
  type: 'access' | 'refresh';
  iat: number;
  exp: number;
}

/**
 * Generate secure JWT access token
 */
export async function generateAccessToken(user: User): Promise<string> {
  const secret = getJwtSecret();
  return new SignJWT({ ...user, type: 'access' })
    .setProtectedHeader({ alg: JWT_ALGORITHM })
    .setIssuedAt()
    .setExpirationTime(ACCESS_TOKEN_EXPIRES)
    .sign(secret);
}

/**
 * Generate secure JWT refresh token
 */
export async function generateRefreshToken(user: User): Promise<string> {
  const secret = getJwtSecret();
  return new SignJWT({ ...user, type: 'refresh' })
    .setProtectedHeader({ alg: JWT_ALGORITHM })
    .setIssuedAt()
    .setExpirationTime(REFRESH_TOKEN_EXPIRES)
    .sign(secret);
}

/**
 * Verify and decode JWT token
 */
export async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    const secret = getJwtSecret();
    const { payload } = await jwtVerify(token, secret);
    return payload as TokenPayload;
  } catch (error) {
    // Only log non-expiration errors (expiration is expected)
    if (!(error instanceof errors.JWTExpired)) {
      console.error('JWT verification failed:', error instanceof Error ? error.message : 'Unknown error');
    }
    return null;
  }
}

/**
 * Get user from request cookies (secure version)
 * Supports both new JWT tokens and legacy unsigned cookies for migration
 */
export async function getUserFromSession(request: NextRequest): Promise<User | null> {
  try {
    // First try new JWT-based auth
    const accessToken = request.cookies.get('cl_access_token')?.value;

    if (accessToken) {
      const payload = await verifyToken(accessToken);

      if (payload && payload.type === 'access') {
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

    // Fallback to legacy cookie during migration period
    const legacyCookie = request.cookies.get('cl_session')?.value;
    if (legacyCookie) {
      try {
        const parsed = JSON.parse(legacyCookie) as User & { id?: string };
        if (parsed.id) {
          return {
            id: parsed.id,
            email: parsed.email,
            role: parsed.role || 'user',
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
    console.error('Session validation error:', error instanceof Error ? error.message : 'Unknown error');
    return null;
  }
}

// Shared cookie configuration to eliminate duplication
const COOKIE_CONFIG = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  path: '/',
} as const;

/**
 * Set secure authentication cookies
 */
export function setAuthCookies(accessToken: string, refreshToken: string) {
  return {
    accessTokenCookie: {
      name: 'cl_access_token',
      value: accessToken,
      options: {
        ...COOKIE_CONFIG,
        maxAge: 15 * 60, // 15 minutes
      },
    },
    refreshTokenCookie: {
      name: 'cl_refresh_token',
      value: refreshToken,
      options: {
        ...COOKIE_CONFIG,
        maxAge: 7 * 24 * 60 * 60, // 7 days
      },
    },
  };
}

/**
 * Clear authentication cookies
 */
export function clearAuthCookies() {
  return [
    {
      name: 'cl_access_token',
      value: '',
      options: { ...COOKIE_CONFIG, maxAge: 0 },
    },
    {
      name: 'cl_refresh_token',
      value: '',
      options: { ...COOKIE_CONFIG, maxAge: 0 },
    },
    {
      name: 'cl_session', // Clear old unsafe cookie
      value: '',
      options: { ...COOKIE_CONFIG, maxAge: 0 },
    },
  ];
}

/**
 * Refresh access token using refresh token
 * Implements token rotation for security
 */
export async function refreshAccessToken(refreshToken: string): Promise<{
  accessToken: string;
  newRefreshToken: string;
  user: User;
} | null> {
  try {
    const payload = await verifyToken(refreshToken);

    if (!payload || payload.type !== 'refresh') {
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

    // Generate new tokens (rotation for security)
    const newAccessToken = await generateAccessToken(user);
    const newRefreshToken = await generateRefreshToken(user);

    return {
      accessToken: newAccessToken,
      newRefreshToken,
      user,
    };
  } catch (error) {
    console.error('Token refresh failed:', error instanceof Error ? error.message : 'Unknown error');
    return null;
  }
}

/**
 * Validate admin role from token
 */
export async function requireAdminAuth(request: NextRequest): Promise<User | null> {
  const user = await getUserFromSession(request);

  if (!user || user.role !== 'admin') {
    return null;
  }

  return user;
}

/**
 * Check if a token is about to expire (within 5 minutes)
 */
export function isTokenExpiringSoon(payload: TokenPayload): boolean {
  const fiveMinutesFromNow = Math.floor(Date.now() / 1000) + 5 * 60;
  return payload.exp <= fiveMinutesFromNow;
}