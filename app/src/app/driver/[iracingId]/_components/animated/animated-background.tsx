"use client";

import { motion } from "framer-motion";

export const AnimatedRacingBackground = () => {
  return (
    <div className="pointer-events-none fixed inset-0 h-full min-h-screen w-screen overflow-hidden">
      {/* Racing track elements */}
      <motion.div
        className="absolute -right-20 top-10 h-40 w-40 rounded-full border border-primary/20 opacity-20"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute left-10 top-1/4 h-20 w-20 rounded-full border border-primary/20 opacity-10"
        animate={{
          rotate: [0, -360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/3 h-60 w-60 rounded-full border border-primary/20 opacity-20"
        animate={{
          rotate: [0, 180, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Subtle gradient effects */}
      <div className="absolute bottom-0 left-0 right-0 h-1/6 bg-gradient-to-t from-background/10 to-transparent opacity-30" />

      {/* Speed lines */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_50%,rgba(0,0,0,0),rgba(234,179,8,0.03)_30%)]" />
    </div>
  );
};

