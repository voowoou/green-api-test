import { beforeEach, describe, expect, it } from "vitest";

import { useMessageStore } from "./store";

describe("useMessageStore", () => {
  beforeEach(() => {
    useMessageStore.getState().clearMessages();
  });

  it("stores messages independently for each chat", () => {
    useMessageStore.getState().addMessage("first@c.us", {
      id: "message-1",
      sender: "first@c.us",
      text: "Первое сообщение",
      timestamp: 1,
      isOutgoing: false,
    });

    useMessageStore.getState().addMessage("second@c.us", {
      id: "message-2",
      sender: "second@c.us",
      text: "Второе сообщение",
      timestamp: 2,
      isOutgoing: false,
    });

    expect(useMessageStore.getState().messagesByChatId).toMatchObject({
      "first@c.us": [{ id: "message-1" }],
      "second@c.us": [{ id: "message-2" }],
    });
  });
});
