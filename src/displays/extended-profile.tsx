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

  if (data?.error) {
    return <div>{data.error}</div>;
  }

  return <View data={data} iracingId={iracingId} />;
};
