import { Test } from "@/components/extended/test";
import { getExtendedSeasonData } from "@/server/extended-data";
import { url } from "@/config/site";

export const ExtendedProfile = async ({
  iracingId,
  season,
  year,
  category,
}) => {
  const test = await fetch(
    `${url}/api/season-data/extended/?iracingId=${iracingId}&year=${year}&season=${season}&category=${category}`
  );
  const data = await test.json();

  return (
    <div>
      <Test data={data} iracingId={iracingId} />
    </div>
  );
};
