"use client";

import { AnimatePresence, motion } from "framer-motion";
import TaskItem from "./TaskItem";
import type { Task } from "./TasksPageShell";

interface Props {
  tasks: Task[];
  loading: boolean;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

function SkeletonRow() {
  return (
    <div className="animate-pulse rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
      <div className="flex items-center gap-3">
        <div className="h-4 w-4 rounded border border-white/10" />
        <div className="h-3 w-48 rounded bg-white/[0.06]" />
      </div>
    </div>
  );
}

export default function TaskList({ tasks, loading, onToggle, onDelete }: Props) {
  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonRow key={i} />
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/[0.08] py-16 text-center"
      >
        <p className="text-sm text-white/30">No tasks yet</p>
        <p className="mt-1 text-xs text-white/20">
          Type above and hit Enter to create one.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-3">
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
