"use client";

import { motion } from "framer-motion";
import clsx from "clsx";

type Props = {
  title: string;
  meta?: string;
  priority?: "high" | "medium" | "low" | "done";
  completed?: boolean;
};

const priorityStyles = {
  high: "bg-red-500/15 text-red-400",
  medium: "bg-amber-500/15 text-amber-400",
  low: "bg-white/[0.06] text-white/50",
  done: "bg-emerald-500/15 text-emerald-400",
};

export default function TaskItem({
  title,
  meta,
  priority = "low",
  completed,
}: Props) {
  return (
    <motion.div
      whileHover={{ y: -1 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={clsx(
        "flex items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 transition-colors",
        "hover:border-white/[0.14] hover:bg-white/[0.04]",
        completed && "opacity-50"
      )}
    >
      <div className="flex items-center gap-3">
        {/* Custom checkbox */}
        <div
          className={clsx(
            "flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors",
            completed
              ? "border-blue-500 bg-blue-600"
              : "border-white/20"
          )}
        >
          {completed && (
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>

        <div>
          <p
            className={clsx(
              "text-sm text-white/90",
              completed && "line-through text-white/40"
            )}
          >
            {title}
          </p>

          {meta && (
            <p className="mt-0.5 text-xs text-white/30">{meta}</p>
          )}
        </div>
      </div>

      <span
        className={clsx(
          "shrink-0 rounded-md px-2 py-0.5 text-xs capitalize",
          priorityStyles[priority]
        )}
      >
        {priority}
      </span>
    </motion.div>
  );
}
