import { ServerWebSocket } from "bun";

export type WebSocketData = {
  iracingId: string;
  year: string;
  season: string;
  categoryId: string;
};

export type WS = ServerWebSocket<WebSocketData>;
