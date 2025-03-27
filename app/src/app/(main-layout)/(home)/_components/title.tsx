"use client";

import { useTypedTextLoop } from "@/hooks/use-typed-text-loop";
import { getRandomSeason } from "@/lib/season";
import { motion } from "framer-motion";
import { useState, type ReactNode } from "react";

const getSeasonString = () => {
  const { season, year } = getRandomSeason();

  return `${season}${year}`;
};

const texts = ["eason", "random"];

const getBaseText = (index: number) => {
  if (index === 0) {
    return texts[index] ?? "";
  }

  return getSeasonString();
};

export const Title = () => {
  const [motionClassName, setMotionClassName] = useState("inline-block");

  const displayText = useTypedTextLoop(texts, {
    getBaseText,
    onUpdateToInitial: () => {
      setMotionClassName("inline-block");
    },
    onUpdateToNext: () => {
      setMotionClassName(
        "first-letter:text-primary text-2xl sm:text-3xl md:text-4xl lg:text-5xl inline-block font-black",
      );
    },
  });

  // Animation variants for text elements
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <motion.h1 
      className="text-center text-3xl font-extrabold leading-tight tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.span 
        className="relative inline-block px-1"
        variants={item}
      >
        <motion.span 
          className="absolute -inset-x-1 -inset-y-1 -z-10 block rounded-lg bg-primary/10"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        />
        <span className="relative z-10">Your iRacing</span>
      </motion.span>
      <br className="block sm:hidden" />
      <motion.span 
        className="relative mx-1 inline-block" 
        variants={item}
      >
        {"S"}
        <motion.p className={motionClassName}>
          {displayText as unknown as ReactNode}
        </motion.p>
      </motion.span>
      <motion.span 
        className="relative inline-block bg-gradient-to-r from-primary to-yellow-400 bg-clip-text pl-1 font-black text-transparent"
        variants={item}
      >
        {"Summary"}
        <motion.span 
          className="absolute -bottom-2 left-0 h-1 w-0 bg-primary"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 1, duration: 0.8 }}
        />
      </motion.span>
    </motion.h1>
  );
};
