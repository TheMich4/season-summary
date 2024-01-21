import { Category } from "@/config/category";

import { ProfileUpdater } from "./extended/profile-updater";
import { Suspense } from "react";
import { env } from "@/env.mjs";
import { getIracingData } from "@/server/get-iracing-data";
import { ExtendedProfileManager } from "./extended-profile-manager";
import { VisitedManager } from "./visited-manager";

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
  const simpleData = await getIracingData(iracingId, +year, +season, category);

  return (
    <>
      <ExtendedProfileManager
        iracingId={iracingId}
        season={season}
        year={year}
        category={category}
        wsUrl={env.WS_URL}
        simpleData={simpleData}
      />

      <VisitedManager
        iracingId={iracingId}
        displayName={simpleData.memberData?.displayName}
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
