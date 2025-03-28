import type { Category } from "@season-summary/config";
import { ExtendedProfileManager } from "./extended-profile-manager";
import { ProfileUpdater } from "./extended/profile-updater";
import { Suspense } from "react";
import { VisitedManager } from "./visited-manager";
import { api } from "@/trpc/server";
import { env } from "@/env";
import { getServerAuthSession } from "../../../../server/auth";
import { Header } from "./extended/header";

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
  console.log(simpleData);

  if (!simpleData) {
    return <div>Failed to get data for {iracingId}</div>;
  }

  const session = await getServerAuthSession();

  return (
    <div className="flex w-full flex-col gap-4">
      <Header 
        displayName={simpleData.memberData?.displayName ?? ""} 
        iracingId={iracingId} 
        season={+season} 
        year={+year} 
        category={category} 
      />
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
    </div>
  );
};
