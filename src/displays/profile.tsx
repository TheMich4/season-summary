import { getIracingData } from "@/server/get-iracing-data";
import { Frown } from "lucide-react";

import { Favorite } from "@/components/favorite";
import { IracingStats } from "@/components/iracing-stats";
import { IratingChart } from "@/components/irating-chart";
import { MemberRecap } from "@/components/member-recap";
import { RaceList } from "@/components/race-list";
import { SeasonSwitch } from "@/components/season-switch";
import { VisitedManager } from "@/components/visited-manager";

interface ProfileProps {
  iracingId: string;
  season: number;
  year: number;
}

export const Profile = async ({ iracingId, season, year }: ProfileProps) => {
  const { memberData, memberRecap, chartData, seasonResults } =
    await getIracingData(iracingId, year, season);

  if (!memberRecap || memberRecap.starts === 0) {
    return (
      <div className="flex w-full flex-col gap-2">
        <SeasonSwitch iracingId={iracingId} season={season} year={year} />
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

      <SeasonSwitch iracingId={iracingId} season={season} year={year} />

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
      <IratingChart chartData={chartData} />
      <IracingStats chartData={chartData} seasonResults={seasonResults} />
      <RaceList seasonResults={seasonResults} iracingId={iracingId} />
    </div>
  );
};
