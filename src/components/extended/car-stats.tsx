"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import { useMemo } from "react";

interface CarStatsProps {
  racesPerCar: {
    [carName: string]: number;
  };
}

const Data = ({
  count,
  data,
}: {
  count: number;
  data: Array<{
    carName: string;
    numberOfRaces: number;
  }>;
}) => {
  return (
    <div className="flex flex-col text-start">
      {data.map(({ carName, numberOfRaces }) => (
        <div
          className="flex w-full flex-row items-baseline gap-1"
          key={carName}
        >
          <p className="min-w-[19px] font-bold dark:text-primary">
            {numberOfRaces}
          </p>
          <p className="text-xs text-muted-foreground">in</p>
          <p className="text-sm">{carName}</p>
        </div>
      ))}
    </div>
  );
};

export const CarStats = ({ racesPerCar }: CarStatsProps) => {
  const { count, data, slicedData } = useMemo(() => {
    const data = Object.entries(racesPerCar)
      .map(([carName, numberOfRaces]) => {
        return {
          carName,
          numberOfRaces,
        };
      })
      .sort((a, b) => b.numberOfRaces - a.numberOfRaces);
    return {
      count: Object.values(racesPerCar).length,
      data,
      slicedData: data.slice(0, 5),
    };
  }, [racesPerCar]);

  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex w-full flex-col gap-2 rounded-md border bg-background/40 p-4 text-start hover:border-primary/60">
          <p className="text-2xl font-semibold leading-none tracking-tight">
            Most raced cars
          </p>
          <div className="flex flex-row items-baseline gap-1 text-sm text-muted-foreground">
            You raced at
            <p className="font-bold text-foreground dark:text-primary">
              {count}
            </p>
            different tracks this season.
          </div>
          <Data count={count} data={slicedData} />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex flex-col gap-4">
          <DialogTitle>Most raced cars</DialogTitle>
          <Data count={count} data={data} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
