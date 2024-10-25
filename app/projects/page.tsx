"use client";

import { useState, useEffect, useCallback } from "react";
import { generateClient, SelectionSet } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import Project from "@/app/components/Project";
import ProjectCreateModal from "../components/ProjectCreateModal/ProjectCreateModal";

Amplify.configure(outputs);

const client = generateClient<Schema>({
  authMode: "userPool",
});

export default function App() {
  const dashboardSelectionSet = [
    "id",
    "title",
    "description",
    "priority",
    "startDate",
    "endDate",
    "updatedAt",
    "createdAt",
    "status",
    "tasks.title",
    "tasks.status",
  ] as const;
  type DashboardProject = SelectionSet<
    Schema["Project"]["type"],
    typeof dashboardSelectionSet
  >;
  const [dashboardProjects, setDashboardProjects] = useState<
    DashboardProject[]
  >([]);
  const [showCreate, setShowCreate] = useState(false);

  const populateDashboard = async function () {
    const { data: projects } = await client.models.Project.list({
      selectionSet: dashboardSelectionSet,
    });
    setShowCreate(false);
    setDashboardProjects(projects);
  };

  useEffect(() => {
    populateDashboard();
  }, []);

  const createProject = () => {
    setShowCreate(true);
  };

  return (
    <main>
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-4xl font-bold p-8">My Projects</h1>
        <button
          className="rounded-2xl bg-[#579dff] h-10 px-4 float-right mr-10"
          onClick={createProject}
        >
          <span className="font-semibold"> Create New Project</span>
        </button>
      </div>

      <ProjectCreateModal isOpen={showCreate} onSuccess={populateDashboard} />
      <div className="flex flex-row flex-wrap">
        {dashboardProjects.map((p) => (
          <Project key={p.id} {...p} />
        ))}
      </div>
    </main>
  );
}
