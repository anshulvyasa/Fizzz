"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { containerVariants, itemVariants } from "@/lib/animation-variant";
import { Button } from "./ui/button";
import axios from "axios";
import { BackEnd_URL } from "@/config";
import { Textarea } from "./ui/textarea";
import { ChevronRight, Lightbulb, MoveUpRight } from "lucide-react";
import { prompts } from "@/lib/constants";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Prompts() {
  const [isNotSignedIn, setIsNotSignedIn] = useState<boolean>(false);
  const promtRef = useRef<HTMLTextAreaElement>(null);
  const [prompt, setPrompt] = useState<string>("");
  const [type, setType] = useState<"NEXTJS" | "REACT" | "REACT_NATIVE">(
    "NEXTJS"
  );

  const { getToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (promtRef.current) {
      promtRef.current.focus();
    }
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token =await getToken();
    if (!token) {
      setIsNotSignedIn(true);
    }

    const response = await axios.post(
      `${BackEnd_URL}/project`,
      {
        prompt: prompt,
        type: type,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    router.push(`/project/${response.data.projectId}?initPrompt=${prompt}`);
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <div className="px-4 py-2 sm:static sm:w-auto fixed bottom-0 left-0 w-full">
        <div className="flex flex-row gap-2 mb-4">
          <Button
            variant={type == "REACT" ? "default" : "outline"}
            onClick={() => setType("REACT")}
          >
            React
          </Button>
          <Button
            variant={type == "NEXTJS" ? "default" : "outline"}
            onClick={() => setType("NEXTJS")}
          >
            NextJs
          </Button>
          <Button
            variant={type == "REACT_NATIVE" ? "default" : "outline"}
            onClick={() => setType("REACT_NATIVE")}
          >
            React Native
          </Button>
        </div>
        <motion.form
          variants={itemVariants}
          onSubmit={(e) => onSubmit(e)}
          className="relative w-full border-2 bg-gray-500/10 focus-within:outline-1 focus-within:outline-teal-300/30 rounded-xl"
        >
          <div className="p-2">
            <Textarea
              ref={promtRef}
              value={prompt}
              placeholder="Write your prompt here ..."
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full placeholder:text-gray-400/60 bg-transparent border-none shadow-none text-sm rounded-none focus-visible:ring-0 min-h-16 max-h-80 resize-none outline-none"
            />
          </div>

          <div className="p-2 flex items-center justify-end">
            <Button
              type="submit"
              className="h-10 w-10 cursor-pointer rounded-full bg-teal-200 border dark:bg-teal-200/10 hover:bg-teal-300/20 flex items-center justify-center"
              disabled={!prompt}
            >
              <MoveUpRight className="h-10 w-10 text-teal-500 dark:text-teal-400/80" />
            </Button>
          </div>
        </motion.form>
      </div>

      <div className=" w-10 h-10 rounded-full absolute left-2 sm:static dark:bg-transparent backdrop-blur-2xl border border-gray-500 dark:text-white flex items-center justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger className=" bg-transparent">
            <Lightbulb />
          </DropdownMenuTrigger>
          <DropdownMenuContent className=" bg-transparent backdrop-blur-lg sm:absolute left-0  sm:max-w-[60vw] border border-white overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <DropdownMenuLabel>Try To</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup className="min-w-[70vw] max-w-[80vw] ">
              <motion.div variants={itemVariants} className="w-full">
                {prompts.map((prompt) => (
                  <div
                    key={prompt.id}
                    onClick={() => setPrompt(prompt.title)}
                    className=" cursor-pointer px-4 py-2"
                  >
                    <DropdownMenuItem>{prompt.title}</DropdownMenuItem>
                  </div>
                ))}
              </motion.div>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* <motion.div
        variants={itemVariants}
        className="min-w-[70vw] max-w-[80vw] hidden sm:block"
      >
        {prompts.map((prompt) => (
          <div
            key={prompt.id}
            onClick={() => setPrompt(prompt.title)}
            className="border  cursor-pointer px-4 py-2 rounded-xl "
          >
            <p className="text-gray-400/80 text-sm">{prompt.title}</p>
          </div>
        ))}
      </motion.div> */}

      <AlertDialog open={isNotSignedIn} onOpenChange={setIsNotSignedIn}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex items-center gap-2">
              <ChevronRight className="text-teal-400/60" />
              <AlertDialogTitle>You are not signed in</AlertDialogTitle>
            </div>
            <AlertDialogDescription className="text-white/80">
              Please sign in to access this feature. Your data is safe and will
              not be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer text-white hover:text-teal-400 focus-visible:outline-none focus-visible:ring-0">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction className="cursor-pointer text-white hover:text-teal-400">
              Sign In
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
}
