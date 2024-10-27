import { defineAuth, defineFunction } from "@aws-amplify/backend";
import { allUsers } from "../data/all-users/resource";

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
  },
  access: (allow) => [allow.resource(allUsers).to(["listUsers"])],
});
