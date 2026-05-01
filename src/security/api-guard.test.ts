import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { validateApiBody } from "@/security/api-guard";
import { enrollmentPostSchema } from "@/security/validation";

describe("api guard helpers", () => {
  it("returns success for valid schema body", () => {
    const body = {
      courseId: "c_1",
      courseSlug: "react",
      courseTitle: "React",
    };

    const result = validateApiBody(enrollmentPostSchema, body);
    expect(result.ok).toBe(true);
  });

  it("returns response for invalid schema body", () => {
    const body = {
      courseId: "",
      courseSlug: "",
      courseTitle: "",
    };

    const result = validateApiBody(enrollmentPostSchema, body);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.response.status).toBe(400);
    }
  });

  it("builds next request for guard-level tests", () => {
    const request = new NextRequest("https://example.com/api/enroll", {
      method: "POST",
      headers: {
        "x-csrf-token": "token123",
      },
    });

    expect(request.method).toBe("POST");
  });
});
