import { categoryToName, type Category } from "@season-summary/config";
import { CategoryDropdown } from "./category-dropdown";
import { SeasonSwitch } from "./season-switch";

interface ExtendedProfileNoDataProps {
  iracingId: string;
  season: string;
  year: string;
  category: Category;
}

export const ExtendedProfileNoData = ({
  iracingId,
  season,
  year,
  category,
}: ExtendedProfileNoDataProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-2 text-center">
      <p className="font-semibold">
        No {categoryToName[category]} data found for this season.
      </p>
    </div>
  );
};
