import { itemVariants } from "@/lib/animation-variant";
import { motion } from "motion/react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { Logo } from "./Logo";

export const Header = ({
  children,
  className,
  onClick,
}: {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  const { isSignedIn } = useAuth();

  return (
    <motion.div variants={itemVariants} className="flex items-center gap-2">
      {isSignedIn && (
        <SidebarTrigger
          variant="link"
          className="[&_svg:not([class*='size-'])]:size-5 cursor-pointer"
        />
      )}
      <span className="font-bold tracking-wider text-2xl sm:text-3xl ">Fizz</span>
      <Link href="/">
        <Image src={'/logo.svg'} alt="Logo" height={25} width={25}/>
      </Link>

      {children && (
        <Button
          variant="link"
          data-sidebar="trigger"
          data-slot="sidebar-trigger"
          size="icon"
          className={cn(
            "h-7 w-7 [&_svg:not([class*='size-'])]:size-5 cursor-pointer",
            className
          )}
          onClick={onClick}
        >
          {children}
        </Button>
      )}
    </motion.div>
  );
};
