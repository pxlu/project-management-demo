"use client";

import { useState, useEffect } from "react";
import { generateClient, SelectionSet } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { useAuthenticator } from "@aws-amplify/ui-react";
import Link from "next/link";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function App() {
  const { signOut } = useAuthenticator();

  const dashboardSelectionSet = [
    "title",
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

  const populateDashboard = async function () {
    const { data: projects } = await client.models.Project.list({
      selectionSet: dashboardSelectionSet,
    });
    setDashboardProjects(projects);
  };

  useEffect(() => {
    populateDashboard();
  }, []);

  function createProhject() {
    client.models.Project.create({
      title: window.prompt("Project name"),
    });
  }

  return (
    <main>
      <button onClick={signOut}>Sign out</button>
      <h1>My Projects</h1>
      <button onClick={createProhject}>+ new</button>
      <div>
        <h1>Dashboard</h1>
        {dashboardProjects.map((p) => (
          <Link href="">
            <h2>{p.title}</h2>
            <h3>Tasks = {p.tasks.length}</h3>
            <h4>
              Completed:{" "}
              {(p.tasks.filter((t) => t.status === "completed").length /
                p.tasks.length) *
                100}
              %
            </h4>
            <ul>
              {p.tasks.map((t) => (
                <li>{t.title}</li>
              ))}
            </ul>
          </Link>
        ))}
      </div>
    </main>
  );
}
