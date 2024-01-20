"use client";

import { Counter } from "@/components/counter";
import { Delta } from "@/components/delta";
import { useTailwindTheme } from "@/hooks/use-tailwind-theme";
import { useMemo } from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface RatingChartProps {
  dataPoints: Array<number>;
  deltaPrecision?: number;
  description: string;
  label: string;
  tooltipLabel: string;
  useCounter?: boolean;
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
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="grid grid-cols-2 gap-2 rounded-md border bg-background/80 p-2 text-muted-foreground backdrop-blur">
      <div>
        <div className="text-xs">{payload[0].payload.tooltip}</div>
        <div className="font-bold text-foreground">{payload[0].value}</div>
      </div>
    </div>
  );
};

export const RatingChart = ({
  dataPoints,
  deltaPrecision = 0,
  description,
  label,
  tooltipLabel,
  useCounter = false,
}: RatingChartProps) => {
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

  const { min, max } = useMemo(() => {
    const values = Math.min(...data.map((d) => d.value));
    const min = Math.min(values);
    const max = Math.max(values);
    return { min, max };
  }, [data]);

  return (
    <div className="flex w-full flex-col rounded-md border bg-background/40 p-4 text-start">
      <p className="pb-2 text-base font-normal tracking-tight">{label}</p>
      <p className="flex flex-row items-baseline gap-1 text-2xl font-bold">
        <Counter
          value={dataPoints[dataPoints.length - 1]}
          precision={deltaPrecision}
          disabled={!useCounter}
        />
        <p className="text-sm">
          <Delta
            value={dataPoints[dataPoints.length - 1]}
            previous={dataPoints[0]}
            parseResult={(result: number) => result.toFixed(deltaPrecision)}
          />
        </p>
      </p>
      <p className="mb-2 text-xs text-muted-foreground">{description}</p>
      <div className="flex size-full max-w-full self-center sm:w-full sm:max-w-md md:max-w-full">
        <ResponsiveContainer height={150}>
          <LineChart height={150} data={data}>
            <Line
              type="monotone"
              dataKey="value"
              stroke={theme.colors?.primary.DEFAULT}
              dot={false}
              strokeWidth={2}
            />

            <XAxis dataKey="when" hide />
            <YAxis domain={[min, max]} hide />
            <Tooltip
              content={
                <RatingChartTooltip active={false} payload={undefined} />
              }
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
