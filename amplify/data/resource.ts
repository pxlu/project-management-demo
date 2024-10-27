import {
  type ClientSchema,
  a,
  defineData,
  defineFunction,
} from "@aws-amplify/backend";

const taskHandler = defineFunction({
  entry: "./tasks/handler.ts",
});

const schema = a.schema({
  Task: a
    .model({
      title: a.string(),
      description: a.string(),
      dueDate: a.datetime(),
      priority: a.ref("PriorityEnum").required(),
      status: a.ref("StatusEnum").required(),
      owners: a
        .string()
        .array()
        .authorization((allow) => [
          allow.ownersDefinedIn("owners").to(["read"]),
          allow.owner(),
        ]),
      owner: a.string().authorization((allow) => [allow.owner().to(["read"])]),
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
      title: a
        .string()
        .authorization((allow) => [
          allow.owner(),
          allow.ownersDefinedIn("teamMembers").to(["read"]),
        ]),
      description: a
        .string()
        .authorization((allow) => [
          allow.owner(),
          allow.ownersDefinedIn("teamMembers").to(["read"]),
        ]),
      startDate: a
        .datetime()
        .authorization((allow) => [
          allow.owner(),
          allow.ownersDefinedIn("teamMembers").to(["read"]),
        ]),
      endDate: a
        .datetime()
        .authorization((allow) => [
          allow.owner(),
          allow.ownersDefinedIn("teamMembers").to(["read"]),
        ]),
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
      priority: a
        .ref("PriorityEnum")
        .required()
        .authorization((allow) => [
          allow.owner(),
          allow.ownersDefinedIn("teamMembers").to(["read"]),
        ]),
      status: a
        .ref("StatusEnum")
        .required()
        .authorization((allow) => [
          allow.owner(),
          allow.ownersDefinedIn("teamMembers").to(["read"]),
        ]),
      tasks: a.hasMany("Task", "projectId"),
      teamMembers: a.string().array(),
      owner: a.string().authorization((allow) => [allow.owner().to(["read"])]),
    })
    .authorization((allow) => allow.owner()),
  PriorityEnum: a.enum(["high", "medium", "low"]),
  StatusEnum: a.enum(["on_hold", "in_progress", "completed"]),

  // CreateTask: a
  //   .mutation()
  //   .arguments({
  //     title: a.string(),
  //     description: a.string(),
  //     dueDate: a.datetime(),
  //     priority: a.integer(),
  //     status: a.integer(),
  //     owners: a.string().array(),
  //     projectId: a.id(),
  //   })
  //   .returns(a.ref("Task"))
  //   .authorization((allow) => [allow.authenticated()])
  //   .handler(a),
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
