import { CategoryDropdown } from "../category-dropdown";
import { SeasonSwitch } from "../season-switch";

interface HeaderProps {
  displayName: string;
  iracingId: string;
  season: number;
  year: number;
  category: string;
}

export const Header = ({
  displayName,
  iracingId,
  season,
  year,
  category,
}: HeaderProps) => {
  return (
    <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-3">
      <div className="order-3 flex flex-col items-baseline gap-1 justify-self-center text-ellipsis sm:flex-row sm:gap-2 md:order-1 md:justify-self-start">
        <p className="text-ellipsis text-3xl font-extrabold leading-tight tracking-tighter">
          {displayName}
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
  );
};
