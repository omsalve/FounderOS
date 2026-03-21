"use client";

import { motion } from "framer-motion";

export default function TasksHeader() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="relative w-full pb-6 flex-shrink-0">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute -left-40 -top-10 h-72 w-72 rounded-full blur-[140px]"
        style={{ background: "rgba(37,99,235,0.08)" }}
      />

      <div className="flex items-end justify-between gap-6">
        <div>
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-3 flex items-center gap-2 text-[10px] tracking-[0.12em] uppercase font-medium"
            style={{ color: "rgba(96,165,250,0.6)" }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full bg-green-500"
              style={{ boxShadow: "0 0 6px rgba(34,197,94,0.6)" }}
            />
            {today} · Execution layer
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              fontFamily: "var(--font-head)",
              fontSize: "clamp(40px,5vw,58px)",
              lineHeight: 0.95,
              letterSpacing: "0.01em",
              color: "#fff",
            }}
          >
            TASK
            <br />
            <span
              style={{
                background: "linear-gradient(90deg,#3B82F6,#818CF8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              MANAGER.
            </span>
          </motion.h1>
        </div>
      </div>

      {/* Separator */}
      <div
        className="mt-6 h-px w-full"
        style={{
          background:
            "linear-gradient(to right, rgba(255,255,255,0.08), rgba(255,255,255,0.03), transparent)",
        }}
      />
    </section>
  );
}