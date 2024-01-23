"use server";

import { Category, categoryToId } from "@/config/category";

import { ProfileRefresher } from "./profile-refresher";
import { env } from "@/env.mjs";

interface Props {
  iracingId: number;
  year: number;
  season: number;
  category: Category;
}

export const ProfileUpdater = async ({
  iracingId,
  year,
  season,
  category,
}: Props) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const URL = `${env.API_URL}v2/request-full?iracingId=${iracingId}&year=${year}&season=${season}&categoryId=${categoryToId[category]}`;
  await fetch(URL, { cache: "no-cache" });

  return null;

  // return (
  //   <div>
  //     <ProfileRefresher
  //       iracingId={iracingId}
  //       year={year}
  //       season={season}
  //       category={category}
  //       wsUrl={env.WS_URL}
  //     />
  //   </div>
  // );
};
