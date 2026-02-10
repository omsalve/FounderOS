"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function ManifestoPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(60,90,160,0.2),rgba(0,0,0,0.95))]" />
      <div className="absolute inset-0 bg-black/60" />

      {/* Top bar */}
      <header className="relative z-10 flex items-center justify-between px-10 py-6 text-xs text-white/60">
        <div className="flex items-center gap-2 font-medium text-white">
          <div className="flex h-6 w-6 items-center justify-center rounded border border-white/20 text-xs">
            F
          </div>
          FounderOS
        </div>

        <Link href="/" className="hover:text-white transition">
          ← Back to Home
        </Link>
      </header>

      {/* Content */}
      <section className="relative z-10 mx-auto max-w-3xl px-6 pt-24 pb-32 text-center">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-heading text-[clamp(3rem,6vw,5rem)] tracking-wide"
        >
          THE FOUNDEROS
          <br />
          <span className="text-white/50">MANIFESTO</span>
        </motion.h1>

        {/* Principles */}
        <div className="mt-24 space-y-20 text-left">
          {/* Principle 01 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative pl-6"
          >
            <div className="absolute left-0 top-1 h-full w-px bg-white/10" />
            <p className="text-xs tracking-widest text-white/40">
              01. PRINCIPLE
            </p>
            <h2 className="mt-2 font-heading text-2xl tracking-wide">
              EXECUTION OVER MOTIVATION
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              Feelings are fleeting. Systems are permanent. We do not wait for
              inspiration to strike; we build the structures that make high
              output inevitable.
            </p>
          </motion.div>

          {/* Principle 02 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative pl-6"
          >
            <div className="absolute left-0 top-1 h-full w-px bg-white/10" />
            <p className="text-xs tracking-widest text-white/40">
              02. PRINCIPLE
            </p>
            <h2 className="mt-2 font-heading text-2xl tracking-wide">
              PRECISION OVER CHAOS
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              Motion is not progress. We reject the busy work that plagues modern
              startups. Every action is calculated, measured, and ruthlessly
              aligned with the objective.
            </p>
          </motion.div>

          {/* Principle 03 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative pl-6"
          >
            <div className="absolute left-0 top-1 h-full w-px bg-white/10" />
            <p className="text-xs tracking-widest text-white/40">
              03. PRINCIPLE
            </p>
            <h2 className="mt-2 font-heading text-2xl tracking-wide">
              OUTPUT IS THE ONLY METRIC
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              Ideas are worthless until shipped. We judge ourselves not by our
              potential, but by what we have actually delivered to the world
              today.
            </p>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-28 flex flex-col items-center gap-4"
        >
          <motion.button
            whileHover={{ y: -4 }}
            whileTap={{ y: -1, scale: 0.98 }}
            transition={{
              y: { type: "spring", stiffness: 160, damping: 18 },
              scale: { type: "spring", stiffness: 220, damping: 20 },
            }}
            className="rounded-md bg-blue-600 px-8 py-3 text-sm font-medium text-white"
          >
            Join the Movement →
          </motion.button>

          <span className="text-[10px] tracking-widest text-white/30">
            LIMITED SPOTS AVAILABLE FOR Q3 COHORT
          </span>
        </motion.div>
      </section>
    </main>
  );
}
