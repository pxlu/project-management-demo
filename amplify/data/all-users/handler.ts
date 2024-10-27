import type { ClientSchema } from "@aws-amplify/backend";
import { a, defineData } from "@aws-amplify/backend";
import { allUsers } from "./resource";

const schema = a.schema({
  allUsers: a
    .mutation()
    .arguments({
      userId: a.string().required(),
    })
    .handler(a.handler.function(allUsers))
    .returns(a.json()),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "iam",
  },
});
