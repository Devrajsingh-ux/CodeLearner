import { NextResponse } from "next/server";

function getCspDirectives(pathname?: string): string[] {
  const isCodeEditorRoute =
    pathname?.startsWith("/learn") ||
    pathname?.startsWith("/problems") ||
    pathname?.startsWith("/api/compile");
  const isAdminRoute = pathname?.startsWith("/admin") || pathname?.startsWith("/api/admin");
  const isDevelopment = process.env.NODE_ENV !== "production";

  const scriptSrc = isCodeEditorRoute
    ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
    : isDevelopment
      ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
      : "script-src 'self' 'unsafe-inline'";

  const styleSrc = isAdminRoute
    ? "style-src 'self' 'unsafe-inline'"
    : "style-src 'self' 'unsafe-inline'";

  return [
    "default-src 'self'",
    scriptSrc,
    styleSrc,
    "img-src 'self' data: https: blob:",
    "font-src 'self' https: data:",
    "connect-src 'self' https://cloud.appwrite.io https://sgp.cloud.appwrite.io https://judge0-ce.p.rapidapi.com wss:",
    "worker-src 'self' blob:",
    "child-src 'self' blob:",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
  ];
}

export function addSecurityHeaders(response: NextResponse, pathname?: string): NextResponse {
  response.headers.set("X-DNS-Prefetch-Control", "off");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=()",
  );

  if (process.env.NODE_ENV === "production") {
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains; preload",
    );
  }

  const cspDirectives = getCspDirectives(pathname);

  response.headers.set("Content-Security-Policy", cspDirectives.join("; "));
  return response;
}
