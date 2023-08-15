"use client";

import { Category, categoryToName } from "@/config/category";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const racesPerPage = 10;

const createResultUrl = (subsessionId: number, iracingId: string | number) =>
  `https://members.iracing.com/membersite/member/EventResult.do?subsessionid=${subsessionId}&custid=${iracingId}`;

const Race = ({ result, iracingId }: { result: any; iracingId: string }) => {
  const finishPosition = result.finishPositionInClass + 1;

  return (
    <div className="flex flex-row justify-between rounded-md border p-2 bg-card">
      <div className="flex flex-row gap-2">
        <div
          className={cn(
            "w-12 self-center text-center text-3xl font-bold dark:text-primary",
            finishPosition === 1 && "text-yellow-400 dark:text-yellow-400",
            finishPosition === 2 && "text-gray-400 dark:text-gray-400",
            finishPosition === 3 && "text-yellow-600 dark:text-yellow-600"
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
        href={createResultUrl(result.subsessionId, iracingId)}
        className="ml-2 self-center"
        rel="noopener noreferrer"
        target="_blank"
      >
        <Button size="sm" variant="ghost">
          <ChevronRight className="h-4 w-4 dark:text-primary" />
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
  seasonResults: Array<any> | undefined;
  iracingId: string;
  category: Category;
}) => {
  const numberOfPages = useMemo(() => {
    const numberOfRaces = seasonResults?.length ?? 0;
    return Math.ceil(numberOfRaces / racesPerPage);
  }, [seasonResults]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [seasonResults, numberOfPages]);

  if (!seasonResults?.length) return null;

  return (
    <div className="flex flex-col gap-2 rounded-md border p-2 bg-card">
      <span
        className={cn(
          "pt-2 text-center text-3xl font-bold",
          numberOfPages === 0 && "pb-2"
        )}
      >
        Your {categoryToName[category]} races this season:
      </span>

      {numberOfPages > 1 && (
        <div className="flex flex-row justify-center gap-1">
          <div className="space-x-1 self-center">
            <span className="self-center font-bold">{`Page: ${page + 1}`}</span>
            <span className="self-center text-xs">{`(of ${numberOfPages})`}</span>
          </div>
          <Button
            size="xs"
            variant="outline"
            disabled={page === 0}
            onClick={() => setPage((prev) => prev - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            size="xs"
            variant="outline"
            disabled={page === numberOfPages - 1}
            onClick={() => setPage((prev) => prev + 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        {seasonResults
          .slice(page * racesPerPage, (page + 1) * racesPerPage)
          .map((result) => (
            <Race result={result} iracingId={iracingId} />
          ))}
      </div>
    </div>
  );
};
