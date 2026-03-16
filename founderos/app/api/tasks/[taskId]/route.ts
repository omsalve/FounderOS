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

    const task = await prisma.task.findUnique({ where: { id: taskId } });
    if (!task || task.userId !== userId) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const body = await req.json();
    const data: { title?: string; completed?: boolean } = {};

    if (typeof body.title === "string") {
      const trimmed = body.title.trim();
      if (trimmed) data.title = trimmed;
    }
    if (typeof body.completed === "boolean") {
      data.completed = body.completed;
    }

    const updated = await prisma.task.update({
      where: { id: taskId },
      data,
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error("[PATCH /api/tasks/:id]", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, context: RouteContext) {
  try {
    const token = await getToken({ req });
    const userId = (token?.id ?? token?.sub) as string | undefined;
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { taskId } = await context.params;

    const task = await prisma.task.findUnique({ where: { id: taskId } });
    if (!task || task.userId !== userId) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await prisma.task.delete({ where: { id: taskId } });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[DELETE /api/tasks/:id]", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
