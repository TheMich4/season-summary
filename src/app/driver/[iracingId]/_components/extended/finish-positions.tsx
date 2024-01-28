"use client";

import { Bar, BarChart, ResponsiveContainer, Tooltip } from "recharts";

import { cn } from "@/lib/utils";
import { useMemo } from "react";
import { useTailwindTheme } from "@/hooks/use-tailwind-theme";

type FinishPositions = Record<string, number>;

interface FinishPositionsProps {
  finishPositions: FinishPositions;
}

const PositionList = ({
  active,
  finishPositions,
  payload,
}: {
  active: boolean;
  finishPositions: FinishPositions;
  payload: any;
}) => {
  if (!active || !payload) {
    return null;
  }

  return (
    <div className="flex flex-col rounded-md border bg-background/80 p-2 backdrop-blur">
      <div className="mb-1 grid grid-cols-2 items-baseline gap-2">
        <p className="font-bold">POSITION</p>
        <p className="font-bold">FINISHES</p>
      </div>
      {Object.entries(finishPositions).map(([position, numberOfRaces]) => (
        <div className="grid grid-cols-2 items-baseline gap-2" key={position}>
          <p
            className={cn(
              "flex justify-center text-muted-foreground",
              `${payload[0]?.payload.name}` === position &&
                "font-bold text-foreground"
            )}
          >
            {position}
          </p>
          <p className="flex justify-center font-bold dark:text-primary">
            {numberOfRaces}
          </p>
        </div>
      ))}
    </div>
  );
};

const PositionChart = ({
  finishPositions,
}: {
  finishPositions: Record<string, number>;
}) => {
  const theme = useTailwindTheme();

  const data = useMemo(() => {
    const positions = Object.keys(finishPositions).map((week) =>
      parseInt(week, 10)
    );
    return Array.from(
      { length: positions[positions.length - 1] + 1 },
      (_, position) => ({
        name: position,
        races: finishPositions[position] || 0,
      })
    ).slice(1);
  }, [finishPositions]);

  return (
    <ResponsiveContainer width="100%" height={80}>
      <BarChart data={data}>
        <Bar dataKey="races" fill={theme.colors?.primary.DEFAULT} />
        <Tooltip
          cursor={{
            strokeWidth: 0,
            fillOpacity: 0.1,
            fill: theme.colors?.primary.DEFAULT,
          }}
          content={
            <PositionList
              finishPositions={finishPositions}
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

export const FinishPositions = ({ finishPositions }: FinishPositionsProps) => {
  const bestFinish = useMemo(() => {
    return Math.min(
      ...Object.keys(finishPositions).map((week) => parseInt(week, 10))
    );
  }, [finishPositions]);

  return (
    <div className="flex w-full flex-col rounded-md border bg-background/40 p-4 text-start">
      <p className="pb-2 text-base font-normal tracking-tight">Best finish</p>
      <p className="text-2xl font-bold">{bestFinish}</p>
      <p className="text-xs text-muted-foreground">
        (You finished in this position {finishPositions[bestFinish]} times)
      </p>
      <PositionChart finishPositions={finishPositions} />
    </div>
  );
};
