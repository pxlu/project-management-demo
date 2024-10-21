"use client";

import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { Authenticator } from "@aws-amplify/ui-react";
import { useEffect } from "react";
import { Hub } from "aws-amplify/utils";
import { useRouter } from "next/navigation";

Amplify.configure(outputs);

const client = generateClient<Schema>({
  authMode: "userPool",
});

export default function App() {
  const router = useRouter();

  useEffect(() => {
    Hub.listen("auth", (data) => {
      if (data?.payload?.event === "signedIn") {
        router.push("/projects");
      }
    });
  }, []);

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div>
          <button onClick={signOut}>Sign out</button>
        </div>
      )}
    </Authenticator>
  );
}
