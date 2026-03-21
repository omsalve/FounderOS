"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckSquare } from "lucide-react";
import TaskItem from "./TaskItem";
import type { Task } from "./TasksPageShell";

interface Props {
  tasks: Task[];
  loading: boolean;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

function SkeletonRow({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
      className="flex items-center gap-3 rounded-xl px-4 py-3"
      style={{
        border: "1px solid rgba(255,255,255,0.05)",
        background: "rgba(255,255,255,0.02)",
      }}
    >
      <div
        className="h-4 w-4 rounded border flex-shrink-0"
        style={{
          borderColor: "rgba(255,255,255,0.1)",
          background: "rgba(255,255,255,0.04)",
        }}
      />
      <div
        className="h-3 rounded-full animate-pulse"
        style={{
          width: `${Math.floor(Math.random() * 30 + 40)}%`,
          background: "rgba(255,255,255,0.06)",
        }}
      />
    </motion.div>
  );
}

export default function TaskList({
  tasks,
  loading,
  onToggle,
  onDelete,
}: Props) {
  if (loading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <SkeletonRow key={i} delay={i * 0.05} />
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center gap-3 rounded-2xl py-16 text-center"
        style={{
          border: "1px dashed rgba(255,255,255,0.08)",
          background: "rgba(255,255,255,0.01)",
        }}
      >
        <div
          className="flex h-10 w-10 items-center justify-center rounded-2xl"
          style={{
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.03)",
          }}
        >
          <CheckSquare size={18} style={{ color: "rgba(255,255,255,0.2)" }} />
        </div>
        <div>
          <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.3)" }}>
            No tasks yet
          </p>
          <p className="mt-0.5 text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
            Type above and hit Enter to create one.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-2">
      <AnimatePresence mode="popLayout">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            id={task.id}
            title={task.title}
            completed={task.completed}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}