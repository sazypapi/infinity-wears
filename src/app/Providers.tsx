"use client";
import React from "react";
import { ThemeProvider } from "./theme-provider";
import { EdgeStoreProvider } from "@/lib/edgestore";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        // enableSystem
        disableTransitionOnChange
      >
        <EdgeStoreProvider>{children}</EdgeStoreProvider>
      </ThemeProvider>
    </>
  );
}

export default Providers;
