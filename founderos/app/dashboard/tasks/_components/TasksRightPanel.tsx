"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import type { Task } from "./TasksPageShell";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

interface Props {
  tasks: Task[];
}

export default function TasksRightPanel({ tasks }: Props) {
  const { total, completed, rate } = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const rate = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, rate };
  }, [tasks]);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-4"
    >
      {/* Filters */}
      <motion.div variants={item} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
        <p className="mb-3 text-xs tracking-widest text-white/40">
          FILTERS
        </p>

        <div className="flex rounded-lg bg-white/[0.04] p-1 text-xs">
          <button className="flex-1 rounded-md bg-white/[0.08] py-1.5 text-white transition-colors">
            All
          </button>
          <button className="flex-1 rounded-md py-1.5 text-white/40 transition-colors hover:text-white/70">
            Active
          </button>
          <button className="flex-1 rounded-md py-1.5 text-white/40 transition-colors hover:text-white/70">
            Completed
          </button>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div variants={item} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
        <p className="text-xs tracking-widest text-white/40">TASKS COMPLETED</p>
        <p className="mt-1.5 text-2xl font-semibold text-white">{completed}</p>
      </motion.div>

      <motion.div variants={item} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
        <p className="text-xs tracking-widest text-white/40">COMPLETION RATE</p>
        <p className="mt-1.5 text-2xl font-semibold text-white">{rate}%</p>
      </motion.div>

      <motion.div variants={item} className="rounded-2xl border border-blue-500/20 bg-blue-500/[0.08] p-4">
        <p className="text-xs tracking-widest text-blue-300/70">TOTAL TASKS</p>
        <p className="mt-1.5 text-2xl font-semibold text-white">{total}</p>
      </motion.div>
    </motion.div>
  );
}
