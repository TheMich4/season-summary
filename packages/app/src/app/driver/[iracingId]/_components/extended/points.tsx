import { Counter } from "@/components/counter";

interface PointsProps {
  pointsData: {
    average: number;
    lowest: number;
    highest: number;
    races: number;
  };
  useCounter?: boolean;
}

export const Points = ({ pointsData, useCounter = false }: PointsProps) => {
  return (
    <div className="flex flex-col gap-1 rounded-md border bg-background/40 p-4">
      <p className="pb-2 text-start font-normal tracking-tight">
        Championship Points
      </p>
      <div className="flex flex-row items-baseline gap-1">
        <p className="text-2xl font-bold">
          <Counter value={pointsData.average} disabled={!useCounter} />
        </p>
        <p className="text-xs text-muted-foreground">average</p>
      </div>

      <div className="flex flex-row items-baseline gap-1">
        <p className="text-2xl font-bold">
          <Counter value={pointsData.lowest} disabled={!useCounter} />
        </p>
        <p className="text-xs text-muted-foreground">lowest</p>
      </div>

      <div className="flex flex-row items-baseline gap-1">
        <p className="text-2xl font-bold">
          <Counter value={pointsData.highest} disabled={!useCounter} />
        </p>
        <p className="text-xs text-muted-foreground">highest</p>
      </div>
    </div>
  );
};
