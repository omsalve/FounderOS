import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { prisma } from "@/lib/prisma";

// ─── POST /api/plans ──────────────────────────────────────────────────────────
// Accepts the full Plan JSON from the AI and persists the entire tree in one
// Prisma transaction: Plan → PlanMonth[] → PlanWeek[] → PlanTask[]
export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req });
    const userId = (token?.id ?? token?.sub) as string | undefined;
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    // Validate the shape coming from the AI
    const { goal, yearlyGoal, months } = body;

    if (
      typeof goal !== "string" ||
      !goal.trim() ||
      typeof yearlyGoal?.title !== "string" ||
      typeof yearlyGoal?.description !== "string" ||
      !Array.isArray(months)
    ) {
      return NextResponse.json(
        { error: "Invalid plan shape" },
        { status: 400 }
      );
    }

    // Write the full tree atomically
    const plan = await prisma.plan.create({
      data: {
        goal: goal.trim(),
        yearlyGoalTitle: yearlyGoal.title.trim(),
        yearlyGoalDescription: yearlyGoal.description.trim(),
        userId,
        months: {
          create: months.map((m: any) => ({
            month: Number(m.month),
            title: String(m.title).trim(),
            milestone: String(m.milestone).trim(),
            weeks: {
              create: (m.weeks ?? []).map((w: any) => ({
                week: Number(w.week),
                commitment: String(w.commitment).trim(),
                tasks: {
                  create: (w.tasks ?? []).map((t: string) => ({
                    title: String(t).trim(),
                  })),
                },
              })),
            },
          })),
        },
      },
      // Return the full tree so the client can confirm what was saved
      include: {
        months: {
          include: {
            weeks: {
              include: {
                tasks: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(plan, { status: 201 });
  } catch (err) {
    console.error("[POST /api/plans]", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// ─── GET /api/plans ───────────────────────────────────────────────────────────
// Returns all plans for the current user, most recent first.
// Does NOT include the full week/task tree — just enough for a list view.
export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req });
    const userId = (token?.id ?? token?.sub) as string | undefined;
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const plans = await prisma.plan.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: {
        months: {
          include: {
            weeks: {
              include: {
                tasks: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(plans);
  } catch (err) {
    console.error("[GET /api/plans]", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}