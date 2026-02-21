"use client";

import { motion } from "framer-motion";

type PrimaryObjectiveCardProps = {
  title?: string;
  description?: string;
  progress?: number; // 0–100
  priority?: "low" | "medium" | "high";
};

export default function PrimaryObjectiveCard({
  title = "Finalize Series A Pitch Deck",
  description = "Refine the financial projections slide and update the competitive landscape analysis based on yesterday's advisor feedback.",
  progress = 60,
  priority = "high",
}: PrimaryObjectiveCardProps) {
  const priorityColor = {
    low: "text-white/50 border-white/20",
    medium: "text-yellow-400 border-yellow-400/30",
    high: "text-blue-400 border-blue-400/30",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-xl transition-colors duration-200 hover:border-white/[0.12]"
    >
      {/* Inner top gradient */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-blue-600/[0.04] to-transparent" />

      {/* Header */}
      <div className="relative z-10 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs tracking-widest text-white/40">
            PRIMARY OBJECTIVE
          </p>

          <h2 className="mt-3 text-2xl font-semibold tracking-tight">
            {title}
          </h2>

          <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/50">
            {description}
          </p>
        </div>

        {/* Priority badge */}
        <div
          className={`shrink-0 rounded-md border px-3 py-1 text-xs tracking-wide ${
            priorityColor[priority]
          }`}
        >
          {priority.toUpperCase()}
        </div>
      </div>

      {/* Progress section */}
      <div className="relative z-10 mt-6">
        <div className="mb-2 flex items-center justify-between text-xs text-white/40">
          <span className="tracking-widest">COMPLETION</span>
          <span className="text-white/70">{progress}%</span>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 w-full rounded-full bg-white/[0.08]">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-full rounded-full bg-blue-600 shadow-[0_0_12px_rgba(37,99,235,0.4)]"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="relative z-10 mt-6 flex items-center gap-3">
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="flex-1 rounded-xl bg-blue-600 py-3 text-sm font-medium text-white shadow-[0_4px_16px_rgba(37,99,235,0.3)] transition-shadow hover:shadow-[0_6px_24px_rgba(37,99,235,0.4)]"
        >
          ENTER DEEP FOCUS
        </motion.button>

        {/* overflow (future menu) */}
        <button className="rounded-xl border border-white/[0.08] px-4 py-3 text-white/40 transition-colors hover:border-white/15 hover:text-white/70">
          •••
        </button>
      </div>
    </motion.div>
  );
}
