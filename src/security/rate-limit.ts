import { createClient, type RedisClientType } from "redis";
import type { NextRequest } from "next/server";

const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";
const RATE_LIMIT_ENABLED = process.env.RATE_LIMIT_ENABLED !== "false";
const FAIL_OPEN = process.env.RATE_LIMIT_FAIL_OPEN === "true";

let redis: RedisClientType | null = null;
let isRedisConnected = false;
let connectionAttempts = 0;
const MAX_CONNECTION_ATTEMPTS = 3;

async function connectRedis(): Promise<boolean> {
  if (isRedisConnected && redis) {
    return true;
  }

  if (connectionAttempts >= MAX_CONNECTION_ATTEMPTS) {
    return false;
  }

  connectionAttempts += 1;

  try {
    redis = createClient({ url: REDIS_URL }) as RedisClientType;

    redis.on("error", (err) => {
      console.error("Redis error:", err.message);
      isRedisConnected = false;
    });

    redis.on("connect", () => {
      console.log("Redis connected successfully");
      isRedisConnected = true;
      connectionAttempts = 0;
    });

    redis.on("disconnect", () => {
      console.warn("Redis disconnected");
      isRedisConnected = false;
    });

    await redis.connect();
    isRedisConnected = true;
    return true;
  } catch (error) {
    console.error(
      "Redis connection failed:",
      error instanceof Error ? error.message : "Unknown error",
    );
    isRedisConnected = false;
    return false;
  }
}

if (RATE_LIMIT_ENABLED) {
  connectRedis().catch(console.error);
}

export interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
  keyGenerator?: (req: NextRequest) => string;
  skipFailedRequests?: boolean;
}

export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetTime: number;
  retryAfter?: number;
  error?: string;
}

function getClientId(request: NextRequest): string {
  const accessToken = request.cookies.get("cl_access_token")?.value;
  if (accessToken) {
    return `user:${accessToken.substring(0, 16)}`;
  }

  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded
    ? forwarded.split(",")[0].trim()
    : request.headers.get("x-real-ip") || "unknown";

  return `ip:${ip}`;
}

const memoryRateLimits = new Map<string, { count: number; windowStart: number }>();

function memoryRateLimit(clientId: string, config: RateLimitConfig): RateLimitResult {
  const now = Date.now();
  const windowStart = Math.floor(now / config.windowMs) * config.windowMs;
  const key = `${clientId}:${windowStart}`;

  if (memoryRateLimits.size > 10000) {
    const oldWindow = windowStart - config.windowMs * 2;
    for (const [k, v] of memoryRateLimits.entries()) {
      if (v.windowStart < oldWindow) {
        memoryRateLimits.delete(k);
      }
    }
  }

  const existing = memoryRateLimits.get(key);
  const count = existing ? existing.count + 1 : 1;
  memoryRateLimits.set(key, { count, windowStart });

  const resetTime = windowStart + config.windowMs;
  const remaining = Math.max(0, config.maxRequests - count);
  const allowed = count <= config.maxRequests;

  return {
    allowed,
    limit: config.maxRequests,
    remaining,
    resetTime,
    ...(allowed ? {} : { retryAfter: Math.ceil((resetTime - now) / 1000) }),
  };
}

export async function rateLimit(
  request: NextRequest,
  config: RateLimitConfig,
): Promise<RateLimitResult> {
  if (!RATE_LIMIT_ENABLED) {
    return {
      allowed: true,
      limit: config.maxRequests,
      remaining: config.maxRequests,
      resetTime: Date.now() + config.windowMs,
    };
  }

  const clientId = config.keyGenerator ? config.keyGenerator(request) : getClientId(request);

  try {
    if (!isRedisConnected) {
      await connectRedis();
    }

    if (isRedisConnected && redis) {
      const now = Date.now();
      const window = Math.floor(now / config.windowMs);
      const windowKey = `ratelimit:${clientId}:${window}`;

      const multi = redis.multi();
      multi.incr(windowKey);
      multi.expire(windowKey, Math.ceil(config.windowMs / 1000) + 1);

      const results = await multi.exec();
      const count = (results?.[0] as number) || 1;

      const resetTime = (window + 1) * config.windowMs;
      const remaining = Math.max(0, config.maxRequests - count);
      const allowed = count <= config.maxRequests;

      return {
        allowed,
        limit: config.maxRequests,
        remaining,
        resetTime,
        ...(allowed ? {} : { retryAfter: Math.ceil((resetTime - now) / 1000) }),
      };
    }

    if (FAIL_OPEN) {
      console.warn("Rate limiting: Redis unavailable, using memory fallback");
      return memoryRateLimit(clientId, config);
    }

    console.error("Rate limiting: Redis unavailable, denying request (fail-closed mode)");
    return {
      allowed: false,
      limit: config.maxRequests,
      remaining: 0,
      resetTime: Date.now() + 60000,
      retryAfter: 60,
      error: "Service temporarily unavailable. Please try again later.",
    };
  } catch (error) {
    console.error(
      "Rate limiting error:",
      error instanceof Error ? error.message : "Unknown error",
    );

    if (FAIL_OPEN) {
      return memoryRateLimit(clientId, config);
    }

    return {
      allowed: false,
      limit: config.maxRequests,
      remaining: 0,
      resetTime: Date.now() + 60000,
      retryAfter: 60,
      error: "Rate limit check failed. Please try again later.",
    };
  }
}

export function createRateLimit(config: RateLimitConfig) {
  return async (request: NextRequest) => {
    const result = await rateLimit(request, config);

    return {
      result,
      headers: {
        "X-RateLimit-Limit": config.maxRequests.toString(),
        "X-RateLimit-Remaining": result.remaining.toString(),
        "X-RateLimit-Reset": new Date(result.resetTime).toISOString(),
        ...(result.retryAfter && { "Retry-After": result.retryAfter.toString() }),
      },
    };
  };
}

export const authRateLimit = createRateLimit({
  windowMs: 15 * 60 * 1000,
  maxRequests: 5,
  keyGenerator: (req) => {
    const ip = getClientId(req);
    return `auth:${ip}`;
  },
});

export const apiRateLimit = createRateLimit({
  windowMs: 1 * 60 * 1000,
  maxRequests: 60,
});

export const compileRateLimit = createRateLimit({
  windowMs: 1 * 60 * 1000,
  maxRequests: 10,
  keyGenerator: (req) => `compile:${getClientId(req)}`,
});

export const adminRateLimit = createRateLimit({
  windowMs: 1 * 60 * 1000,
  maxRequests: 30,
});

export const uploadRateLimit = createRateLimit({
  windowMs: 5 * 60 * 1000,
  maxRequests: 5,
});

export async function checkRateLimit(
  request: NextRequest,
  type: "auth" | "api" | "compile" | "admin" | "upload",
) {
  const limiters = {
    auth: authRateLimit,
    api: apiRateLimit,
    compile: compileRateLimit,
    admin: adminRateLimit,
    upload: uploadRateLimit,
  };

  return await limiters[type](request);
}

export async function getRateLimitStatus(
  clientId: string,
  config: RateLimitConfig,
): Promise<RateLimitResult | null> {
  if (!isRedisConnected || !redis) {
    return null;
  }

  try {
    const now = Date.now();
    const window = Math.floor(now / config.windowMs);
    const windowKey = `ratelimit:${clientId}:${window}`;

    const count = await redis.get(windowKey);
    const currentCount = count ? parseInt(count, 10) : 0;

    const resetTime = (window + 1) * config.windowMs;
    const remaining = Math.max(0, config.maxRequests - currentCount);
    const allowed = currentCount < config.maxRequests;

    return {
      allowed,
      limit: config.maxRequests,
      remaining,
      resetTime,
      ...(allowed ? {} : { retryAfter: Math.ceil((resetTime - now) / 1000) }),
    };
  } catch (error) {
    console.error("Rate limit status error:", error);
    return null;
  }
}

export async function resetRateLimit(clientId: string): Promise<boolean> {
  if (!isRedisConnected || !redis) {
    return false;
  }

  try {
    const keys = await redis.keys(`ratelimit:${clientId}:*`);
    if (keys.length > 0) {
      await redis.del(keys);
    }
    return true;
  } catch (error) {
    console.error("Reset rate limit error:", error);
    return false;
  }
}
