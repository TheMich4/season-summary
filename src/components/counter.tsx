"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

interface CounterProps {
  value: number;
  direction?: "up" | "down";
  formatValue?: boolean;
  precision?: number;
  disabled?: boolean;
}

export const Counter = ({
  value,
  direction = "up",
  formatValue,
  precision = 0,
  disabled = false,
}: CounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === "down" ? value : 0);
  const springValue = useSpring(motionValue, {
    damping: 100,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(direction === "down" ? 0 : value);
    }
  }, [motionValue, isInView, direction, value]);

  useEffect(
    () =>
      springValue.on("change", (latest) => {
        if (ref.current) {
          ref.current.textContent = formatValue
            ? Intl.NumberFormat("en-US").format(latest.toFixed(precision))
            : latest.toFixed(precision);
        }
      }),
    [springValue, formatValue, precision]
  );

  if (disabled) {
    return <span>{value.toFixed(precision)}</span>;
  }

  return <span ref={ref} />;
};
