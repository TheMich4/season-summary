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
          <div className="text-xs">INCIDENTS</div>
          <div className="font-bold text-foreground">{payload[0].value}</div>
        </div>
      </div>
    );
  }

  return null;
};
export const IncidentsGraph = ({ dataPoints }) => {
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
    const max = Math.max(...dataPoints);
    const min = Math.min(...dataPoints);
    return { max, min };
  }, [dataPoints]);
  const incidentFree = useMemo(() => {
    return dataPoints.filter((d) => d === 0).length;
  }, [dataPoints]);

  return (
    <div className="flex w-full flex-col rounded-md border p-4 text-start">
      <p className="pb-2 text-base font-normal tracking-tight">Incidents</p>
      <div className="flex flex-row items-baseline gap-1">
        <p className="text-2xl font-bold">{max}</p>
        <p className="text-xs text-muted-foreground">most incidents</p>
      </div>

      <div className="flex flex-row items-baseline gap-1">
        <p className="text-2xl font-bold">{min}</p>
        <p className="text-xs text-muted-foreground">least incidents</p>
      </div>

      <div className="flex flex-row items-baseline gap-1">
        <p className="text-2xl font-bold">{incidentFree}</p>
        <p className="text-xs text-muted-foreground">incident free races</p>
      </div>
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
            <YAxis domain={[0, max]} hide />
            <Tooltip
              content={<CustomTooltip active={false} payload={undefined} />}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
