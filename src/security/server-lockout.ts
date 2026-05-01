import { createClient, type RedisClientType } from "redis";

const MAX_ATTEMPTS = 6;
const WINDOW_SECONDS = 15 * 60;
const LOCKOUT_SECONDS = 15 * 60;
const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

type AttemptState = {
  count: number;
  windowStart: number;
  lockedUntil?: number;
};

let redis: RedisClientType | null = null;
let redisReady = false;
let redisAttempts = 0;
const localStore = new Map<string, AttemptState>();

async function getRedis(): Promise<RedisClientType | null> {
  if (redisReady && redis) return redis;
  if (redisAttempts >= 2) return null;

  redisAttempts += 1;
  try {
    redis = createClient({ url: REDIS_URL }) as RedisClientType;
    redis.on("error", () => {
      redisReady = false;
    });
    await redis.connect();
    redisReady = true;
    return redis;
  } catch {
    redisReady = false;
    return null;
  }
}

function nowSeconds() {
  return Math.floor(Date.now() / 1000);
}

function localGet(identifier: string): AttemptState {
  const current = localStore.get(identifier);
  if (!current) {
    const state = { count: 0, windowStart: nowSeconds() };
    localStore.set(identifier, state);
    return state;
  }

  const now = nowSeconds();
  if (now - current.windowStart >= WINDOW_SECONDS) {
    const state = { count: 0, windowStart: now };
    localStore.set(identifier, state);
    return state;
  }

  return current;
}

export async function checkServerLockout(identifier: string): Promise<{
  blocked: boolean;
  retryAfter?: number;
}> {
  const client = await getRedis();
  const lockKey = `lockout:${identifier}:locked`;

  if (client) {
    const ttl = await client.ttl(lockKey);
    if (ttl > 0) {
      return { blocked: true, retryAfter: ttl };
    }
    return { blocked: false };
  }

  const current = localGet(identifier);
  const now = nowSeconds();
  if (current.lockedUntil && current.lockedUntil > now) {
    return { blocked: true, retryAfter: current.lockedUntil - now };
  }

  return { blocked: false };
}

export async function recordServerFailedAttempt(identifier: string): Promise<{
  locked: boolean;
  retryAfter?: number;
}> {
  const client = await getRedis();
  const countKey = `lockout:${identifier}:count`;
  const lockKey = `lockout:${identifier}:locked`;

  if (client) {
    const nextCount = await client.incr(countKey);
    if (nextCount === 1) {
      await client.expire(countKey, WINDOW_SECONDS);
    }

    if (nextCount >= MAX_ATTEMPTS) {
      await client.setEx(lockKey, LOCKOUT_SECONDS, "1");
      return { locked: true, retryAfter: LOCKOUT_SECONDS };
    }

    return { locked: false };
  }

  const current = localGet(identifier);
  current.count += 1;
  if (current.count >= MAX_ATTEMPTS) {
    current.lockedUntil = nowSeconds() + LOCKOUT_SECONDS;
    localStore.set(identifier, current);
    return { locked: true, retryAfter: LOCKOUT_SECONDS };
  }

  localStore.set(identifier, current);
  return { locked: false };
}

export async function clearServerAttempts(identifier: string): Promise<void> {
  const client = await getRedis();
  if (client) {
    await client.del(`lockout:${identifier}:count`);
    await client.del(`lockout:${identifier}:locked`);
    return;
  }

  localStore.delete(identifier);
}
