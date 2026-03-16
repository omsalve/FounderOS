import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth/auth.config";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

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

    const messages = [
      ...(history || []),
      { role: "user" as const, content: message },
    ];

    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 2000,
      system: SYSTEM_PROMPT,
      messages,
    });

    const text =
      response.content[0].type === "text" ? response.content[0].text : "";

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