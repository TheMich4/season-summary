export const QualifyingStats = ({ qualiData }: Record<string, any>) => {
  return (
    <div className="flex w-full flex-col rounded-md border bg-background/40 p-4 text-start">
      <div className="pb-2 text-base font-normal tracking-tight">
        Qualifying
      </div>
      <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
        <div className="flex flex-row items-baseline gap-1">
          <p className="text-2xl font-bold">{qualiData.lowest}</p>
          <p className="text-xs text-muted-foreground">best</p>
        </div>

        <div className="flex flex-row items-baseline gap-1">
          <p className="text-2xl font-bold">{qualiData.highest}</p>
          <p className="text-xs text-muted-foreground">worst</p>
        </div>

        <div className="flex flex-row items-baseline gap-1">
          <p className="text-2xl font-bold">{qualiData.average.toFixed(0)}</p>
          <p className="text-xs text-muted-foreground">average</p>
        </div>

        <div className="flex flex-row items-baseline gap-1">
          <p className="text-2xl font-bold">{qualiData.poles}</p>
          <p className="text-xs text-muted-foreground">poles</p>
        </div>
      </div>
    </div>
  );
};
