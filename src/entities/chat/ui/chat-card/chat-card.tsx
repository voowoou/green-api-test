import { List, Typography } from "antd";

import type { Chat } from "../../model/types";

interface ChatCardProps {
  chat: Chat;
  isActive: boolean;
  onSelect: (chatId: string) => void;
}

export const ChatCard = ({ chat, isActive, onSelect }: ChatCardProps) => (
  <List.Item
    className={`chat-card${isActive ? " chat-card--active" : ""}`}
    onClick={() => onSelect(chat.chatId)}
  >
    <Typography.Text strong={isActive}>{chat.phoneNumber}</Typography.Text>
  </List.Item>
);
