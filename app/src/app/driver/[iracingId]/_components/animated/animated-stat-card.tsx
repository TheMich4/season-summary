"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent, ReactNode } from "react";

interface AnimatedStatCardProps {
  children: ReactNode;
  className?: string;
}

export const AnimatedStatCard = ({ 
  children, 
  className = ""
}: AnimatedStatCardProps) => {
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
  const handleMouseMove = (e: MouseEvent) => {
    const { currentTarget, clientX, clientY } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    
    const x = clientX - left;
    const y = clientY - top;
    
    // Calculate rotation based on mouse position (max 6 degrees)
    const rotateXValue = ((y - height / 2) / height) * -6;
    const rotateYValue = ((x - width / 2) / width) * 6;
    
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

  return (
    <motion.div
      className={`group relative overflow-hidden rounded-xl border border-primary/20 bg-background/70 shadow-sm backdrop-blur-lg transition-colors duration-300 hover:border-primary/40 ${className}`}
      style={{
        background,
        transformStyle: "preserve-3d",
        transform: "perspective(1000px)",
        rotateX,
        rotateY,
      }}
      whileHover={{ scale: 1.005 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Light effect on interaction */}
      <motion.div 
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`radial-gradient(250px circle at ${mouseX}px ${mouseY}px, rgba(234,179,8,0.10), transparent 80%)`,
        }}
      />
      
      {/* Card content */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </motion.div>
  );
}; 