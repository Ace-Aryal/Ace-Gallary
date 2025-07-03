import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import TopNav from "./_components/top-nav";
import "@uploadthing/react/styles.css";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import type React from "react";
import { Toaster, toast } from "sonner";
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
  model,
}: Readonly<{ children: React.ReactNode; model: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${geist.variable} bg-white text-zinc-800`}>
        <body className="flex min-h-screen flex-col">
          <Toaster position="bottom-right" richColors />
          <NextSSRPlugin
            /**
             * The `extractRouterConfig` will extract **only** the route configs
             * from the router to prevent additional information from being
             * leaked to the client. The data passed to the client is the same
             * as if you were to fetch `/api/uploadthing` directly.
             */
            routerConfig={extractRouterConfig(ourFileRouter)}
          />
          <TopNav />
          <main className="flex flex-1 flex-col">
            {children}
            {model}
            <div id="modal-root" />
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
