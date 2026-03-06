import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// ── Judge0 CE public API (no auth required, rate-limited) ───────────────────
// For production: self-host Judge0 or use RapidAPI key via JUDGE0_API_KEY env.
const JUDGE0_BASE =
  process.env.JUDGE0_API_URL ?? "https://judge0-ce.p.rapidapi.com";
const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY ?? "";

const BodySchema = z.object({
  code: z.string().min(1).max(65_536),
  languageId: z.number().int().min(1).max(200),
});

interface Judge0Submission {
  token: string;
}

interface Judge0Result {
  stdout: string | null;
  stderr: string | null;
  compile_output: string | null;
  status: { id: number; description: string };
}

async function submit(
  sourceCode: string,
  languageId: number,
): Promise<{ output: string; stderr: string; status: string }> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
  };
  if (JUDGE0_API_KEY) headers["X-RapidAPI-Key"] = JUDGE0_API_KEY;

  // Create submission
  const createRes = await fetch(`${JUDGE0_BASE}/submissions?base64_encoded=false&wait=false`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      source_code: sourceCode,
      language_id: languageId,
      stdin: "",
    }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!createRes.ok) {
    const text = await createRes.text();
    throw new Error(`Judge0 submit failed: ${createRes.status} ${text}`);
  }

  const { token } = (await createRes.json()) as Judge0Submission;

  // Poll until done (max 15 attempts × 600 ms = 9 s)
  for (let i = 0; i < 15; i++) {
    await new Promise((r) => setTimeout(r, 600));
    const pollRes = await fetch(
      `${JUDGE0_BASE}/submissions/${token}?base64_encoded=false&fields=stdout,stderr,compile_output,status`,
      { headers, signal: AbortSignal.timeout(8_000) },
    );
    if (!pollRes.ok) continue;
    const result = (await pollRes.json()) as Judge0Result;

    // status.id 1 = In Queue, 2 = Processing
    if (result.status.id <= 2) continue;

    const output =
      result.stdout ?? result.compile_output ?? "(no output)";
    const stderr = result.stderr ?? "";
    return { output, stderr, status: result.status.description };
  }

  throw new Error("Execution timed out. Please try again.");
}

export async function POST(req: NextRequest) {
  // Rate limit check: rely on edge middleware for heavy traffic
  const parse = BodySchema.safeParse(await req.json());
  if (!parse.success) {
    return NextResponse.json(
      { error: "Invalid request", details: parse.error.flatten() },
      { status: 400 },
    );
  }

  const { code, languageId } = parse.data;

  try {
    const result = await submit(code, languageId);
    return NextResponse.json(result);
  } catch (e) {
    const message =
      e instanceof Error ? e.message : "Compilation service error";
    return NextResponse.json(
      {
        output: "",
        stderr: `❌ ${message}\n\nNote: Multi-language server compilation requires a Judge0 API key.\nSet JUDGE0_API_KEY and JUDGE0_API_URL in your .env.local to enable it.\n\nJavaScript and TypeScript run client-side without any configuration.`,
        status: "Error",
      },
      { status: 200 }, // Return 200 so the client shows the message gracefully
    );
  }
}
