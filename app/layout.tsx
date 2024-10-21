"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import Navbar from "../ui-components/navbar/Navbar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="pb-8">
          <Navbar />
        </div>
        {children}
      </body>
    </html>
  );
}
