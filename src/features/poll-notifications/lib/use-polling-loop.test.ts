import { describe, expect, it } from "vitest";

import { extractIncomingTextMessage } from "./use-polling-loop";

describe("extractIncomingTextMessage", () => {
  it("maps an incoming text webhook to a message model", () => {
    const message = extractIncomingTextMessage({
      receiptId: 1,
      body: {
        typeWebhook: "incomingMessageReceived",
        timestamp: 1_700_000_000,
        idMessage: "message-id",
        senderData: {
          chatId: "79991234567@c.us",
          sender: "79991234567@c.us",
        },
        messageData: {
          typeMessage: "textMessage",
          textMessageData: { textMessage: "Здравствуйте" },
        },
      },
    });

    expect(message).toEqual({
      chatId: "79991234567@c.us",
      phoneNumber: "79991234567",
      id: "message-id",
      sender: "79991234567@c.us",
      text: "Здравствуйте",
      timestamp: 1_700_000_000_000,
    });
  });

  it("ignores unsupported webhooks", () => {
    expect(
      extractIncomingTextMessage({
        receiptId: 1,
        body: { typeWebhook: "outgoingMessageReceived" },
      }),
    ).toBeNull();
  });
});
