"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BarChart2 } from "lucide-react";
import { AdvancedStats } from "./advanced-stats";
import { AnimatedSection } from "./animated/animated-section";

interface DevStatsToggleProps {
  data: any;
  isDev: boolean;
}

export function DevStatsToggle({ data, isDev }: DevStatsToggleProps) {
  const [showStats, setShowStats] = useState(false);
  
  if (!isDev) return null;
  
  return (
    <AnimatedSection delay={0.7} className="w-full mt-4">
      {showStats ? (
        <AdvancedStats 
          data={data} 
          onClose={() => setShowStats(false)} 
        />
      ) : (
        <div className="flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowStats(true)}
            className="bg-background/70 backdrop-blur-md text-xs"
          >
            <BarChart2 className="mr-1 h-3.5 w-3.5" />
            Advanced Stats (Dev)
          </Button>
        </div>
      )}
    </AnimatedSection>
  );
} 