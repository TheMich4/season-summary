import { categoryToId, categoryToName } from "@/config/category";

import { CategoryDropdown } from "@/components/profile/category-dropdown";
import { SeasonSwitch } from "@/components/profile/season-switch";
import { View } from "@/components/extended/view";
import { env } from "@/env.mjs";
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
      <div className="flex w-full flex-col items-center justify-center gap-2 text-center">
        <div className="grid w-full grid-cols-1 md:grid-cols-3">
          <div className="col-start-2">
            <SeasonSwitch
              iracingId={iracingId}
              season={parseInt(season, 10)}
              year={parseInt(year, 10)}
              category={category}
            />
          </div>
          <div className="order-2 flex items-center justify-self-center md:order-3 md:justify-self-end">
            <CategoryDropdown />
          </div>
        </div>
        <p className="font-semibold">
          We are preparing your {categoryToName[category].toLowerCase()} data
          for this season.
        </p>
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
      <div className="flex w-full flex-col items-center justify-center gap-2 text-center">
        <div className="grid w-full grid-cols-1 md:grid-cols-3">
          <div className="col-start-2">
            <SeasonSwitch
              iracingId={iracingId}
              season={parseInt(season, 10)}
              year={parseInt(year, 10)}
              category={category}
            />
          </div>
          <div className="order-2 flex items-center justify-self-center md:order-3 md:justify-self-end">
            <CategoryDropdown />
          </div>
        </div>
        <p className="font-semibold">
          No data {category} found for this season.
        </p>
      </div>
    );
  }

  const simpleResponse = await fetch(
    `${url}/api/season-data?iracingId=${iracingId}&year=${year}&season=${season}&category=${category}`
  );

  const { data: simpleData } = await simpleResponse.json();

  return (
    <View
      data={data}
      iracingId={iracingId}
      simpleData={simpleData}
      season={season}
      year={year}
      category={category}
    />
  );
};
