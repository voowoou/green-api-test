export interface Chat {
  chatId: string;
  phoneNumber: string;
}

export interface ChatState {
  chats: Chat[];
  activeChatId: string | null;
  addChat: (chat: Chat) => void;
  setActiveChatId: (chatId: string | null) => void;
  clearChats: () => void;
}
