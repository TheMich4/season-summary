export const SOF = ({ sofData }: { sofData: Record<string, any> }) => {
  return (
    <div className="flex flex-col gap-1 rounded-md border p-4">
      <p className="pb-2 text-base font-normal tracking-tight">SOF</p>
      <div className="flex flex-row items-baseline gap-1">
        <p className="text-2xl font-bold">{sofData.average.toFixed(0)}</p>
        <p className="text-xs text-muted-foreground">average</p>
      </div>

      <div className="flex flex-row items-baseline gap-1">
        <p className="text-2xl font-bold">{sofData.lowest}</p>
        <p className="text-xs text-muted-foreground">lowest</p>
      </div>

      <div className="flex flex-row items-baseline gap-1">
        <p className="text-2xl font-bold">{sofData.highest}</p>
        <p className="text-xs text-muted-foreground">highest</p>
      </div>

      {sofData.highestWin && (
        <div className="flex flex-row items-baseline gap-1">
          <p className="text-2xl font-bold">{sofData.highestWin}</p>
          <p className="text-xs text-muted-foreground">highest win</p>
        </div>
      )}
    </div>
  );
};
