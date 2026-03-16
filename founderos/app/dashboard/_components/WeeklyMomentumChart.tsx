"use client";

import { motion } from "framer-motion";

type DayData = { day: string; value: number; isToday?: boolean };

type WeeklyMomentumChartProps = {
  data?: DayData[];
  totalThisWeek?: number;
};

const defaultData: DayData[] = [
  { day: "M", value: 2 },
  { day: "T", value: 4 },
  { day: "W", value: 1 },
  { day: "T", value: 5 },
  { day: "F", value: 3, isToday: true },
  { day: "S", value: 0 },
  { day: "S", value: 0 },
];

export default function WeeklyMomentumChart({ data = defaultData, totalThisWeek = 15 }: WeeklyMomentumChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value), 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut", delay: 0.1 }}
      className="flex h-full flex-col rounded-2xl backdrop-blur-xl p-5"
      style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}
    >
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div>
          <p className="text-[10px] tracking-[0.1em] uppercase font-medium mb-1" style={{ color: "rgba(255,255,255,0.35)" }}>
            Weekly momentum
          </p>
          <p className="text-sm font-semibold text-white">Tasks completed</p>
        </div>
        <div className="text-right">
          <p style={{ fontFamily: "var(--font-head)", fontSize: 30, lineHeight: 1, color: "#fff" }}>{totalThisWeek}</p>
          <p className="mt-0.5 text-[11px]" style={{ color: "rgba(255,255,255,0.35)" }}>this week</p>
        </div>
      </div>

      {/* Bars */}
      <div className="flex flex-1 items-end gap-1.5 min-h-0">
        {data.map((d, i) => {
          const pct = (d.value / maxValue) * 100;
          return (
            <div key={i} className="flex flex-1 flex-col items-center gap-1.5" style={{ height: "100%" }}>
              <div className="relative w-full flex-1 rounded-sm overflow-hidden" style={{ background: "rgba(255,255,255,0.04)", minHeight: 4 }}>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: pct > 0 ? `${pct}%` : "3px" }}
                  transition={{ duration: 0.55, delay: i * 0.045, ease: "easeOut" }}
                  className="absolute bottom-0 w-full rounded-sm"
                  style={d.isToday
                    ? { background: "linear-gradient(to top,#2563EB,#60A5FA)", boxShadow: "0 0 10px rgba(37,99,235,0.35)" }
                    : { background: "rgba(255,255,255,0.12)" }
                  }
                />
              </div>
              <span className="text-[10px]" style={{ color: d.isToday ? "#60A5FA" : "rgba(255,255,255,0.3)", fontWeight: d.isToday ? 600 : 400 }}>
                {d.day}
              </span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}