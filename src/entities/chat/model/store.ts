import { create } from "zustand";

import type { ChatState } from "./types";

export const useChatStore = create<ChatState>((set) => ({
  chats: [],
  activeChatId: null,
  addChat: (chat) =>
    set((state) => {
      const chatAlreadyExists = state.chats.some((item) => item.chatId === chat.chatId);

      return {
        chats: chatAlreadyExists ? state.chats : [...state.chats, chat],
        activeChatId: chat.chatId,
      };
    }),
  setActiveChatId: (chatId) => set({ activeChatId: chatId }),
  clearChats: () => set({ chats: [], activeChatId: null }),
}));
