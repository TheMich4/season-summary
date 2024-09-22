import { useTailwindTheme } from "@/hooks/use-tailwind-theme";
import { useMemo } from "react";
import {
  Dot,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const CustomTooltip = ({
  active,
  label,
  payload,
}: {
  active: boolean;
  label?: number;
  payload?: any;
}) => {
  const data = useMemo(() => payload?.[0]?.payload, [payload]);

  const lapTime = useMemo(() => {
    if (!data?.value) return null;

    if (data.value === -1) return "N/A";

    const minutes = Math.floor(data.value / 60 / 10000);
    const seconds = (data.value / 10000) % 60;

    return `${minutes}:${seconds.toFixed(3)}`;
  }, [data?.value]);

  if (active && label && data) {
    return (
      <div className="grid grid-cols-2 gap-2 rounded-md border bg-background/80 p-2 text-muted-foreground backdrop-blur">
        <div>
          <div className="text-xs">LAP</div>
          <div className="font-bold text-foreground">{data?.lapNumber}</div>
        </div>
        <div>
          <div className="text-xs">LAP TIME</div>
          <div className="font-bold text-foreground">{lapTime}</div>
        </div>
      </div>
    );
  }

  return null;
};

export const ChartDot = ({
  cx,
  cy,
  payload: { isBestLap, incident, lapEvents },
}: any) => {
  const theme = useTailwindTheme();

  if (isBestLap)
    return <Dot cx={cx} cy={cy} r={5} stroke={theme.colors?.primary.DEFAULT} />;

  if (incident) return <Dot cx={cx} cy={cy} r={5} stroke={"red"} />;

  if (lapEvents.length > 0)
    return <Dot cx={cx} cy={cy} r={5} stroke={"gray"} />;

  return null;
};

export const Chart = ({ lapData, driverId }: any) => {
  const theme = useTailwindTheme();
  const data = useMemo(() => {
    return lapData.slice(1).map((value: any, index: number) => {
      return {
        index,
        value: value.lapTime === -1 ? undefined : value.lapTime,
        isBestLap: value.personalBestLap,
        incident: value.incident,
        lapEvents: value.lapEvents,
        lapNumber: value.lapNumber,
        lapData: value,
        // tooltip: tooltipLabel,
      };
    });
  }, [lapData]);

  const { min, max } = useMemo(() => {
    const values = Math.min(...data.map((d: any) => d.value));
    const min = Math.min(values);
    const max = Math.max(values);
    return { max, min };
  }, [data]);

  const chartConfig = useMemo(() => {
    return data.map((d: any, i: number) => {
      const x: any = [];

      // if (i === 0)
      //   x.append({
      //     id: d.lapNumber,
      //     color: "yellow",
      //     opacity: d.value === undefined ? 0.2 : 1,
      //     percentPosition: 0,
      //   });

      return {
        id: d.lapNumber,
        color: theme.colors?.primary.DEFAULT,
        opacity: d.value === undefined ? 0.2 : 1,
        percentPosition: (i / data.length) * 100,
      };

      // if (i === data.length - 1)
      //   x.append({
      //     id: d.lapNumber,
      //     color: "yellow",
      //     opacity: d.value === undefined ? 0.2 : 1,
      //     percentPosition: 100,
      //   });

      return x;
    });
  }, [data, theme.colors?.primary.DEFAULT]);

  return (
    <div className="flex size-full max-w-full self-center sm:w-full sm:max-w-md md:max-w-full">
      <ResponsiveContainer height={150}>
        <LineChart height={150} data={data}>
          <defs>
            <linearGradient
              id={`color-${driverId}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              {chartConfig.map(({ id, color, percentPosition }: any) => (
                <stop
                  key={id}
                  offset={`${percentPosition}%`}
                  stopColor={color}
                  // stopOpacity={opacity}
                />
              ))}
            </linearGradient>
          </defs>

          <Line
            type="monotone"
            dataKey="value"
            // @ts-ignore
            dot={ChartDot}
            stroke={`url(#color-${driverId})`}
            strokeWidth={2}
            strokeDasharray={`url(#color-${driverId})`}
            connectNulls
          />
          <XAxis dataKey="value" hide />
          <YAxis domain={[min, max]} hide />
          <Tooltip content={<CustomTooltip active={false} />} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
