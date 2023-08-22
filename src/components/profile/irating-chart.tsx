"use client";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { ChartData } from "iracing-api";
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
      <div className="rounded-md border bg-background p-2 grid grid-cols-2 text-muted-foreground gap-2">
        <div>
          <div className="text-xs">AVERAGE</div>
          <div className="font-bold">{payload[1].value}</div>
        </div>
        <div>
          <div className="text-xs">IRATING</div>
          <div className="font-bold text-foreground">{payload[0].value}</div>
        </div>
      </div>
    );
  }

  return null;
};

export const IratingChart = ({
  chartData,
}: {
  chartData: Array<ChartData> | undefined;
}) => {
  const theme = useTailwindTheme();

  const data = useMemo(
    () =>
      chartData?.reduce(
        (acc, cd, index) => [
          ...acc,
          {
            ...cd,
            when: new Date(cd.when).toDateString(),
            index,
            avg:
              index === 0
                ? cd.value
                : Math.round(
                    chartData
                      .slice(0, index + 1)
                      ?.reduce((a, b) => a + b.value, 0) /
                      (index + 1)
                  ),
          },
        ],
        [] as Array<ChartData>
      ),
    [chartData]
  );
  const { min, max } = useMemo(() => {
    const values = Math.min(...data.map((d) => d.value));
    const min = Math.min(values);
    const max = Math.max(values);
    return { min, max };
  }, [data]);

  if (!chartData?.length || chartData.length === 1) return null;

  // TODO: Fix this class to be responsive
  return (
    <div className="flex w-full max-w-full self-center rounded-md border sm:w-full sm:max-w-md md:max-w-full bg-card">
      <ResponsiveContainer height={200}>
        <LineChart height={250} data={data}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={theme.colors?.primary.DEFAULT}
            dot={true}
            strokeWidth={2}
          />
          <Line
            className="opacity-25"
            type="monotone"
            dataKey="avg"
            stroke={theme.colors?.primary.DEFAULT}
            dot={true}
            strokeWidth={1}
          />
          <XAxis dataKey="when" hide />
          <YAxis domain={[min, max]} hide />
          <Tooltip
            content={<CustomTooltip active={false} payload={undefined} />}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
