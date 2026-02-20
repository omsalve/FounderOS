"use client";

import TasksHeader from "./TasksHeader";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";
import TasksRightPanel from "./TasksRightPanel";

export default function TasksPageShell() {
  return (
    <div className="h-full w-full">
      <TasksHeader />

      <div className="mt-6 grid grid-cols-10 gap-6">
        {/* LEFT */}
        <div className="col-span-7 space-y-4">
          <TaskInput />
          <TaskList />
        </div>

        {/* RIGHT */}
        <div className="col-span-3">
          <TasksRightPanel />
        </div>
      </div>
    </div>
  );
}
