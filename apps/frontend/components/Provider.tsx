"use client";

import { ThemeProvider, useTheme } from "next-themes";
import { ClerkProvider } from "@clerk/nextjs";
import { SidebarProvider } from "@/components/ui/sidebar";
import "../styles/clerk_styles.css";
import { AppSidebar } from "./AppSideBar";

// Inner component to access theme
function ClerkWithTheme({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  return (
    <ClerkProvider>
      <SidebarProvider>
        <AppSidebar />
        {children}
      </SidebarProvider>
    </ClerkProvider>
  );
}

// Outer Providers component
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
