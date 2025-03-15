"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface BlurTextProps {
  children: React.ReactNode;
  className?: string;
  variant?: {
    hidden: { filter: string; opacity: number };
    visible: { filter: string; opacity: number };
  };
  duration?: number;
}
const BlurText = ({
  children,
  className,
  variant,
  duration = 1,
}: BlurTextProps) => {
  const defaultVariants = {
    hidden: { filter: "blur(10px)", opacity: 0, y: 15 },
    visible: { filter: "blur(0px)", opacity: 1, y: 0 },
  };
  const combinedVariants = variant || defaultVariants;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      transition={{ duration }}
      variants={combinedVariants}
      className={cn("drop-shadow-sm", className)}
    >
      {children}
    </motion.div>
  );
};

export default BlurText;
