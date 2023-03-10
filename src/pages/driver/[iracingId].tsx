import type { ChartData, MemberData, MemberRecap, SeasonResult } from "~/types";
import type { GetServerSideProps, NextPage } from "next";
import {
  createApiInstance,
  getMemberChartData,
  getMemberData,
  getMemberRecap,
  getSeasonResults,
  login,
} from "~/api";

import Box from "~/components/Box";
import Chart from "~/displays/Driver/Chart";
import FavoriteCar from "~/components/FavoriteCar";
import FavoriteTrack from "~/components/FavoriteTrack";
import Head from "next/head";
import Header from "~/displays/Driver/Header";
import RaceList from "~/components/RaceList";
import RaceRecap from "~/displays/Driver/RaceRecap";
import ShortRecap from "~/displays/Driver/ShortRecap";
import { useRouter } from "next/router";

interface DriverPageProps {
  memberData: MemberData;
  memberRecap: MemberRecap;
  // memberInfo: any;
  seasonResults: Array<SeasonResult>;
  chartData: Array<ChartData>;
}

const Driver: NextPage<DriverPageProps> = ({
  memberData,
  memberRecap,
  seasonResults,
  chartData,
}) => {
  const router = useRouter();
  const { iracingId } = router.query;

  return (
    <>
      <Head>
        <title>Season summary - {memberData.displayName}</title>
        <meta
          name="description"
          content={`Season summary for ${memberData.displayName}`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-full min-h-screen w-screen flex-col items-center bg-slate-800 p-2 text-slate-100">
        <div className="flex w-[90%] flex-col gap-2">
          <Box>Year: 2023 - Season: 1</Box>
          <Header memberData={memberData} />
          <ShortRecap memberRecap={memberRecap} />
          <div className="grid w-full grid-cols-1 grid-rows-1 gap-2 md:grid-cols-2">
            <FavoriteCar favoriteCar={memberRecap.stats.favoriteCar} />
            <FavoriteTrack favoriteTrack={memberRecap.stats.favoriteTrack} />
          </div>
          <Chart chartData={chartData} />
          <RaceRecap seasonResults={seasonResults} chartData={chartData} />
          <RaceList
            seasonResults={seasonResults}
            iracingId={iracingId as string}
          />
        </div>
      </main>
    </>
  );
};

// TODO: Add await all
export const getServerSideProps: GetServerSideProps = async ({
  params,
  res,
}) => {
  try {
    const { iracingId } = params as { iracingId: string };

    const apiInstance = createApiInstance();
    await login(apiInstance);
    const memberData = await getMemberData(apiInstance, iracingId);
    // const memberProfile = await getMemberProfile(apiInstance, iracingId);
    const memberRecap = await getMemberRecap(apiInstance, iracingId);
    const seasonResults = await getSeasonResults(apiInstance, iracingId);
    const chartData = await getMemberChartData(apiInstance, iracingId);

    const firstRaceDate = new Date(
      seasonResults?.[0]?.startTime?.split("T")[0] as string
    );

    return {
      props: {
        memberData,
        // memberProfile,
        memberRecap,
        seasonResults,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        chartData: firstRaceDate
          ? // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
            chartData?.data?.filter(
              (cd: { when: string; value: number }) =>
                new Date(cd.when) > firstRaceDate
            )
          : [],
      },
    };
  } catch {
    res.statusCode = 404;
    return {
      props: {},
    };
  }
};

export default Driver;
