"use client";

import { useState, useEffect } from "react";
import { generateClient, SelectionSet } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import Link from "next/link";
import { Hub } from "aws-amplify/utils";
import ProjectCreate, {
  ValidationResponse,
} from "@/ui-components/ProjectCreateForm";
import { ProjectCreateFormValidationValues } from "@/ui-components/ProjectCreateForm";

Amplify.configure(outputs);

const client = generateClient<Schema>({
  authMode: "userPool",
});

export default function App() {
  const dashboardSelectionSet = [
    "id",
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

  function createProhject() {
    setShowCreate(!showCreate);
  }

  function stringRequired(i: string, vr: ValidationResponse) {
    if (!i) {
      vr.hasError = true;
      vr.errorMessage = "Field is required";
    }
    return vr;
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
      <h1>My Projects</h1>
      <button onClick={createProhject}>+ new</button>
      <CreateForm />
      <div>
        <h1>Dashboard</h1>
        {dashboardProjects.map((p) => (
          <Link href={`/project/${p.id}`} key={p.id}>
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
        ))}
      </div>
    </main>
  );
}
