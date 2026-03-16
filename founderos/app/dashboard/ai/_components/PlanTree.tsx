"use client";

import { motion, easeOut } from "framer-motion";
import { CheckSquare, Plus } from "lucide-react";

export type DayTask = {
  id: string;
  title: string;
  done?: boolean;
};

export type WeekCommitment = {
  id: string;
  title: string;
  tasks: DayTask[];
};

export type MonthMilestone = {
  id: string;
  title: string;
  subtitle: string;
  weeks: WeekCommitment[];
};

export type YearGoal = {
  title: string;
  subtitle: string;
  months: MonthMilestone[];
};

type PlanTreeProps = {
  plan: YearGoal;
};

const nodeVariants = {
  hidden: { opacity: 0, y: 8 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: easeOut, delay: i * 0.06 },
  }),
};

export default function PlanTree({ plan }: PlanTreeProps) {
  return (
    <div className="space-y-4">
      {/* Year Goal */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative overflow-hidden rounded-xl p-4"
        style={{
          background: "linear-gradient(135deg,rgba(37,99,235,0.18),rgba(37,99,235,0.06))",
          border: "1px solid rgba(37,99,235,0.35)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{ background: "linear-gradient(90deg,transparent,rgba(96,165,250,0.5),transparent)" }}
        />
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="mb-1 text-[9px] font-semibold tracking-[0.14em] uppercase"
               style={{ color: "rgba(96,165,250,0.6)" }}>
              Year goal
            </p>
            <p className="text-sm font-semibold text-white leading-snug">{plan.title}</p>
            <p className="mt-0.5 text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{plan.subtitle}</p>
          </div>
          <span
            className="flex-shrink-0 rounded-md px-2 py-0.5 text-[10px] font-semibold"
            style={{ background: "rgba(37,99,235,0.2)", color: "#60A5FA", border: "1px solid rgba(37,99,235,0.3)" }}
          >
            12 MO
          </span>
        </div>
      </motion.div>

      {/* Connector */}
      <div className="ml-4 flex items-center gap-2">
        <div className="w-px self-stretch" style={{ background: "rgba(37,99,235,0.25)", minHeight: 12 }} />
      </div>

      {/* Months */}
      <div className="space-y-3">
        {plan.months.map((month, mi) => (
          <motion.div
            key={month.id}
            custom={mi + 1}
            initial="hidden"
            animate="show"
            variants={nodeVariants}
          >
            {/* Month header */}
            <div className="ml-4 flex items-stretch gap-3">
              <div className="flex flex-col items-center">
                <div
                  className="h-2 w-2 flex-shrink-0 rounded-full mt-2"
                  style={{ background: "#3B82F6", boxShadow: "0 0 6px rgba(59,130,246,0.6)" }}
                />
                <div className="flex-1 w-px mt-1" style={{ background: "rgba(255,255,255,0.06)" }} />
              </div>

              <div className="flex-1 pb-2">
                <div
                  className="mb-2 rounded-xl p-3"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[9px] font-semibold tracking-[0.1em] uppercase mb-0.5"
                         style={{ color: "rgba(255,255,255,0.3)" }}>
                        Month {mi + 1}
                      </p>
                      <p className="text-sm font-medium text-white">{month.title}</p>
                      <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{month.subtitle}</p>
                    </div>
                    <span
                      className="flex-shrink-0 rounded px-2 py-0.5 text-[10px]"
                      style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.4)" }}
                    >
                      M{mi + 1}
                    </span>
                  </div>

                  {/* Weeks */}
                  {month.weeks.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {month.weeks.map((week, wi) => (
                        <motion.div
                          key={week.id}
                          custom={mi * 3 + wi + 2}
                          initial="hidden"
                          animate="show"
                          variants={nodeVariants}
                          className="rounded-lg p-2.5"
                          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
                        >
                          <p className="mb-1.5 text-[10px] font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>
                            Week {wi + 1} — {week.title}
                          </p>
                          <div className="space-y-1">
                            {week.tasks.map((task) => (
                              <div key={task.id} className="flex items-center gap-2">
                                <CheckSquare
                                  size={11}
                                  style={{ color: task.done ? "#22C55E" : "rgba(255,255,255,0.2)", flexShrink: 0 }}
                                />
                                <span
                                  className="text-[11px] leading-snug"
                                  style={{
                                    color: task.done ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.65)",
                                    textDecoration: task.done ? "line-through" : "none",
                                  }}
                                >
                                  {task.title}
                                </span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add to dashboard CTA */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        whileHover={{ y: -2, boxShadow: "0 8px 28px rgba(37,99,235,0.4)" }}
        whileTap={{ scale: 0.97 }}
        className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-medium text-white uppercase tracking-wide"
        style={{
          background: "#2563EB",
          boxShadow: "0 4px 16px rgba(37,99,235,0.3)",
          border: "none",
          cursor: "pointer",
        }}
      >
        <Plus size={14} />
        Save plan to dashboard
      </motion.button>
    </div>
  );
}