interface PointsProps {
  pointsData: {
    average: number;
    lowest: number;
    highest: number;
    races: number;
  };
}

export const Points = ({ pointsData }: PointsProps) => {
  return (
    <div className="flex flex-col gap-1 rounded-md border bg-background/40 p-4">
      <p className="pb-2 text-start font-normal tracking-tight">
        Championship Points
      </p>
      <div className="flex flex-row items-baseline gap-1">
        <p className="text-2xl font-bold">{pointsData.average.toFixed(0)}</p>
        <p className="text-xs text-muted-foreground">average</p>
      </div>

      <div className="flex flex-row items-baseline gap-1">
        <p className="text-2xl font-bold">{pointsData.lowest}</p>
        <p className="text-xs text-muted-foreground">lowest</p>
      </div>

      <div className="flex flex-row items-baseline gap-1">
        <p className="text-2xl font-bold">{pointsData.highest}</p>
        <p className="text-xs text-muted-foreground">highest</p>
      </div>
    </div>
  );
};
