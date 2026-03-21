"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, CalendarOff, Check, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export type DailyTask = {
  id: string;
  title: string;
  completed: boolean;
  weekLabel?: string;
};

export default function DailyExecutionList({
  tasks: initialTasks = [],
  hasPlan = false,
}: {
  tasks?: DailyTask[];
  hasPlan?: boolean;
}) {
  const [tasks, setTasks] = useState<DailyTask[]>(initialTasks);
  const router = useRouter();

  const toggle = async (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    // Optimistic update
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );

    try {
      const res = await fetch(`/api/plan-tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !task.completed }),
      });
      if (!res.ok) throw new Error();
      router.refresh();
    } catch {
      // Revert on failure
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: task.completed } : t))
      );
    }
  };

  const done = tasks.filter((t) => t.completed).length;
  const weekLabel = tasks[0]?.weekLabel;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: 0.05 }}
      className="flex h-full flex-col rounded-2xl backdrop-blur-xl p-6"
      style={{
        border: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(255,255,255,0.03)",
      }}
    >
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div>
          <p
            className="text-[10px] tracking-[0.1em] uppercase font-medium mb-1"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            Daily execution
          </p>
          {weekLabel ? (
            <p
              className="text-xs leading-snug max-w-[160px]"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              {weekLabel}
            </p>
          ) : (
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
              <span style={{ color: "#60A5FA", fontWeight: 600 }}>{done}</span>
              {" / "}
              {tasks.length} done
            </p>
          )}
        </div>
        <motion.a
          href="/dashboard/ai"
          whileHover={{ y: -2, boxShadow: "0 4px 16px rgba(37,99,235,0.35)" }}
          whileTap={{ scale: 0.93 }}
          className="flex h-7 w-7 items-center justify-center rounded-lg text-white"
          style={{
            background: "#2563EB",
            boxShadow: "0 2px 8px rgba(37,99,235,0.3)",
            textDecoration: "none",
          }}
          title="Go to AI Planner"
        >
          <Sparkles size={12} />
        </motion.a>
      </div>

      {/* Progress bar */}
      <div
        className="mb-4 h-[2px] w-full overflow-hidden rounded-full"
        style={{ background: "rgba(255,255,255,0.06)" }}
      >
        <motion.div
          animate={{
            width:
              tasks.length > 0 ? `${(done / tasks.length) * 100}%` : "0%",
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{
            background: "linear-gradient(90deg,#2563EB,#60A5FA)",
            boxShadow: "0 0 8px rgba(37,99,235,0.5)",
          }}
        />
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto min-h-0 space-y-0.5">
        {tasks.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center gap-3 py-12"
            style={{ color: "rgba(255,255,255,0.2)" }}
          >
            <CalendarOff size={22} strokeWidth={1.5} />
            {hasPlan ? (
              <>
                <p className="text-sm text-center">
                  You&apos;ve finished all weeks in this plan.
                </p>
                <a
                  href="/dashboard/ai"
                  className="text-xs"
                  style={{ color: "#60A5FA", textDecoration: "none" }}
                >
                  Generate a new plan →
                </a>
              </>
            ) : (
              <>
                <p className="text-sm">No plan yet.</p>
                <a
                  href="/dashboard/ai"
                  className="text-xs"
                  style={{ color: "#60A5FA", textDecoration: "none" }}
                >
                  Generate your first plan →
                </a>
              </>
            )}
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
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor =
                    "rgba(255,255,255,0.1)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor =
                    "rgba(255,255,255,0.05)")
                }
              >
                <motion.div
                  animate={{
                    background: task.completed ? "#2563EB" : "transparent",
                    borderColor: task.completed
                      ? "#2563EB"
                      : "rgba(255,255,255,0.2)",
                    boxShadow: task.completed
                      ? "0 0 8px rgba(37,99,235,0.45)"
                      : "none",
                  }}
                  transition={{ duration: 0.15 }}
                  className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border"
                >
                  {task.completed && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 25,
                      }}
                    >
                      <Check size={9} color="#fff" strokeWidth={2.5} />
                    </motion.div>
                  )}
                </motion.div>

                <span
                  className="flex-1 truncate text-sm transition-colors"
                  style={{
                    color: task.completed
                      ? "rgba(255,255,255,0.3)"
                      : "rgba(255,255,255,0.85)",
                    textDecoration: task.completed ? "line-through" : "none",
                  }}
                >
                  {task.title}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* Footer count when weekLabel is shown in header */}
      {weekLabel && tasks.length > 0 && (
        <div
          className="mt-3 pt-3 text-xs text-right"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            color: "rgba(255,255,255,0.3)",
          }}
        >
          <span style={{ color: "#60A5FA", fontWeight: 600 }}>{done}</span>
          {" / "}
          {tasks.length} done
        </div>
      )}
    </motion.div>
  );
}