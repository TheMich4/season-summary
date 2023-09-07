export const Points = ({ pointsData }: { pointsData: Racord<string, any> }) => {
  return (
    <div className="flex flex-col gap-1 rounded-md border p-4">
      <p className="pb-2 text-base font-normal tracking-tight">
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
