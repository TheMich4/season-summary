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
      <div className="grid grid-cols-2 gap-2 rounded-md border bg-background p-2 text-muted-foreground">
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
    if (!data) {
      return { min: 0, max: 0 };
    }

    const values = Math.min(...data.map((d) => d.value));
    const min = Math.min(values);
    const max = Math.max(values);
    return { min, max };
  }, [data]);

  if (!chartData?.length || chartData.length === 1) return null;

  return (
    <div className="flex w-full max-w-full self-center rounded-md border bg-background/40 sm:w-full sm:max-w-md md:max-w-full">
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
            className="opacity-50"
            type="monotone"
            dataKey="avg"
            stroke={theme.colors?.primary.DEFAULT}
            dot={false}
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
