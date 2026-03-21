import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth/auth.config";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY!;
const MODEL = "openai/gpt-oss-120b:free";

const SYSTEM_PROMPT = `You are an execution planning AI for FounderOS — a productivity OS for founders and builders.

When given a goal, you must respond with ONLY a valid JSON object (no markdown, no explanation, no backticks) in exactly this structure:

{
  "goal": "Short restatement of the goal (max 10 words)",
  "yearlyGoal": {
    "title": "The 12-month outcome",
    "description": "One sentence describing what success looks like"
  },
  "months": [
    {
      "month": 1,
      "title": "Month title (e.g. Foundation)",
      "milestone": "The key deliverable for this month",
      "weeks": [
        {
          "week": 1,
          "commitment": "What gets done this week",
          "tasks": ["Task 1", "Task 2", "Task 3"]
        }
      ]
    }
  ]
}

Rules:
- Always produce exactly 3 months
- Each month has exactly 2 weeks
- Each week has exactly 3 tasks
- Tasks must be specific and actionable
- No markdown formatting in any field
- Respond with ONLY the JSON object, nothing else`;

export async function POST(req: Request) {
  const session = await getServerSession(authConfig);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { message, history } = await req.json();

    // Build messages array: system prompt + prior history + new user message
    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...(history ?? []).map((m: { role: string; content: string }) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: m.content,
      })),
      { role: "user", content: message },
    ];

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://founderos.app", // optional but good practice
          "X-Title": "FounderOS",
        },
        body: JSON.stringify({
          model: MODEL,
          messages,
        }),
      }
    );

    if (!response.ok) {
      const err = await response.json().catch(() => null);
      console.error("[OpenRouter error]", response.status, err);
      return NextResponse.json(
        { error: "AI request failed" },
        { status: 500 }
      );
    }

    const result = await response.json();
    const raw = result.choices?.[0]?.message?.content ?? "";

    // Strip accidental markdown fences
    const text = raw
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    let plan = null;
    try {
      plan = JSON.parse(text);
    } catch {
      // Not valid JSON — return raw text fallback
    }

    return NextResponse.json({ text, plan });
  } catch (error) {
    console.error("AI plan error:", error);
    return NextResponse.json(
      { error: "Failed to generate plan" },
      { status: 500 }
    );
  }
}