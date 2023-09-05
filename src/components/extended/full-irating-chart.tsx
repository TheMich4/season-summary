"use client";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useMemo } from "react";
import { useTailwindTheme } from "@/hooks/use-tailwind-theme";

const CustomTooltip = ({
  active,
  payload,
}: {
  active: boolean;
  payload: any;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="grid grid-cols-2 gap-2 rounded-md border bg-background p-2 text-muted-foreground">
        <div>
          <div className="text-xs">IRATING</div>
          <div className="font-bold text-foreground">{payload[0].value}</div>
        </div>
      </div>
    );
  }

  return null;
};

export const FullIratingChart = ({ dataPoints }) => {
  const theme = useTailwindTheme();

  const data = useMemo(() => {
    return dataPoints.map((dp, index) => {
      return {
        index,
        value: dp,
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
    <div className="flex w-full flex-col gap-2 rounded-md border p-4 text-start">
      <p className="text-2xl font-semibold leading-none tracking-tight">
        iRating:
      </p>
      <p className="text-sm text-muted-foreground">
        How your iRating developed over the season.
      </p>
      <div className="flex w-full max-w-full self-center sm:w-full sm:max-w-md md:max-w-full">
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
