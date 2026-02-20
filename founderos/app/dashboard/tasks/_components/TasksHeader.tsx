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
    <div className="flex items-center justify-between border-b border-white/10 pb-6">
      {/* LEFT */}
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-white">
            Execution Layer
          </h1>
          <p className="mt-0.5 text-xs text-white/40">{today}</p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <motion.button
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.95 }}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-white/70 hover:bg-white/[0.06] hover:text-white"
        >
          <Bell size={16} />
        </motion.button>

        {/* Search */}
        <motion.button
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.95 }}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-white/70 hover:bg-white/[0.06] hover:text-white"
        >
          <Search size={16} />
        </motion.button>
      </div>
    </div>
  );
}
