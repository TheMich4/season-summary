import type { Category } from "@season-summary/config";
import { ExtendedProfileManager } from "./extended-profile-manager";
import { ProfileUpdater } from "./extended/profile-updater";
import { Suspense } from "react";
import { VisitedManager } from "./visited-manager";
import { api } from "@/trpc/server";
import { env } from "@/env";
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

  if (!simpleData) {
    return <div>Failed to get data for {iracingId}</div>;
  }

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
