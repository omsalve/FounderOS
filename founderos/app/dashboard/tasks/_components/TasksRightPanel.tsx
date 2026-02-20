"use client";

export default function TasksRightPanel() {
  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <p className="mb-3 text-xs tracking-wide text-white/40">
          FILTERS
        </p>

        <div className="flex rounded-lg bg-white/5 p-1 text-xs">
          <button className="flex-1 rounded-md bg-white/10 py-1 text-white">
            All
          </button>
          <button className="flex-1 py-1 text-white/50 hover:text-white">
            Active
          </button>
          <button className="flex-1 py-1 text-white/50 hover:text-white">
            Completed
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <p className="text-xs text-white/40">Tasks Completed</p>
        <p className="mt-1 text-2xl font-semibold text-white">12</p>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <p className="text-xs text-white/40">Completion Rate</p>
        <p className="mt-1 text-2xl font-semibold text-white">88%</p>
      </div>

      <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-4">
        <p className="text-xs text-blue-300">Current Streak</p>
        <p className="mt-1 text-2xl font-semibold text-white">14 Days</p>
      </div>
    </div>
  );
}
