"use client";

import { Category, categoryToName } from "@/config/category";

import { CategoryDropdown } from "../profile/category-dropdown";
import { SeasonSwitch } from "../profile/season-switch";

interface Props {
  iracingId: string;
  season: string;
  year: string;
  category: Category;
  status: string;
}

export const ExtendedPending = ({
  iracingId,
  season,
  year,
  category,
  status,
}: Props) => {
  console.log({ status, iracingId, season, year, category });
  return (
    <div className="flex w-full flex-col items-center justify-center gap-2 text-center">
      <div className="grid w-full grid-cols-1 md:grid-cols-3">
        <div className="col-start-2">
          <SeasonSwitch
            iracingId={iracingId}
            season={parseInt(season, 10)}
            year={parseInt(year, 10)}
            category={category}
          />
        </div>
        <div className="order-2 flex items-center justify-self-center md:order-3 md:justify-self-end">
          <CategoryDropdown />
        </div>
      </div>
      <p className="font-semibold">
        We are preparing your {categoryToName[category].toLowerCase()} data for
        this season.
      </p>
      <p className="text-muted-foreground">Please come back in few minutes!</p>
    </div>
  );
};
