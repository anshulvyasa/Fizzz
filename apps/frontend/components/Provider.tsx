"use client";

import { ThemeProvider } from "next-themes";
import { ClerkProvider } from "@clerk/nextjs";
import { SidebarProvider } from "@/components/ui/sidebar";
import "../styles/clerk_styles.css";
import { AppSidebar } from "./AppSideBar";

function ClerkWithTheme({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <SidebarProvider defaultOpen={false}>
        <AppSidebar />
        {children}
      </SidebarProvider>
    </ClerkProvider>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ClerkWithTheme>{children}</ClerkWithTheme>
    </ThemeProvider>
  );
}
