"use client";

import { motion } from "framer-motion";

type WelcomeHeroProps = {
  name?: string;
  dayOfQuarter?: number;
  streak?: number;
  focusPercent?: number;
};

export default function WelcomeHero({
  name = "Founder",
  dayOfQuarter = 76,
  streak = 14,
  focusPercent = 85,
}: WelcomeHeroProps) {
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
  const hour = now.getHours();
  const greeting = hour < 12 ? "GOOD MORNING" : hour < 17 ? "GOOD AFTERNOON" : "GOOD EVENING";

  return (
    <section className="relative w-full pb-6">
      {/* Background glow */}
      <div className="pointer-events-none absolute -left-40 -top-10 h-72 w-72 rounded-full blur-[140px]"
           style={{ background: "rgba(37,99,235,0.1)" }} />

      <div className="flex items-end justify-between gap-6">
        {/* Headline */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-3 flex items-center gap-2 text-[10px] tracking-[0.12em] uppercase font-medium"
            style={{ color: "rgba(96,165,250,0.6)" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.6)]" />
            {dateStr} · System online
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
            {greeting},
            <br />
            <span style={{
              background: "linear-gradient(90deg,#3B82F6,#818CF8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              {name.toUpperCase()}.
            </span>
          </motion.h1>
        </div>

        {/* Status chips */}
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.12 }}
          className="flex flex-col items-end gap-2 pb-1"
        >
          <div className="flex items-center gap-3 rounded-lg border px-4 py-2 text-sm backdrop-blur-sm"
               style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.6)" }}>
            <span>Day {dayOfQuarter} of Q1</span>
            <span className="h-3 w-px" style={{ background: "rgba(255,255,255,0.15)" }} />
            <span>Focus: <span className="text-blue-400 font-medium">{focusPercent}%</span></span>
            <span className="h-3 w-px" style={{ background: "rgba(255,255,255,0.15)" }} />
            <span>🔥 {streak}d streak</span>
          </div>
        </motion.div>
      </div>

      {/* Separator */}
      <div className="mt-6 h-px w-full"
           style={{ background: "linear-gradient(to right, rgba(255,255,255,0.08), rgba(255,255,255,0.03), transparent)" }} />
    </section>
  );
}