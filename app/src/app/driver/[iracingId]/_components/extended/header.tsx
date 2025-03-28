import { CategoryDropdown } from "../category-dropdown";
import { SeasonSwitch } from "../season-switch";
import { AnimatedSection } from "../../_components/animated/animated-section";

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
    <AnimatedSection className="w-full" delay={0.1}>
      <div className="flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col items-center md:items-start">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
            {displayName}
          </h1>
        </div>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
          <SeasonSwitch
            iracingId={iracingId}
            season={season}
            year={year}
            category={category}
          />
          <CategoryDropdown />
        </div>
      </div>
    </AnimatedSection>
  );
};
