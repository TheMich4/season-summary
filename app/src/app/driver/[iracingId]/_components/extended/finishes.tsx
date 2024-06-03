import { Counter } from "@/components/counter";

interface PointsProps {
  finishes: {
    Disconnected?: number;
    Running?: number;
  };
  useCounter?: boolean;
}

export const Finishes = ({ finishes, useCounter = false }: PointsProps) => {
  return (
    <div className="flex flex-col gap-1 rounded-md border bg-background/40 p-4">
      <p className="pb-2 text-start font-normal tracking-tight">
        Race Finishes
      </p>
      <div className="flex flex-row items-baseline gap-1">
        <p className="text-2xl font-bold">
          <Counter value={finishes.Running || 0} disabled={!useCounter} />
        </p>
        <p className="text-xs text-muted-foreground">finished races</p>
      </div>

      <div className="flex flex-row items-baseline gap-1">
        <p className="text-2xl font-bold">
          <Counter value={finishes.Disconnected || 0} disabled={!useCounter} />
        </p>
        <p className="text-xs text-muted-foreground">DNFs</p>
      </div>
    </div>
  );
};
