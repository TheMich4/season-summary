"use client";

import { CategoryDropdown } from "./category-dropdown";
import { SeasonSwitch } from "./season-switch";
import { useConfig } from "../providers/config-provider";
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
    <div className="w-full flex flex-col">
      <div className="w-full grid grid-cols-1 md:grid-cols-3 mb-2 gap-2">
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 justify-self-center md:justify-self-start order-3 md:order-1 text-ellipsis items-baseline">
          <p className="text-3xl font-extrabold leading-tight tracking-tighter text-ellipsis">
            {memberData?.displayName ?? ""}
          </p>
          <p className="flex items-center justify-center self-center sm:self-auto text-sm dark:text-primary text-foreground/80">
            ({memberData?.clubName ?? ""})
          </p>
        </div>

        <div className="order-1 md:order-2 flex justify-center">
          <SeasonSwitch
            iracingId={iracingId}
            season={season}
            year={year}
            category={category}
          />
        </div>

        <div className="md:justify-self-end align-center justify-self-center order-2 md:order-3 flex items-center">
          <CategoryDropdown />
        </div>
      </div>
      <p className="text-xs self-end text-gray-400">{`Last updated: ${lastFetchString}`}</p>
    </div>
  );
};
