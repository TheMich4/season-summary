import IracingAPI from "iracing-api";
import dotenv from "dotenv";

dotenv.config();

const IRACING_EMAIL = process.env.IRACING_EMAIL!;
const IRACING_PASSWORD = process.env.IRACING_PASSWORD!;

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
    console.log("Logging into iracing");
    await ir.login(IRACING_EMAIL, IRACING_PASSWORD);
    lastLogin = new Date();
  }

  return ir;
};

export const resetIracingAPIClient = () => {
  ir = undefined;
  lastLogin = undefined;
};
