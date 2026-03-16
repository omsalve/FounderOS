"use client";

import { useState } from "react";
import AIChat from "./_components/AIChatPanel";
import AIPlanPanel, { type Plan } from "./_components/AIPlanPanel";

export default function AIPage() {
  const [plan, setPlan] = useState<Plan | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Page header */}
      <div className="mb-5 flex-shrink-0">
        <p
          className="mb-1 text-[10px] tracking-[0.12em] uppercase font-medium"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          Intelligence layer
        </p>
        <h1
          style={{
            fontFamily: "var(--font-head)",
            fontSize: "clamp(36px,4vw,52px)",
            lineHeight: 0.95,
            color: "#fff",
            letterSpacing: "0.01em",
          }}
        >
          AI{" "}
          <span
            style={{
              background: "linear-gradient(90deg,#3B82F6,#818CF8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            PLANNER
          </span>
        </h1>
        <p className="mt-1.5 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
          Describe any goal — get a structured Year → Month → Week → Day execution plan.
        </p>

        {/* Separator */}
        <div
          className="mt-4 h-px w-full"
          style={{ background: "linear-gradient(to right,rgba(255,255,255,0.08),rgba(255,255,255,0.03),transparent)" }}
        />
      </div>

      {/* Split layout */}
      <div className="grid flex-1 min-h-0 gap-5" style={{ gridTemplateColumns: "1fr 1fr" }}>
        <AIChat onPlanGenerated={setPlan} onLoading={setIsLoading} />
        <AIPlanPanel plan={plan} isLoading={isLoading} />
      </div>
    </div>
  );
}