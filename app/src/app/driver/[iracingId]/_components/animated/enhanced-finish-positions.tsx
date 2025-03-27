"use client";

import { useMemo } from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, Cell } from "recharts";
import { useTailwindTheme } from "@/hooks/use-tailwind-theme";
import { AnimatedChartWrapper } from "./animated-chart-wrapper";
import { cn } from "@/lib/utils";
import { Medal } from "lucide-react";
import { motion } from "framer-motion";

type FinishPositions = Record<string, number>;

interface EnhancedFinishPositionsProps {
  finishPositions: FinishPositions;
  delay?: number;
}

const PositionTooltip = ({
  active,
  payload,
}: {
  active: boolean;
  payload?: any[];
}) => {
  if (!active || !payload?.length) {
    return null;
  }

  const position = payload[0]?.payload.name;
  const count = payload[0]?.payload.races;
  
  // Determine medal type based on position
  let medal = "";
  let medalColor = "";
  
  if (position === 1) {
    medal = "Gold";
    medalColor = "text-primary";
  } else if (position === 2) {
    medal = "Silver";
    medalColor = "text-gray-400";
  } else if (position === 3) {
    medal = "Bronze";
    medalColor = "text-yellow-600";
  }

  return (
    <div className="rounded-lg border border-primary/20 bg-background/95 p-3 shadow-md backdrop-blur-md">
      <div className="flex flex-col">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">Position</span>
          <span className={`text-lg font-bold ${position <= 3 ? medalColor : ""}`}>
            {position}
            {medal && <span className="ml-1 text-xs">{medal}</span>}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">Finishes</span>
          <span className="text-lg font-bold text-primary">{count}</span>
        </div>
      </div>
    </div>
  );
};

export const EnhancedFinishPositions = ({ 
  finishPositions,
  delay = 0
}: EnhancedFinishPositionsProps) => {
  const theme = useTailwindTheme();

  const data = useMemo(() => {
    const positions = Object.keys(finishPositions).map((position) => parseInt(position, 10));
    return Array.from(
      { length: (Math.max(...positions) ?? 0) + 1 },
      (_, position) => ({
        name: position,
        races: finishPositions[position] || 0,
      }),
    ).slice(1); // Remove position 0 as it's not valid
  }, [finishPositions]);

  const bestFinish = useMemo(() => {
    const positions = Object.keys(finishPositions).map((position) => parseInt(position, 10));
    return Math.min(...positions);
  }, [finishPositions]);

  const totalRaces = useMemo(() => {
    return Object.values(finishPositions).reduce((sum, count) => sum + count, 0);
  }, [finishPositions]);

  const winRate = useMemo(() => {
    const wins = finishPositions[1] || 0;
    return ((wins / totalRaces) * 100).toFixed(1);
  }, [finishPositions, totalRaces]);

  const podiumRate = useMemo(() => {
    const podiums = (finishPositions[1] || 0) + (finishPositions[2] || 0) + (finishPositions[3] || 0);
    return ((podiums / totalRaces) * 100).toFixed(1);
  }, [finishPositions, totalRaces]);

  const getBarColor = (position: number) => {
    if (position === 1) return theme.colors?.primary.DEFAULT;
    if (position === 2) return "#A0A0A0"; // Silver
    if (position === 3) return "#CD7F32"; // Bronze
    return theme.colors?.muted.DEFAULT;
  };

  return (
    <AnimatedChartWrapper
      title="Finish Positions"
      value={bestFinish.toString()}
      description={`Best finish (${finishPositions[bestFinish]} times)`}
      icon={<Medal className="h-5 w-5" />}
      rank={bestFinish <= 3 ? bestFinish : undefined}
      delay={delay}
    >
      <div className="mb-3 mt-1 grid grid-cols-3 gap-2 rounded-lg border border-primary/10 bg-background/50 p-2 text-center text-xs">
        <div>
          <div className="text-muted-foreground">Total Races</div>
          <div className="font-medium">{totalRaces}</div>
        </div>
        <div>
          <div className="text-muted-foreground">Win Rate</div>
          <div className="font-medium">{winRate}%</div>
        </div>
        <div>
          <div className="text-muted-foreground">Podium Rate</div>
          <div className="font-medium">{podiumRate}%</div>
        </div>
      </div>
      
      <div className="relative h-[180px] overflow-hidden rounded-lg border border-primary/10 bg-background/50 p-3">
        <h3 className="mb-2 text-xs font-medium text-muted-foreground">Position Distribution</h3>
        
        <ResponsiveContainer width="100%" height={140}>
          <BarChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <Tooltip
              content={<PositionTooltip active={false} payload={undefined} />}
              cursor={{opacity: 0.2}}
            />
            <Bar dataKey="races" isAnimationActive={true} animationDuration={1000}>
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={getBarColor(entry.name)} 
                  fillOpacity={entry.name === bestFinish ? 1 : 0.7}
                  stroke={entry.name === bestFinish ? theme.colors?.primary.DEFAULT : "none"}
                  strokeWidth={entry.name === bestFinish ? 1 : 0}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        
        {/* Position indicators beneath chart */}
        <div className="absolute bottom-2 left-0 right-0 flex justify-between px-5 text-xs text-muted-foreground">
          <span>1st</span>
          <span>5th</span>
          <span>10th</span>
          <span>15th+</span>
        </div>
      </div>

      {/* Medals row */}
      <div className="mt-3 flex justify-between">
        {[1, 2, 3].map((position) => {
          const count = finishPositions[position] || 0;
          const medalColor = 
            position === 1 ? "text-primary" : 
            position === 2 ? "text-gray-400" : 
            "text-yellow-600";
            
          return (
            <motion.div 
              key={position}
              className={cn(
                "flex flex-col items-center rounded-lg border border-primary/10 bg-background/50 p-2",
                count > 0 ? "opacity-100" : "opacity-60"
              )}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: delay + 0.5 + (position * 0.1), duration: 0.3 }}
            >
              <div className={`text-lg font-bold ${medalColor}`}>
                {count}
              </div>
              <div className={`text-xs ${medalColor}`}>
                {position === 1 ? "1st" : position === 2 ? "2nd" : "3rd"}
              </div>
            </motion.div>
          );
        })}
      </div>
    </AnimatedChartWrapper>
  );
}; 