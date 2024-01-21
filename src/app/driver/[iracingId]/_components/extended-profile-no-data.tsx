import { Category } from "@/config/category";
import { SeasonSwitch } from "./season-switch";
import { CategoryDropdown } from "./category-dropdown";

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
      <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-3">
        <div className="md:col-start-2">
          <SeasonSwitch
            iracingId={iracingId}
            season={+season}
            year={+year}
            category={category}
          />
        </div>
        <div className="order-2 flex items-center justify-self-center md:order-3 md:justify-self-end">
          <CategoryDropdown />
        </div>
      </div>
      <p className="font-semibold">No {category} data found for this season.</p>
    </div>
  );
};
