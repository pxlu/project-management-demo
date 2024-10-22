"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import AcmeNavbar from "./components/AcmeNavbar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <Navbar /> */}
        <AcmeNavbar />
        {children}
      </body>
    </html>
  );
}
