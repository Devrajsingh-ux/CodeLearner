const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;
const LOCKOUT_MS = 15 * 60 * 1000;
const KEY_PREFIX = "cl_rl_";

interface AttemptRecord {
  count: number;
  firstAttemptAt: number;
  lockedUntil?: number;
}

function getRecord(email: string): AttemptRecord {
  try {
    const raw = sessionStorage.getItem(KEY_PREFIX + email.toLowerCase());
    if (raw) return JSON.parse(raw) as AttemptRecord;
  } catch {}
  return { count: 0, firstAttemptAt: Date.now() };
}

function saveRecord(email: string, record: AttemptRecord) {
  try {
    sessionStorage.setItem(KEY_PREFIX + email.toLowerCase(), JSON.stringify(record));
  } catch {}
}

export function checkRateLimit(email: string): { blocked: boolean; message?: string } {
  const record = getRecord(email);
  const now = Date.now();

  if (record.lockedUntil && now < record.lockedUntil) {
    const mins = Math.ceil((record.lockedUntil - now) / 60_000);
    return {
      blocked: true,
      message: `Too many failed attempts. Try again in ${mins} minute${mins !== 1 ? "s" : ""}.`,
    };
  }

  if (now - record.firstAttemptAt > WINDOW_MS) {
    saveRecord(email, { count: 0, firstAttemptAt: now });
  }

  return { blocked: false };
}

export function recordFailedAttempt(email: string): { locked: boolean; warning?: string } {
  const record = getRecord(email);
  const now = Date.now();

  if (now - record.firstAttemptAt > WINDOW_MS) {
    record.count = 0;
    record.firstAttemptAt = now;
    record.lockedUntil = undefined;
  }

  record.count += 1;

  if (record.count >= MAX_ATTEMPTS) {
    record.lockedUntil = now + LOCKOUT_MS;
    saveRecord(email, record);
    return { locked: true };
  }

  saveRecord(email, record);
  const remaining = MAX_ATTEMPTS - record.count;
  return {
    locked: false,
    warning:
      remaining <= 2
        ? `${remaining} attempt${remaining !== 1 ? "s" : ""} left before your account is locked for 15 minutes.`
        : undefined,
  };
}

export function clearAttempts(email: string) {
  try {
    sessionStorage.removeItem(KEY_PREFIX + email.toLowerCase());
  } catch {}
}
