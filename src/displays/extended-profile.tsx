import { View } from "@/components/extended/view";
import { getExtendedSeasonData } from "@/server/extended-data";
import { url } from "@/config/site";

export const ExtendedProfile = async ({
  iracingId,
  season,
  year,
  category,
}) => {
  const { data: results, error } = await getExtendedSeasonData(
    iracingId,
    year,
    season,
    category
  );

  if (error === "FETCHING") {
    return (
      <div className="flex flex-col items-center justify-center text-center">
        <p className="font-semibold">We are preparing your data.</p>
        <p className="text-muted-foreground">
          Please come back in few minutes!
        </p>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return <View results={results} iracingId={iracingId} />;
};
