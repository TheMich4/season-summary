import { WS } from "./types";
import { getWSChannelFromData } from "./utils/get-ws-channel";

export const websocket = {
  open: (ws: WS) => {
    console.log("ws open");
    const channel = getWSChannelFromData(ws.data);

    if (channel) {
      ws.subscribe(channel);
    }
  },
  message: (ws: WS, message: string | Buffer) => {
    console.log("ws message");
  },
  close: (ws: WS) => {
    console.log("ws close");
  },
};
