"use client";

// framer-motion v12 removed function-valued Variants entirely.
// All per-item stagger delays are passed directly via the `transition` prop.
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, ChevronRight, Map, Plus, Check } from "lucide-react";

export type Plan = {
  goal: string;
  yearlyGoal: { title: string; description: string };
  months: {
    month: number;
    title: string;
    milestone: string;
    weeks: {
      week: number;
      commitment: string;
      tasks: string[];
    }[];
  }[];
};

type AIPlanPanelProps = {
  plan: Plan | null;
  isLoading: boolean;
};

const MONTH_COLORS = [
  { bar: "#2563EB", glow: "rgba(37,99,235,0.3)",  bg: "rgba(37,99,235,0.08)",  border: "rgba(37,99,235,0.2)"  },
  { bar: "#7C3AED", glow: "rgba(124,58,237,0.3)", bg: "rgba(124,58,237,0.08)", border: "rgba(124,58,237,0.2)" },
  { bar: "#0891B2", glow: "rgba(8,145,178,0.3)",  bg: "rgba(8,145,178,0.08)",  border: "rgba(8,145,178,0.2)"  },
];

type MonthColor = (typeof MONTH_COLORS)[0];

/* ─── WeekRow ────────────────────────────────────────────────────────────── */
function WeekRow({
  week,
  monthColor,
}: {
  week: Plan["months"][0]["weeks"][0];
  monthColor: MonthColor;
}) {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState<boolean[]>(() =>
    week.tasks.map(() => false)
  );

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        border: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(255,255,255,0.02)",
      }}
    >
      {/* Week header */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-3 px-4 py-3 text-left"
        style={{ background: "transparent", border: "none", cursor: "pointer" }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background =
            "rgba(255,255,255,0.03)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "transparent";
        }}
      >
        <div
          className="flex h-5 w-5 shrink-0 items-center justify-center rounded text-[10px] font-bold"
          style={{
            background: monthColor.bg,
            color: monthColor.bar,
            border: `1px solid ${monthColor.border}`,
          }}
        >
          {week.week}
        </div>

        <div className="flex-1 min-w-0">
          <p
            className="truncate text-xs font-medium"
            style={{ color: "rgba(255,255,255,0.75)" }}
          >
            {week.commitment}
          </p>
          <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>
            {week.tasks.length} tasks
          </p>
        </div>

        <motion.div
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.15 }}
        >
          <ChevronRight size={13} style={{ color: "rgba(255,255,255,0.3)" }} />
        </motion.div>
      </button>

      {/* Tasks */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              overflow: "hidden",
              borderTop: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <div className="px-4 py-2 space-y-1.5">
              {week.tasks.map((task, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.18, delay: i * 0.05 }}
                  onClick={() =>
                    setChecked((p) => p.map((v, j) => (j === i ? !v : v)))
                  }
                  className="flex items-center gap-2.5 cursor-pointer"
                >
                  <motion.div
                    animate={{
                      background: checked[i] ? monthColor.bar : "transparent",
                      borderColor: checked[i]
                        ? monthColor.bar
                        : "rgba(255,255,255,0.2)",
                      boxShadow: checked[i]
                        ? `0 0 6px ${monthColor.glow}`
                        : "none",
                    }}
                    transition={{ duration: 0.12 }}
                    className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded border"
                  >
                    {checked[i] && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 25,
                        }}
                      >
                        <Check size={8} color="#fff" strokeWidth={3} />
                      </motion.div>
                    )}
                  </motion.div>

                  <span
                    className="text-xs leading-relaxed"
                    style={{
                      color: checked[i]
                        ? "rgba(255,255,255,0.3)"
                        : "rgba(255,255,255,0.6)",
                      textDecoration: checked[i] ? "line-through" : "none",
                      transition: "color .15s",
                    }}
                  >
                    {task}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── MonthCard ──────────────────────────────────────────────────────────── */
function MonthCard({
  month,
  index,
  colors,
}: {
  month: Plan["months"][0];
  index: number;
  colors: MonthColor;
}) {
  const [open, setOpen] = useState(index === 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.08 }}
      className="rounded-2xl overflow-hidden"
      style={{ border: `1px solid ${colors.border}`, background: colors.bg }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-4 px-5 py-4"
        style={{ background: "transparent", border: "none", cursor: "pointer" }}
      >
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-bold text-sm"
          style={{
            background: `linear-gradient(135deg,${colors.bar},${colors.bar}99)`,
            boxShadow: `0 4px 14px ${colors.glow}`,
            color: "#fff",
          }}
        >
          M{month.month}
        </div>

        <div className="flex-1 text-left min-w-0">
          <p
            className="font-semibold mb-0.5"
            style={{
              fontFamily: "var(--font-head)",
              fontSize: 16,
              letterSpacing: "0.04em",
              color: "#fff",
            }}
          >
            {month.title.toUpperCase()}
          </p>
          <p
            className="truncate text-xs"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            {month.milestone}
          </p>
        </div>

        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={15} style={{ color: "rgba(255,255,255,0.35)" }} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: "hidden" }}
          >
            <div
              className="px-4 pb-4 space-y-2"
              style={{ borderTop: `1px solid ${colors.border}` }}
            >
              <p
                className="px-1 pt-3 text-[10px] uppercase tracking-widest font-medium"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                Weekly commitments
              </p>
              {month.weeks.map((week) => (
                <WeekRow key={week.week} week={week} monthColor={colors} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── AIPlanPanel ────────────────────────────────────────────────────────── */
export default function AIPlanPanel({ plan, isLoading }: AIPlanPanelProps) {
  return (
    <div
      className="flex h-full flex-col rounded-2xl overflow-hidden backdrop-blur-xl"
      style={{
        border: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(255,255,255,0.03)",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-4 shrink-0"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div>
          <p
            className="text-[10px] tracking-widest uppercase font-medium mb-0.5"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            Execution roadmap
          </p>
          <h2
            style={{
              fontFamily: "var(--font-head)",
              fontSize: 20,
              color: "#fff",
              letterSpacing: "0.03em",
            }}
          >
            {plan ? plan.goal.toUpperCase() : "YOUR PLAN"}
          </h2>
        </div>

        {plan && (
          <div
            className="flex items-center gap-3 text-[11px]"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            <span>{plan.months.length} months</span>
            <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
            <span>
              {plan.months.reduce((a, m) => a + m.weeks.length, 0)} weeks
            </span>
            <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
            <span>
              {plan.months.reduce(
                (a, m) =>
                  a + m.weeks.reduce((b, w) => b + w.tasks.length, 0),
                0
              )}{" "}
              tasks
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto min-h-0 p-5">
        {/* Loading state */}
        {isLoading ? (
          <div className="flex h-full flex-col items-center justify-center gap-4">
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full blur-[30px]"
                style={{ background: "rgba(37,99,235,0.2)" }}
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="relative h-10 w-10 rounded-full"
                style={{
                  border: "2px solid rgba(37,99,235,0.2)",
                  borderTopColor: "#2563EB",
                }}
              />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-white mb-1">
                Building your plan
              </p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                Structuring goals into milestones…
              </p>
            </div>
          </div>

        /* Empty state */
        ) : !plan ? (
          <div className="flex h-full flex-col items-center justify-center gap-3">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-2xl"
              style={{
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.03)",
              }}
            >
              <Map size={20} style={{ color: "rgba(255,255,255,0.2)" }} />
            </div>
            <div className="text-center">
              <p
                className="text-sm font-medium mb-1"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                No roadmap yet
              </p>
              <p
                className="text-xs max-w-[200px]"
                style={{ color: "rgba(255,255,255,0.2)" }}
              >
                Describe a goal in the chat to generate your execution plan.
              </p>
            </div>
          </div>

        /* Plan */
        ) : (
          <div className="space-y-4">
            {/* Yearly goal banner */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="relative overflow-hidden rounded-2xl p-5"
              style={{
                background:
                  "linear-gradient(135deg,rgba(37,99,235,0.15),rgba(129,140,248,0.08))",
                border: "1px solid rgba(37,99,235,0.25)",
              }}
            >
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px"
                style={{
                  background:
                    "linear-gradient(90deg,transparent,rgba(96,165,250,0.4),transparent)",
                }}
              />
              <p
                className="text-[10px] tracking-widest uppercase font-medium mb-2"
                style={{ color: "rgba(96,165,250,0.6)" }}
              >
                Yearly goal
              </p>
              <p
                style={{
                  fontFamily: "var(--font-head)",
                  fontSize: 18,
                  color: "#fff",
                  letterSpacing: "0.03em",
                  marginBottom: 6,
                }}
              >
                {plan.yearlyGoal.title.toUpperCase()}
              </p>
              <p
                className="text-xs leading-relaxed"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                {plan.yearlyGoal.description}
              </p>
            </motion.div>

            {/* Timeline + months */}
            <div className="relative ml-4">
              <div
                className="absolute left-4 top-0 bottom-0 w-px"
                style={{
                  background:
                    "linear-gradient(to bottom,rgba(37,99,235,0.4),rgba(124,58,237,0.4),rgba(8,145,178,0.4))",
                }}
              />
              <div className="space-y-3">
                {plan.months.map((month, i) => (
                  <MonthCard
                    key={month.month}
                    month={month}
                    index={i}
                    colors={MONTH_COLORS[i % MONTH_COLORS.length]}
                  />
                ))}
              </div>
            </div>

            {/* Save CTA */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
              whileHover={{ y: -3, boxShadow: "0 8px 28px rgba(37,99,235,0.4)" }}
              whileTap={{ scale: 0.97 }}
              className="w-full rounded-xl py-3 text-sm font-medium text-white uppercase tracking-wide flex items-center justify-center gap-2"
              style={{
                background: "linear-gradient(135deg,#2563EB,#4F46E5)",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 4px 16px rgba(37,99,235,0.3)",
              }}
            >
              <Plus size={14} />
              Save plan to dashboard
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}