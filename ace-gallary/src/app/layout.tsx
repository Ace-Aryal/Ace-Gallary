import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import TopNav from "./_components/top-nav";

export const metadata: Metadata = {
  title: "Ace Gallary",
  description: "Created by Dipesh Aryal , T# stack developer",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${geist.variable} bg-white text-zinc-800`}>
        <body>
          <TopNav />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
