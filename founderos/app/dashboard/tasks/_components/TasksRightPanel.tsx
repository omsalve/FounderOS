"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { Task } from "./TasksPageShell";

type Filter = "all" | "active" | "completed";

interface Props {
  tasks: Task[];
  filter: Filter;
  onFilterChange: (f: Filter) => void;
}

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "completed", label: "Done" },
];

export default function TasksRightPanel({
  tasks,
  filter,
  onFilterChange,
}: Props) {
  const { total, completed, rate } = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const rate = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, rate };
  }, [tasks]);

  return (
    <div className="space-y-4">
      {/* Filter panel */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="rounded-2xl backdrop-blur-xl p-4"
        style={{
          border: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(255,255,255,0.03)",
        }}
      >
        <p
          className="text-[10px] tracking-[0.1em] uppercase font-medium mb-3"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          Filter
        </p>
        <div
          className="flex rounded-xl p-1 gap-0.5"
          style={{ background: "rgba(255,255,255,0.04)" }}
        >
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => onFilterChange(f.key)}
              className="relative flex-1 rounded-lg py-1.5 text-xs font-medium transition-colors"
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color:
                  filter === f.key
                    ? "#fff"
                    : "rgba(255,255,255,0.35)",
              }}
            >
              {filter === f.key && (
                <motion.div
                  layoutId="filter-pill"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  className="absolute inset-0 rounded-lg"
                  style={{
                    background: "rgba(37,99,235,0.25)",
                    border: "1px solid rgba(37,99,235,0.35)",
                  }}
                />
              )}
              <span className="relative z-10">{f.label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Progress bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.05, ease: "easeOut" }}
        className="rounded-2xl backdrop-blur-xl p-4"
        style={{
          border: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(255,255,255,0.03)",
        }}
      >
        <p
          className="text-[10px] tracking-[0.1em] uppercase font-medium mb-1"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          Completion
        </p>
        <div className="flex items-baseline justify-between mb-2">
          <p
            style={{
              fontFamily: "var(--font-head)",
              fontSize: 32,
              lineHeight: 1,
              color: "#fff",
            }}
          >
            {rate}%
          </p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
            {completed} / {total}
          </p>
        </div>
        <div
          className="h-[3px] w-full rounded-full overflow-hidden"
          style={{ background: "rgba(255,255,255,0.08)" }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${rate}%` }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg,#2563EB,#60A5FA)",
              boxShadow: "0 0 10px rgba(37,99,235,0.5)",
            }}
          />
        </div>
      </motion.div>

      {/* Stat cards */}
      {[
        { label: "Tasks completed", value: completed, delay: 0.1, accent: false },
        { label: "Active tasks", value: total - completed, delay: 0.15, accent: false },
        { label: "Total tasks", value: total, delay: 0.2, accent: true },
      ].map(({ label, value, delay, accent }) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay, ease: "easeOut" }}
          className="rounded-2xl backdrop-blur-xl p-4"
          style={{
            border: accent
              ? "1px solid rgba(37,99,235,0.25)"
              : "1px solid rgba(255,255,255,0.08)",
            background: accent
              ? "rgba(37,99,235,0.08)"
              : "rgba(255,255,255,0.03)",
          }}
        >
          <p
            className="text-[10px] tracking-[0.1em] uppercase font-medium mb-1"
            style={{
              color: accent
                ? "rgba(96,165,250,0.7)"
                : "rgba(255,255,255,0.35)",
            }}
          >
            {label}
          </p>
          <p
            style={{
              fontFamily: "var(--font-head)",
              fontSize: 32,
              lineHeight: 1,
              color: accent ? "#60A5FA" : "#fff",
            }}
          >
            {value}
          </p>
        </motion.div>
      ))}
    </div>
  );
}