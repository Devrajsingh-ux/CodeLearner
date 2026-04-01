/**
 * Health check endpoint for monitoring and Docker
 * /api/health
 */

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "redis";

// Check database connectivity
async function checkDatabase() {
  try {
    // This is a lightweight check - just verify we can create an admin client
    const { createAdminClient } = await import("@/lib/appwriteServer");
    createAdminClient();
    return { status: "healthy", message: "Database connection available" };
  } catch (error) {
    return { status: "unhealthy", message: "Database connection failed" };
  }
}

// Check Redis connectivity
async function checkRedis() {
  try {
    const redisClient = createClient({
      url: process.env.REDIS_URL || 'redis://localhost:6379',
    });

    await redisClient.connect();
    await redisClient.ping();
    await redisClient.disconnect();

    return { status: "healthy", message: "Redis connection successful" };
  } catch (error) {
    return { status: "unhealthy", message: "Redis connection failed" };
  }
}

export async function GET(request: NextRequest) {
  const startTime = Date.now();

  try {
    // Run health checks
    const [dbHealth, redisHealth] = await Promise.all([
      checkDatabase(),
      checkRedis(),
    ]);

    const responseTime = Date.now() - startTime;

    // Determine overall health
    const isHealthy = dbHealth.status === "healthy" || redisHealth.status === "healthy";

    const response = {
      status: isHealthy ? "healthy" : "unhealthy",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      responseTime: `${responseTime}ms`,
      version: process.env.npm_package_version || "unknown",
      checks: {
        database: dbHealth,
        redis: redisHealth,
      },
      environment: {
        nodeVersion: process.version,
        nodeEnv: process.env.NODE_ENV,
        platform: process.platform,
      },
    };

    const statusCode = isHealthy ? 200 : 503;

    return NextResponse.json(response, {
      status: statusCode,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error("Health check failed:", error);

    return NextResponse.json(
      {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        responseTime: `${Date.now() - startTime}ms`,
        error: "Health check failed",
        version: process.env.npm_package_version || "unknown",
      },
      {
        status: 503,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Content-Type': 'application/json',
        },
      }
    );
  }
}