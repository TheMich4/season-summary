import { View } from "@/components/extended/view";
import { url } from "@/config/site";

export const ExtendedProfile = async ({
  iracingId,
  season,
  year,
  category,
}) => {
  const response = await fetch(
    `${url}/api/season-data/extended/?iracingId=${iracingId}&year=${year}&season=${season}&category=${category}`
  );

  // TODO: Add notification that data is being fetched
  const data = await response?.json();

  if (data?.error === "FETCHING") {
    return (
      <div className="flex flex-col items-center justify-center text-center">
        <p className="font-semibold">We are preparing your data.</p>
        <p className="text-muted-foreground">
          Please come back in few minutes!
        </p>
      </div>
    );
  }

  if (data?.error) {
    return <div>{data.error}</div>;
  }

  return <View data={data} iracingId={iracingId} />;
};
