"use server";

import { Category, categoryToId } from "@/config/category";

import { env } from "process";

export const getIracingData = async (
  iracingId: string,
  year: number,
  season: number,
  category: Category
) => {
  const categoryId = categoryToId[category];
  const response = await fetch(
    `${env.API_URL}v2/get-iracing-data?iracingId=${iracingId}&year=${year}&season=${season}&categoryId=${categoryId}`
  );
  return await response.json();
};
