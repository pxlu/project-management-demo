"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./app.css";
import { Authenticator } from "@aws-amplify/ui-react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Authenticator>
          {({ signOut, user }) => (
            <div>
              <button onClick={signOut}>Sign out</button>
              {children}
            </div>
          )}
        </Authenticator>
      </body>
    </html>
  );
}
