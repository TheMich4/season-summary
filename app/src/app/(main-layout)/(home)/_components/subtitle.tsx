"use client";

import { useTypedTextLoop } from "@/hooks/use-typed-text-loop";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

const texts = ["this", "that", "any"];

export const Subtitle = () => {
  const displayText = useTypedTextLoop(texts, { duration: 3 });

  const words = ["See", "how", "you", "did"];
  const lastWords = ["season!"];

  return (
    <motion.div 
      className="flex flex-wrap items-center justify-center gap-1 text-center text-lg text-muted-foreground sm:text-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <div className="flex flex-wrap items-center justify-center gap-1">
        {words.map((word, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
            className="inline-block"
          >
            {word}
          </motion.span>
        ))}
        <motion.span
          className="relative mx-1 inline-flex h-9 min-w-16 items-center justify-center overflow-hidden rounded-md bg-primary/10 px-2 font-semibold text-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
        >
          <motion.span
            className="absolute inset-0 bg-primary/10"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          />
          <motion.span className="relative z-10">
            {(displayText as unknown as ReactNode) || <span className="opacity-0">this</span>}
          </motion.span>
        </motion.span>
        {lastWords.map((word, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 + index * 0.1, duration: 0.3 }}
            className="inline-block"
          >
            {word}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};
