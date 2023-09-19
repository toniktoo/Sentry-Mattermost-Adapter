const { format, createLogger, transports } = require("winston");
const { combine, timestamp, label, prettyPrint } = format;
const CATEGORY = "Adapter Sentry-Mattermost";

const logger = createLogger({
  level: "debug",
  format: combine(
    label({ label: CATEGORY }),
    timestamp({
      format: "MMM-DD-YYYY HH:mm:ss",
    }),
    prettyPrint()
  ),
  transports: [
    new transports.File({
      filename: "logs/all.log",
    }),
    new transports.File({
      level: "error",
      filename: "logs/error.log",
    }),
    new transports.Console(),
  ],
});

module.exports = logger;
