"use client";

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { containerVariants, itemVariants } from "@/lib/animation-variant";
import { Header } from "./Header";
import { ThemeButton } from "./ThemeButton";

export function AppBar() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex items-center justify-between mt-4"
    >
      <Header />

      <motion.div
        variants={itemVariants}
        className="flex gap-2 items-center justify-center"
      >
        <ThemeButton />
        <SignedOut>
          <SignInButton>
            <button className="border border-zinc-800 hover:bg-zinc-600/10 bg-zinc-900 cursor-pointer px-4 py-2 rounded-3xl">
              Sign In
            </button>
          </SignInButton>
          <SignUpButton>
            <button className="border border-zinc-800 hover:bg-zinc-600/10 bg-zinc-900 cursor-pointer px-4 py-2 rounded-3xl">
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
