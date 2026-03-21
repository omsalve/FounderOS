"use client";

import { motion } from "framer-motion";
import { Trash2, Check } from "lucide-react";

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
      onClick={() => onToggle(id, completed)}
      className="group flex cursor-pointer items-center gap-3 rounded-xl px-4 py-3 transition-colors"
      style={{
        border: "1px solid rgba(255,255,255,0.05)",
        background: "rgba(255,255,255,0.02)",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)")
      }
    >
      {/* Checkbox */}
      <motion.div
        animate={{
          background: completed ? "#2563EB" : "transparent",
          borderColor: completed
            ? "#2563EB"
            : "rgba(255,255,255,0.2)",
          boxShadow: completed
            ? "0 0 8px rgba(37,99,235,0.45)"
            : "none",
        }}
        transition={{ duration: 0.15 }}
        className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border"
        onClick={(e) => {
          e.stopPropagation();
          onToggle(id, completed);
        }}
      >
        {completed && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
          >
            <Check size={9} color="#fff" strokeWidth={2.5} />
          </motion.div>
        )}
      </motion.div>

      {/* Title */}
      <span
        className="flex-1 truncate text-sm transition-colors"
        style={{
          color: completed
            ? "rgba(255,255,255,0.3)"
            : "rgba(255,255,255,0.85)",
          textDecoration: completed ? "line-through" : "none",
        }}
      >
        {title}
      </span>

      {/* Delete */}
      <motion.button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(id);
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="flex-shrink-0 rounded-lg p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background: "transparent",
          border: "none",
          cursor: "pointer",
          color: "rgba(255,255,255,0.25)",
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.color = "#EF4444")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.color =
            "rgba(255,255,255,0.25)")
        }
      >
        <Trash2 size={13} />
      </motion.button>
    </motion.div>
  );
}