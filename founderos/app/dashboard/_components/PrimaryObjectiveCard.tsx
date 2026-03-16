"use client";

import { motion } from "framer-motion";

type Priority = "low" | "medium" | "high";

type PrimaryObjectiveCardProps = {
  title?: string;
  description?: string;
  progress?: number;
  priority?: Priority;
  dueDate?: string;
};

const priorityMap: Record<Priority, { label: string; color: string; border: string; bg: string }> = {
  low:    { label: "LOW",    color: "rgba(255,255,255,0.5)", border: "rgba(255,255,255,0.15)", bg: "rgba(255,255,255,0.06)" },
  medium: { label: "MEDIUM", color: "#F59E0B",               border: "rgba(245,158,11,0.3)",   bg: "rgba(245,158,11,0.08)"  },
  high:   { label: "HIGH",   color: "#60A5FA",               border: "rgba(96,165,250,0.3)",   bg: "rgba(37,99,235,0.12)"   },
};

export default function PrimaryObjectiveCard({
  title = "Finalize Series A Pitch Deck",
  description = "Refine the financial projections slide and update the competitive landscape analysis based on yesterday's advisor feedback.",
  progress = 60,
  priority = "high",
  dueDate = "Due Friday",
}: PrimaryObjectiveCardProps) {
  const p = priorityMap[priority];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative overflow-hidden rounded-2xl backdrop-blur-xl"
      style={{
        border: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(255,255,255,0.03)",
      }}
    >
      {/* Top gradient wash */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28"
           style={{ background: "linear-gradient(to bottom, rgba(37,99,235,0.06), transparent)" }} />

      {/* Left accent bar */}
      <div className="absolute left-0 top-0 h-full w-[3px] rounded-l-2xl"
           style={{ background: "linear-gradient(to bottom, #3B82F6, rgba(37,99,235,0.2))" }} />

      <div className="relative z-10 p-6 pl-8">
        {/* Header */}
        <div className="mb-3 flex items-start justify-between gap-4">
          <p className="text-[10px] tracking-[0.1em] uppercase font-medium"
             style={{ color: "rgba(255,255,255,0.35)" }}>
            Primary objective
          </p>
          <span className="rounded px-2 py-0.5 text-[10px] font-semibold tracking-wide"
                style={{ background: p.bg, color: p.color, border: `1px solid ${p.border}` }}>
            {p.label}
          </span>
        </div>

        {/* Title */}
        <h2 className="mb-2 leading-tight"
            style={{ fontFamily: "var(--font-head)", fontSize: 24, color: "#fff", letterSpacing: "0.02em" }}>
          {title.toUpperCase()}
        </h2>

        {/* Description */}
        <p className="mb-5 max-w-lg text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
          {description}
        </p>

        {/* Progress */}
        <div className="mb-5">
          <div className="mb-1.5 flex justify-between text-[11px]" style={{ color: "rgba(255,255,255,0.35)" }}>
            <span className="tracking-widest uppercase">Completion</span>
            <span style={{ color: "rgba(255,255,255,0.65)", fontWeight: 500 }}>{progress}%</span>
          </div>
          <div className="h-[3px] w-full rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg,#2563EB,#60A5FA)", boxShadow: "0 0 10px rgba(37,99,235,0.5)" }}
            />
          </div>
          <p className="mt-1 text-right text-[11px]" style={{ color: "rgba(255,255,255,0.3)" }}>{dueDate}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <motion.button
            whileHover={{ y: -3, boxShadow: "0 8px 28px rgba(37,99,235,0.45)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            className="flex-1 rounded-xl py-3 text-sm font-medium text-white uppercase tracking-wide"
            style={{ background: "#2563EB", boxShadow: "0 4px 16px rgba(37,99,235,0.3)", border: "none", cursor: "pointer" }}
          >
            Enter deep focus
          </motion.button>
          <motion.button
            whileHover={{ background: "rgba(255,255,255,0.06)" }}
            whileTap={{ scale: 0.96 }}
            className="rounded-xl px-4 py-3 text-sm"
            style={{ border: "1px solid rgba(255,255,255,0.08)", background: "transparent", color: "rgba(255,255,255,0.4)", cursor: "pointer" }}
          >
            •••
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}