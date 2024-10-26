"use client";

import { useState, useEffect } from "react";
import { generateClient, SelectionSet } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import { convertStatusText } from "../utils";
import dayjs from "dayjs";
import CreateTaskModal from "@/app/components/CreateTaskModal/CreateTaskModal";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
// Theme
import { ColDef, ModuleRegistry } from "@ag-grid-community/core";
import { AgGridReact } from "@ag-grid-community/react";
// React Grid Logic
import "@ag-grid-community/styles/ag-grid.css";
// Core CSS
import "@ag-grid-community/styles/ag-theme-quartz.css";

ModuleRegistry.registerModules([ClientSideRowModelModule]);
Amplify.configure(outputs);

const client = generateClient<Schema>({
  authMode: "userPool",
});

export default function Page({ params }: { params: { id: string } }) {
  const projectEager = [
    "id",
    "title",
    "description",
    "priority",
    "status",
    "startDate",
    "endDate",
    "updatedAt",
    "createdAt",
    "tasks.*",
  ] as const;
  type ProjectSet = SelectionSet<
    Schema["Project"]["type"],
    typeof projectEager
  >;
  const [project, setProject] = useState<ProjectSet>({
    id: params.id,
    title: "loading...",
    description: "",
    priority: "low",
    status: "in_progress",
    startDate: "",
    endDate: "",
    createdAt: "",
    updatedAt: "",
    tasks: [],
  });

  const updatedAtString = dayjs(project.updatedAt).format("DD/MM/YYYY HH:mm");
  const [showCreateTask, setShowCreateTask] = useState(false);
  const handleCreateTask = () => {
    setShowCreateTask(true);
  };

  const loadContents = async function () {
    const p = await client.models.Project.get(
      { id: params.id },
      { selectionSet: projectEager }
    );
    setShowCreateTask(false);
    if (p.data) {
      setProject(p.data);
    } else {
      setProject({ ...project, title: "Failed to load project..." });
    }
  };

  useEffect(() => {
    loadContents();
  }, []);

  // Task Table (Tanstack)
  interface Task {
    title: string;
    description: string;
    dueDate: string;
    priority: string;
    status: string;
    // TODO: owners of the task + shorten description
  }

  const TaskData: Task[] = project.tasks?.map((task) => ({
    title: task.title ? task.title : "N/A",
    description: task.description ? task.description.slice(20) : "N/A",
    dueDate: dayjs(task.dueDate).format("YYYY-MM-DD HH:mm"),
    priority: task.priority
      ? task.priority[0].toUpperCase() + task.priority.slice(1)
      : "N/A",
    status: task.status ? task.status : "N/A",
  }));

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState<ColDef<Task>[]>([
    { field: "title", filter: true },
    { field: "description", filter: true },
    { field: "dueDate", filter: true, sort: "desc" },
    { field: "priority", filter: true },
    { field: "status", filter: true },
  ]);

  const defaultColDef = {
    flex: 1,
  };

  return (
    <main className="p-12">
      <CreateTaskModal
        isOpen={showCreateTask}
        onSuccess={loadContents}
        onError={(e: any, m: any) => console.log(m)}
        projectId={params.id}
      />

      <div className="flex flex-row justify-between items-center py-4">
        <h1 className="text-6xl">
          <span className=" font-bold">Project / </span>
          {project.title}
        </h1>
        <button
          className="rounded-2xl bg-[#579dff] w-1/12 h-10 px-4 float-right mr-10"
          onClick={handleCreateTask}
        >
          <span className="font-sans font-semibold"> + New Task</span>
        </button>
      </div>
      <hr />

      <div className="pb-4">
        <h3 className="text-xl py-4">{project.description}</h3>
        <div className="text-lg">
          <span className="font-bold">Priority: </span>{" "}
          {project.priority
            ? project.priority[0].toUpperCase() + project.priority.slice(1)
            : "N/A"}
        </div>
        <div className="text-lg">
          <span className="font-bold">Status:</span>{" "}
          {convertStatusText(project.status)}
        </div>
        <div className="text-lg">
          <span className="font-bold">Last Updated:</span> {updatedAtString}
        </div>
      </div>
      <hr />

      <h2 className="py-4 text-2xl font-semibold">Tasks</h2>
      <div
        className={`ag-theme-quartz-dark pb-10`}
        style={{ width: "100%", height: "100%" }}
      >
        <AgGridReact
          rowData={TaskData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          pagination={true}
        />
      </div>
    </main>
  );
}
