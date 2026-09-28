import { beforeEach, describe, expect, it } from "vitest";

import { useChatStore } from "./store";

describe("useChatStore", () => {
  beforeEach(() => {
    useChatStore.getState().clearChats();
  });

  it("adds a chat and makes it active", () => {
    useChatStore.getState().addChat({
      chatId: "79991234567@c.us",
      phoneNumber: "79991234567",
    });

    expect(useChatStore.getState()).toMatchObject({
      activeChatId: "79991234567@c.us",
      chats: [{ chatId: "79991234567@c.us", phoneNumber: "79991234567" }],
    });
  });

  it("does not duplicate an existing chat", () => {
    const chat = { chatId: "79991234567@c.us", phoneNumber: "79991234567" };

    useChatStore.getState().addChat(chat);
    useChatStore.getState().addChat(chat);

    expect(useChatStore.getState().chats).toHaveLength(1);
  });
});
