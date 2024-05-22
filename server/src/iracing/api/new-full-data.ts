import { Server } from "bun";
import { getParams } from "../../utils/get-params";
import { getNewFullDataUtil } from "./new-full-data-util";
import { getWSChannelFromData } from "../../utils/get-ws-channel";

export const getNewFullData = async (
  request: Request,
  server: Server,
  seasonDataId: number | undefined
) => {
  const { iracingId, year, season, categoryId } = getParams(request);

  if (!iracingId || !year || !season || !categoryId) {
    return null;
  }

  const sendMessage = (status: string, message: any) => {
    const params = getParams(request);
    const channel = getWSChannelFromData(params);
    channel && server.publish(channel, JSON.stringify({ status, message }));
  };

  await getNewFullDataUtil({
    iracingId,
    year,
    season,
    categoryId,
    sendMessage,
    seasonDataId,
  });
};
