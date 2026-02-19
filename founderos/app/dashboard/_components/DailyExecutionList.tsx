"use client";

import { motion } from "framer-motion";

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
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl"
    >
      {/* subtle glow */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-blue-600/5 blur-2xl" />

      {/* Header */}
      <div className="relative z-10 mb-6 flex items-center justify-between">
        <p className="text-xs tracking-widest text-white/40">
          DAILY EXECUTION
        </p>

        <button
          onClick={onAddTask}
          className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-600 text-sm text-white hover:bg-blue-500"
        >
          +
        </button>
      </div>

      {/* Task list */}
      <div className="relative z-10 space-y-3">
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            whileHover={{ y: -2 }}
            className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 transition hover:border-white/20"
          >
            {/* Checkbox */}
            <button
              onClick={() => onToggleTask?.(task.id)}
              className={`flex h-4 w-4 items-center justify-center rounded border transition ${
                task.completed
                  ? "border-blue-500 bg-blue-600"
                  : "border-white/30"
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
            <div className="flex flex-1 items-center justify-between">
              <span
                className={`text-sm ${
                  task.completed ? "text-white/40 line-through" : "text-white"
                }`}
              >
                {task.title}
              </span>

              {task.time && (
                <span className="text-xs text-white/40">{task.time}</span>
              )}
            </div>
          </motion.div>
        ))}

        {/* Empty state (future-safe) */}
        {tasks.length === 0 && (
  <div className="py-8 text-center text-sm text-white/40">
    No tasks scheduled for today.
  </div>
)}

      </div>
    </motion.div>
  );
}
