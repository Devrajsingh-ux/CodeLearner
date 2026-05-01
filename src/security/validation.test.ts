import { describe, expect, it } from "vitest";
import { loginSchema, sanitizeString, validateInput } from "@/security/validation";

describe("security validation", () => {
  it("sanitizes control characters and trims length", () => {
    const dirty = "  hello\u0000world\n";
    const out = sanitizeString(dirty, 8);
    expect(out).toBe("hellowo");
  });

  it("accepts valid login payload", () => {
    const result = validateInput(loginSchema, {
      email: "test@example.com",
      password: "StrongPass1",
    });

    expect(result.success).toBe(true);
    expect(result.data?.email).toBe("test@example.com");
  });

  it("rejects invalid login payload", () => {
    const result = validateInput(loginSchema, {
      email: "not-an-email",
      password: "123",
    });

    expect(result.success).toBe(false);
    expect((result.errors || []).length).toBeGreaterThan(0);
  });
});
