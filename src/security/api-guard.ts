import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { z } from "zod";
import { getUserFromSession, type User } from "@/security/auth";
import { validateInput } from "@/security/validation";

type GuardOptions = {
  requireAdmin?: boolean;
  enforceCsrf?: boolean;
};

type GuardSuccess = { ok: true; user: User };
type GuardFailure = { ok: false; response: NextResponse };

function isMutatingMethod(method: string): boolean {
  return method === "POST" || method === "PUT" || method === "PATCH" || method === "DELETE";
}

function csrfInvalid(request: NextRequest): boolean {
  const cookieToken = request.cookies.get("cl_csrf_token")?.value;
  const headerToken = request.headers.get("x-csrf-token");
  if (!cookieToken || !headerToken) return true;
  return cookieToken !== headerToken;
}

export async function requireApiUser(
  request: NextRequest,
  options: GuardOptions = {},
): Promise<GuardSuccess | GuardFailure> {
  const user = await getUserFromSession(request);
  if (!user) {
    return {
      ok: false,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  if (options.requireAdmin && user.role !== "admin") {
    return {
      ok: false,
      response: NextResponse.json({ error: "Forbidden" }, { status: 403 }),
    };
  }

  // Enforce CSRF on mutating routes only in production to avoid local workflow breakage.
  if (
    options.enforceCsrf &&
    process.env.NODE_ENV === "production" &&
    isMutatingMethod(request.method) &&
    csrfInvalid(request)
  ) {
    return {
      ok: false,
      response: NextResponse.json({ error: "CSRF validation failed" }, { status: 403 }),
    };
  }

  return { ok: true, user };
}

export function validateApiBody<T>(schema: z.ZodSchema<T>, body: unknown):
  | { ok: true; data: T }
  | { ok: false; response: NextResponse } {
  const result = validateInput(schema, body);
  if (!result.success || !result.data) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Invalid input", details: result.errors || ["Validation failed"] },
        { status: 400 },
      ),
    };
  }

  return { ok: true, data: result.data };
}
