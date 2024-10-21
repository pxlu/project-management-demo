"use client";

import { useState, useEffect } from "react";
import { generateClient, SelectionSet } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { useRouter } from "next/router";

Amplify.configure(outputs);

const client = generateClient<Schema>({
  authMode: "userPool",
});

export default function Page({ params }: { params: { id: string } }) {
  const projectEager = ["id", "title", "tasks.*"] as const;
  type ProjectSet = SelectionSet<
    Schema["Project"]["type"],
    typeof projectEager
  >;
  const [project, setProject] = useState<ProjectSet>({
    id: params.id,
    title: "loading...",
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
    <main>
      <h1>Project - {project.title}</h1>
      <h2>Tasks</h2>
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
