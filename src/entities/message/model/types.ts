export interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: number;
  isOutgoing: boolean;
}

export type MessagesByChatId = Record<string, Message[]>;

export interface MessageState {
  messagesByChatId: MessagesByChatId;
  addMessage: (chatId: string, message: Message) => void;
  clearMessages: () => void;
}
