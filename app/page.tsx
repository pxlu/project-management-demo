"use client";

import { useState, useEffect } from "react";
import { generateClient, SelectionSet } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { Authenticator } from "@aws-amplify/ui-react";
import Link from "next/link";
import { Hub } from "aws-amplify/utils";

Amplify.configure(outputs);

const client = generateClient<Schema>({
  authMode: "userPool",
});

export default function App() {
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

  Hub.listen("auth", () => {
    populateDashboard();
  });

  useEffect(() => {
    populateDashboard();
  }, []);

  function createProhject() {
    client.models.Project.create({
      title: window.prompt("Project name"),
    });
  }

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <button onClick={signOut}>Sign out</button>
          <h1>My Projects</h1>
          <button onClick={createProhject}>+ new</button>
          <div>
            <h1>Dashboard</h1>
            {dashboardProjects.map((p) => (
              <Link href={"/project/${p.id}"}>
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
      )}
    </Authenticator>
  );
}
