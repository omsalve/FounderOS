"use client";

import { motion } from "framer-motion";

type StatCardProps = {
  label: string;
  value: string | number;
  sub?: string;
  accent?: boolean;
  delay?: number;
};

export default function StatCard({ label, value, sub, accent = false, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut", delay }}
      className="rounded-xl border border-white/[0.08] p-4 backdrop-blur-sm"
      style={{
        background: accent
          ? "rgba(37,99,235,0.1)"
          : "rgba(255,255,255,0.03)",
        borderColor: accent ? "rgba(37,99,235,0.25)" : "rgba(255,255,255,0.08)",
      }}
    >
      <p className="mb-1 text-[10px] tracking-[0.1em] uppercase font-medium"
         style={{ color: accent ? "rgba(96,165,250,0.7)" : "rgba(255,255,255,0.35)" }}>
        {label}
      </p>
      <p style={{ fontFamily: "var(--font-head)", fontSize: 32, lineHeight: 1, color: accent ? "#60A5FA" : "#fff" }}>
        {value}
      </p>
      {sub && (
        <p className="mt-1 text-[11px]" style={{ color: accent ? "rgba(96,165,250,0.55)" : "rgba(255,255,255,0.3)" }}>
          {sub}
        </p>
      )}
    </motion.div>
  );
}