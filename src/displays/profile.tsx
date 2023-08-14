import { type Category } from "@/config/category";
import { getIracingData } from "@/server/get-iracing-data";
import { Frown } from "lucide-react";
import { SeasonSwitch } from "../components/profile/season-switch";
import { VisitedManager } from "../components/profile/visited-manager";
import { MemberRecap } from "../components/profile/member-recap";
import { CategorySwitch } from "@/components/profile/category-switch";
import { IratingChart } from "../components/profile/irating-chart";
import { IracingStats } from "@/components/profile/iracing-stats";
import { RaceList } from "@/components/profile/race-list";
import { Favorite } from "@/components/profile/favorite";

interface ProfileProps {
  iracingId: string;
  season: number;
  year: number;
  category: Category;
}

export const Profile = async ({
  iracingId,
  season,
  year,
  category,
}: ProfileProps) => {
  const {
    memberData,
    memberRecap,
    chartData,
    seasonResults,
    firstRace,
    lastRace,
  } = await getIracingData(iracingId, year, season, category);

  if (!memberRecap || memberRecap.starts === 0) {
    return (
      <div className="flex w-full flex-col gap-2">
        <SeasonSwitch
          iracingId={iracingId}
          season={season}
          year={year}
          category={category}
        />
        <div className="flex flex-col justify-center gap-2 text-center text-3xl">
          <span className="font-extrabold leading-tight tracking-tighter">
            {memberData?.displayName ?? "This driver"}
          </span>
          <span className="font-semibold">
            {" doesn't have any data for this season"}
          </span>
          <Frown className="mt-2 self-center" size={48} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-2">
      <VisitedManager
        iracingId={iracingId}
        displayName={memberData?.displayName}
      />

      <SeasonSwitch
        iracingId={iracingId}
        season={season}
        year={year}
        category={category}
      />

      <div className="flex flex-col justify-center gap-2 md:flex-row">
        <div className="text-center text-3xl font-extrabold leading-tight tracking-tighter">
          {memberData?.displayName}
        </div>
        <div className="flex items-center justify-center text-end text-sm text-primary/80">
          ({memberData?.clubName})
        </div>
      </div>

      <MemberRecap memberRecap={memberRecap} />
      <Favorite memberRecap={memberRecap} />

      <CategorySwitch
        category={category}
        iracingId={iracingId}
        season={season}
        year={year}
      />

      <IratingChart chartData={chartData} />
      <IracingStats
        chartData={chartData}
        seasonResults={seasonResults}
        firstRace={firstRace}
        lastRace={lastRace}
        iracingId={iracingId}
      />
      <RaceList
        seasonResults={seasonResults}
        iracingId={iracingId}
        category={category}
      />
    </div>
  );
};
