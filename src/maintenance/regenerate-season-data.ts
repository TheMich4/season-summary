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
  let i = 0;
  const users = Object.values(data).reduce((acc, { userIds }) => {
    return (acc += userIds.length);
  }, 0);

  for (const [key, { season, userIds }] of Object.entries(data)) {
    console.time(key);
    console.log(
      `=> Regenerating season data for ${season.category} (${season.year} S${season.season})`
    );

    for (const userId of userIds) {
      console.log(`   => Regenerating for user ${userId}... (${i}/${users}))`);
      await getNewFullDataUtil({
        iracingId: userId.toString(),
        year: season.year.toString(),
        season: season.season.toString(),
        categoryId: season.category.toString(),
        sendMessage: (status, message) => {
          status === "PROGRESS" &&
            (message.fetched % 5 === 0 ||
              message.fetched === message.newRaces) &&
            console.log(
              `      => ${message.fetched} of ${message.newRaces} fetched`
            );
        },
      });

      i++;
    }

    console.timeEnd(key);
  }

  console.timeEnd("regenerateSeasonData");
};
