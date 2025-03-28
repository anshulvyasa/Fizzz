import { SunDim, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface OuterLayerProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const OuterLayer = ({ children, className, onClick }: OuterLayerProps) => {
  return (
    <button
      className={cn(
        "flex items-center justify-center rounded-full bg-white dark:bg-black/50 h-[2rem] w-[2rem]",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const ThemeButton = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isDark = theme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="relative flex items-center w-[4rem] h-[2rem] bg-zinc-100 dark:bg-zinc-900 cursor-pointer rounded-3xl border border-gray-400 hover:border-gray-500"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {/* Animated Button Moving Left or Right */}
      <motion.div
        className="absolute"
        initial={false}
        animate={{ x: isDark ? "1.9rem" : "0.1rem" }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <OuterLayer>
          {isDark ? (
            <Moon className="h-[1rem] w-[1rem] text-white" />
          ) : (
            <SunDim className="h-[1rem] w-[1rem] text-black" />
          )}
        </OuterLayer>
      </motion.div>
    </div>
  );
};
