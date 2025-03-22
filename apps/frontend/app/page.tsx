import { ThemeButton } from "@/components/ThemeButton";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";


export default function Home() {
  return (
    <SidebarProvider>
      <div>
        <ThemeButton />
        <Header>Click me</Header>
      </div>
    </SidebarProvider>
  );
}
