"use client";

import { useState, type KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

interface Props {
  onAdd: (title: string) => void;
}

export default function TaskInput({ onAdd }: Props) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);

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
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="relative overflow-hidden rounded-2xl backdrop-blur-xl"
      style={{
        border: focused
          ? "1px solid rgba(37,99,235,0.4)"
          : "1px solid rgba(255,255,255,0.08)",
        background: "rgba(255,255,255,0.03)",
        transition: "border-color 0.2s",
      }}
    >
      {/* Top gradient wash when focused */}
      {focused && (
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-20"
          style={{
            background:
              "linear-gradient(to bottom, rgba(37,99,235,0.05), transparent)",
          }}
        />
      )}

      <div className="relative z-10 flex items-center gap-3 px-5 py-4">
        <motion.div
          animate={{
            background: value.trim()
              ? "rgba(37,99,235,0.15)"
              : "rgba(255,255,255,0.04)",
            borderColor: value.trim()
              ? "rgba(37,99,235,0.35)"
              : "rgba(255,255,255,0.12)",
          }}
          transition={{ duration: 0.15 }}
          className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg border"
        >
          <Plus
            size={13}
            style={{
              color: value.trim() ? "#60A5FA" : "rgba(255,255,255,0.3)",
              transition: "color 0.15s",
            }}
          />
        </motion.div>

        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="What needs to get done today?"
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-white/25"
          style={{ color: "rgba(255,255,255,0.9)" }}
        />

        <motion.button
          whileHover={
            value.trim()
              ? { y: -2, boxShadow: "0 6px 20px rgba(37,99,235,0.45)" }
              : {}
          }
          whileTap={value.trim() ? { scale: 0.94 } : {}}
          transition={{ type: "spring", stiffness: 340, damping: 24 }}
          onClick={submit}
          className="flex-shrink-0 rounded-xl px-4 py-2 text-xs font-medium uppercase tracking-wide transition-all"
          style={{
            background: value.trim()
              ? "#2563EB"
              : "rgba(255,255,255,0.05)",
            border: value.trim()
              ? "none"
              : "1px solid rgba(255,255,255,0.08)",
            color: value.trim() ? "#fff" : "rgba(255,255,255,0.25)",
            cursor: value.trim() ? "pointer" : "default",
            boxShadow: value.trim()
              ? "0 2px 10px rgba(37,99,235,0.3)"
              : "none",
          }}
        >
          Enter ↵
        </motion.button>
      </div>
    </motion.div>
  );
}