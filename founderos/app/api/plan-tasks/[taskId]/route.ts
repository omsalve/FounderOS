import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { prisma } from "@/lib/prisma";

type RouteContext = { params: Promise<{ taskId: string }> };

export async function PATCH(req: NextRequest, context: RouteContext) {
  try {
    const token = await getToken({ req });
    const userId = (token?.id ?? token?.sub) as string | undefined;
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { taskId } = await context.params;

    // Verify ownership by traversing the relation chain
    const task = await prisma.planTask.findUnique({
      where: { id: taskId },
      include: {
        week: {
          include: {
            month: {
              include: { plan: true },
            },
          },
        },
      },
    });

    if (!task || task.week.month.plan.userId !== userId) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const body = await req.json();
    const updated = await prisma.planTask.update({
      where: { id: taskId },
      data: {
        completed:
          typeof body.completed === "boolean" ? body.completed : !task.completed,
      },
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error("[PATCH /api/plan-tasks/:id]", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}