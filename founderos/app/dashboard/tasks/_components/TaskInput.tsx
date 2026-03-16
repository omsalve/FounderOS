"use client";

import { useState, type KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

interface Props {
  onAdd: (title: string) => void;
}

export default function TaskInput({ onAdd }: Props) {
  const [value, setValue] = useState("");

  const submit = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setValue("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3">
      <div className="flex items-center gap-3">
        <Plus className="shrink-0 text-white/30" size={18} />

        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="What needs to get done today?"
          className="flex-1 bg-transparent text-sm text-white/90 placeholder:text-white/30 outline-none"
        />

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          onClick={submit}
          className="shrink-0 rounded-lg bg-white/[0.06] px-3 py-1.5 text-xs text-white/50 transition-colors hover:bg-white/[0.1] hover:text-white/70"
        >
          Hit Enter ↵
        </motion.button>
      </div>
    </div>
  );
}
