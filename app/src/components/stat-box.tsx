"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { Medal, Trophy, Award, Star, Target, ChevronUp, ChevronDown } from "lucide-react";
import { Delta } from "./delta";
import { Skeleton } from "@/components/ui/skeleton";
import { useMemo, type ReactNode } from "react";
import { Counter } from "@/components/counter";

interface StatBoxProps {
  label: string;
  value: number;
  previous?: number;
  className?: string;
  useCounter?: boolean;
  ignorePreviousIfZero?: boolean;
  ignorePreviousIfValueZero?: boolean;
  invert?: boolean;
  icon?: React.ReactNode;
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

  const showDelta = previous !== undefined && 
    (!ignorePreviousIfZero || previous !== 0) && 
    (!ignorePreviousIfValueZero || value !== 0);

  const deltaValue = showDelta ? value - previous : 0;
  const isPositive = deltaValue ? (invert ? deltaValue < 0 : deltaValue > 0) : undefined;

  return (
    <motion.div
      className={cn(
        "group relative flex w-full flex-col rounded-lg border bg-background/40 p-4 backdrop-blur-md transition-all duration-200 hover:bg-background/60",
        className
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
        className="absolute inset-0 rounded-lg opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{ background }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icon || getIconForLabel(label)}
            <span className="text-sm font-medium text-muted-foreground">{label}</span>
          </div>
          {rank && (
            <span className={cn("text-sm font-bold", getRankColor(rank))}>
              #{rank}
            </span>
          )}
        </div>

        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-2xl font-bold tracking-tight">
            {useCounter ? value.toLocaleString() : value}
          </span>
          {showDelta && (
            <div className="text-sm">
              <Delta 
                value={deltaValue} 
                invert={invert}
              />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
