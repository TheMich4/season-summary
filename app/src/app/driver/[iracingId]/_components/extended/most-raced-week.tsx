"use client";

import { Bar, BarChart, ResponsiveContainer, Tooltip } from "recharts";

import { cn } from "@/lib/utils";
import { useMemo } from "react";
import { useTailwindTheme } from "@/hooks/use-tailwind-theme";

const WeekChart = ({
  racesPerWeek,
}: {
  racesPerWeek: Record<string, number>;
}) => {
  const theme = useTailwindTheme();

  const data = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const week = i + 1;
      return {
        name: week,
        races: racesPerWeek[i] || 0,
      };
    });
  }, [racesPerWeek]);

  return (
    <ResponsiveContainer width="100%" height={150}>
      <BarChart data={data}>
        <Bar dataKey="races" fill={theme.colors?.primary.DEFAULT} />
        <Tooltip
          cursor={{
            strokeWidth: 0,
            fillOpacity: 0.1,
            fill: theme.colors?.primary.DEFAULT,
          }}
          content={
            <WeekList
              racesPerWeek={racesPerWeek}
              active={false}
              payload={undefined}
            />
          }
          wrapperStyle={{ zIndex: 1000 }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

const WeekList = ({
  active,
  racesPerWeek,
  payload,
}: {
  active: boolean;
  racesPerWeek: Record<string, number>;
  payload: any;
}) => {
  if (!active || !payload) {
    return null;
  }

  return (
    <div className="flex flex-col rounded-md border bg-background/80 p-2 backdrop-blur">
      <div className="mb-1 grid grid-cols-2 items-baseline gap-2">
        <p className="font-bold">WEEK</p>
        <p className="font-bold">RACES</p>
      </div>
      {Object.entries(racesPerWeek).map(([week, numberOfRaces]) => (
        <div className="grid grid-cols-2 items-baseline gap-2" key={week}>
          <p
            className={cn(
              "flex justify-center text-muted-foreground",
              `${payload[0]?.payload.name}` === `${parseInt(week, 10) + 1}` &&
                "font-bold text-foreground"
            )}
          >
            {`${parseInt(week, 10) + 1}`}
          </p>
          <p className="flex justify-center font-bold dark:text-primary">
            {numberOfRaces}
          </p>
        </div>
      ))}
    </div>
  );
};

export const MostRacedWeek = ({
  racesPerWeek,
}: {
  racesPerWeek: Record<string, number>;
}) => {
  const mostRacedWeek = useMemo(() => {
    return Object.entries(racesPerWeek).reduce(
      (acc, [week, numberOfRaces]) => {
        if (numberOfRaces > acc.numberOfRaces) {
          return {
            week: `${parseInt(week) + 1}`,
            numberOfRaces,
          };
        }
        return acc;
      },
      {
        week: "",
        numberOfRaces: 0,
      }
    );
  }, [racesPerWeek]);

  return (
      <WeekChart racesPerWeek={racesPerWeek} />
  );
};
