import { Category, categoryToId } from "@/config/category";

import { CategoryDropdown } from "@/components/profile/category-dropdown";
import { ExtendedPending } from "@/components/extended/extended-pending";
import { ProfileUpdater } from "@/components/extended/profile-updater";
import { SeasonSwitch } from "@/components/profile/season-switch";
import { Suspense } from "react";
import { View } from "@/components/extended/view";
import { VisitedManager } from "@/components/profile/visited-manager";
import { env } from "@/env.mjs";
import { getIracingData } from "@/server/get-iracing-data";

interface ExtendedProfileProps {
  iracingId: string;
  season: string;
  year: string;
  category: Category;
}

export const ExtendedProfile = async ({
  iracingId,
  season,
  year,
  category,
}: ExtendedProfileProps) => {
  const response = await fetch(
    `${env.API_URL}v2/get-full?iracingId=${iracingId}&year=${year}&season=${season}&categoryId=${categoryToId[category]}`,
    {
      cache: "no-cache",
    }
  );

  const { status, data } = await response.json();

  if (status === "NOT_FOUND") {
    const URL = `${env.API_URL}v2/request-full?iracingId=${iracingId}&year=${year}&season=${season}&categoryId=${categoryToId[category]}`;
    await fetch(URL, { cache: "no-cache" });
  }

  if (status === "NOT_FOUND" || status === "PENDING") {
    return (
      <ExtendedPending
        iracingId={iracingId}
        season={season}
        year={year}
        category={category}
        status={status}
        wsUrl={env.WS_URL}
      />
    );
  }

  if (!data || data?.length === 0) {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-2 text-center">
        <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-3">
          <div className="md:col-start-2">
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
          No {category} data found for this season.
        </p>
      </div>
    );
  }

  const simpleData = await getIracingData(iracingId, +year, +season, category);

  return (
    <>
      <VisitedManager
        iracingId={iracingId}
        displayName={simpleData.memberData?.displayName}
      />

      <View
        data={data}
        iracingId={iracingId}
        simpleData={simpleData}
        season={season}
        year={year}
        category={category}
      />

      <Suspense fallback={null}>
        <ProfileUpdater
          iracingId={+iracingId}
          year={+year}
          season={+season}
          category={category}
        />
      </Suspense>
    </>
  );
};
