import { BodyInit, ResponseInit } from "undici-types";

import { APP_URL } from "@season-summary/config";

export class ClientResponse extends Response {
  constructor(body?: BodyInit, init?: ResponseInit) {
    super(body, init);
    this.headers.set("Access-Control-Allow-Origin", APP_URL);
    this.headers.set("Access-Control-Allow-Methods", "OPTIONS, GET");
    this.headers.set("Access-Control-Allow-Headers", "Content-Type");
  }
}
