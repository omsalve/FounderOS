"use client";

import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import clsx from "clsx";

interface Props {
  id: string;
  title: string;
  completed: boolean;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

export default function TaskItem({
  id,
  title,
  completed,
  onToggle,
  onDelete,
}: Props) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -12 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      whileHover={{ y: -1 }}
      className={clsx(
        "group flex items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 transition-colors",
        "hover:border-white/[0.14] hover:bg-white/[0.04]",
        completed && "opacity-50"
      )}
    >
      <div className="flex items-center gap-3">
        {/* Custom checkbox */}
        <button
          type="button"
          onClick={() => onToggle(id, completed)}
          className={clsx(
            "flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center rounded border transition-colors",
            completed
              ? "border-blue-500 bg-blue-600"
              : "border-white/20 hover:border-white/40"
          )}
        >
          {completed && (
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>

        <p
          className={clsx(
            "text-sm text-white/90",
            completed && "line-through text-white/40"
          )}
        >
          {title}
        </p>
      </div>

      <button
        type="button"
        onClick={() => onDelete(id)}
        className="shrink-0 rounded-md p-1.5 text-white/0 transition-colors group-hover:text-white/30 hover:!text-red-400"
      >
        <Trash2 size={14} />
      </button>
    </motion.div>
  );
}
