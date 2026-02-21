"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Plus, CalendarOff } from "lucide-react";

export type DailyTask = {
  id: string;
  title: string;
  time?: string;
  completed?: boolean;
};

type DailyExecutionPanelProps = {
  tasks?: DailyTask[];
  onToggleTask?: (id: string) => void;
  onAddTask?: () => void;
};

const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

export default function DailyExecutionPanel({
  tasks = [
    {
      id: "1",
      title: "Review Q3 Financials",
      time: "10:00 AM",
      completed: false,
    },
    {
      id: "2",
      title: "Sync w/ Engineering Lead",
      time: "1:30 PM",
      completed: false,
    },
    {
      id: "3",
      title: "Draft Investor Update",
      time: "4:00 PM",
      completed: false,
    },
  ],
  onToggleTask,
  onAddTask,
}: DailyExecutionPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex h-full flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-xl"
    >
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <p className="text-xs tracking-widest text-white/40">
          DAILY EXECUTION
        </p>

        <motion.button
          onClick={onAddTask}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white shadow-[0_2px_8px_rgba(37,99,235,0.3)] transition-colors hover:bg-blue-500"
        >
          <Plus size={14} />
        </motion.button>
      </div>

      {/* Task list */}
      <motion.div
        variants={listVariants}
        initial="hidden"
        animate="show"
        className="flex-1 space-y-2.5 overflow-y-auto min-h-0"
      >
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            variants={itemVariants}
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="group flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 transition-colors hover:border-white/[0.14] hover:bg-white/[0.04]"
          >
            {/* Checkbox */}
            <button
              onClick={() => onToggleTask?.(task.id)}
              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
                task.completed
                  ? "border-blue-500 bg-blue-600"
                  : "border-white/20 hover:border-white/40"
              }`}
            >
              {task.completed && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="h-2 w-2 rounded-sm bg-white"
                />
              )}
            </button>

            {/* Task content */}
            <div className="flex flex-1 items-center justify-between gap-3">
              <span
                className={`text-sm ${
                  task.completed ? "text-white/40 line-through" : "text-white/90"
                }`}
              >
                {task.title}
              </span>

              {task.time && (
                <span className="shrink-0 text-xs text-white/30">{task.time}</span>
              )}
            </div>
          </motion.div>
        ))}

        {/* Empty state */}
        {tasks.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-3 py-12">
            <CalendarOff size={24} className="text-white/20" />
            <p className="text-sm text-white/30">No tasks scheduled for today.</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
