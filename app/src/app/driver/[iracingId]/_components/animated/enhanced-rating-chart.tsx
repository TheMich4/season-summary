"use client";

import { motion } from "framer-motion";
import { Award, Shield, TrendingUp } from "lucide-react";
import { useTailwindTheme } from "@/hooks/use-tailwind-theme";
import { useMemo } from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceLine,
} from "recharts";
import { AnimatedChartWrapper } from "./animated-chart-wrapper";

interface EnhancedRatingChartProps {
  dataPoints: Array<number>;
  deltaPrecision?: number;
  description: string;
  label: string;
  tooltipLabel: string;
  delay?: number;
}

interface RatingChartTooltipProps {
  active: boolean;
  payload?: {
    name: string;
    payload: { index: number; value: number; tooltip: string };
    value: number;
  }[];
}

const RatingChartTooltip = ({ active, payload }: RatingChartTooltipProps) => {
  if (!active || !payload?.length || !payload[0]?.payload) return null;

  return (
    <div className="grid rounded-xl border border-primary/20 bg-background/95 p-3 text-muted-foreground shadow-md backdrop-blur-lg">
      <div className="flex flex-col">
        <div className="text-xs font-medium">{payload[0]?.payload.tooltip}</div>
        <div className="text-lg font-bold text-primary">{payload[0]?.value}</div>
        <div className="text-xs">Race #{payload[0]?.payload.index + 1}</div>
      </div>
    </div>
  );
};

export const EnhancedRatingChart = ({
  dataPoints,
  deltaPrecision = 0,
  description,
  label,
  tooltipLabel,
  delay = 0,
}: EnhancedRatingChartProps) => {
  const theme = useTailwindTheme();

  const data = useMemo(() => {
    return dataPoints.map((value, index) => {
      return {
        index,
        value,
        tooltip: tooltipLabel,
      };
    });
  }, [dataPoints, tooltipLabel]);

  const { min, max, average, current, initial } = useMemo(() => {
    if (!data.length) return { min: 0, max: 0, average: 0, current: 0, initial: 0 };
    
    const values = data.map((d) => d.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const sum = values.reduce((acc, val) => acc + val, 0);
    const average = sum / values.length;
    const current = values[values.length - 1] || 0;
    const initial = values[0] || 0;
    
    return { min, max, average, current, initial };
  }, [data]);

  // Determine if trending up or down
  const isTrendingUp = current > initial;
  const percentChange = initial ? ((current - initial) / initial) * 100 : 0;
  
  // Choose icon based on chart type
  const icon = label.toLowerCase().includes('safety') ? 
    <Shield className="h-5 w-5" /> : 
    <Award className="h-5 w-5" />;

  return (
    <AnimatedChartWrapper
      title={label}
      value={current.toString()}
      description={description}
      icon={icon}
      delay={delay}
    >
      <div className="mb-3 mt-1 grid grid-cols-3 gap-2 rounded-lg border border-primary/10 bg-background/50 p-2 text-center text-xs">
        <div>
          <div className="text-muted-foreground">Initial</div>
          <div className="font-medium">{initial.toFixed(deltaPrecision)}</div>
        </div>
        <div>
          <div className="text-muted-foreground">Average</div>
          <div className="font-medium">{average.toFixed(deltaPrecision)}</div>
        </div>
        <div>
          <div className="text-muted-foreground">Change</div>
          <div className={`font-medium ${isTrendingUp ? 'text-green-500' : 'text-red-500'}`}>
            {percentChange.toFixed(1)}%
          </div>
        </div>
      </div>

      <div className="relative h-[180px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <defs>
              <linearGradient id="ratingGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={theme.colors?.primary.DEFAULT} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={theme.colors?.primary.DEFAULT} stopOpacity={0.2}/>
              </linearGradient>
            </defs>
            
            <XAxis dataKey="index" hide />
            <YAxis domain={[min * 0.98, max * 1.02]} hide />
            
            <Tooltip
              content={<RatingChartTooltip active={false} payload={undefined} />}
              cursor={{ stroke: theme.colors?.primary.DEFAULT, strokeWidth: 1, strokeDasharray: '3 3' }}
            />
            
            <ReferenceLine 
              y={average} 
              stroke={theme.colors?.muted.DEFAULT}
              strokeDasharray="3 3" 
              strokeWidth={1}
            />
            
            <Line
              type="monotone"
              dataKey="value"
              stroke={theme.colors?.primary.DEFAULT}
              strokeWidth={2}
              dot={false}
              activeDot={{ 
                r: 6, 
                fill: theme.colors?.primary.DEFAULT,
                stroke: theme.colors?.background,
                strokeWidth: 2
              }}
              animationDuration={2000}
              animationEasing="ease-in-out"
              isAnimationActive={true}
              fill="url(#ratingGradient)"
            />
          </LineChart>
        </ResponsiveContainer>
        
        {/* Animated trending indicator */}
        <motion.div 
          className={`absolute -right-2 -top-2 rounded-full bg-background p-1 shadow-md ${
            isTrendingUp ? 'text-green-500' : 'text-red-500'
          }`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: delay + 0.7, duration: 0.3, type: 'spring' }}
        >
          <TrendingUp className={`h-4 w-4 ${isTrendingUp ? '' : 'rotate-180'}`} />
        </motion.div>
      </div>
    </AnimatedChartWrapper>
  );
}; 