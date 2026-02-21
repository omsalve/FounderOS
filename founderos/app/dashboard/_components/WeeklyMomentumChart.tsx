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
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="flex h-full flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 backdrop-blur-xl"
    >
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-white">
            Weekly Momentum
          </h3>
          <p className="mt-0.5 text-xs text-white/40">
            Tasks completed (last 7 days)
          </p>
        </div>

        <span className="rounded-md border border-white/[0.08] px-2 py-0.5 text-xs text-white/40">
          7d
        </span>
      </div>

      {/* Chart */}
      <div className="flex flex-1 items-end justify-between gap-2 min-h-0">
        {mockData.map((d, i) => {
          const height = (d.value / maxValue) * 100;

          return (
            <div
              key={d.day}
              className="flex flex-1 flex-col items-center gap-2"
            >
              {/* Bar */}
              <div className="relative h-full w-full rounded-md bg-white/[0.04]">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease: "easeOut" }}
                  className="absolute bottom-0 w-full rounded-md bg-gradient-to-t from-blue-600 to-blue-500 shadow-[0_0_8px_rgba(37,99,235,0.25)]"
                />
              </div>

              {/* Label */}
              <span className="text-[10px] text-white/40">{d.day}</span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
