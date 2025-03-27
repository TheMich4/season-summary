"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FloatingStatIconProps {
  icon: ReactNode;
  position: string;
  delay?: number;
}

export const FloatingStatIcon = ({ 
  icon, 
  position,
  delay = 0 
}: FloatingStatIconProps) => {
  // Calculate position based on string input
  const positionClasses = {
    "top-left": "top-8 left-8",
    "top-right": "top-8 right-8",
    "bottom-left": "bottom-8 left-8",
    "bottom-right": "bottom-8 right-8",
    "center-left": "top-1/2 -translate-y-1/2 left-8",
    "center-right": "top-1/2 -translate-y-1/2 right-8",
    "center-top": "left-1/2 -translate-x-1/2 top-8",
    "center-bottom": "left-1/2 -translate-x-1/2 bottom-8",
  }[position] || "top-8 right-8";

  return (
    <motion.div
      className={`pointer-events-none absolute ${positionClasses} z-10 flex h-16 w-16 items-center justify-center rounded-full bg-background/80 text-primary shadow-lg backdrop-blur-md`}
      initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        rotate: 0,
        y: [0, -8, 0]
      }}
      transition={{
        delay,
        duration: 3,
        y: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
    >
      {icon}
    </motion.div>
  );
}; 