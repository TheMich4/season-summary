export const getParams = (request: Request) => {
  const { searchParams } = new URL(request.url);

  const iracingId = searchParams.get("iracingId");
  const year = searchParams.get("year");
  const season = searchParams.get("season");
  const categoryId = searchParams.get("categoryId");

  return { iracingId, year, season, categoryId };
};
