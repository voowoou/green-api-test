import { Avatar, Flex, List, Typography } from "antd";

import type { Message } from "@/entities/message";
import type { Chat } from "../../model/types";

interface ChatCardProps {
  chat: Chat;
  isActive: boolean;
  lastMessage?: Message;
  onSelect: (chatId: string) => void;
}

const formatMessageTime = (timestamp: number): string =>
  new Intl.DateTimeFormat("ru-RU", { hour: "2-digit", minute: "2-digit" }).format(timestamp);

export const ChatCard = ({ chat, isActive, lastMessage, onSelect }: ChatCardProps) => (
  <List.Item
    className={`chat-card${isActive ? " chat-card--active" : ""}`}
    onClick={() => onSelect(chat.chatId)}
  >
    <Avatar className="chat-card__avatar" size={46}>
      {chat.phoneNumber.slice(-2)}
    </Avatar>
    <Flex className="chat-card__body" vertical>
      <Flex align="center" justify="space-between">
        <Typography.Text className="chat-card__name" strong={isActive}>
          +{chat.phoneNumber}
        </Typography.Text>
        {lastMessage ? (
          <Typography.Text className="chat-card__time" type="secondary">
            {formatMessageTime(lastMessage.timestamp)}
          </Typography.Text>
        ) : null}
      </Flex>
      <Typography.Text className="chat-card__preview" type="secondary">
        {lastMessage
          ? `${lastMessage.isOutgoing ? "Вы: " : ""}${lastMessage.text}`
          : "Нет сообщений"}
      </Typography.Text>
    </Flex>
  </List.Item>
);
