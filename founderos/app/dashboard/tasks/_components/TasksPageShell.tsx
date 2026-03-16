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

export default function TasksPageShell() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/tasks")
      .then(async (res) => {
        if (!res.ok) {
          const body = await res.json().catch(() => null);
          console.error("[GET /api/tasks]", res.status, JSON.stringify(body, null, 2));
          return [];
        }
        return res.json();
      })
      .then((data: Task[]) => setTasks(data))
      .catch((err) => {
        console.error("[GET /api/tasks] network error", err);
        setTasks([]);
      })
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
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        console.error("[POST /api/tasks]", res.status, body);
        throw new Error(body?.error ?? "Failed to create task");
      }
      const created: Task = await res.json();
      setTasks((prev) => prev.map((t) => (t.id === tempId ? created : t)));
    } catch (err) {
      console.error("[addTask]", err);
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
      if (removed) {
        setTasks((prev) => [...prev, removed!]);
      }
    }
  }, []);

  return (
    <div className="h-full w-full">
      <TasksHeader />

      <div className="mt-6 grid grid-cols-10 gap-6">
        {/* LEFT */}
        <div className="col-span-7 space-y-4">
          <TaskInput onAdd={addTask} />
          <TaskList
            tasks={tasks}
            loading={loading}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        </div>

        {/* RIGHT */}
        <div className="col-span-3">
          <TasksRightPanel tasks={tasks} />
        </div>
      </div>
    </div>
  );
}
