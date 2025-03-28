"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface AnimatedCardProps {
  children: ReactNode;
  position?: "left" | "right";
}

export const AnimatedCard = ({ 
  children, 
  position = "right" 
}: AnimatedCardProps) => {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-xl border border-primary/30 bg-background/60 p-6 backdrop-blur-md transition-colors hover:border-primary/60 hover:shadow-[0_0_40px_rgba(234,179,8,0.15)]"
      style={{ 
        willChange: "opacity",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        WebkitFontSmoothing: "subpixel-antialiased"
      }}
    >
      <div 
        className={`absolute ${
          position === "right" ? "-right-6 -top-6" : "-left-6 -top-6"
        } h-24 w-24 rounded-full bg-primary/30 blur-2xl group-hover:bg-primary/40`} 
      />
      {children}
    </motion.div>
  );
}; 