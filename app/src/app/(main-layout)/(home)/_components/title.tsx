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

  return (
    <h1 className="text-center text-3xl font-extrabold leading-tight tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
      {"Your iRacing"}
      <br className="block sm:hidden" />
      {" S"}
      <motion.p className={motionClassName}>
        {displayText as unknown as ReactNode}
      </motion.p>
      {" Summary"}
    </h1>
  );
};
