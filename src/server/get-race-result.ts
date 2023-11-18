"use server";

import { env } from "process";

export const getRaceResult = async (subsessionId: string | number) => {
  const response = await fetch(
    `${env.API_URL}v2/get-race-result?subsessionId=${subsessionId}`
  );
  const { data } = await response.json();

  return data;
};
