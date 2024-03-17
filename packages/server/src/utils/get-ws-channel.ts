import { WS } from "../types";

export const getWSChannelFromData = (data: WS["data"]) => {
  if (data && data.iracingId && data.year && data.season && data.categoryId) {
    return `full-data-${data.iracingId}-${data.year}-${data.season}-${data.categoryId}`;
  }
};
