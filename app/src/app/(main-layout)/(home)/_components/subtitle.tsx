"use client";

import { useTypedTextLoop } from "@/hooks/use-typed-text-loop";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

const texts = ["this", "that", "any"];

export const Subtitle = () => {
  const displayText = useTypedTextLoop(texts, { duration: 3 });

  return (
    <p className="max-w-[700px] text-center text-lg text-muted-foreground sm:text-xl">
      {"See how you did "}
      <motion.span>{displayText as unknown as ReactNode}</motion.span>
      {" season!"}
    </p>
  );
};
