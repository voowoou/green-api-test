import { create } from "zustand";

import type { MessageState } from "./types";

export const useMessageStore = create<MessageState>((set) => ({
  messagesByChatId: {},
  addMessage: (chatId, message) =>
    set((state) => ({
      messagesByChatId: {
        ...state.messagesByChatId,
        [chatId]: [...(state.messagesByChatId[chatId] ?? []), message],
      },
    })),
  clearMessages: () => set({ messagesByChatId: {} }),
}));
