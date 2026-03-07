/**
 * Next.js Proxy (Edge Middleware) — applied to every non-static route.
 * File renamed from middleware.ts → proxy.ts for Next.js 16 compatibility.
 *
 * Injects security headers on every response:
 *   • Content-Security-Policy  (CSP)
 *   • X-Frame-Options          (clickjacking protection)
 *   • X-Content-Type-Options   (MIME-sniffing protection)
 *   • Referrer-Policy
 *   • Permissions-Policy
 *   • X-XSS-Protection         (legacy browsers)
 *   • Strict-Transport-Security (HSTS — production only)
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Content-Security-Policy
// 'unsafe-inline' + 'unsafe-eval' are needed for Monaco Editor / React Dev Tools.
// Tighten further in production by removing 'unsafe-eval' once Monaco is
// configured with a Web Worker URL / nonce approach.
function buildCsp(): string {
  // Derive the Appwrite origin from the env var so CSP stays in sync
  const appwriteEndpoint =
    process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ?? "https://sgp.cloud.appwrite.io/v1";
  const appwriteOrigin = new URL(appwriteEndpoint).origin;
  const appwriteWs = appwriteOrigin.replace(/^https/, "wss");

  return [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: blob: https:",
    // Appwrite endpoint dynamically whitelisted
    `connect-src 'self' ${appwriteOrigin} ${appwriteWs}`,
    "worker-src 'self' blob:",    // Monaco Web Workers
    "frame-src 'none'",
    "frame-ancestors 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "upgrade-insecure-requests",
  ].join("; ");
}

export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  response.headers.set("Content-Security-Policy", buildCsp());
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  );
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Cross-Origin-Opener-Policy", "same-origin");
  response.headers.set("Cross-Origin-Resource-Policy", "same-origin");

  // HSTS — only in production to avoid breaking local HTTP dev
  if (process.env.NODE_ENV === "production") {
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=63072000; includeSubDomains; preload",
    );
  }

  return response;
}

// Apply to all pages/API routes; skip static assets
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public/).*)"],
};
