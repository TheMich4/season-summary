import type { Category } from "@season-summary/config";
import { categoryToId } from "@season-summary/config";
import { useMemo } from "react";
import useWebSocket from "react-use-websocket";

export const useDataWebSocket = ({
  wsUrl,
  iracingId,
  year,
  season,
  category,
}: {
  wsUrl: string;
  iracingId: number;
  year: number;
  season: number;
  category: string;
}) => {
  const SOCKET_URL = `${wsUrl}?iracingId=${iracingId}&year=${year}&season=${season}&categoryId=${
    categoryToId[category as Category]
  }`;

  const { lastMessage } = useWebSocket(SOCKET_URL);

  return useMemo<
    { status: string; message?: Record<string, unknown> } | undefined
  >(() => {
    if (!lastMessage) return { status: undefined };

    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-argument
      return JSON.parse(lastMessage.data);
    } catch (err) {
      return undefined;
    }
  }, [lastMessage]);
};
