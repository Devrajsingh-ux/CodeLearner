/**
 * Multi-tier caching system for performance optimization
 * Includes in-memory LRU cache, Redis, and CDN caching strategies
 */

import { createClient, RedisClientType } from 'redis';

// Cache configuration
export interface CacheConfig {
  ttl: number; // Time to live in seconds
  maxSize?: number; // Max items in memory cache
  tags?: string[]; // Cache tags for invalidation
}

export interface CacheItem<T = any> {
  value: T;
  expiry: number;
  accessTime: number;
  tags?: string[];
}

// Proper LRU cache implementation
class MemoryCache {
  private cache = new Map<string, CacheItem>();
  private maxSize: number;

  constructor(maxSize = 1000) {
    this.maxSize = maxSize;
  }

  set<T>(key: string, value: T, config: CacheConfig): void {
    const now = Date.now();
    const expiry = now + (config.ttl * 1000);

    // If cache is full and this is a new key, make room
    if (this.cache.size >= this.maxSize && !this.cache.has(key)) {
      this.evictLRU();
    }

    // Set or update the item
    this.cache.set(key, {
      value,
      expiry,
      accessTime: now,
      tags: config.tags,
    });
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key);

    if (!item) {
      return null;
    }

    const now = Date.now();

    // Check if expired
    if (now > item.expiry) {
      this.cache.delete(key);
      return null;
    }

    // Update access time for LRU
    item.accessTime = now;
    this.cache.set(key, item);

    return item.value as T;
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  invalidateByTag(tag: string): number {
    let invalidated = 0;

    for (const [key, item] of this.cache.entries()) {
      if (item.tags && item.tags.includes(tag)) {
        this.cache.delete(key);
        invalidated++;
      }
    }

    return invalidated;
  }

  /**
   * Proper LRU eviction - removes least recently used items
   */
  private evictLRU(): void {
    if (this.cache.size === 0) {
      return;
    }

    // Clean expired items first
    const now = Date.now();
    let cleaned = 0;

    for (const [key, item] of this.cache.entries()) {
      if (now > item.expiry) {
        this.cache.delete(key);
        cleaned++;
      }
    }

    // If still too large after cleanup, evict LRU items
    if (this.cache.size >= this.maxSize) {
      // Convert to array and sort by access time (oldest first)
      const entries = Array.from(this.cache.entries())
        .sort((a, b) => a[1].accessTime - b[1].accessTime);

      // Remove oldest 25% of items
      const toDelete = Math.max(1, Math.floor(this.cache.size * 0.25));

      for (let i = 0; i < toDelete && i < entries.length; i++) {
        this.cache.delete(entries[i][0]);
      }
    }

    if (process.env.NODE_ENV === 'development') {
      console.log(`Memory cache LRU eviction: cleaned ${cleaned} expired items, size: ${this.cache.size}/${this.maxSize}`);
    }
  }

  /**
   * Get cache statistics
   */
  getStats() {
    const now = Date.now();
    let expired = 0;
    let totalAccessTime = 0;

    for (const [, item] of this.cache.entries()) {
      if (now > item.expiry) {
        expired++;
      }
      totalAccessTime += (now - item.accessTime);
    }

    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      expired,
      avgAgeMs: this.cache.size > 0 ? totalAccessTime / this.cache.size : 0,
      hitRate: this.cache.size > 0 ? ((this.cache.size - expired) / this.cache.size) : 0,
    };
  }

  /**
   * Periodic cleanup to remove expired items proactively
   */
  startPeriodicCleanup(intervalMs = 60000): NodeJS.Timeout | null {
    if (typeof window !== 'undefined') {
      // Don't run in browser
      return null;
    }

    return setInterval(() => {
      this.evictLRU();
    }, intervalMs);
  }
}

// Redis cache implementation
class RedisCache {
  private client?: RedisClientType;
  private connected = false;
  private connectionAttempts = 0;
  private readonly maxConnectionAttempts = 3;
  private reconnectTimeout: NodeJS.Timeout | null = null;
  private redisDisabled = false;

  constructor() {
    // Do not eagerly create/connect the client at module import time.
    // Creating the client and connecting is deferred until the first cache operation
    // to avoid throwing errors during build/dev when Redis is absent or when
    // the runtime environment doesn't support native Node APIs.
    this.client = undefined as unknown as RedisClientType;
    this.connected = false;
    this.connectionAttempts = 0;
    this.redisDisabled = false;
  }

  private setupEventHandlers() {
    if (!this.client) return;

    this.client.on('error', (err) => {
      if (this.redisDisabled) return; // Prevent log spam
      
      // Log the raw error for full context
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes('URL is not a constructor') || msg.includes('Socket already opened')) {
        this.redisDisabled = true;
        console.warn('Redis disabled due to compatibility issues or unrecoverable error:', msg);
      } else {
        console.error('Redis error:', msg);
      }
      this.connected = false;
    });

    this.client.on('connect', () => {
      this.connected = true;
      this.connectionAttempts = 0;
      if (process.env.NODE_ENV === 'development') {
        console.log('Redis cache connected successfully');
      }
    });

    this.client.on('disconnect', () => {
      this.connected = false;
      if (process.env.NODE_ENV === 'development' && !this.redisDisabled) {
        console.warn('Redis disconnected');
      }
    });
  }

  private async connect(): Promise<void> {
    if (this.redisDisabled) return;

    // If client is not created yet, attempt to create it now
    if (!this.client) {
      const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
      try {
        this.client = createClient({ url: redisUrl }) as RedisClientType;
        this.setupEventHandlers();
      } catch (err) {
        console.warn('Redis init failed (disabling storage):', err instanceof Error ? err.message : String(err));
        this.redisDisabled = true;
        return;
      }
    }

    if (this.connectionAttempts >= this.maxConnectionAttempts) {
      if (!this.redisDisabled) {
        console.warn('Max Redis connection attempts reached. Disabling Redis.');
        this.redisDisabled = true;
      }
      return;
    }

    this.connectionAttempts++;

    try {
      await this.client.connect();
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      
      if (msg.includes('URL is not a constructor') || msg.includes('Socket already opened')) {
         this.redisDisabled = true;
         console.warn('Redis disabled due to unrecoverable connection failure:', msg);
         return;
      }

      console.error('Redis connection failed:', msg);

      // Exponential backoff retry
      if (this.connectionAttempts < this.maxConnectionAttempts && !this.redisDisabled) {
        const delay = Math.pow(2, this.connectionAttempts) * 1000; // 2s, 4s, 8s
        this.reconnectTimeout = setTimeout(() => this.connect(), delay);
      } else if (this.connectionAttempts >= this.maxConnectionAttempts) {
        this.redisDisabled = true;
        console.warn('Max Redis connection attempts reached. Disabling Redis.');
      }
    }
  }

  async set<T>(key: string, value: T, config: CacheConfig): Promise<void> {
    if (this.redisDisabled) return;

    // Ensure client is initialized and connected. If not possible, skip.
    try {
      if (!this.connected) await this.connect();
    } catch {
      return;
    }

    if (!this.connected || !this.client) return;

    try {
      const serialized = JSON.stringify({
        value,
        tags: config.tags,
        createdAt: Date.now(),
      });

      await this.client.setEx(`cache:${key}`, config.ttl, serialized);

      // Store tags for invalidation
      if (config.tags) {
        for (const tag of config.tags) {
          await this.client.sAdd(`tag:${tag}`, key);
          await this.client.expire(`tag:${tag}`, config.ttl);
        }
      }
    } catch (error) {
      console.error('Redis cache set error:', error instanceof Error ? error.message : String(error));
    }
  }

  async get<T>(key: string): Promise<T | null> {
    if (this.redisDisabled) return null;

    try {
      if (!this.connected) await this.connect();
    } catch {
      return null;
    }

    if (!this.connected || !this.client) return null;

    try {
      const cached = await this.client.get(`cache:${key}`);

      if (!cached) {
        return null;
      }

      const parsed = JSON.parse(cached);
      return parsed.value as T;
    } catch (error) {
      console.error('Redis cache get error:', error instanceof Error ? error.message : String(error));
      return null;
    }
  }

  async delete(key: string): Promise<boolean> {
    if (this.redisDisabled) return false;

    try {
      if (!this.connected) await this.connect();
    } catch {
      return false;
    }

    if (!this.connected || !this.client) return false;

    try {
      const result = await this.client.del(`cache:${key}`);
      return result > 0;
    } catch (error) {
      console.error('Redis cache delete error:', error instanceof Error ? error.message : String(error));
      return false;
    }
  }

  async clear(): Promise<void> {
    if (this.redisDisabled) return;

    try {
      if (!this.connected) await this.connect();
    } catch {
      return;
    }

    if (!this.connected || !this.client) return;

    try {
      const keys = await this.client.keys('cache:*');
      if (keys.length > 0) {
        await this.client.del(keys);
      }
    } catch (error) {
      console.error('Redis cache clear error:', error instanceof Error ? error.message : String(error));
    }
  }

  async invalidateByTag(tag: string): Promise<number> {
    if (this.redisDisabled) return 0;

    try {
      if (!this.connected) await this.connect();
    } catch {
      return 0;
    }

    if (!this.connected || !this.client) return 0;

    try {
      const keys = await this.client.sMembers(`tag:${tag}`);
      let invalidated = 0;

      if (keys.length > 0) {
        // Use pipeline for better performance
        const pipeline = this.client.multi();

        for (const key of keys) {
          pipeline.del(`cache:${key}`);
        }
        pipeline.del(`tag:${tag}`);

        await pipeline.exec();
        invalidated = keys.length;
      }

      return invalidated;
    } catch (error) {
      console.error('Redis cache invalidation error:', error instanceof Error ? error.message : String(error));
      return 0;
    }
  }

  /**
   * Cleanup method for graceful shutdown
   */
  async disconnect(): Promise<void> {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
    }

    if (this.connected && this.client) {
      try {
        await this.client.disconnect();
      } catch (error) {
        console.error('Redis disconnect error:', error instanceof Error ? error.message : String(error));
      }
    }
  }
}

// Multi-tier cache implementation
class MultiTierCache {
  private memory: MemoryCache;
  private redis: RedisCache;
  private cleanupInterval: NodeJS.Timeout | null = null;

  constructor() {
    this.memory = new MemoryCache(500); // Smaller memory cache for efficiency
    this.redis = new RedisCache();

    // Start periodic cleanup
    this.cleanupInterval = this.memory.startPeriodicCleanup();
  }

  async set<T>(key: string, value: T, config: CacheConfig): Promise<void> {
    // Set in both tiers concurrently
    await Promise.allSettled([
      Promise.resolve(this.memory.set(key, value, config)),
      this.redis.set(key, value, config)
    ]);
  }

  async get<T>(key: string): Promise<T | null> {
    // Try memory cache first (fastest)
    let value = this.memory.get<T>(key);

    if (value !== null) {
      return value;
    }

    // Try Redis cache (second fastest)
    value = await this.redis.get<T>(key);

    if (value !== null) {
      // Backfill memory cache with shorter TTL
      this.memory.set(key, value, { ttl: 300 }); // 5 minute TTL for backfill
      return value;
    }

    return null;
  }

  async delete(key: string): Promise<boolean> {
    const [memoryDeleted, redisDeleted] = await Promise.allSettled([
      Promise.resolve(this.memory.delete(key)),
      this.redis.delete(key)
    ]);

    return (memoryDeleted.status === 'fulfilled' && memoryDeleted.value) ||
           (redisDeleted.status === 'fulfilled' && redisDeleted.value);
  }

  async clear(): Promise<void> {
    await Promise.allSettled([
      Promise.resolve(this.memory.clear()),
      this.redis.clear()
    ]);
  }

  async invalidateByTag(tag: string): Promise<number> {
    const [memoryInvalidated, redisInvalidated] = await Promise.allSettled([
      Promise.resolve(this.memory.invalidateByTag(tag)),
      this.redis.invalidateByTag(tag)
    ]);

    const memCount = memoryInvalidated.status === 'fulfilled' ? memoryInvalidated.value : 0;
    const redisCount = redisInvalidated.status === 'fulfilled' ? redisInvalidated.value : 0;

    return memCount + redisCount;
  }

  /**
   * Get cache statistics
   */
  getStats() {
    return {
      memory: this.memory.getStats(),
      redis: { connected: this.redis['connected'] }
    };
  }

  /**
   * Graceful shutdown
   */
  async shutdown(): Promise<void> {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
    await this.redis.disconnect();
  }
}

// Global cache instance
const cache = new MultiTierCache();

// Cache helper functions
export async function cacheSet<T>(key: string, value: T, ttl = 300, tags?: string[]): Promise<void> {
  await cache.set(key, value, { ttl, tags });
}

export async function cacheGet<T>(key: string): Promise<T | null> {
  return cache.get<T>(key);
}

export async function cacheDelete(key: string): Promise<boolean> {
  return cache.delete(key);
}

export async function cacheClear(): Promise<void> {
  await cache.clear();
}

export async function cacheInvalidateTag(tag: string): Promise<number> {
  return cache.invalidateByTag(tag);
}

/**
 * Get cache statistics
 */
export function getCacheStats() {
  return cache.getStats();
}

// Memoization decorator for functions
export function memoize<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  options: {
    ttl?: number;
    keyGenerator?: (...args: Parameters<T>) => string;
    tags?: string[];
  } = {}
): T {
  const { ttl = 300, keyGenerator, tags } = options;

  return (async (...args: Parameters<T>) => {
    const key = keyGenerator ? keyGenerator(...args) : `memoize:${fn.name}:${JSON.stringify(args)}`;

    // Try to get cached result
    const cached = await cacheGet(key);
    if (cached !== null) {
      return cached;
    }

    // Execute function and cache result
    const result = await fn(...args);
    await cacheSet(key, result, ttl, tags);

    return result;
  }) as T;
}

// Common cache configurations
export const CacheProfiles = {
  // Static data that rarely changes
  STATIC: { ttl: 3600, tags: ['static'] }, // 1 hour

  // User-specific data
  USER: { ttl: 300, tags: ['user'] }, // 5 minutes

  // Course catalog data
  COURSES: { ttl: 1800, tags: ['courses'] }, // 30 minutes

  // API responses
  API: { ttl: 60, tags: ['api'] }, // 1 minute

  // Database queries
  DATABASE: { ttl: 600, tags: ['database'] }, // 10 minutes

  // Session data
  SESSION: { ttl: 900, tags: ['session'] }, // 15 minutes
} as const;

// Cache warming functions
export async function warmUpCache() {
  if (process.env.NODE_ENV === 'development') {
    console.log('Starting cache warm-up...');
  }

  try {
    // Pre-load commonly accessed data
    // This would be called during application startup

    // Example: Pre-load popular courses
    // const popularCourses = await getPopularCourses();
    // await cacheSet('popular-courses', popularCourses, CacheProfiles.COURSES.ttl, CacheProfiles.COURSES.tags);

    if (process.env.NODE_ENV === 'development') {
      console.log('Cache warm-up completed');
    }
  } catch (error) {
    console.error('Cache warm-up failed:', error);
  }
}

// Graceful shutdown helper
export async function shutdownCache(): Promise<void> {
  await cache.shutdown();
}