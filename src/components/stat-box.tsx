import { cn } from "@/lib/utils";
import { Delta } from "@/components/delta";
import { Skeleton } from "@/components/ui/skeleton";
import { useMemo, type ReactNode } from "react";
import { Counter } from "@/components/counter";

interface StatBoxProps {
  label: string;
  value?: string | number | ReactNode;
  previous?: number | null;
  invert?: boolean;
  ignorePreviousIfZero?: boolean;
  ignorePreviousIfValueZero?: boolean;
  className?: string;
  withSkeleton?: boolean;
  useCounter?: boolean;
}

export const StatBox = ({
  label,
  value,
  previous = undefined,
  invert = false,
  ignorePreviousIfZero = false,
  ignorePreviousIfValueZero = false,
  className = "",
  withSkeleton = false,
  useCounter = false,
}: StatBoxProps) => {
  const parsedValue = useMemo(() => {
    if (value === undefined) {
      if (withSkeleton) return <Skeleton className="h-8 w-16" />;
      return null;
    }

    if (useCounter && typeof value === "number" && value > 0) {
      return <Counter value={value as number} />;
    }

    return value;
  }, [value, useCounter, withSkeleton]);

  return (
    <div
      className={cn(
        "flex w-full flex-col rounded-md border bg-background/40 p-4 text-start",
        className
      )}
    >
      <div className="pb-2 text-base font-normal tracking-tight">{label}</div>
      <div className="flex flex-row items-baseline gap-1 text-2xl font-bold">
        <p>{parsedValue}</p>

        {previous !== undefined &&
        !(ignorePreviousIfZero && previous === 0) &&
        !(ignorePreviousIfValueZero && value === 0) ? (
          <p className="text-sm">
            <Delta
              value={value as number}
              previous={previous as number}
              invert={invert}
            />
          </p>
        ) : null}
      </div>
    </div>
  );
};
