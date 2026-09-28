import { Typography } from "antd";

import type { Message } from "../../model/types";

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble = ({ message }: MessageBubbleProps) => (
  <article
    aria-label={message.isOutgoing ? "Ваше сообщение" : "Сообщение"}
    style={{
      alignSelf: message.isOutgoing ? "flex-end" : "flex-start",
      backgroundColor: message.isOutgoing ? "#d9f7be" : "#f5f5f5",
      borderRadius: 12,
      maxWidth: "75%",
      padding: "8px 12px",
    }}
  >
    <Typography.Paragraph style={{ marginBottom: 4 }}>{message.text}</Typography.Paragraph>
    <Typography.Text type="secondary" style={{ fontSize: 12 }}>
      {new Date(message.timestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}
    </Typography.Text>
  </article>
);
