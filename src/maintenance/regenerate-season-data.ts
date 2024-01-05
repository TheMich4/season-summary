import { getNewFullDataUtil } from "../iracing/api/new-full-data-util";

export const regenerateSeasonData = async (
  data: Record<
    string,
    {
      userIds: number[];
      season: { category: number; year: number; season: number };
    }
  >
) => {
  console.time("regenerateSeasonData");
  for (const [key, { season, userIds }] of Object.entries(data)) {
    console.time(key);
    console.log(
      `=> Regenerating season data for ${season.category} (${season.year} S${season.season})`
    );

    for (const userId of userIds) {
      console.log(`   => Regenerating for user ${userId}...`);
      await getNewFullDataUtil({
        iracingId: userId.toString(),
        year: season.year.toString(),
        season: season.season.toString(),
        categoryId: season.category.toString(),
        sendMessage: (status, message) => {
          status === "PROGRESS" &&
            message.fetched % 5 === 0 &&
            console.log(
              `      => ${message.fetched} of ${message.newRaces} fetched`
            );
        },
      });
    }

    console.timeEnd(key);
  }

  console.timeEnd("regenerateSeasonData");
};
