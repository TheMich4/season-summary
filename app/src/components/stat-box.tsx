"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { Medal, Trophy, Award, Star, Target } from "lucide-react";
import { Delta } from "./delta";
import type { ReactNode } from "react";

interface StatBoxProps {
  label: string;
  value: number | string;
  previous?: number;
  className?: string;
  useCounter?: boolean;
  ignorePreviousIfZero?: boolean;
  ignorePreviousIfValueZero?: boolean;
  invert?: boolean;
  icon?: ReactNode;
  rank?: number;
}

const getIconForLabel = (label: string) => {
  const lowerLabel = label.toLowerCase();
  if (lowerLabel.includes("win")) return <Trophy className="h-5 w-5" />;
  if (lowerLabel.includes("top")) return <Medal className="h-5 w-5" />;
  if (lowerLabel.includes("race")) return <Target className="h-5 w-5" />;
  if (lowerLabel.includes("lap")) return <Star className="h-5 w-5" />;
  return <Award className="h-5 w-5" />;
};

const getRankColor = (rank: number) => {
  switch (rank) {
    case 1:
      return "text-primary";
    case 2:
      return "text-gray-400";
    case 3:
      return "text-yellow-600";
    default:
      return "text-muted-foreground";
  }
};

export const StatBox = ({
  label,
  value,
  previous,
  className,
  useCounter = false,
  ignorePreviousIfZero = false,
  ignorePreviousIfValueZero = false,
  invert = false,
  icon,
  rank,
}: StatBoxProps) => {
  // Track mouse position for 3D effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Create transforms based on mouse position
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  // Create gradient position for light effect
  const backgroundX = useMotionValue(0);
  const backgroundY = useMotionValue(0);

  // Create gradient transforms for the animated border
  const background = useMotionTemplate`radial-gradient(400px circle at ${backgroundX}px ${backgroundY}px, rgba(234,179,8,0.10), transparent 80%)`;

  // Handle mouse movement to create 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { currentTarget, clientX, clientY } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();

    const x = clientX - left;
    const y = clientY - top;

    // Calculate rotation based on mouse position (max 4 degrees)
    const rotateXValue = ((y - height / 2) / height) * -4;
    const rotateYValue = ((x - width / 2) / width) * 4;

    // Update values for animations
    rotateX.set(rotateXValue);
    rotateY.set(rotateYValue);
    mouseX.set(x);
    mouseY.set(y);
    backgroundX.set(x);
    backgroundY.set(y);
  };

  // Reset animation values on mouse leave
  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const showDelta =
    previous !== undefined &&
    (!ignorePreviousIfZero || previous !== 0) &&
    (!ignorePreviousIfValueZero || value !== 0) &&
    typeof value === "number";

  const deltaValue = showDelta ? value - previous : 0;
  const isPositive = deltaValue
    ? invert
      ? deltaValue < 0
      : deltaValue > 0
    : undefined;

  return (
    <motion.div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-primary/30 bg-background/60 p-4 backdrop-blur-md transition-colors hover:border-primary/60 ",
        className,
        isPositive !== undefined &&
          (isPositive ? "border-green-500/30" : "border-red-500/30"),
      )}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Animated border gradient */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{ background }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-left">
            {icon || getIconForLabel(label)}
            <span className="text-xs font-medium text-muted-foreground">
              {label}
            </span>
          </div>
          {rank && (
            <span className={cn("text-xs font-bold", getRankColor(rank))}>
              #{rank}
            </span>
          )}
        </div>

        <div className="mt-2 flex items-baseline gap-1.5">
          <span className="text-xl font-bold tracking-tight">
            {useCounter ? value.toLocaleString() : value}
          </span>
          {showDelta && (
            <div className="text-xs">
              <Delta value={deltaValue} invert={invert} />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
