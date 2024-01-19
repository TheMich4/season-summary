import { Delta } from "@/components/delta";
import type { ReactNode } from "react";

export const Stat = ({
  name,
  previous,
  value,
  invert,
}: {
  invert?: boolean;
  name: string;
  previous?: string | number | ReactNode;
  value: string | number | ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-1 rounded-md border bg-background/40 p-2 text-card-foreground">
      <div className="text-center text-lg font-semibold">{name}:</div>
      <div className="flex flex-row items-baseline justify-center gap-1 md:flex-col md:items-center lg:flex-row lg:items-baseline">
        <p className="flex h-full items-center justify-center text-center text-3xl font-bold text-accent-foreground">
          {value}
        </p>
        {(previous || previous === 0) && (
          <p className="text-center text-sm font-bold">
            <Delta
              value={value as number}
              previous={previous as number}
              invert={invert}
            />
          </p>
        )}
      </div>
    </div>
  );
};
