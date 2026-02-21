"use client";

import { motion } from "framer-motion";
import { Map } from "lucide-react";

export default function AIRoadmapPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
      className="flex h-full flex-col items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-xl"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.04]">
          <Map size={20} className="text-white/25" />
        </div>
        <div className="text-center">
          <p className="text-sm text-white/40">No roadmap generated yet</p>
          <p className="mt-1 text-xs text-white/20">Describe a goal on the left to get started.</p>
        </div>
      </div>
    </motion.div>
  );
}
