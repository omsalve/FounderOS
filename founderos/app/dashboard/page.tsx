import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth/auth.config";
import { prisma } from "@/lib/prisma";
import WelcomeHero from "./_components/WelcomeHero";
import PrimaryObjectiveCard from "./_components/PrimaryObjectiveCard";
import DailyExecutionList from "./_components/DailyExecutionList";
import WeeklyMomentumChart from "./_components/WeeklyMomentumChart";
import StatCard from "./_components/StatCard";

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function startOfWeek(d: Date) {
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  const mon = new Date(d);
  mon.setDate(d.getDate() + diff);
  return startOfDay(mon);
}

function dayOfQuarter(d: Date) {
  const quarterStart = new Date(
    d.getFullYear(),
    Math.floor(d.getMonth() / 3) * 3,
    1
  );
  return Math.floor((d.getTime() - quarterStart.getTime()) / 86_400_000) + 1;
}

function currentPlanWeek(planCreatedAt: Date, now: Date, maxWeek: number) {
  const daysSinceStart = Math.floor(
    (now.getTime() - planCreatedAt.getTime()) / 86_400_000
  );
  return Math.min(Math.floor(daysSinceStart / 7) + 1, maxWeek);
}

function computeStreak(completedDates: Date[]): number {
  if (completedDates.length === 0) return 0;
  const days = new Set(completedDates.map((d) => d.toISOString().slice(0, 10)));
  let streak = 0;
  const cursor = new Date();
  while (true) {
    const key = cursor.toISOString().slice(0, 10);
    if (!days.has(key)) break;
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export default async function DashboardPage() {
  const session = await getServerSession(authConfig);
  const userId = (session?.user as { id?: string })?.id;
  const name = session?.user?.name ?? "Founder";
  const now = new Date();
  const weekStart = startOfWeek(now);

  const [allTasks, weekTasks, completedThisWeekByDay, latestPlan] =
    await Promise.all([
      prisma.task.findMany({
        where: { userId },
        select: { completed: true, updatedAt: true },
      }),
      prisma.task.findMany({
        where: { userId, createdAt: { gte: weekStart } },
        select: { completed: true },
      }),
      prisma.task.findMany({
        where: { userId, completed: true, updatedAt: { gte: weekStart } },
        select: { updatedAt: true },
      }),
      prisma.plan.findFirst({
        where: { userId },
        orderBy: { createdAt: "desc" },
        include: {
          months: {
            orderBy: { month: "asc" },
            include: {
              weeks: {
                orderBy: { week: "asc" },
                include: { tasks: true },
              },
            },
          },
        },
      }),
    ]);

  const completedDates = (allTasks as { completed: boolean; updatedAt: Date }[])
    .filter((t) => t.completed)
    .map((t) => t.updatedAt);
  const streak = computeStreak(completedDates);

  const weekDone = (weekTasks as { completed: boolean }[]).filter(
    (t) => t.completed
  ).length;
  const focusPercent =
    weekTasks.length > 0
      ? Math.round((weekDone / weekTasks.length) * 100)
      : 0;

  const DAYS = ["M", "T", "W", "T", "F", "S", "S"];
  const dayCounts = Array(7).fill(0);
  (completedThisWeekByDay as { updatedAt: Date }[]).forEach(({ updatedAt }) => {
    const jsDay = updatedAt.getDay();
    dayCounts[jsDay === 0 ? 6 : jsDay - 1]++;
  });
  const todayMonIndex = now.getDay() === 0 ? 6 : now.getDay() - 1;
  const chartData = DAYS.map((day, i) => ({
    day,
    value: dayCounts[i] as number,
    isToday: i === todayMonIndex,
  }));

  type PlanType = NonNullable<typeof latestPlan>;
  type MonthType = PlanType["months"][0];
  type WeekType = MonthType["weeks"][0];
  type TaskType = WeekType["tasks"][0];

  let primaryObjective: {
    title: string;
    description: string;
    progress: number;
    dueDate: string;
  } | null = null;

  let dailyTasks: {
    id: string;
    title: string;
    completed: boolean;
    weekLabel?: string;
  }[] = [];

  if (latestPlan) {
    const allWeeks: WeekType[] = latestPlan.months.flatMap(
      (m: MonthType) => m.weeks
    );
    const maxWeek = Math.max(...allWeeks.map((w: WeekType) => w.week), 1);
    const currentWeek = currentPlanWeek(latestPlan.createdAt, now, maxWeek);
    const activeWeek = allWeeks.find((w: WeekType) => w.week === currentWeek);

    if (activeWeek) {
      dailyTasks = activeWeek.tasks.map((t: TaskType) => ({
        id: t.id,
        title: t.title,
        completed: t.completed,
        weekLabel: `Week ${activeWeek.week}: ${activeWeek.commitment}`,
      }));
    }

    const allPlanTasks: TaskType[] = allWeeks.flatMap(
      (w: WeekType) => w.tasks
    );
    const donePlanTasks = allPlanTasks.filter(
      (t: TaskType) => t.completed
    ).length;
    const progress =
      allPlanTasks.length > 0
        ? Math.round((donePlanTasks / allPlanTasks.length) * 100)
        : 0;

    const firstMonth = latestPlan.months[0] as MonthType | undefined;
    primaryObjective = {
      title: latestPlan.goal,
      description: latestPlan.yearlyGoalDescription,
      progress,
      dueDate: firstMonth ? `Month 1 · ${firstMonth.milestone}` : "",
    };
  }

  const todayDone = dailyTasks.filter((t) => t.completed).length;

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="flex-shrink-0">
        <WelcomeHero
          name={name}
          dayOfQuarter={dayOfQuarter(now)}
          streak={streak}
          focusPercent={focusPercent}
        />
      </div>

      <div className="mb-5 grid flex-shrink-0 grid-cols-3 gap-3">
        <StatCard
          label="Tasks this week"
          value={dailyTasks.length}
          sub={`${todayDone} completed`}
          delay={0}
        />
        <StatCard
          label="Focus score"
          value={`${focusPercent}%`}
          sub="tasks done this week"
          delay={0.05}
        />
        <StatCard
          label="Overall progress"
          value={primaryObjective ? `${primaryObjective.progress}%` : "—"}
          sub="plan completion"
          delay={0.1}
          accent
        />
      </div>

      <div className="grid flex-1 grid-cols-10 gap-5 overflow-hidden min-h-0">
        <div className="col-span-6 flex flex-col gap-5 overflow-hidden">
          {primaryObjective ? (
            <PrimaryObjectiveCard
              title={primaryObjective.title}
              description={primaryObjective.description}
              progress={primaryObjective.progress}
              priority="high"
              dueDate={primaryObjective.dueDate}
            />
          ) : (
            <PrimaryObjectiveCard
              title="No plan saved yet"
              description="Head to the AI Planner, generate a goal, and hit Save to see it here."
              progress={0}
              priority="low"
              dueDate="Go to AI Planner →"
            />
          )}
          <div className="flex-1 min-h-0">
            <WeeklyMomentumChart data={chartData} totalThisWeek={weekDone} />
          </div>
        </div>

        <div className="col-span-4 min-h-0 overflow-hidden">
          <DailyExecutionList tasks={dailyTasks} hasPlan={!!latestPlan} />
        </div>
      </div>
    </div>
  );
}