import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { prisma } from "@/lib/prisma";

type RouteContext = { params: Promise<{ planId: string }> };

export async function GET(req: NextRequest, context: RouteContext) {
  try {
    const token = await getToken({ req });
    const userId = (token?.id ?? token?.sub) as string | undefined;
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { planId } = await context.params;

    const plan = await prisma.plan.findUnique({
      where: { id: planId },
      include: {
        months: {
          orderBy: { month: "asc" },
          include: {
            weeks: {
              orderBy: { week: "asc" },
              include: {
                tasks: true,
              },
            },
          },
        },
      },
    });

    if (!plan || plan.userId !== userId) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(plan);
  } catch (err) {
    console.error("[GET /api/plans/:id]", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}