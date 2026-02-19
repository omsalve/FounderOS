import WelcomeHero from "./_components/WelcomeHero";
import PrimaryObjectiveCard from "./_components/PrimaryObjectiveCard";
import DailyExecutionList from "./_components/DailyExecutionList";
import WeeklyMomentumChart from "./_components/WeeklyMomentumChart";

export default function DashboardPage() {
  return (
    <div className="h-full flex flex-col">
      {/* Hero — fixed height */}
      <div className="flex-shrink-0">
        <WelcomeHero />
      </div>

      {/* Main grid fills remaining space */}
      <div className="mt-6 grid flex-1 grid-cols-10 gap-6 overflow-hidden">
        {/* LEFT — 60% */}
        <div className="col-span-6 flex flex-col gap-6 overflow-hidden">
          <PrimaryObjectiveCard />

          <div className="flex-1 min-h-0">
            <WeeklyMomentumChart />
          </div>
        </div>

        {/* RIGHT — 40% FULL HEIGHT */}
        <div className="col-span-4 h-full">
          <DailyExecutionList />
        </div>
      </div>
    </div>
  );
}
