"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";

export default function TaskInput() {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
      <div className="flex items-center gap-3">
        <Plus className="text-white/40" size={18} />

        <input
          placeholder="What needs to get done today?"
          className="flex-1 bg-transparent text-sm text-white placeholder:text-white/40 outline-none"
        />

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="rounded-md bg-white/10 px-3 py-1.5 text-xs text-white/80 hover:bg-white/15"
        >
          Hit Enter ↵
        </motion.button>
      </div>
    </div>
  );
}
