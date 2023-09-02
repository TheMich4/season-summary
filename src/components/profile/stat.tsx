import { Delta } from "../common/Delta";
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
    <div className="flex flex-col gap-1 rounded-md border p-2 bg-card/80 text-card-foreground">
      <div className="text-center text-lg font-semibold">{name}:</div>
      <div className="flex flex-row md:flex-col lg:flex-row items-baseline gap-1 justify-center md:items-center lg:items-baseline">
        <p className="items-center flex h-full justify-center text-center text-3xl font-bold text-accent-foreground">
          {value}
        </p>
        {(previous || previous === 0) && (
          <p className="text-center text-sm font-bold">
            {<Delta value={value as number} previous={previous as number} />}
          </p>
        )}
      </div>
    </div>
  );
};
