"use client";

import { useState, useEffect } from "react";
import { generateClient, SelectionSet } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "@/app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { useAuthenticator } from "@aws-amplify/ui-react";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default async function Page({ params }: { params: { id: string } }) {
  const { signOut } = useAuthenticator();
  const project = await client.models.Project.get({ id: params.id });

  const [tasks, setTasks] = useState<Array<Schema["Task"]["type"]>>([]);

  const loadTasks = async function () {
    const pTasks = await project.data?.tasks();
    if (pTasks && pTasks.data) {
      setTasks(pTasks.data);
    }
  };

  useEffect(() => {
    loadTasks();
  });

  return (
    <main>
      <button onClick={signOut}>Sign out</button>
      <h1>Project - {project.data?.title}</h1>
      <h2>Tasks</h2>
      <ul>
        {tasks.map((t) => (
          <li>
            <div>
              <h3>{t.title}</h3>
              <p>{t.description}</p>
              <p>{t.status}</p>
              <p>{t.dueDate}</p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
