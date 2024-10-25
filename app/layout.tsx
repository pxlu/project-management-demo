"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import AcmeNavbar from "./components/AcmeNavbar";
import { Authenticator } from "@aws-amplify/ui-react";

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
