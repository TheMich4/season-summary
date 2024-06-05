import { animate, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

interface Config {
  duration?: number;
  repeatDelay?: number;
  getBaseText?: (index: number) => string;
  onUpdateToInitial?: () => void;
  onUpdateToNext?: () => void;
}

export const useTypedTextLoop = (texts: Array<string>, config?: Config) => {
  const isInitialRender = useMotionValue(true);
  const textIndex = useMotionValue(0);
  const baseText = useTransform(
    textIndex,
    (latest) => config?.getBaseText?.(latest) ?? texts[latest] ?? "",
  );
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) =>
    isInitialRender.get() === true ? texts[0] : baseText.get().slice(0, latest),
  );
  const updatedThisRound = useMotionValue(true);

  useEffect(() => {
    void animate(count, 30, {
      type: "tween",
      duration: config?.duration ?? 5,
      ease: "easeIn",
      repeat: Infinity,
      repeatType: "reverse",
      repeatDelay: config?.repeatDelay ?? 0.1,
      onUpdate(latest) {
        if (isInitialRender.get() === true && latest > 5) {
          isInitialRender.set(false);
        }
        if (updatedThisRound.get() === true && latest > 0) {
          updatedThisRound.set(false);
        } else if (updatedThisRound.get() === false && latest === 0) {
          if (textIndex.get() === texts.length - 1) {
            textIndex.set(0);
            config?.onUpdateToInitial?.();
          } else {
            textIndex.set(textIndex.get() + 1);
            config?.onUpdateToNext?.();
          }
          updatedThisRound.set(true);
        }
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return displayText;
};
