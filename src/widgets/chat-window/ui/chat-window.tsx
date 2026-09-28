import { Empty, Flex, Typography } from "antd";
import { useEffect, useRef } from "react";

import { useChatStore } from "@/entities/chat";
import { MessageBubble, useMessageStore } from "@/entities/message";
import { SendMessageForm } from "@/features/send-message";

export const ChatWindow = () => {
  const activeChatId = useChatStore((state) => state.activeChatId);
  const activeChat = useChatStore((state) =>
    state.chats.find((chat) => chat.chatId === state.activeChatId),
  );
  const messages = useMessageStore((state) =>
    activeChatId ? (state.messagesByChatId[activeChatId] ?? []) : [],
  );
  const messageCount = messages.length;
  const messagesEndReference = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!activeChatId) {
      return;
    }

    messagesEndReference.current?.scrollIntoView({
      behavior: messageCount > 0 ? "smooth" : "auto",
    });
  }, [activeChatId, messageCount]);

  if (!activeChatId || !activeChat) {
    return (
      <Flex align="center" justify="center" style={{ height: "100%" }}>
        <Empty description="Выберите чат" />
      </Flex>
    );
  }

  return (
    <Flex vertical style={{ height: "100%" }}>
      <header style={{ borderBottom: "1px solid #f0f0f0", padding: "16px 24px" }}>
        <Typography.Title level={4} style={{ margin: 0 }}>
          {activeChat.phoneNumber}
        </Typography.Title>
      </header>

      <Flex vertical gap="small" style={{ flex: 1, overflowY: "auto", padding: 24 }}>
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        <div ref={messagesEndReference} />
      </Flex>

      <footer style={{ borderTop: "1px solid #f0f0f0", padding: 16 }}>
        <SendMessageForm />
      </footer>
    </Flex>
  );
};
