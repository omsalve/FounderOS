import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth/auth.config";
import WelcomeHero from "./_components/WelcomeHero";
import PrimaryObjectiveCard from "./_components/PrimaryObjectiveCard";
import DailyExecutionList from "./_components/DailyExecutionList";
import WeeklyMomentumChart from "./_components/WeeklyMomentumChart";
import StatCard from "./_components/StatCard";

export default async function DashboardPage() {
  const session = await getServerSession(authConfig);
  const name = session?.user?.name ?? "Founder";

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Welcome */}
      <div className="flex-shrink-0">
        <WelcomeHero name={name} dayOfQuarter={76} streak={14} focusPercent={85} />
      </div>

      {/* Stats row */}
      <div className="mb-5 grid flex-shrink-0 grid-cols-3 gap-3">
        <StatCard label="Tasks today"  value="8"   sub="3 completed"        delay={0}    />
        <StatCard label="Focus score"  value="85%" sub="+12% vs last week"   delay={0.05} />
        <StatCard label="This week"    value="24"  sub="tasks completed"     delay={0.10} accent />
      </div>

      {/* Main grid */}
      <div className="grid flex-1 grid-cols-10 gap-5 overflow-hidden min-h-0">
        {/* LEFT 60% */}
        <div className="col-span-6 flex flex-col gap-5 overflow-hidden">
          <PrimaryObjectiveCard
            title="Finalize Series A Pitch Deck"
            description="Refine the financial projections slide and update the competitive landscape analysis based on yesterday's advisor feedback."
            progress={60}
            priority="high"
            dueDate="Due Friday"
          />
          <div className="flex-1 min-h-0">
            <WeeklyMomentumChart totalThisWeek={15} />
          </div>
        </div>

        {/* RIGHT 40% */}
        <div className="col-span-4 min-h-0 overflow-hidden">
          <DailyExecutionList />
        </div>
      </div>
    </div>
  );
}