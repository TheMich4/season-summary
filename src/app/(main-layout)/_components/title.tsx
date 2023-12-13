"use client";

import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export const Title = () => {
  const textIndex = useMotionValue(0);
  const texts = ["eason", "12024"];
  const baseText = useTransform(textIndex, (latest) => texts[latest] || "");
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) =>
    baseText.get().slice(0, latest)
  );
  const updatedThisRound = useMotionValue(true);

  const [motionClassName, setMotionClassName] = useState("inline-block");

  useEffect(() => {
    animate(count, 60, {
      type: "tween",
      duration: 5,
      ease: "easeIn",
      repeat: Infinity,
      repeatType: "reverse",
      repeatDelay: 0.1,
      onUpdate(latest) {
        if (updatedThisRound.get() === true && latest > 0) {
          updatedThisRound.set(false);
        } else if (updatedThisRound.get() === false && latest === 0) {
          if (textIndex.get() === texts.length - 1) {
            textIndex.set(0);
            setMotionClassName("inline-block");
          } else {
            textIndex.set(textIndex.get() + 1);
            setMotionClassName(
              "first-letter:text-primary text-2xl sm:text-3xl md:text-4xl lg:text-5xl inline-block"
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
      <motion.p className={motionClassName}>{displayText}</motion.p>
      {" Summary"}
    </h1>
  );
};
