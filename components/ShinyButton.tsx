"use client";

import { motion, Variant } from "framer-motion";
import { ReactNode } from "react";

const ShinyButton = ({ children }: { children: ReactNode }) => {
  const variants: Record<string, Variant> = {
    initial: { "--x": "100%", scale: 1 } as any,
    animate: { "--x": "-100%" } as any,
    whileTap: { scale: 0.97 },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileTap="whileTap"
      variants={variants}
      transition={{
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 1,
        duration: 1.5,
        ease: "linear",
        scale: {
          type: "spring",
          stiffness: 10,
          damping: 5,
          mass: 0.1,
        },
      }}
      style={{ "--x": "100%" } as React.CSSProperties}
      className="h-[2.5rem] mb-3 sm:mb-0 sm:h-[3rem] px-6 py-2.5 rounded-[2.5px] relative radial-gradient"
    >
      <span className="text-black text-base sm:text-xl tracking-wide h-full w-full relative linear-mask font-space-grotesk flex items-center">
        {children}
      </span>
      <span className="block absolute inset-0 rounded-[2.5px] p-px linear-overlay" />
    </motion.div>
  );
};

export default ShinyButton;
