"use client";

import { Bell, Search } from "lucide-react";
import { motion } from "framer-motion";

export default function TasksHeader() {
  const today = new Date().toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="flex items-center justify-between border-b border-white/[0.08] pb-6">
      {/* LEFT */}
      <div>
        <h1 className="text-2xl font-semibold text-white">
          Execution Layer
        </h1>
        <p className="mt-1 text-xs text-white/30">{today}</p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <motion.button
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-white/40 transition-colors hover:border-white/[0.14] hover:bg-white/[0.06] hover:text-white/70"
        >
          <Bell size={16} />
        </motion.button>

        {/* Search */}
        <motion.button
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-white/40 transition-colors hover:border-white/[0.14] hover:bg-white/[0.06] hover:text-white/70"
        >
          <Search size={16} />
        </motion.button>
      </div>
    </div>
  );
}
