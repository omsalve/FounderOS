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
    <section className="relative w-full">
      
      {/* Top row */}
      <div className="flex items-start justify-between gap-6">
        
        {/* LEFT — Headline */}
        <div>
          {/* System badge */}
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-4 flex items-center gap-2 text-xs tracking-widest text-blue-400/80"
          >
            <span className="h-2 w-2 rounded-full bg-green-500" />
            SYSTEM ONLINE
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[clamp(2.5rem,5vw,4.5rem)] font-semibold leading-[0.95] tracking-tight"
          >
            WELCOME BACK,
            <br />
            <span className="text-blue-500">{name.toUpperCase()}</span>
          </motion.h1>
        </div>

        {/* RIGHT — Status */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-6 text-right"
        >
          <p className="text-xs tracking-widest text-white/40">
            CURRENT STATUS
          </p>

          <p className="mt-2 text-sm text-white/80">
            Day {dayOfQuarter} of Q3
            <span className="mx-2 text-blue-500">•</span>
            Focus: {focusPercent}%
          </p>
        </motion.div>
      </div>

      {/* Background glow (subtle, like your design) */}
      <div className="pointer-events-none absolute -left-32 top-0 h-64 w-64 rounded-full bg-blue-600/10 blur-[120px]" />
    </section>
  );
}
