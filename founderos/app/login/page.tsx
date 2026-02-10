"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(60,90,160,0.18),rgba(0,0,0,0.95))]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="absolute inset-0 bg-black/60" />

      {/* Top bar */}
      <header className="relative z-10 flex items-center justify-between px-10 py-6 text-xs tracking-wide text-white/70">
        <div className="flex items-center gap-2 font-semibold text-white">
          <div className="flex h-7 w-7 items-center justify-center rounded bg-blue-600 text-xs">
            F
          </div>
          FOUNDEROS
        </div>
        <div className="text-green-400">STATUS: OPERATIONAL</div>
      </header>

      {/* Login section */}
      <section className="relative z-10 flex min-h-[calc(100vh-80px)] items-center justify-center px-4">
        <div className="relative">
          {/* Blue ambient glow */}
          <motion.div
            animate={{ opacity: [0.6, 0.9, 0.6] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -inset-14 rounded-full bg-blue-600/15 blur-[140px]"
          />

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative z-10 w-full max-w-md rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-white/0 p-8 backdrop-blur-xl"
          >
            {/* Title */}
            <h1 className="font-heading text-center text-4xl tracking-wide">
              LOGIN
            </h1>
            <p className="mt-2 text-center text-xs tracking-widest text-white/40">
              ACCESS COMMAND CENTER
            </p>

            {/* Form */}
            <form className="mt-10 space-y-6">
              {/* Email */}
              <div>
                <label className="mb-2 block text-xs tracking-wide text-white/50">
                  EMAIL COORDINATES
                </label>
                <div className="rounded-md border border-white/10 bg-black/40 px-3 py-2">
                  <input
                    type="email"
                    placeholder="founder@venture.com"
                    className="w-full bg-transparent text-sm text-white placeholder:text-white/30 outline-none"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="mb-2 block text-xs tracking-wide text-white/50">
                  SECURITY KEY
                </label>
                <div className="rounded-md border border-white/10 bg-black/40 px-3 py-2">
                  <input
                    type="password"
                    placeholder="••••••••••"
                    className="w-full bg-transparent text-sm text-white placeholder:text-white/30 outline-none"
                  />
                </div>
              </div>

              {/* Options */}
              <div className="flex items-center justify-between text-xs text-white/40">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="accent-blue-600" />
                  Remember device
                </label>
                <Link href="#" className="text-blue-400 hover:text-blue-300">
                  Recover Access?
                </Link>
              </div>

              {/* CTA */}
              <motion.button
                whileHover={{ y: -4 }}
                whileTap={{ y: -1, scale: 0.98 }}
                transition={{
                  y: { type: "spring", stiffness: 160, damping: 18 },
                  scale: { type: "spring", stiffness: 220, damping: 20 },
                }}
                className="mt-6 w-full rounded-md bg-blue-600 py-3 text-sm font-semibold tracking-wide text-white"
              >
                INITIALIZE SESSION
              </motion.button>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center text-xs text-white/40">
              Not initialized?{" "}
              <Link href="#" className="text-white hover:underline">
                Apply for access →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bottom meta */}
      <footer className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] tracking-widest text-white/30">
        SECURE CONNECTION · 256-BIT ENCRYPTION · v2.4.0
      </footer>
    </main>
  );
}
