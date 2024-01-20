import { Counter } from "@/components/counter";

export const SOF = ({
  sofData,
  useCounter = false,
}: {
  sofData: Record<string, any>;
  useCounter?: boolean;
}) => {
  return (
    <div className="flex flex-col gap-1 rounded-md border bg-background/40 p-4">
      <p className="pb-2 text-start font-normal tracking-tight">SOF</p>
      <div className="flex flex-row items-baseline gap-1">
        <p className="text-2xl font-bold">
          <Counter value={sofData.average} disabled={!useCounter} />
        </p>
        <p className="text-xs text-muted-foreground">average</p>
      </div>

      <div className="flex flex-row items-baseline gap-1">
        <p className="text-2xl font-bold">
          <Counter value={sofData.lowest} disabled={!useCounter} />
        </p>
        <p className="text-xs text-muted-foreground">lowest</p>
      </div>

      <div className="flex flex-row items-baseline gap-1">
        <p className="text-2xl font-bold">
          <Counter value={sofData.highest} disabled={!useCounter} />
        </p>
        <p className="text-xs text-muted-foreground">highest</p>
      </div>

      {sofData.highestWin && (
        <div className="flex flex-row items-baseline gap-1">
          <p className="text-2xl font-bold">
            <Counter value={sofData.highestWin} disabled={!useCounter} />
          </p>
          <p className="text-xs text-muted-foreground">highest win</p>
        </div>
      )}
    </div>
  );
};
