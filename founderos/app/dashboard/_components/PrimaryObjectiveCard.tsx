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
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl"
    >
      {/* subtle glow */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-blue-600/5 blur-2xl" />

      {/* Header */}
      <div className="relative z-10 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs tracking-widest text-white/40">
            PRIMARY OBJECTIVE
          </p>

          <h2 className="mt-3 text-2xl font-semibold tracking-tight">
            {title}
          </h2>

          <p className="mt-3 max-w-xl text-sm text-white/50">
            {description}
          </p>
        </div>

        {/* Priority badge */}
        <div
          className={`h-fit rounded-md border px-3 py-1 text-xs tracking-wide ${
            priorityColor[priority]
          }`}
        >
          {priority.toUpperCase()} PRIORITY
        </div>
      </div>

      {/* Progress section */}
      <div className="relative z-10 mt-8">
        <div className="mb-2 flex items-center justify-between text-xs text-white/40">
          <span>COMPLETION STATUS</span>
          <span className="text-white/70">{progress}%</span>
        </div>

        {/* Progress bar */}
        <div className="h-2 w-full rounded-full bg-white/10">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-full rounded-full bg-blue-600"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="relative z-10 mt-8 flex items-center gap-3">
        <motion.button
          whileHover={{ y: -3, scale: 1.01 }}
          whileTap={{ y: -1, scale: 0.98 }}
          transition={{
            y: { type: "spring", stiffness: 180, damping: 18 },
            scale: { type: "spring", stiffness: 220, damping: 20 },
          }}
          className="flex-1 rounded-lg bg-blue-600 py-3 text-sm font-medium text-white"
        >
          ENTER DEEP FOCUS
        </motion.button>

        {/* overflow (future menu) */}
        <button className="rounded-lg border border-white/15 px-4 py-3 text-white/60 hover:text-white">
          •••
        </button>
      </div>
    </motion.div>
  );
}
