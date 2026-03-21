"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, RotateCcw } from "lucide-react";
import type { Plan } from "./AIPlanPanel";

export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type AIChatProps = {
  onPlanGenerated: (plan: Plan | null) => void;
  onLoading: (loading: boolean) => void;
};

const QUICK_STARTS = [
  "Launch a SaaS MVP in 90 days",
  "Grow newsletter to 10k subscribers",
  "Hire my first engineer",
  "Raise a pre-seed round",
];

export default function AIChat({ onPlanGenerated, onLoading }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: text.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);
    onLoading(true);

    // Reset textarea height
    if (textareaRef.current) textareaRef.current.style.height = "auto";

    try {
      const history = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/ai/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text.trim(), history }),
      });

      const data = await res.json();

      const assistantMsg: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.plan
          ? `Plan generated for: **${data.plan.goal}**\n\nYour execution roadmap is ready on the right — ${data.plan.months.length} months, ${data.plan.months.reduce((a: number, m: any) => a + m.weeks.length, 0)} weekly commitments, ${data.plan.months.reduce((a: number, m: any) => a + m.weeks.reduce((b: number, w: any) => b + w.tasks.length, 0), 0)} tasks.`
          : data.text || "I couldn't generate a plan. Try rephrasing your goal.",
      };

      setMessages((prev) => [...prev, assistantMsg]);

      if (data.plan) {
        onPlanGenerated(data.plan);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
      onLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 160) + "px";
  };

  const reset = () => {
    setMessages([]);
    setInput("");
    onPlanGenerated(null);
  };

  return (
    <div
      className="flex h-full flex-col rounded-2xl overflow-hidden backdrop-blur-xl"
      style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-4 flex-shrink-0"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div>
          <p className="text-[10px] tracking-[0.12em] uppercase font-medium mb-0.5"
             style={{ color: "rgba(255,255,255,0.35)" }}>
            Intelligence layer
          </p>
          <h2 style={{ fontFamily: "var(--font-head)", fontSize: 20, color: "#fff", letterSpacing: "0.03em" }}>
            AI PLANNER
          </h2>
        </div>
        <div className="flex items-center gap-2">
          {messages.length > 0 && (
            <motion.button
              onClick={reset}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs transition-colors"
              style={{
                border: "1px solid rgba(255,255,255,0.08)",
                background: "transparent",
                color: "rgba(255,255,255,0.4)",
                cursor: "pointer",
              }}
            >
              <RotateCcw size={11} />
              Reset
            </motion.button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto min-h-0 px-5 py-4 space-y-4">
        {messages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex h-full flex-col items-center justify-center gap-6 py-8"
          >
            {/* Glow orb */}
            <div className="relative flex items-center justify-center">
              <div
                className="absolute h-24 w-24 rounded-full blur-[40px]"
                style={{ background: "rgba(37,99,235,0.25)" }}
              />
              <div
                className="relative flex h-14 w-14 items-center justify-center rounded-2xl"
                style={{
                  background: "linear-gradient(135deg,#2563EB,#818CF8)",
                  boxShadow: "0 8px 32px rgba(37,99,235,0.4)",
                }}
              >
                <Sparkles size={22} color="#fff" />
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm font-medium text-white mb-1">Describe your goal</p>
              <p className="text-xs max-w-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                Turn any vague ambition into a structured Year → Month → Week → Day execution plan.
              </p>
            </div>

            {/* Quick starts */}
            <div className="flex flex-wrap justify-center gap-2 px-4">
              {QUICK_STARTS.map((qs) => (
                <motion.button
                  key={qs}
                  onClick={() => send(qs)}
                  whileHover={{ y: -2, borderColor: "rgba(96,165,250,0.4)" }}
                  whileTap={{ scale: 0.96 }}
                  className="rounded-lg px-3 py-1.5 text-xs transition-colors"
                  style={{
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.03)",
                    color: "rgba(255,255,255,0.5)",
                    cursor: "pointer",
                  }}
                >
                  {qs}
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <>
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div
                      className="mr-2 mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg"
                      style={{ background: "linear-gradient(135deg,#2563EB,#818CF8)", boxShadow: "0 2px 8px rgba(37,99,235,0.4)" }}
                    >
                      <Sparkles size={11} color="#fff" />
                    </div>
                  )}

                  <div
                    className="max-w-[80%] rounded-xl px-4 py-2.5 text-sm leading-relaxed"
                    style={
                      msg.role === "user"
                        ? {
                            background: "rgba(37,99,235,0.2)",
                            border: "1px solid rgba(37,99,235,0.3)",
                            color: "rgba(255,255,255,0.9)",
                          }
                        : {
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            color: "rgba(255,255,255,0.75)",
                          }
                    }
                  >
                    {msg.content.split("**").map((part, i) =>
                      i % 2 === 1
                        ? <strong key={i} style={{ color: "#fff", fontWeight: 600 }}>{part}</strong>
                        : <span key={i}>{part}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing indicator */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2"
              >
                <div
                  className="flex h-6 w-6 items-center justify-center rounded-lg"
                  style={{ background: "linear-gradient(135deg,#2563EB,#818CF8)" }}
                >
                  <Sparkles size={11} color="#fff" />
                </div>
                <div
                  className="flex items-center gap-1 rounded-xl px-4 py-3"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: "#60A5FA" }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div
        className="flex-shrink-0 p-4"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div
          className="flex items-end gap-3 rounded-xl p-3"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="Describe your goal… (Enter to send, Shift+Enter for new line)"
            rows={1}
            disabled={isLoading}
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              resize: "none",
              fontSize: 13,
              color: "rgba(255,255,255,0.85)",
              lineHeight: "1.6",
              minHeight: 24,
              maxHeight: 160,
              fontFamily: "var(--font-sans)",
            }}
            className="placeholder:text-white/25 disabled:opacity-50"
          />
          <motion.button
            onClick={() => send(input)}
            disabled={!input.trim() || isLoading}
            whileHover={input.trim() && !isLoading ? { y: -2, boxShadow: "0 6px 20px rgba(37,99,235,0.45)" } : {}}
            whileTap={input.trim() && !isLoading ? { scale: 0.93 } : {}}
            transition={{ type: "spring", stiffness: 340, damping: 24 }}
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg transition-opacity"
            style={{
              background: input.trim() && !isLoading ? "#2563EB" : "rgba(255,255,255,0.06)",
              border: "none",
              cursor: input.trim() && !isLoading ? "pointer" : "not-allowed",
              color: input.trim() && !isLoading ? "#fff" : "rgba(255,255,255,0.25)",
              boxShadow: input.trim() && !isLoading ? "0 2px 10px rgba(37,99,235,0.3)" : "none",
            }}
          >
            <Send size={13} />
          </motion.button>
        </div>
        <p className="mt-2 text-center text-[10px]" style={{ color: "rgba(255,255,255,0.2)" }}>
          Plans are saved to your dashboard automatically
        </p>
      </div>
    </div>
  );
}