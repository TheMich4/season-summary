import Box from "~/components/Box";
import { SeasonResult } from "~/types";
import { useMemo } from "react";

const Stat = ({ label, value }: { label: string; value: string }) => {
  return (
    <Box>
      <div className="flex flex-col items-center gap-2">
        <div className="font-bold">{label}:</div>
        <div className="font text-center text-2xl">{value}</div>
      </div>
    </Box>
  );
};

const RaceRecap = ({
  seasonResults,
}: {
  seasonResults: Array<SeasonResult>;
}) => {
  const { busiestDay, mostRaces } = useMemo(() => {
    const racesPerDay = seasonResults.reduce((acc, result) => {
      const date = result.startTime.split("T")[0] as string;
      if (acc[date]) {
        acc[date] += 1;
      } else {
        acc[date] = 1;
      }
      return acc;
    }, {} as Record<string, number>);

    const [busiestDay, mostRaces] = Object.entries(racesPerDay).reduce(
      ([date, count], [currentDate, currentCount]) => {
        if (currentCount > count) {
          return [currentDate, currentCount];
        } else {
          return [date, count];
        }
      },
      ["", -1]
    );

    return {
      busiestDay,
      mostRaces: mostRaces.toString(),
    };
  }, [seasonResults]);

  return (
    <div className="grid w-full grid-cols-1 grid-rows-4 gap-2 sm:grid-cols-2 sm:grid-rows-2  md:grid-cols-4 md:grid-rows-1">
      <Stat label="Busiest day" value={busiestDay} />
      <Stat label="Most races" value={mostRaces} />
    </div>
  );
};

export default RaceRecap;
