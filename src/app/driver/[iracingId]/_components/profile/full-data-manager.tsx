"use server";

import { Category, categoryToId } from "@/config/category";

import { FullDataToaster } from "./full-data-toaster";
import { env } from "@/env.mjs";

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
  const URL = `${apiUrl}v2/request-full?iracingId=${iracingId}&year=${year}&season=${season}&categoryId=${categoryToId[category]}`;
  await fetch(URL, { cache: "no-cache" });

  return (
    <FullDataToaster
      category={category}
      iracingId={iracingId}
      season={season}
      wsUrl={env.WS_URL}
      year={year}
    />
  );
};
