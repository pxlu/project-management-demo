"use client";

import { useState, useEffect } from "react";
import { generateClient, SelectionSet } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "@/app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import Link from "next/link";
import ProjectCreate from "@/ui-components/ProjectCreateForm";
import { stringRequired } from "./validators";
import Project from "@/app/components/Project";

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
    setDashboardProjects(projects);
  };

  useEffect(() => {
    populateDashboard();
  }, []);

  function createProject() {
    setShowCreate(!showCreate);
  }

  function CreateForm() {
    if (showCreate) {
      return (
        <ProjectCreate
          onSuccess={populateDashboard}
          onError={window.alert}
          onValidate={{ title: stringRequired }}
        />
      );
    }

    return <div></div>;
  }

  return (
    <main>
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-4xl font-bold p-8">My Projects</h1>
        <button
          className="rounded-2xl bg-slate-500 h-10 w-1/6 float-right mr-10"
          onClick={createProject}
        >
          Create New Project
        </button>
      </div>
      <CreateForm />
      <div>
        {/* {dashboardProjects.map((p) => (
          <Link href={`/projects/${p.id}`} key={p.id}>
            <h2>{p.title}</h2>
            <h3>Tasks = {p.tasks.length}</h3>
            <h4>
              Completed:{" "}
              {p.tasks.length
                ? (p.tasks.filter((t) => t.status === "completed").length /
                    p.tasks.length) *
                  100
                : 0}
              %
            </h4>
            <ul>
              {p.tasks.map((t) => (
                <li>{t.title}</li>
              ))}
            </ul>
          </Link>
        ))} */}
        {dashboardProjects.map((p) => (
          // <Link href={`/projects/${p.id}`} key={p.id}>
          <Project key={p.id} {...p} />
          // </Link>
        ))}
      </div>
    </main>
  );
}
