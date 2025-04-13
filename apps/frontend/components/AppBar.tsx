"use client";

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { color, motion } from "motion/react";
import { containerVariants, itemVariants } from "@/lib/animation-variant";
import { Header } from "./Header";
import { ThemeButton } from "./ThemeButton";
import { useTheme } from "next-themes";

export function AppBar() {
  const { theme } = useTheme();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex w-full h-14 items-center justify-between bg-transparent backdrop-blur-xs p-3 px-2 border-b border-gray-400  dark:border-zinc-800 "
    >
      <Header />

      <motion.div
        variants={itemVariants}
        className="flex gap-2 items-center justify-center"
      >
        <ThemeButton />
        <SignedOut>
          <SignInButton>
            <button className="border border-zinc-800/10 hover:bg-zinc-900/10 bg-zinc-600/10 cursor-pointer px-4 py-2 rounded-3xl text-gray-700 hover:text-black dark:text-white/80 ">
              Sign In
            </button>
          </SignInButton>
          <SignUpButton>
            <button className="border border-zinc-800/10 hover:bg-zinc-900/10 bg-zinc-600/10 cursor-pointer px-4 py-2 rounded-3xl  text-gray-700 hover:text-black dark:text-white/80">
              Sign Up
            </button>
          </SignUpButton>
        </SignedOut>

        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                userButtonPopoverMain: {
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  backgroundColor:
                    theme === "dark"
                      ? "rgba(18, 24, 38, 0.85)"
                      : "rgba(255, 255, 255, 0.9)",
                  color: theme === "dark" ? "#E0E7FF" : "#333",
                  fontWeight: "bolder",
                  borderRadius: "12px",
                  padding: "12px",
                  border:
                    theme === "dark"
                      ? "1.5px solid rgba(144, 158, 255, 0.25)"
                      : "1.5px solid rgba(200, 200, 200, 0.5)",
                  boxShadow:
                    theme === "dark"
                      ? "0 0 10px rgba(120, 130, 200, 0.15)"
                      : "0 4px 10px rgba(0, 0, 0, 0.08)",
                },
                userButtonPopoverActionButton: {
                  color: theme === "dark" ? "#C3BFF2" : "#4A4A4A",
                  transition: "all 0.3s ease-in-out",
                  borderRadius: "8px",
                  padding: "8px 14px",
                },
                userButtonPopoverFooter: {
                  backgroundColor: "yellow !important",
                  height: "50px",
                  backdropFilter: "blur(10px)",
                },
              },
            }}
          />
        </SignedIn>
      </motion.div>
    </motion.div>
  );
}
