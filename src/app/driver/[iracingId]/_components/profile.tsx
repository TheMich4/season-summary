import { type Category } from "@/config/category";
import { Frown } from "lucide-react";
import { env } from "@/env.mjs";
import { Suspense } from "react";
import { getIracingData } from "@/server/get-iracing-data";
import { SeasonSwitch } from "./profile/season-switch";
import { VisitedManager } from "./profile/visited-manager";
import { ProfileHeader } from "./profile/profile-header";
import { MemberRecap } from "./profile/member-recap";
import { Favorite } from "./profile/favorite";
import { IratingChart } from "./profile/irating-chart";
import { IracingStats } from "./profile/iracing-stats";
import { NewStats } from "./profile/new-stats";
import { RaceList } from "./profile/race-list";
import { FullDataManager } from "./profile/full-data-manager";

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
  const data = await getIracingData(iracingId, year, season, category);

  if (!data || data.error) {
    return (
      <div className="flex w-full flex-col gap-2">
        <SeasonSwitch
          iracingId={iracingId}
          season={season}
          year={year}
          category={category}
        />
        <div className="flex flex-col justify-center gap-2 text-center text-3xl font-extrabold leading-tight tracking-tighter">
          Failed getting data! Try again later.
          <Frown className="mt-2 self-center" size={48} />
        </div>
      </div>
    );
  }

  const {
    memberData,
    memberRecap,
    chartData,
    seasonResults,
    previousSeasonStats,
    firstRace,
    lastRace,
  } = data;

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

      <ProfileHeader
        memberData={memberData}
        iracingId={iracingId}
        season={season}
        year={year}
        category={category}
      />

      <MemberRecap
        memberRecap={memberRecap}
        previousSeasonStats={previousSeasonStats}
      />
      <Favorite memberRecap={memberRecap} />

      <IratingChart chartData={chartData} />
      <IracingStats
        chartData={chartData}
        seasonResults={seasonResults}
        firstRace={firstRace}
        lastRace={lastRace}
        iracingId={iracingId}
      />
      {seasonResults.length > 0 && <NewStats seasonResults={seasonResults} />}
      <RaceList
        seasonResults={seasonResults}
        iracingId={iracingId}
        category={category}
      />

      <Suspense fallback={<></>}>
        <FullDataManager
          apiUrl={env.API_URL}
          iracingId={parseInt(iracingId, 10)}
          year={year}
          season={season}
          category={category}
        />
      </Suspense>
    </div>
  );
};
