import { useEffect } from "react";

import { useChatStore } from "@/entities/chat";
import { useMessageStore } from "@/entities/message";
import { useSessionStore } from "@/entities/session";

import {
  deleteNotification,
  type NotificationEnvelope,
  receiveNotification,
} from "../api/notifications";

const RETRY_DELAY_MS = 1_000;
const WHATSAPP_CHAT_SUFFIX = "@c.us";

interface IncomingTextMessage {
  chatId: string;
  phoneNumber: string;
  id: string;
  sender: string;
  text: string;
  timestamp: number;
}

const isIncomingMessageWebhook = (
  body: NotificationEnvelope["body"],
): body is Extract<NotificationEnvelope["body"], { typeWebhook: "incomingMessageReceived" }> =>
  body.typeWebhook === "incomingMessageReceived";

const waitForRetry = (signal: AbortSignal): Promise<void> =>
  new Promise((resolve) => {
    const timeoutId = window.setTimeout(resolve, RETRY_DELAY_MS);

    signal.addEventListener(
      "abort",
      () => {
        window.clearTimeout(timeoutId);
        resolve();
      },
      { once: true },
    );
  });

export const extractIncomingTextMessage = (
  notification: NotificationEnvelope,
): IncomingTextMessage | null => {
  const { body } = notification;

  if (!isIncomingMessageWebhook(body)) {
    return null;
  }

  if (body.messageData.typeMessage !== "textMessage") {
    return null;
  }

  const { chatId, sender } = body.senderData;
  const phoneNumber = chatId.endsWith(WHATSAPP_CHAT_SUFFIX)
    ? chatId.slice(0, -WHATSAPP_CHAT_SUFFIX.length)
    : chatId;

  return {
    chatId,
    phoneNumber,
    id: body.idMessage,
    sender,
    text: body.messageData.textMessageData.textMessage,
    timestamp: body.timestamp * 1_000,
  };
};

export const usePollingLoop = (): void => {
  const credentials = useSessionStore((state) => state.credentials);
  const addChat = useChatStore((state) => state.addChat);
  const addMessage = useMessageStore((state) => state.addMessage);

  useEffect(() => {
    if (!credentials) {
      return;
    }

    const controller = new AbortController();

    const poll = async (): Promise<void> => {
      while (!controller.signal.aborted) {
        try {
          const notification = await receiveNotification(credentials, controller.signal);

          if (!notification) {
            continue;
          }

          const incomingMessage = extractIncomingTextMessage(notification);

          if (incomingMessage) {
            addChat({
              chatId: incomingMessage.chatId,
              phoneNumber: incomingMessage.phoneNumber,
            });
            addMessage(incomingMessage.chatId, {
              id: incomingMessage.id,
              sender: incomingMessage.sender,
              text: incomingMessage.text,
              timestamp: incomingMessage.timestamp,
              isOutgoing: false,
            });
          }

          await deleteNotification(credentials, notification.receiptId, controller.signal);
        } catch {
          if (!controller.signal.aborted) {
            await waitForRetry(controller.signal);
          }
        }
      }
    };

    void poll();

    return () => controller.abort();
  }, [addChat, addMessage, credentials]);
};
