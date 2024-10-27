"use client";

import { Inter } from "next/font/google";
import AcmeNavbar from "./components/AcmeNavbar";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css"; // default theme
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Authenticator.Provider>
      <html lang="en">
        <body className={inter.className}>
          <AcmeNavbar />
          {children}
        </body>
      </html>
    </Authenticator.Provider>
  );
}
