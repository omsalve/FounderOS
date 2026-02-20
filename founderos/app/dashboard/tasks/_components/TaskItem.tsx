"use client";

import clsx from "clsx";

type Props = {
  title: string;
  meta?: string;
  priority?: "high" | "medium" | "low" | "done";
  completed?: boolean;
};

const priorityStyles = {
  high: "bg-red-500/20 text-red-400",
  medium: "bg-amber-500/20 text-amber-400",
  low: "bg-white/10 text-white/60",
  done: "bg-emerald-500/20 text-emerald-400",
};

export default function TaskItem({
  title,
  meta,
  priority = "low",
  completed,
}: Props) {
  return (
    <div
      className={clsx(
        "flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] p-4 transition",
        "hover:bg-white/[0.04]",
        completed && "opacity-60"
      )}
    >
      <div className="flex items-center gap-3">
        <input type="checkbox" checked={completed} readOnly />

        <div>
          <p
            className={clsx(
              "text-sm text-white",
              completed && "line-through text-white/40"
            )}
          >
            {title}
          </p>

          {meta && (
            <p className="text-xs text-white/40">{meta}</p>
          )}
        </div>
      </div>

      <span
        className={clsx(
          "rounded-md px-2 py-0.5 text-xs capitalize",
          priorityStyles[priority]
        )}
      >
        {priority}
      </span>
    </div>
  );
}
