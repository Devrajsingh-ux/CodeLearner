import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUserFromSession } from "@/lib/auth";
import { checkRateLimit } from "@/lib/rate-limit";

/**
 * Global middleware for authentication, rate limiting, and security headers.
 * Applies to all routes based on the matcher configuration.
 */
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isApiRoute = path.startsWith("/api/");

  // Skip for static assets
  if (
    path.startsWith("/_next/") ||
    path.startsWith("/static/") ||
    path.includes(".") // Files with extensions
  ) {
    return NextResponse.next();
  }

  let response = NextResponse.next();

  // Rate limiting for API routes
  if (isApiRoute) {
    // Skip rate limiting during local development to avoid denying requests
    // when Redis or other infra isn't available.
    if (process.env.NODE_ENV !== 'production') {
      return addSecurityHeaders(response);
    }
    // Skip rate limiting for health check
    if (path === "/api/health") {
      return addSecurityHeaders(response);
    }

    let rateLimitType: 'auth' | 'api' | 'compile' | 'admin' | 'upload' = 'api';

    if (path.startsWith("/api/auth/")) {
      rateLimitType = 'auth';
    } else if (path.startsWith("/api/compile")) {
      rateLimitType = 'compile';
    } else if (path.startsWith("/api/admin/")) {
      rateLimitType = 'admin';
    } else if (path.includes("upload") || path.includes("import")) {
      rateLimitType = 'upload';
    }

    try {
      const { result, headers } = await checkRateLimit(request, rateLimitType);

      if (!result.allowed) {
        const errorResponse = NextResponse.json(
          {
            error: "Too many requests",
            message: result.error || `Rate limit exceeded. Try again in ${result.retryAfter} seconds.`,
            retryAfter: result.retryAfter,
          },
          { status: 429 }
        );

        Object.entries(headers).forEach(([key, value]) => {
          errorResponse.headers.set(key, value);
        });

        return addSecurityHeaders(errorResponse);
      }

      // Add rate limit headers to successful responses
      Object.entries(headers).forEach(([key, value]) => {
        response.headers.set(key, value);
      });
    } catch (error) {
      console.error("Rate limiting error:", error instanceof Error ? error.message : 'Unknown error');
      // Continue without rate limiting on error, but log it
    }

    return addSecurityHeaders(response);
  }

  // Authentication checks for client-side routes
  const user = await getUserFromSession(request);

  // Auth pages - redirect logged-in users to dashboard
  const authPages = ["/", "/login", "/register", "/verify", "/forgot-password", "/reset-password", "/oauth/callback", "/admin/login"];
  if (user && authPages.includes(path)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Protected paths - redirect unauthenticated users to home
  const protectedPaths = ["/dashboard", "/profile", "/problems"];
  const isProtectedPath = protectedPaths.some((p) => path.startsWith(p));
  
  // Lesson pages require authentication (but not the main /learn browse page)
  const isLessonPage = path.match(/^\/learn\/[^\/]+\/[^\/]+/);
  if (!user && isLessonPage) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", path);
    return NextResponse.redirect(loginUrl);
  }

  if (!user && isProtectedPath) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", path);
    return NextResponse.redirect(loginUrl);
  }

  // Admin route protection
  if (path.startsWith("/admin")) {
    // Allow the admin login page itself through (avoid redirect loop for unauthenticated users)
    if (path === "/admin/login" || path.startsWith("/admin/login/")) {
      return addSecurityHeaders(response);
    }

    if (!user) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    if (user.role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return addSecurityHeaders(response);
}

/**
 * Add security headers to response
 */
function addSecurityHeaders(response: NextResponse): NextResponse {
  // Core security headers
  response.headers.set('X-DNS-Prefetch-Control', 'off');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');

  // HSTS - only in production
  if (process.env.NODE_ENV === 'production') {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains; preload'
    );
  }

  // Content Security Policy
  const cspDirectives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Monaco Editor needs unsafe-eval
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https: blob:",
    "font-src 'self' https: data:",
    "connect-src 'self' https://cloud.appwrite.io https://sgp.cloud.appwrite.io https://judge0-ce.p.rapidapi.com wss:",
    "worker-src 'self' blob:", // Monaco Editor workers
    "child-src 'self' blob:", // Monaco Editor workers
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
  ];

  response.headers.set('Content-Security-Policy', cspDirectives.join('; '));

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - Static assets (.png, .jpg, .svg, .ico, .woff, .woff2)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|ico|woff|woff2)$).*)',
  ],
};
