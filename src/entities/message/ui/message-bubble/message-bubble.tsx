import { Typography } from "antd";

import type { Message } from "../../model/types";

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble = ({ message }: MessageBubbleProps) => (
  <article
    aria-label={message.isOutgoing ? "Ваше сообщение" : "Сообщение"}
    className={`message-bubble${message.isOutgoing ? " message-bubble--outgoing" : ""}`}
  >
    <Typography.Paragraph className="message-bubble__text">{message.text}</Typography.Paragraph>
    <Typography.Text className="message-bubble__time" type="secondary">
      {new Date(message.timestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}
    </Typography.Text>
  </article>
);
