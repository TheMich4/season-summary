/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { type Category, categoryToName } from "@/config/category";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useMemo, useState } from "react";

import Link from "next/link";
import { cn } from "@/lib/utils";

const createResultUrl = (subsessionId: number, iracingId: string | number) =>
  `https://members.iracing.com/membersite/member/EventResult.do?subsessionid=${subsessionId}&custid=${iracingId}`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Race = ({ result }: { result: any; iracingId: string }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const finishPosition = result.finishPositionInClass + 1;

  return (
    <div className="flex flex-row justify-between rounded-md border bg-background/40 p-2 text-start">
      <div className="flex flex-row gap-2">
        <div
          className={cn(
            "w-12 self-center text-center text-3xl font-bold text-foreground",
            finishPosition === 1 && "text-primary dark:text-primary",
            finishPosition === 2 && "text-gray-400 dark:text-gray-400",
            finishPosition === 3 && "text-yellow-600 dark:text-yellow-600",
          )}
        >
          {finishPosition}.
        </div>
        <div className="flex flex-col">
          <span className="text-xs">
            {new Date(result.startTime).toLocaleString() ?? "Unknown"}
          </span>
          <span className="font-bold dark:text-primary">
            {result.seriesName}
          </span>
          <span className="text-sm">
            {result.carName}
            <span className="text-xs dark:text-primary">{" at "}</span>
            {result.track.trackName}
          </span>
        </div>
      </div>
      <Link
        href={`/result/${result.subsessionId}`}
        className="ml-2 self-center"
        prefetch={false}
      >
        <Button size="sm" variant="ghost">
          <ChevronRight className="size-4 dark:text-primary" />
        </Button>
      </Link>
    </div>
  );
};

export const RaceList = ({
  seasonResults,
  iracingId,
  category,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  seasonResults: Array<any> | undefined;
  iracingId: string;
  category: Category;
}) => {
  const [racesPerPage, setRacePerPage] = useState(10);
  const numberOfPages = useMemo(() => {
    const numberOfRaces = seasonResults?.length ?? 0;
    return Math.ceil(numberOfRaces / racesPerPage);
  }, [seasonResults, racesPerPage]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [seasonResults, numberOfPages, racesPerPage]);

  if (!seasonResults?.length) return null;

  return (
    <div className="flex flex-col gap-2 rounded-md border bg-background/40 p-2">
      <span
        className={cn(
          "pt-2 text-center text-3xl font-bold",
          numberOfPages === 0 && "pb-2",
        )}
      >
        Your {categoryToName[category]?.toLowerCase()} races this season:
      </span>

      <div className="flex flex-col justify-center gap-1 sm:flex-row">
        <div className="space-x-1 self-center">
          <span className="self-center font-bold">{`Page: ${page + 1}`}</span>
          <span className="self-center text-xs">{`(of ${numberOfPages})`}</span>
        </div>

        <div className="flex justify-center gap-1">
          <Button
            size="xs"
            variant="outline"
            disabled={page === 0}
            onClick={() => setPage((prev) => prev - 1)}
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            size="xs"
            variant="outline"
            disabled={page === numberOfPages - 1}
            onClick={() => setPage((prev) => prev + 1)}
          >
            <ChevronRight className="size-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(
                buttonVariants({ variant: "outline", size: "xs" }),
                "gap-1",
              )}
            >
              <ChevronDown className="size-4" />
              {racesPerPage} per page
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              {[10, 20, 50, 100].map((n) => (
                <DropdownMenuItem asChild key={n}>
                  <span onClick={() => setRacePerPage(n)}>{n} </span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        {seasonResults
          .slice(page * racesPerPage, (page + 1) * racesPerPage)
          .map((result) => (
            <Race
              result={result}
              iracingId={iracingId}
              key={result.subsessionId}
            />
          ))}
      </div>
    </div>
  );
};
