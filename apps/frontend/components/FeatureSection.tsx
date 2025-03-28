import { containerVariants, itemVariants } from "@/lib/animation-variant";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";


const features = [
  { title: "No Coding Required", description: "Create apps with ease using AI-powered tools." },
  { title: "Customizable Templates", description: "Choose from a variety of templates to suit your needs." },
  { title: "Fast Deployment", description: "Deploy your app to the Play Store quickly and effortlessly." },
];

export default function FeatureSection() {
  return (
    <motion.section
      className="py-20 px-4 text-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2 className="text-3xl font-bold mb-6" variants={itemVariants}>
        Key Features
      </motion.h2>
      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="p-6 border rounded-xl shadow-lg flex flex-col items-center backdrop-blur-[1.5px]"
            variants={itemVariants}
          >
            <CheckCircle className="w-10 h-10 text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
