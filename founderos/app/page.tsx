"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(40,60,120,0.25),rgba(0,0,0,0.9))]" />

      {/* Subtle noise / vignette */}
      <div className="pointer-events-none absolute inset-0 bg-black/40" />

      {/* Nav */}
      <header className="relative z-10 flex items-center justify-between px-10 py-6 text-sm text-white/70">
        <div className="flex items-center gap-2 font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded border border-white/20 text-xs">
            F
          </div>
          FounderOS
        </div>

        <nav className="flex items-center gap-8">
          <Link href="#" className="hover:text-white transition">
            Manifesto
          </Link>
          <Link
            href="#"
            className="flex items-center gap-1 font-medium text-white"
          >
            Login →
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative z-10 flex min-h-[calc(100vh-80px)] flex-col items-center justify-center px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 rounded-full border border-white/15 bg-white/5 px-4 py-1 text-xs tracking-wide text-white/70"
        >
          ● BUILDING IN PUBLIC
        </motion.div>

        {/* Headline */}
        <motion.h1
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.9, ease: "easeOut" }}
  className={`font-heading text-[clamp(3.5rem,8vw,7rem)] leading-[0.95] tracking-wide`}
>
  TURN GOALS
  <br />
  <span className="text-white/80">INTO DAILY EXECUTION</span>
</motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mt-8 max-w-xl text-sm text-white/50"
        >
          The operating system designed for high-output founders.
          <br />
          Stop planning in circles. Start shipping with precision.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="mt-10 flex flex-col items-center gap-3"
        >
          <motion.button
  initial={{ boxShadow: "0 0 0 rgba(37, 99, 235, 0)", y: 0, scale: 1 }}
  whileHover={{
    y: -4,
    scale: 1.015,
    boxShadow: "0 18px 60px rgba(37, 99, 235, 0.45)",
  }}
  whileTap={{
    y: -1,
    scale: 0.985,
    boxShadow: "0 8px 25px rgba(37, 99, 235, 0.35)",
  }}
  transition={{
    y: { type: "spring", stiffness: 180, damping: 18, mass: 0.8 },
    scale: { type: "spring", stiffness: 220, damping: 20 },
    boxShadow: { duration: 0.35, ease: "easeOut" },
  }}
  className="relative rounded-md bg-blue-600 px-6 py-3 text-sm font-medium text-white"
>
  Start Executing
</motion.button>


          <span className="text-xs text-white/30">
            No credit card required. 14-day free trial.
          </span>
        </motion.div>
      </section>
    </main>
  );
}
