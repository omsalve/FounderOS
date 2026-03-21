"use client";

import { useState, useEffect, useCallback } from "react";
import TasksHeader from "./TasksHeader";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";
import TasksRightPanel from "./TasksRightPanel";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

type Filter = "all" | "active" | "completed";

export default function TasksPageShell() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    fetch("/api/tasks")
      .then(async (res) => {
        if (!res.ok) return [];
        return res.json();
      })
      .then((data: Task[]) => setTasks(data))
      .catch(() => setTasks([]))
      .finally(() => setLoading(false));
  }, []);

  const addTask = useCallback(async (title: string) => {
    const tempId = `temp-${Date.now()}`;
    const optimistic: Task = {
      id: tempId,
      title,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTasks((prev) => [optimistic, ...prev]);
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      if (!res.ok) throw new Error();
      const created: Task = await res.json();
      setTasks((prev) => prev.map((t) => (t.id === tempId ? created : t)));
    } catch {
      setTasks((prev) => prev.filter((t) => t.id !== tempId));
    }
  }, []);

  const toggleTask = useCallback(async (id: string, completed: boolean) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !completed } : t))
    );
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !completed }),
      });
      if (!res.ok) throw new Error();
      const updated: Task = await res.json();
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch {
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed } : t))
      );
    }
  }, []);

  const deleteTask = useCallback(async (id: string) => {
    let removed: Task | undefined;
    setTasks((prev) => {
      removed = prev.find((t) => t.id === id);
      return prev.filter((t) => t.id !== id);
    });
    try {
      const res = await fetch(`/api/tasks/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
    } catch {
      if (removed) setTasks((prev) => [...prev, removed!]);
    }
  }, []);

  const filteredTasks = tasks.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <TasksHeader />

      <div className="grid flex-1 min-h-0 grid-cols-10 gap-5 overflow-hidden">
        {/* LEFT — task list */}
        <div className="col-span-7 flex flex-col gap-4 overflow-y-auto min-h-0 pr-1">
          <TaskInput onAdd={addTask} />
          <TaskList
            tasks={filteredTasks}
            loading={loading}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        </div>

        {/* RIGHT — stats + filters */}
        <div className="col-span-3 overflow-y-auto min-h-0">
          <TasksRightPanel
            tasks={tasks}
            filter={filter}
            onFilterChange={setFilter}
          />
        </div>
      </div>
    </div>
  );
}