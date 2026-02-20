import AILayout from "./_components/AILayout";
import AIGoalInput from "./_components/AIGoalInput";

import AIRoadmapPanel from "./_components/AIRoadmapPanel";

export default function AIPage() {
  return (
        <AILayout>
        {/* Two-column AI workspace */}
      <div className="grid h-full grid-cols-2 gap-6">
        
        {/* LEFT — Idea Input */}
        <div className="min-h-0">
          <AIGoalInput />
        </div>

        {/* RIGHT — Generated Plan */}
        <div className="min-h-0">
          <AIRoadmapPanel />
        </div>
      </div>
    </AILayout>
  );
}
