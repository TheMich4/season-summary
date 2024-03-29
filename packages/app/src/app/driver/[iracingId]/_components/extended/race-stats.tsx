export const RaceStats = ({ raceData }: Record<string, any>) => {
  return (
    <div className="flex w-full flex-col rounded-md border bg-background/40 p-4 text-start">
      <div className="pb-2 text-base font-normal tracking-tight">Race</div>
      <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
        <div className="flex flex-row items-baseline gap-1">
          <p className="text-2xl font-bold">{raceData.lowest}</p>
          <p className="text-xs text-muted-foreground">best</p>
        </div>

        <div className="flex flex-row items-baseline gap-1">
          <p className="text-2xl font-bold">{raceData.highest}</p>
          <p className="text-xs text-muted-foreground">worst</p>
        </div>

        <div className="flex flex-row items-baseline gap-1">
          <p className="text-2xl font-bold">{raceData.average.toFixed(0)}</p>
          <p className="text-xs text-muted-foreground">average</p>
        </div>

        <div className="flex flex-row items-baseline gap-1">
          <p className="text-2xl font-bold">{raceData.wins}</p>
          <p className="text-xs text-muted-foreground">wins</p>
        </div>

        <div className="flex flex-row items-baseline gap-1">
          <p className="text-2xl font-bold">{raceData.podiums}</p>
          <p className="text-xs text-muted-foreground">podiums</p>
        </div>

        <div className="flex flex-row items-baseline gap-1">
          <p className="text-2xl font-bold">{raceData.bestGain}</p>
          <p className="text-xs text-muted-foreground">most gained</p>
        </div>
      </div>
    </div>
  );
};
