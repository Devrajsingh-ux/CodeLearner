import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { addSecurityHeaders } from "@/security/headers";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Skip static assets and next internals
  if (
    path.startsWith("/_next/") ||
    path.startsWith("/static/") ||
    path.includes(".")
  ) {
    return NextResponse.next();
  }

  const response = NextResponse.next();

  // Check if user has an auth cookie (basic Edge-safe check)
  const hasAuthCookie =
    request.cookies.has("cl_access_token") || request.cookies.has("cl_session");

  // Handle auth page redirects for authenticated users
  const authPages = [
    "/",
    "/login",
    "/register",
    "/verify",
    "/forgot-password",
    "/reset-password",
    "/oauth/callback",
    "/admin/login",
  ];

  if (hasAuthCookie && authPages.includes(path)) {
    return NextResponse.redirect(new URL("/screens/dashboard", request.url));
  }

  if (path === "/dashboard") {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/screens/dashboard";
    return NextResponse.redirect(redirectUrl);
  }

  if (path === "/problems") {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/screens/problems";
    return NextResponse.redirect(redirectUrl);
  }

  if (path === "/learn" || path.startsWith("/learn/")) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = path.replace(/^\/learn/, "/screens/learn");
    return NextResponse.redirect(redirectUrl);
  }

  // Handle protected page redirects for unauthenticated users
  const protectedPaths = ["/screens/dashboard", "/profile", "/screens/problems"];
  const isProtectedPath = protectedPaths.some((p) => path.startsWith(p));
  const isLessonPage = path.match(/^\/screens\/learn\/[^\/]+\/[^\/]+/);

  if (!hasAuthCookie && isLessonPage) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", path);
    return NextResponse.redirect(loginUrl);
  }

  if (!hasAuthCookie && isProtectedPath) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", path);
    return NextResponse.redirect(loginUrl);
  }


  // Handle admin route protections
  if (path.startsWith("/admin")) {
    if (path === "/admin/login" || path.startsWith("/admin/login/")) {
      return addSecurityHeaders(response, path);
    }

    if (!hasAuthCookie) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    // Note: Full admin role check happens in API routes via api-guard
  }

  return addSecurityHeaders(response, path);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|ico|woff|woff2)$).*)",
  ],
};
