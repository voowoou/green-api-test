import { createGreenApiClient, GREEN_API_METHODS, type GreenApiCredentials } from "@/shared/api";

export interface IncomingMessageWebhookBody {
  typeWebhook: "incomingMessageReceived";
  timestamp: number;
  idMessage: string;
  senderData: {
    chatId: string;
    sender: string;
  };
  messageData: {
    typeMessage: "textMessage";
    textMessageData: {
      textMessage: string;
    };
  };
}

export interface UnsupportedWebhookBody {
  typeWebhook: string;
}

export type WebhookBody = IncomingMessageWebhookBody | UnsupportedWebhookBody;

export interface NotificationEnvelope {
  receiptId: number;
  body: WebhookBody;
}

export const receiveNotification = async (
  credentials: GreenApiCredentials,
  signal?: AbortSignal,
): Promise<NotificationEnvelope | null> => {
  const client = createGreenApiClient(credentials);
  const response = await client.http.get<NotificationEnvelope | null>(
    client.methodPath(GREEN_API_METHODS.receiveNotification),
    { signal },
  );

  return response.data;
};

export const deleteNotification = async (
  credentials: GreenApiCredentials,
  receiptId: number,
  signal?: AbortSignal,
): Promise<void> => {
  const client = createGreenApiClient(credentials);

  await client.http.delete(client.deleteNotificationPath(receiptId), { signal });
};
