import { Header } from "../../_components/extended/header";
import { RaceCard } from "./race-card";
import { api } from "@/trpc/server";

interface TimelineProps {
  iracingId: string;
  season: string;
  year: string;
  category: string;
}

export const Timeline = async ({
  iracingId,
  season,
  year,
  category,
}: TimelineProps) => {
  const simpleData = await api.data.getData.query({
    iracingId,
    year: +year,
    season: +season,
    category,
  });

  console.log({ simpleData });

  return (
    <div className="h-full w-full">
      <Header
        displayName={simpleData.memberData?.displayName}
        iracingId={iracingId}
        season={+season}
        year={+year}
        category={category}
      />
      <div className="flex h-full w-full items-center">
        {simpleData.seasonResults.map((race) => (
          <RaceCard race={race} />
        ))}
      </div>
    </div>
  );
};
