import { Test } from "@/components/extended/test";
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

  // TODO: Add notification that data is being fetched
  const data = await test?.json();

  if (data.error) {
    return <div>{data.error}</div>;
  }

  return <Test data={data} iracingId={iracingId} />;
};
