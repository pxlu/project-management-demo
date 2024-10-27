"use client";

import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { useEffect } from "react";
import { Hub } from "aws-amplify/utils";
import { useRouter } from "next/navigation";
import WelcomeSplash from "./components/WelcomeSplash/WelcomeSplash";

Amplify.configure(outputs);

const client = generateClient<Schema>({
  authMode: "userPool",
});

export default function App() {
  const router = useRouter();

  return <WelcomeSplash />;
}
