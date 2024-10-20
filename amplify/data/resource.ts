import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Task: a
    .model({
      title: a.string(),
      description: a.string(),
      dueDate: a.datetime(),
      priority: a.integer(),
      status: a.enum(["todo", "in_progress", "completed"]),
      owners: a
        .string()
        .array()
        .authorization((allow) => [allow.owner().to(["read"])]),
      projectId: a
        .id()
        .required()
        .authorization((allow) => [allow.owner().to(["read"])]),
      project: a.belongsTo("Project", "projectId"),
    })
    .authorization((allow) => [allow.ownersDefinedIn("owners")]),
  Project: a
    .model({
      title: a.string(),
      description: a.string(),
      dueDate: a.datetime(),
      priority: a.integer(),
      status: a.string(),
      tasks: a.hasMany("Task", "projectId"),
      owner: a.string().authorization((allow) => [allow.owner().to(["read"])]),
    })
    .authorization((allow) => allow.owner()),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
