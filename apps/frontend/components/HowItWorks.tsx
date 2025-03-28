import { containerVariants, itemVariants } from "@/lib/animation-variant";
import { motion } from "framer-motion";
import { PlayCircle } from "lucide-react";

const steps = [
  { title: "Sign Up", description: "Create an account and get started with Fizz." },
  { title: "Choose a Template", description: "Pick a design and customize it to your needs." },
  { title: "Deploy", description: "Publish your app with a single click." },
];

export default function HowItWorksSection() {
  return (
    <motion.section
      className="py-20 px-4 text-center bg-gray-100 dark:bg-gray-900"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"  // 👈 Trigger animation when in viewport
      viewport={{ once: false, amount: 0.2 }} // 👈 Controls when the animation starts
    >
      <motion.h2 className="text-3xl font-bold mb-6" variants={itemVariants}>
        How It Works
      </motion.h2>
      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="p-6 border rounded-xl shadow-lg flex flex-col items-center bg-white dark:bg-gray-800"
            variants={itemVariants}
            whileInView="visible"  // 👈 Ensures each item animates on scroll
            viewport={{ once: false, amount: 0.2 }}
          >
            <PlayCircle className="w-10 h-10 text-green-500 mb-4" />
            <h3 className="text-xl font-semibold">{step.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
