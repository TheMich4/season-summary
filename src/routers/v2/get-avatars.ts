import { prisma } from "../../db";

export const getAvatars = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const ids = searchParams.get("ids")?.split(",") || [];

  console.log("ids", ids);

  if (!ids.length) {
    return new Response("missing params", { status: 400 });
  }

  const data = await prisma.user.findMany({
    where: {
      iracingId: {
        in: ids,
      },
    },
    select: {
      iracingId: true,
      image: true,
    },
  });

  const idToAvatar = data.reduce((acc, { iracingId, image }) => {
    acc[iracingId] = image;
    return acc;
  }, {} as Record<string, string>);

  const response = new Response(JSON.stringify(idToAvatar), { status: 200 });
  response.headers.set("Access-Control-Allow-Origin", "*");

  return response;
};
