"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function AIGoalInput() {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl">
      
      {/* Header */}
      <div className="mb-6">
        <h2 className="font-heading text-3xl tracking-tight">
          TURN IDEAS
          <br />
          <span className="text-blue-500">INTO PLANS</span>
        </h2>

        <p className="mt-3 max-w-md text-sm text-white/50">
          Enter a vague goal. Our engine will deconstruct it into actionable
          milestones, tasks, and timelines.
        </p>
      </div>

      {/* Editor Container */}
      <div className="relative flex-1 overflow-hidden rounded-xl border border-white/10 bg-[#0B1220]">
        
        {/* Fake editor top bar */}
        <div className="flex items-center gap-2 border-b border-white/5 px-4 py-2">
          <div className="h-2 w-2 rounded-full bg-red-500/80" />
          <div className="h-2 w-2 rounded-full bg-yellow-500/80" />
          <div className="h-2 w-2 rounded-full bg-green-500/80" />
          <span className="ml-3 text-xs text-white/40">input.md</span>
        </div>

        {/* Textarea */}
        <textarea
          placeholder={`> Describe your goal here...
e.g., I want to launch a design newsletter
focused on AI tools by next month. I have
no audience yet, but I have content ideas.`}
          className="h-full w-full resize-none bg-transparent p-4 font-mono text-sm leading-relaxed text-white/80 placeholder:text-white/30 outline-none"
        />

        {/* Bottom CTA */}
        <div className="pointer-events-none absolute bottom-4 right-4">
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            className="pointer-events-auto flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-[0_10px_30px_rgba(37,99,235,0.35)] hover:bg-blue-500"
          >
            <Sparkles size={16} />
            Convert to Plan
          </motion.button>
        </div>
      </div>

      {/* Quick Starts */}
      <div className="mt-6">
        <p className="mb-3 text-xs tracking-widest text-white/40">
          QUICK STARTS
        </p>

        <div className="flex flex-wrap gap-2">
          {[
            "Launch SaaS MVP in 30 days",
            "Hire first engineer",
            "Scale marketing budget",
          ].map((item) => (
            <button
              key={item}
              className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/70 transition hover:bg-white/[0.06] hover:text-white"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
