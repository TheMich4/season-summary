"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

import { CategoryDropdown } from "./category-dropdown";
import { SeasonSwitch } from "./season-switch";
import { useMemo } from "react";

interface ProfileHeaderProps {
  memberData: any;
  iracingId: string;
  season: number;
  year: number;
  category: string;
  lastFetch: string;
}

export const ProfileHeader = ({
  memberData,
  iracingId,
  season,
  year,
  category,
  lastFetch,
}: ProfileHeaderProps) => {
  const lastFetchString = useMemo(
    () => new Date(lastFetch).toLocaleString(),
    [lastFetch]
  );

  return (
    <div className="flex w-full flex-col">
      <div className="mb-2 grid w-full grid-cols-1 gap-2 md:grid-cols-3">
        <div className="order-3 flex flex-col items-baseline gap-1 justify-self-center text-ellipsis sm:flex-row sm:gap-2 md:order-1 md:justify-self-start">
          <p className="text-ellipsis text-3xl font-extrabold leading-tight tracking-tighter">
            {memberData?.displayName ?? ""}
          </p>
          <p className="flex items-center justify-center self-center text-sm text-foreground/80 dark:text-primary sm:self-auto">
            ({memberData?.clubName ?? ""})
          </p>
        </div>

        <div className="order-1 flex justify-center md:order-2">
          <SeasonSwitch
            iracingId={iracingId}
            season={season}
            year={year}
            category={category}
          />
        </div>

        <div className="order-2 flex items-center justify-self-center md:order-3 md:justify-self-end">
          <CategoryDropdown />
        </div>
      </div>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="self-center md:self-end">
            <div className="text-xs text-gray-400">{`Last updated: ${lastFetchString}`}</div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Your data is updated at most one time in 24 hours.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
