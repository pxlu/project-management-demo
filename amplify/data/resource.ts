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
