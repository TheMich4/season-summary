import { View } from "@/components/extended/view";
import { categoryToId } from "@/config/category";
import { env } from "@/env.mjs";
import { getExtendedSeasonData } from "@/server/extended-data";
import { url } from "@/config/site";

export const ExtendedProfile = async ({
  iracingId,
  season,
  year,
  category,
}) => {
  const response = await fetch(
    `${env.API_URL}get-full-data?iracingId=${iracingId}&year=${year}&season=${season}&categoryId=${categoryToId[category]}`,
    {
      cache: "no-cache",
    }
  );

  const { error, data, isFetching } = await response.json();

  if (isFetching || error === "START_FETCHING") {
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

  if (data?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center">
        <p className="font-semibold">No data found.</p>
      </div>
    );
  }

  return <View results={data} iracingId={iracingId} />;
};
