import { Request } from "express";

import logger from "./utils/logger";
import findDeepValue from "./utils/findDeepValue";

/** Encapsulates an object with data for convenient retrieval of fields at any nesting level */
const getDataFromRequest = (reqBody: Record<string, any>) => {
  return (fieldName: string) => {
    return findDeepValue(reqBody, fieldName);
  };
};

/** Configuration fields for Sentry error object; fieldName specifies the required fields */
const configFields = [
  { fieldName: "environment", labelName: "Environment" },
  { fieldName: "title", labelName: "Title" },
  { fieldName: "action", labelName: "Action" },
  { fieldName: "web_url", labelName: "Sentry Link" },
  { fieldName: "status", labelName: "Status" },
  { fieldName: "message", labelName: "Description (message)" },
];

/** Forms the message for Mattermost */
const getTextForMattermost = ({
  headers,
  body,
}: {
  headers: Request['headers'];
  body: Request['body'];
}): string => {
  try {
    logger.info("Received event from Sentry", { headers, body });

    /**  Docs Sentry: https://docs.sentry.io/product/integrations/integration-platform/webhooks/?original_referrer=https%3A%2F%2Fwww.google.com%2F#sentry-hook-resource */
    const resource = headers["Sentry-Hook-Resource"]; // installation | event_alert | issue | metric_alert | error | comment

    const getFieldFromData = getDataFromRequest(body);

    let message = "";
    configFields.forEach((item) => {
      const value = getFieldFromData(item.fieldName);
      if (value) {
        message += `###### ${item.labelName}: ${value}\n`;
      }
    });

    if (resource) {
      message += `###### Resource Name: ${resource}`;
    }

    return `#### Error, details below:\n ${message}`;
  } catch (error) {
    logger.error("Error in getTextForMattermost method", error);
    return (
      `#### Error in adapter:\nSomething went wrong in getTextForMattermost, check logs on the adapter server ` +
      (error as Error)?.message
    );
  }
};

export default getTextForMattermost;
