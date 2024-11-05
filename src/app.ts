import axios from "axios";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import express, { Request, Response } from "express";

import logger from "./utils/logger";
import { loadEnvVars } from "./utils/loadEnvVars";
import getTextForMattermost from "./getTextForMattermost";

dotenv.config();

const app = express();

const { PORT, URL_WEBHOOK } = loadEnvVars(["PORT", "URL_WEBHOOK"]);

app.use(bodyParser.json());

app.post("/webhook", (req: Request, res: Response) => {
  const { headers, body } = req;

  try {
    axios.post(URL_WEBHOOK, { text: getTextForMattermost({ headers, body }) });
    res.sendStatus(200);
  } catch (error) {
    logger.error("Error sending to Mattermost", error);
    res.sendStatus(500);
  }
});

app
  .listen(PORT, () => {
    logger.info(`Server successfully started on port ${PORT}`);
  })
  .on("error", (error: Error) => logger.error("Error starting server", error));
