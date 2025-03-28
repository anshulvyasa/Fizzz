"use client";

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { motion } from "motion/react";
import { containerVariants, itemVariants } from "@/lib/animation-variant";
import { Header } from "./Header";
import { ThemeButton } from "./ThemeButton";

export function AppBar() {
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
          <UserButton />
        </SignedIn>
      </motion.div>
    </motion.div>
  );
}
