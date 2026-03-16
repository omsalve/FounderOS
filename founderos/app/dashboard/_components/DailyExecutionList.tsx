"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, CalendarOff, Check } from "lucide-react";

export type DailyTask = {
  id: string;
  title: string;
  time?: string;
  completed?: boolean;
};

const defaultTasks: DailyTask[] = [
  { id: "1", title: "Morning standup",       time: "9:00 AM",  completed: true  },
  { id: "2", title: "Review Q3 financials",  time: "10:00 AM", completed: true  },
  { id: "3", title: "Sync w/ Engineering",   time: "1:30 PM",  completed: false },
  { id: "4", title: "Draft investor update", time: "4:00 PM",  completed: false },
  { id: "5", title: "Review pitch deck v3",  time: "5:30 PM",  completed: false },
  { id: "6", title: "Weekly review",         time: "EOD",      completed: false },
];

export default function DailyExecutionList({
  tasks: initialTasks = defaultTasks,
  onAddTask,
}: {
  tasks?: DailyTask[];
  onAddTask?: () => void;
}) {
  const [tasks, setTasks] = useState<DailyTask[]>(initialTasks);
  const toggle = (id: string) => setTasks((p) => p.map((t) => t.id === id ? { ...t, completed: !t.completed } : t));

  const done = tasks.filter((t) => t.completed).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: 0.05 }}
      className="flex h-full flex-col rounded-2xl backdrop-blur-xl p-6"
      style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}
    >
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-[10px] tracking-[0.1em] uppercase font-medium mb-1" style={{ color: "rgba(255,255,255,0.35)" }}>
            Daily execution
          </p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
            <span style={{ color: "#60A5FA", fontWeight: 600 }}>{done}</span> / {tasks.length} done
          </p>
        </div>
        <motion.button
          onClick={onAddTask}
          whileHover={{ y: -2, boxShadow: "0 4px 16px rgba(37,99,235,0.35)" }}
          whileTap={{ scale: 0.93 }}
          className="flex h-7 w-7 items-center justify-center rounded-lg text-white"
          style={{ background: "#2563EB", border: "none", cursor: "pointer", boxShadow: "0 2px 8px rgba(37,99,235,0.3)" }}
        >
          <Plus size={13} />
        </motion.button>
      </div>

      {/* Progress bar */}
      <div className="mb-4 h-[2px] w-full overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
        <motion.div
          animate={{ width: tasks.length > 0 ? `${(done / tasks.length) * 100}%` : "0%" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg,#2563EB,#60A5FA)", boxShadow: "0 0 8px rgba(37,99,235,0.5)" }}
        />
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto min-h-0 space-y-0.5">
        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-12" style={{ color: "rgba(255,255,255,0.2)" }}>
            <CalendarOff size={22} strokeWidth={1.5} />
            <p className="text-sm">No tasks scheduled.</p>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {tasks.map((task, i) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22, delay: i * 0.04 }}
                onClick={() => toggle(task.id)}
                whileHover={{ y: -1 }}
                className="group flex cursor-pointer items-center gap-3 rounded-xl px-4 py-3 transition-colors"
                style={{
                  border: "1px solid rgba(255,255,255,0.05)",
                  background: "rgba(255,255,255,0.02)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)")}
              >
                {/* Checkbox */}
                <motion.div
                  animate={{
                    background: task.completed ? "#2563EB" : "transparent",
                    borderColor: task.completed ? "#2563EB" : "rgba(255,255,255,0.2)",
                    boxShadow: task.completed ? "0 0 8px rgba(37,99,235,0.45)" : "none",
                  }}
                  transition={{ duration: 0.15 }}
                  className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border"
                >
                  {task.completed && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500, damping: 25 }}>
                      <Check size={9} color="#fff" strokeWidth={2.5} />
                    </motion.div>
                  )}
                </motion.div>

                {/* Title */}
                <span
                  className="flex-1 truncate text-sm transition-colors"
                  style={{ color: task.completed ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.85)", textDecoration: task.completed ? "line-through" : "none" }}
                >
                  {task.title}
                </span>

                {/* Time */}
                {task.time && (
                  <span className="flex-shrink-0 text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
                    {task.time}
                  </span>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
}