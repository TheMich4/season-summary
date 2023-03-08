import { type AxiosInstance } from "axios";
import { getLoginData, parseIracingResponse } from "./helpers";
import { CookieJar } from "tough-cookie";
import axios from "axios";
import { wrapper } from "axios-cookiejar-support";
import type { MemberData, MemberRecap, SeasonResult } from "./types";

const jar = new CookieJar();

export const createApiInstance = (): AxiosInstance => {
  return wrapper(
    axios.create({
      baseURL: "https://members-ng.iracing.com/",
      timeout: 5000,
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json",
      },
      withCredentials: true,
      jar,
    })
  );
};

export const login = async (apiInstance: AxiosInstance) => {
  await apiInstance.post(
    "/auth",
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    getLoginData(process.env.IRACING_EMAIL!, process.env.IRACING_PASSWORD!)
  );
};

export const getMemberData = async (
  apiInstance: AxiosInstance,
  iracingId: string
): Promise<MemberData | undefined> => {
  const res = await apiInstance.get("data/member/get", {
    params: { cust_ids: iracingId },
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (!res?.data?.link) {
    return undefined;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
  const iracingData = await parseIracingResponse(res.data.link);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (!iracingData?.members?.length) {
    return undefined;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return iracingData.members[0] as MemberData;
};

export const getMemberProfile = async (
  apiInstance: AxiosInstance,
  iracingId: string
): Promise<Record<string, unknown> | undefined> => {
  const res = await apiInstance.get("data/member/profile", {
    params: { cust_id: iracingId },
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (!res?.data?.link) {
    return undefined;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
  return await parseIracingResponse(res.data.link);
};

export const getMemberRecap = async (
  apiInstance: AxiosInstance,
  iracingId: string
): Promise<MemberRecap | undefined> => {
  const res = await apiInstance.get("data/stats/member_recap", {
    params: { cust_id: iracingId, year: 2023, season: 1 },
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (!res?.data?.link) {
    return undefined;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
  return (await parseIracingResponse(res.data.link)) as MemberRecap;
};

export const getSeasonResults = async (
  apiInstance: AxiosInstance,
  iracingId: string
): Promise<Array<SeasonResult> | undefined> => {
  const res = await apiInstance.get("data/results/search_series", {
    params: {
      season_year: 2023,
      season_quarter: 1,
      cust_id: iracingId,
      official_only: true,
      // 5 = race
      event_types: "5",
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (!res?.data?.data?.chunk_info) {
    return undefined;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const chunk_info = res?.data?.data?.chunk_info;

  return (await parseIracingResponse(
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-unsafe-member-access
    `${chunk_info.base_download_url}${chunk_info.chunk_file_names[0]}`
  )) as Array<SeasonResult>;
};
