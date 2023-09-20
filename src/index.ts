import express, { Express, Request, Response } from "express";

import dotenv from "dotenv";
import { getFullDataRoute } from "./routers/get-full-data.js";
import { getFullDataStatusRoute } from "./routers/get-full-data-status.js";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("season-summary-api");
});

app.get(
  "/get-full-data",
  async (req: Request, res: Response) => await getFullDataRoute(req, res)
);

app.get(
  "/get-full-data-status",
  async (req: Request, res: Response) => await getFullDataStatusRoute(req, res)
);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
