import { Test } from "@/components/extended/test";
import { getExtendedSeasonData } from "@/server/get-extended-season-data";

export const ExtendedProfile = async ({
  iracingId,
  season,
  year,
  category,
}) => {
  const x = await getExtendedSeasonData(iracingId, year, season, category);

  return (
    <div>
      <Test x={x} />
    </div>
  );
};
