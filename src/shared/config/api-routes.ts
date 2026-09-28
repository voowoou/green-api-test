export const GREEN_API_BASE_URL = "https://api.green-api.com";

export const API_METHODS = {
  sendMessage: "SendMessage",
  receiveNotification: "ReceiveNotification",
  deleteNotification: "DeleteNotification",
} as const;

export type ApiMethod = (typeof API_METHODS)[keyof typeof API_METHODS];

export const buildInstanceMethodPath = (
  idInstance: string,
  apiTokenInstance: string,
  method: ApiMethod,
): string =>
  `/waInstance${encodeURIComponent(idInstance)}/${method}/${encodeURIComponent(apiTokenInstance)}`;

export const buildDeleteNotificationPath = (
  idInstance: string,
  apiTokenInstance: string,
  receiptId: number,
): string =>
  `${buildInstanceMethodPath(idInstance, apiTokenInstance, API_METHODS.deleteNotification)}/${receiptId}`;
