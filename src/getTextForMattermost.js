const findDeepValue = require("./utils/findDeepValue");
const logger = require("./utils/logger");

/** Замкнули обьект с данными, для удобного получения нужных полей из этого обьекта на любом уровне вложенности; */
const getDataFromRequest = (reqBody) => {
  return (fieldName) => {
    return findDeepValue(reqBody, fieldName);
  };
};
/** Sentry кидает обьект ошибки, fieldName это нужны поля из этого обьекта; */
const configFields = [
  { fieldName: "environment", labelName: "Окружение" },
  { fieldName: "title", labelName: "Название" },
  { fieldName: "action", labelName: "Действие" },
  { fieldName: "web_url", labelName: "Сслыка на Sentry" },
  { fieldName: "status", labelName: "Статус" },
  { fieldName: "message", labelName: "Описание(message)" },
];
/** Формируем сообщение для Mattermost */
module.exports = getTextForMattermost = ({ headers, body }) => {
  try {
    logger.info("Из Sentry пришло событие", { headers, body });

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
      message += `###### Название ресурса: ${resource}`;
    }

    return `#### Ошибка в анкете, подробности ниже:\n ${message}`;
  } catch (error) {
    logger.error("Ошибка в методе getTextForMattermost", error);
    return (
      `#### Ошибка в адапторе:\nЧто-то сломалось в методе getTextForMattermost, проверьте логи на сервере адаптера ` +
      error?.message
    );
  }
};
