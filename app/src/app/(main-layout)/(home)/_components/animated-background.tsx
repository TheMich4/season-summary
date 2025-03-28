"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

export const AnimatedBackground = () => {
  // Generate random values based on viewport dimensions
  const elements = useMemo(() => {
    return Array.from({ length: 15 }).map(() => ({
      width: Math.random() * 150 + 50,
      height: Math.random() * 150 + 50,
      left: `${Math.random() * 120 - 10}%`,  // Allow elements to extend slightly beyond edges
      top: `${Math.random() * 120 - 10}%`,   // Allow elements to extend slightly beyond edges
      xOffset: Math.random() * 40 - 20,
      yOffset: Math.random() * 40 - 20,
      duration: Math.random() * 7 + 6,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.2 + 0.1
    }));
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 h-screen w-screen overflow-hidden">
      {elements.map((element, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-primary/10"
          style={{
            width: element.width,
            height: element.height,
            left: element.left,
            top: element.top,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [element.opacity, element.opacity * 2, element.opacity],
            scale: [1, 1.2, 1],
            x: [0, element.xOffset, 0],
            y: [0, element.yOffset, 0],
          }}
          transition={{
            duration: element.duration,
            repeat: Infinity,
            repeatType: "reverse",
            delay: element.delay,
          }}
        />
      ))}
    </div>
  );
};