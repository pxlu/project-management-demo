import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Task: a
    .model({
      title: a.string(),
      description: a.string(),
      dueDate: a.datetime(),
      priority: a.enum(["high", "medium", "low"]),
      status: a.enum(["todo", "in_progress", "completed"]),
      owners: a
        .string()
        .array()
        .authorization((allow) => [
          allow.ownersDefinedIn("owners").to(["read"]),
          allow.owner(),
        ]),
      projectId: a
        .id()
        .authorization((allow) => [
          allow.ownersDefinedIn("owners").to(["read"]),
          allow.owner(),
        ]),
      project: a.belongsTo("Project", "projectId"),
    })
    .authorization((allow) => [allow.ownersDefinedIn("owners"), allow.owner()]),
  Project: a
    .model({
      title: a.string(),
      description: a.string(),
      startDate: a.datetime(),
      endDate: a.datetime(),
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
      priority: a.enum(["high", "medium", "low"]),
      status: a.enum(["on_hold", "in_progress", "completed"]),
      tasks: a.hasMany("Task", "projectId"),
      teamMembers: a.string().array(),
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
