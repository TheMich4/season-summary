"use server";

import { Category, categoryToId } from "@/config/category";

import { FullDataToaster } from "./full-data-toaster";

export const FullDataManager = async ({
  iracingId,
  year,
  season,
  category,
  apiUrl,
}: {
  iracingId: number;
  year: number;
  season: number;
  category: Category;
  apiUrl: string;
}) => {
  const URL = `${apiUrl}get-full-data-status?iracingId=${iracingId}&year=${year}&season=${season}&categoryId=${categoryToId[category]}`;
  const response = await fetch(URL, { cache: "no-cache" });
  const { isFetching, isFetched } = await response.json();

  return (
    <FullDataToaster
      iracingId={iracingId}
      year={year}
      season={season}
      category={category}
      isFetching={isFetching}
      isFetched={isFetched}
    />
  );
};
