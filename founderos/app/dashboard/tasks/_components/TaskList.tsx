"use client";

import TaskItem from "./TaskItem";

const mockTasks = [
  {
    title: "Review Q3 Financial Models",
    meta: "Finance • Due Today",
    priority: "high" as const,
  },
  {
    title: "Sync with Engineering Lead",
    meta: "Product • 2:00 PM",
    priority: "medium" as const,
  },
  {
    title: "Draft Investor Update Email",
    meta: "Fundraising • Due Today",
    priority: "high" as const,
  },
  {
    title: "Approve New Marketing Assets",
    meta: "Marketing • No Due Date",
    priority: "low" as const,
  },
  {
    title: "Morning Standup",
    meta: "",
    priority: "done" as const,
    completed: true,
  },
];

export default function TaskList() {
  return (
    <div className="space-y-3">
      {mockTasks.map((task, i) => (
        <TaskItem key={i} {...task} />
      ))}
    </div>
  );
}
