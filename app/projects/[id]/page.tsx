"use client";

import { useState, useEffect } from "react";
import { generateClient, SelectionSet } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import { convertStatusText } from "../utils";
import dayjs from "dayjs";
import CreateTaskModal from "@/app/components/CreateTaskModal/CreateTaskModal";
import Table from "@/app/components/Table";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

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

  // Task Table
  const taskTableColumns = [
    { Header: "Title", accessor: "title" },
    { Header: "Due Date", accessor: "dueDate" },
    { Header: "Priority", accessor: "priority" },
    { Header: "Status", accessor: "status" },
  ];

  // Task Table (Tanstack)
  type Task = {
    title: string;
    description: string;
    dueDate: string;
    priority: string;
    status: string;
    // TODO: owners of the task + shorten description
  };

  const TaskData: Task[] = project.tasks?.map((task) => ({
    title: task.title ? task.title : "N/A",
    description: task.description ? task.description.slice(20) : "N/A",
    dueDate: dayjs(task.dueDate).format("YYYY-MM-DD HH:mm"),
    priority: task.priority
      ? task.priority[0].toUpperCase() + task.priority.slice(1)
      : "N/A",
    status: task.status ? task.status : "N/A",
  }));

  const columnHelper = createColumnHelper<Task>();
  const defaultColumns = [
    columnHelper.accessor("title", {
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("description", {
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("dueDate", {
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("priority", {
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("status", {
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
    }),
  ];

  const taskTable = useReactTable({
    columns: defaultColumns,
    data: TaskData,
    getCoreRowModel: getCoreRowModel(),
  });

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
      <div className="p-2">
        <table>
          <thead>
            {taskTable.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {taskTable.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            {taskTable.getFooterGroups().map((footerGroup) => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot>
        </table>
      </div>
    </main>
  );
}
