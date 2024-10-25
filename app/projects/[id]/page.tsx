"use client";

import { useState, useEffect } from "react";
import { generateClient, SelectionSet } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import Table from "@/app/components/Table";
import { convertStatusText } from "../utils";

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

  const loadContents = async function () {
    const p = await client.models.Project.get(
      { id: params.id },
      { selectionSet: projectEager }
    );
    if (p.data) {
      setProject(p.data);
    } else {
      setProject({ ...project, title: "Failed to load project..." });
    }
  };

  useEffect(() => {
    loadContents();
  }, []);

  return (
    <main className="p-10">
      <h1 className="text-4xl py-4 font-bold">{project.title}</h1>
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
      <h2 className="py-4">Tasks</h2>
      <ul>
        {project.tasks?.map((t) => (
          <li>
            <div>
              <h3>{t.title}</h3>
              <p>{t.description}</p>
              <p>{t.status}</p>
              <p>{t.dueDate}</p>
            </div>
          </li>
        )) ?? <li>No Tasks</li>}
      </ul>
    </main>
  );
}
