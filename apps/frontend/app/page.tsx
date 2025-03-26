"use client";

import { AppBar } from "@/components/AppBar";
import { useTheme } from "next-themes";

export default function Home() {
  const { theme } = useTheme(); // Get current theme

  return (
    <div className="relative h-full w-full ">
      <div
        className={`absolute inset-0 -z-10 h-full w-full transition-colors duration-500 ${
          theme === "dark"
            ? "bg-black bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"
            : "bg-white bg-[radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"
        } `}
      />

      <div className="h-screen w-full">
        <div className="relative z-10">
          <AppBar />
        </div>
      </div>
    </div>
  );
}
