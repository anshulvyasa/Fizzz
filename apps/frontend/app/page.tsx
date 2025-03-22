"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppBar } from "@/components/AppBar";
import { ClerkProvider } from "@clerk/nextjs";

export default function Home() {
  return (
    <ClerkProvider>
      <SidebarProvider>
        <div>
          <AppBar />
        </div>
      </SidebarProvider>
    </ClerkProvider>
  );
}
