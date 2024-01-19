import { cn } from "@/lib/utils";
import { Delta } from "../common/Delta";
import { Skeleton } from "../ui/skeleton";

interface SimpleStatProps {
  label: string;
  value?: string | number;
  previous?: number | null;
  invert?: boolean;
  ignorePreviousIfZero?: boolean;
  ignorePreviousIfValueZero?: boolean;
  className?: string;
  withSkeleton?: boolean;
}

export const SimpleStat = ({
  label,
  value,
  previous = undefined,
  invert = false,
  ignorePreviousIfZero = false,
  ignorePreviousIfValueZero = false,
  className = "",
  withSkeleton = false,
}: SimpleStatProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-col rounded-md border bg-background/40 p-4 text-start",
        className
      )}
    >
      <div className="pb-2 text-base font-normal tracking-tight">{label}</div>
      <div className="flex flex-row items-baseline gap-1 text-2xl font-bold">
        <p>
          {value !== undefined
            ? value
            : withSkeleton && <Skeleton className="h-8 w-16" />}
        </p>
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
