"use client";

import { motion } from "framer-motion";

interface GlowingAccentProps {
  position: string;
}

export const GlowingAccent = ({ position }: GlowingAccentProps) => {
  const positionClasses = {
    "top-right": "-right-10 -top-10",
    "bottom-left": "-left-10 -bottom-10",
    "top-left": "-left-10 -top-10",
    "bottom-right": "-right-10 -bottom-10",
  }[position] || "-right-10 -top-10";

  return (
    <motion.div 
      className={`absolute ${positionClasses} h-40 w-40 rounded-full bg-primary/20 blur-3xl`}
      initial={{ opacity: 0.3, scale: 0.9 }}
      animate={{ 
        opacity: [0.3, 0.5, 0.3], 
        scale: [0.9, 1.1, 0.9] 
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      aria-hidden="true" 
    />
  );
}; 