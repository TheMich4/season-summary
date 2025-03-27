"use client";

import { cn } from "@/lib/utils";
import { Delta } from "@/components/delta";
import { Skeleton } from "@/components/ui/skeleton";
import { useMemo, type ReactNode } from "react";
import { Counter } from "@/components/counter";
import { motion } from "framer-motion";

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
      return <Counter value={value} />;
    }

    return value;
  }, [value, useCounter, withSkeleton]);

  // Determine if we should show a delta value
  const showDelta = previous !== undefined &&
    !(ignorePreviousIfZero && previous === 0) &&
    !(ignorePreviousIfValueZero && value === 0);

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-md border border-primary/20 bg-background/40 p-4 text-start transition-colors hover:border-primary/40",
        className
      )}
    >
      {/* Decorative gradient element */}
      <div className="absolute -right-2 -top-2 h-12 w-12 rounded-full bg-primary/5 opacity-0 blur-xl transition-opacity group-hover:opacity-100" />
      
      <div className="relative z-10">
        <div className="text-sm font-medium tracking-tight text-foreground/60 group-hover:text-foreground/80">
          {label}
        </div>
        <div className="mt-1 flex flex-row items-baseline gap-1">
          <div className="text-2xl font-bold text-foreground/90 group-hover:text-foreground">
            {parsedValue}
          </div>

          {showDelta && (
            <div className="text-sm">
              <Delta
                value={value as number}
                previous={previous!}
                invert={invert}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
