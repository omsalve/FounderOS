"use client";

import { motion } from "framer-motion";

type DayData = {
  day: string;
  value: number;
};

const mockData: DayData[] = [
  { day: "Mon", value: 2 },
  { day: "Tue", value: 4 },
  { day: "Wed", value: 1 },
  { day: "Thu", value: 5 },
  { day: "Fri", value: 3 },
  { day: "Sat", value: 0 },
  { day: "Sun", value: 2 },
];

export default function WeeklyMomentumChart() {
  const maxValue = Math.max(...mockData.map((d) => d.value), 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
    >
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-white">
            Weekly Momentum
          </h3>
          <p className="text-xs text-white/50">
            Tasks completed (last 7 days)
          </p>
        </div>

        <div className="text-xs text-white/40">7d</div>
      </div>

      {/* Chart */}
      <div className="flex items-end justify-between gap-2 h-32">
        {mockData.map((d) => {
          const height = (d.value / maxValue) * 100;

          return (
            <div
              key={d.day}
              className="flex flex-1 flex-col items-center gap-2"
            >
              {/* Bar */}
              <div className="relative h-full w-full rounded-md bg-white/5">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute bottom-0 w-full rounded-md bg-blue-600"
                />
              </div>

              {/* Label */}
              <span className="text-[10px] text-white/50">{d.day}</span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
