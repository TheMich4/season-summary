"use client";

import { getRandomSeason } from "@/lib/season";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { type ReactNode, useEffect, useState } from "react";

const getSeasonString = () => {
  const { season, year } = getRandomSeason();

  return `${season}${year}`;
};

export const Title = () => {
  const isInitialRender = useMotionValue(true);
  const textIndex = useMotionValue(0);
  const texts = ["Season", "random"];
  const baseText = useTransform(textIndex, (latest) =>
    latest === 0 ? texts[latest] || "" : getSeasonString(),
  );
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) =>
    isInitialRender.get() === true ? texts[0] : baseText.get().slice(0, latest),
  );
  const updatedThisRound = useMotionValue(true);

  const [motionClassName, setMotionClassName] = useState("inline-block");

  useEffect(() => {
    void animate(count, 30, {
      type: "tween",
      duration: 5,
      ease: "easeIn",
      repeat: Infinity,
      repeatType: "reverse",
      repeatDelay: 0.1,
      onUpdate(latest) {
        if (isInitialRender.get() === true && latest > 5) {
          isInitialRender.set(false);
        }
        if (updatedThisRound.get() === true && latest > 0) {
          updatedThisRound.set(false);
        } else if (updatedThisRound.get() === false && latest === 0) {
          if (textIndex.get() === texts.length - 1) {
            textIndex.set(0);
            setMotionClassName("inline-block");
          } else {
            textIndex.set(textIndex.get() + 1);
            setMotionClassName(
              "first-letter:text-primary text-2xl sm:text-3xl md:text-4xl lg:text-5xl inline-block font-black",
            );
          }
          updatedThisRound.set(true);
        }
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
