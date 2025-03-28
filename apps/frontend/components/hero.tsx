import { Button } from "@/components/ui/button";
import { containerVariants, itemVariants } from "@/lib/animation-variant";
import { motion } from "framer-motion";


export default function HeroSection() {
  return (
    <motion.section 
      className="flex flex-col items-center justify-center text-center py-20 px-4 bg-transparent text-black dark:text-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 
        className="text-5xl font-bold mb-4"
        variants={itemVariants}
      >
        Build Your Android App with AI
      </motion.h1>
      <motion.p 
        className="text-lg max-w-2xl mb-6"
        variants={itemVariants}
      >
        Meet <span className="font-semibold">Fizz</span> – the AI-powered platform that lets you create Android applications effortlessly. No coding required, just your ideas!
      </motion.p>
      <motion.div variants={itemVariants}>
        <Button className="px-6 py-3 text-lg font-medium bg-black text-white rounded-xl shadow-lg hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
          Get Started
        </Button>
      </motion.div>
    </motion.section>
  );
}
