import { Button } from "@/components/ui/button";
import { containerVariants, itemVariants } from "@/lib/animation-variant";
import { SignInButton, useAuth } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { X } from "lucide-react";

export default function HeroSection() {
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const [isNotSignedIn, setIsNotSignedIn] = useState<boolean>(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      setIsNotSignedIn(false);
    }
  }, [isSignedIn]);

  const handleClick = () => {
    if (isNotSignedIn) {
      setIsDialogOpen(true);
    } else {
      router.push("/workspace");
    }
  };

  return (
    <motion.section
      className="flex flex-col items-center justify-center text-center py-20 px-4 bg-transparent text-black dark:text-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 className="text-5xl font-bold mb-4" variants={itemVariants}>
        Build Your Android App with AI
      </motion.h1>
      <motion.p className="text-lg max-w-2xl mb-6" variants={itemVariants}>
        Meet <span className="font-semibold">Fizz</span> – the AI-powered
        platform that lets you create Android applications effortlessly. No
        coding required, just your ideas!
      </motion.p>
      <motion.div variants={itemVariants}>
        <Button
          onClick={handleClick}
          className="px-6 py-3 text-lg font-medium bg-black text-white rounded-xl shadow-lg hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
        >
          Get Started
        </Button>
      </motion.div>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogOverlay className="fixed inset-0 backdrop-blur-[1px] bg-transparent" />
        <AlertDialogContent className="dark:bg-transparent bg-white/40 backdrop-blur-2xl dark:backdrop-blur-2xl text-black dark:text-white rounded-lg shadow-lg">
          <X
            className="absolute right-4 top-4 h-5 w-5 cursor-pointer rounded-sm p-0.5 text-black dark:text-white hover:bg-accent hover:text-foreground"
            onClick={() => setIsDialogOpen(false)}
          />
          <AlertDialogHeader>
            <AlertDialogTitle>You are not Signed In!</AlertDialogTitle>
            <AlertDialogDescription className="text-black dark:text-white">
              Please Sign In to continue...
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>
              <SignInButton>
                <span>Sign In</span>
              </SignInButton>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.section>
  );
}
