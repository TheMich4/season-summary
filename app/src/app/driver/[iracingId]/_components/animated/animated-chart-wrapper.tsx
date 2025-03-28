"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedChartWrapperProps {
  children: ReactNode;
  title: string;
  value: string | number;
  description?: string;
  className?: string;
  icon?: ReactNode;
  rank?: number;
  delay?: number;
}

export const AnimatedChartWrapper = ({
  children,
  title,
  value,
  description,
  className = "",
  icon,
  rank,
  delay = 0
}: AnimatedChartWrapperProps) => {
  // Dynamic colors based on rank (1-3)
  const rankColor = rank === 1 ? "text-primary" : 
                    rank === 2 ? "text-gray-400" : 
                    rank === 3 ? "text-yellow-600" : "";
  
  return (
    <motion.div 
      className={`relative overflow-hidden rounded-xl border border-primary/20 bg-background/70 p-4 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-primary/40 hover:shadow-md ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      {/* Subtle accent glow in corner */}
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/5 blur-xl" />
      
      {/* Main content */}
      <div className="relative z-10">
        {/* Header section */}
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icon && <div className="text-primary/80">{icon}</div>}
            <h3 className="text-base font-medium tracking-tight">{title}</h3>
          </div>
        </div>
        
        {/* Value display */}
        <div className="mb-1 flex items-baseline gap-2">
          <motion.p 
            className={`text-2xl font-bold ${rankColor}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: delay + 0.1 }}
          >
            {value}
          </motion.p>
          
          {description && (
            <motion.p 
              className="text-xs text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: delay + 0.2 }}
            >
              {description}
            </motion.p>
          )}
        </div>
        
        {/* Chart/content area */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: delay + 0.3 }}
          className="mt-2"
        >
          {children}
        </motion.div>
      </div>
    </motion.div>
  );
}; 