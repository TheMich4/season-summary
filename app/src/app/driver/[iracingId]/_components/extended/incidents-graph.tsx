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
import { AlertTriangle } from "lucide-react";

interface IncidentsGraphProps {
  dataPoints: Array<number>;
  incidentsPerLap: number;
  incidentsPerRace: number;
  incidentsPerCorner: number;
}

const CustomTooltip = ({
  active,
  payload,
}: {
  active: boolean;
  payload: any;
}) => {
  if (active && payload?.length) {
    return (
      <div className="grid grid-cols-2 gap-2 rounded-md border bg-background/80 p-2 text-muted-foreground backdrop-blur">
        <div>
          <div className="text-xs">INCIDENTS</div>
          <div className="font-bold text-foreground">{payload[0].value}</div>
        </div>
      </div>
    );
  }

  return null;
};

export const IncidentsGraph = ({ 
  dataPoints,
  incidentsPerLap,
  incidentsPerRace,
  incidentsPerCorner
}: IncidentsGraphProps) => {
  const theme = useTailwindTheme();

  const data = useMemo(() => {
    return dataPoints.map((value, index) => {
      return {
        index,
        value,
      };
    });
  }, [dataPoints]);

  const { max } = useMemo(() => {
    const max = Math.max(...dataPoints);
    return { max };
  }, [dataPoints]);

  const incidentFree = useMemo(() => {
    return dataPoints.filter((d) => d === 0).length;
  }, [dataPoints]);

  return (
    <div className="flex w-full flex-col rounded-xl border border-primary/30 bg-background/60 p-4 backdrop-blur-md">
      <div className="flex items-center gap-2 pb-4">
        <AlertTriangle className="h-5 w-5 text-primary" />
        <h3 className="text-base font-medium">Incidents</h3>
      </div>

      <div className="grid grid-cols-2 gap-4 pb-4">
        <div>
          <div className="text-2xl font-bold">{incidentFree}</div>
          <div className="text-xs text-muted-foreground">Incident Free Races</div>
        </div>
        <div>
          <div className="text-2xl font-bold">{max}</div>
          <div className="text-xs text-muted-foreground">Most Incidents</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 pb-4">
        <div className="rounded-md bg-background/40 p-2">
          <div className="text-sm font-medium">{incidentsPerLap.toFixed(3)}</div>
          <div className="text-xs text-muted-foreground">Per Lap</div>
        </div>
        <div className="rounded-md bg-background/40 p-2">
          <div className="text-sm font-medium">{incidentsPerRace.toFixed(1)}</div>
          <div className="text-xs text-muted-foreground">Per Race</div>
        </div>
        <div className="rounded-md bg-background/40 p-2">
          <div className="text-sm font-medium">{incidentsPerCorner.toFixed(3)}</div>
          <div className="text-xs text-muted-foreground">Per Corner</div>
        </div>
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
            <Tooltip content={<CustomTooltip active={false} payload={undefined} />} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
