"use client";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Delta } from "@/components/delta";
import { useMemo } from "react";
import { useTailwindTheme } from "@/hooks/use-tailwind-theme";

interface FullSafetyRatingChartProps {
  dataPoints: Array<number>;
}

const CustomTooltip = ({
  active,
  payload,
}: {
  active: boolean;
  payload: any;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="grid grid-cols-2 gap-2 rounded-md border bg-background/80 p-2 text-muted-foreground backdrop-blur">
        <div>
          <div className="text-xs">SR</div>
          <div className="font-bold text-foreground">{payload[0].value}</div>
        </div>
      </div>
    );
  }

  return null;
};

export const FullSafetyRatingChart = ({
  dataPoints,
}: FullSafetyRatingChartProps) => {
  const theme = useTailwindTheme();

  const data = useMemo(() => {
    return dataPoints.map((value, index) => {
      return {
        index,
        value,
      };
    });
  }, [dataPoints]);
  const { min, max } = useMemo(() => {
    const values = Math.min(...data.map((d) => d.value));
    const min = Math.min(values);
    const max = Math.max(values);
    return { min, max };
  }, [data]);

  return (
    <div className="flex w-full flex-col rounded-md border bg-background/40 p-4 text-start">
      <p className="pb-2 text-base font-normal tracking-tight">Safety rating</p>
      <p className="flex flex-row items-baseline gap-1 text-2xl font-bold">
        {dataPoints[dataPoints.length - 1]}
        <p className="text-sm">
          <Delta
            value={dataPoints[dataPoints.length - 1]}
            previous={dataPoints[0]}
            parseResult={(result: number) => result.toFixed(2)}
          />
        </p>
      </p>
      <p className="mb-2 text-xs text-muted-foreground">
        How your safety rating developed over the season.
      </p>
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
              content={<CustomTooltip active={false} payload={undefined} />}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
