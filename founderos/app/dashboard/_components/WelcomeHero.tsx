"use client";

import { motion } from "framer-motion";

type WelcomeHeroProps = {
  name?: string;
  dayOfQuarter?: number;
  focusPercent?: number;
};

export default function WelcomeHero({
  name = "Founder",
  dayOfQuarter = 45,
  focusPercent = 85,
}: WelcomeHeroProps) {
  return (
    <section className="relative w-full pb-6">
      
      {/* Top row */}
      <div className="flex items-start justify-between gap-6">
        
        {/* LEFT — Headline */}
        <div>
          {/* System badge */}
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mb-4 flex items-center gap-2 text-xs tracking-widest text-blue-400/70"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.6)]" />
            SYSTEM ONLINE
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-[clamp(2.5rem,4.5vw,4rem)] font-semibold leading-[0.95] tracking-tight"
          >
            WELCOME BACK,
            <br />
            <span className="text-blue-500">{name.toUpperCase()}</span>
          </motion.h1>
        </div>

        {/* RIGHT — Status */}
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-4 flex flex-col items-end gap-3"
        >
          <p className="text-xs tracking-widest text-white/40">
            CURRENT STATUS
          </p>

          <div className="flex items-center gap-3 rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-2">
            <span className="text-sm text-white/70">
              Day {dayOfQuarter} of Q3
            </span>
            <span className="h-3 w-[1px] bg-white/15" />
            <span className="text-sm text-white/70">
              Focus: <span className="text-blue-400">{focusPercent}%</span>
            </span>
          </div>
        </motion.div>
      </div>

      {/* Separator */}
      <div className="mt-6 h-[1px] w-full bg-gradient-to-r from-white/[0.08] via-white/[0.04] to-transparent" />

      {/* Background glow */}
      <div className="pointer-events-none absolute -left-32 top-0 h-64 w-64 rounded-full bg-blue-600/[0.08] blur-[120px]" />
    </section>
  );
}
