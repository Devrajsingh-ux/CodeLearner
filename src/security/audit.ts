import type { NextRequest } from "next/server";

type SecurityLevel = "info" | "warn" | "error";

interface SecurityEvent {
  category: "auth" | "admin" | "rate-limit" | "security";
  action: string;
  level?: SecurityLevel;
  actorId?: string;
  targetId?: string;
  outcome?: "allowed" | "blocked" | "failed";
  details?: Record<string, unknown>;
}

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip") || "unknown";
}

export function logSecurityEvent(request: NextRequest, event: SecurityEvent) {
  const payload = {
    timestamp: new Date().toISOString(),
    category: event.category,
    action: event.action,
    level: event.level ?? "info",
    actorId: event.actorId ?? null,
    targetId: event.targetId ?? null,
    outcome: event.outcome ?? "allowed",
    method: request.method,
    path: request.nextUrl.pathname,
    ip: getClientIp(request),
    userAgent: request.headers.get("user-agent") || "unknown",
    details: event.details ?? {},
  };

  // Structured logs enable SIEM ingestion in production.
  const logLine = `[SECURITY_AUDIT] ${JSON.stringify(payload)}`;
  if (payload.level === "error") {
    console.error(logLine);
    return;
  }
  if (payload.level === "warn") {
    console.warn(logLine);
    return;
  }
  console.log(logLine);
}

export function logAdminAction(
  request: NextRequest,
  actorId: string,
  action: string,
  details?: Record<string, unknown>,
) {
  logSecurityEvent(request, {
    category: "admin",
    action,
    actorId,
    outcome: "allowed",
    details,
  });
}
