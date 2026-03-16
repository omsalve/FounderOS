"use client";

import { motion } from "framer-motion";
import type { MonthMilestone } from "./PlanTree";

type PlanTimelineProps = {
  months: MonthMilestone[];
  totalMonths?: number;
};

export default function PlanTimeline({ months, totalMonths = 12 }: PlanTimelineProps) {
  return (
    <div
      className="mb-4 rounded-xl p-4"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      <p className="mb-3 text-[9px] font-semibold tracking-[0.14em] uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>
        12-month roadmap
      </p>

      {/* Timeline track */}
      <div className="relative">
        {/* Base track */}
        <div
          className="h-1 w-full rounded-full"
          style={{ background: "rgba(255,255,255,0.06)" }}
        />

        {/* Filled portion */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(months.length / totalMonths) * 100}%` }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="absolute top-0 h-1 rounded-full"
          style={{
            background: "linear-gradient(90deg,#2563EB,#60A5FA)",
            boxShadow: "0 0 10px rgba(37,99,235,0.5)",
          }}
        />

        {/* Month markers */}
        <div className="mt-2 flex justify-between">
          {Array.from({ length: totalMonths }).map((_, i) => {
            const isFilled = i < months.length;
            const month = months[i];
            return (
              <div key={i} className="flex flex-col items-center gap-1" style={{ width: `${100 / totalMonths}%` }}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 + i * 0.05, type: "spring", stiffness: 400, damping: 25 }}
                  className="h-1.5 w-1.5 rounded-full"
                  style={{
                    background: isFilled ? "#3B82F6" : "rgba(255,255,255,0.12)",
                    boxShadow: isFilled ? "0 0 6px rgba(59,130,246,0.5)" : "none",
                  }}
                />
                <span
                  className="text-[9px] text-center leading-tight hidden sm:block"
                  style={{ color: isFilled ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.15)" }}
                >
                  M{i + 1}
                </span>
                {month && (
                  <div
                    className="absolute mt-6 hidden lg:block"
                    style={{ maxWidth: 64, transform: "translateX(-50%)" }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-3 flex items-center justify-between text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>
        <span>{months.length} of {totalMonths} months planned</span>
        <span style={{ color: "#60A5FA" }}>{Math.round((months.length / totalMonths) * 100)}% roadmap built</span>
      </div>
    </div>
  );
}