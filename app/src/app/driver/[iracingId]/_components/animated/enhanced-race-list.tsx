"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { ChevronDown, ChevronLeft, ChevronRight, Trophy, Car, MapPin, Calendar, Flag, Users } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { Category } from "@season-summary/config";
import Link from "next/link";
import { categoryToName } from "@season-summary/config";
import { cn } from "@/lib/utils";

interface RaceProps {
  result: any;
  iracingId: string;
  index: number;
}

const Race = ({ result, iracingId, index }: RaceProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const finishPosition = result.finishPositionInClass + 1;
  const raceDate = new Date(result.startTime);
  const isWin = finishPosition === 1;
  const isPodium = finishPosition <= 3;
  
  // Format the race time and date
  const formattedDate = raceDate.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric'
  });
  const formattedTime = raceDate.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit'
  });

  // Determine highlight colors
  const positionColor = 
    finishPosition === 1 ? "text-primary border-primary" : 
    finishPosition === 2 ? "text-gray-400 border-gray-400" : 
    finishPosition === 3 ? "text-yellow-600 border-yellow-600" : 
    "text-muted-foreground border-muted-foreground/50";
  
  return (
    <motion.div 
      className="overflow-hidden rounded-xl border border-primary/20 bg-background/70 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-primary/40"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ scale: 1.01 }}
    >
      <div className="flex items-center p-3">
        {/* Position indicator */}
        <div className={`relative mr-3 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2 ${positionColor} font-bold text-2xl`}>
          {finishPosition}
          {isWin && <Trophy className="absolute -right-2 -top-2 h-5 w-5 text-primary" />}
        </div>
        
        {/* Race details */}
        <div className="flex grow flex-col">
          <div className="flex items-center justify-between">
            <span className="font-bold text-foreground">
              {result.seriesName}
            </span>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span>{formattedDate} {formattedTime}</span>
            </div>
          </div>
          
          <div className="mt-1 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Car className="h-3 w-3" />
                <span>{result.carName}</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span>{result.track.trackName}</span>
              </div>
            </div>
            
            {(result.strengthOfField || result.sizeOfField) && (
              <div className="flex gap-2 text-xs">
                {result.strengthOfField && (
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Flag className="h-3 w-3" />
                    <span>SOF: {result.strengthOfField}</span>
                  </div>
                )}
                {result.sizeOfField && (
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Users className="h-3 w-3" />
                    <span>Field: {result.sizeOfField}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* View details button */}
        <Link
          href={`/result/${result.subsessionId}`}
          className="ml-2 self-center"
          prefetch={false}
        >
          <Button size="sm" variant="ghost" className={isPodium ? "text-primary" : ""}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};

export const EnhancedRaceList = ({
  seasonResults,
  iracingId,
  category,
}: {
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

  // Memoize the filtered race results
  const displayedRaces = seasonResults.slice(page * racesPerPage, (page + 1) * racesPerPage);
  
  // Calculate stats
  const wins = seasonResults.filter(r => r.finishPositionInClass === 0).length;
  const podiums = seasonResults.filter(r => r.finishPositionInClass <= 2).length;
  const totalRaces = seasonResults.length;

  return (
    <motion.div 
      className="overflow-hidden rounded-xl border border-primary/20 bg-background/70 p-4 shadow-sm backdrop-blur-md"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              {categoryToName[category]} Season Races
            </h2>
            <p className="text-sm text-muted-foreground text-left">
              {totalRaces} races with {wins} wins and {podiums} podium finishes
            </p>
          </div>
          
          {/* Pagination controls */}
          <div className="flex items-center gap-2">
            <div className="flex h-8 items-center rounded-lg border border-primary/10 bg-background/50 px-3 py-1 text-sm">
              <span>Page {page + 1} of {numberOfPages}</span>
            </div>
            
            <div className="flex gap-1">
              <Button
                size="sm"
                variant="outline"
                className="h-8 w-8 p-0"
                disabled={page === 0}
                onClick={() => setPage((prev) => prev - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="h-8 w-8 p-0"
                disabled={page === numberOfPages - 1}
                onClick={() => setPage((prev) => prev + 1)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" }),
                    "h-8 gap-1 w-24"
                  )}
                >
                  <span>{racesPerPage}</span>
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  {[5, 10, 20, 50].map((n) => (
                    <DropdownMenuItem key={n} onClick={() => setRacePerPage(n)}>
                      {n} per page
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
        
        {/* Race list */}
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          {displayedRaces.map((result, index) => (
            <Race
              result={result}
              iracingId={iracingId}
              key={result.subsessionId}
              index={index}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}; 