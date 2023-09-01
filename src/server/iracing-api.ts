"use server";

import IracingAPI from "iracing-api";
import { env } from "@/env.mjs";

let ir: IracingAPI | undefined = undefined;
let lastLogin: Date | undefined = undefined;

export const getLoggedInIracingAPIClient = async () => {
  if (!ir) {
    ir = new IracingAPI();
  }

  // Re-login every hour
  if (
    !lastLogin ||
    new Date().getTime() - lastLogin.getTime() > 1000 * 60 * 60
  ) {
    console.log("!!! Logging into iracing");
    await ir.login(env.IRACING_EMAIL, env.IRACING_PASSWORD);
    lastLogin = new Date();
  }

  return ir;
};

export const resetIracingAPIClient = () => {
  ir = undefined;
  lastLogin = undefined;
};
