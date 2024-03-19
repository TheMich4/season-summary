import { type Category } from "@/config/category";

import { ProfileUpdater } from "./extended/profile-updater";
import { Suspense } from "react";
import { env } from "@/env";
import { ExtendedProfileManager } from "./extended-profile-manager";
import { VisitedManager } from "./visited-manager";
import { api } from "@/trpc/server";
import { getServerAuthSession } from "../../../../server/auth";

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
  const simpleData = await api.data.getData.query({
    iracingId,
    year: +year,
    season: +season,
    category,
  });

  const session = await getServerAuthSession();

  return (
    <>
      <ExtendedProfileManager
        iracingId={iracingId}
        season={season}
        year={year}
        category={category}
        wsUrl={env.WS_URL}
        simpleData={simpleData}
        session={session}
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
