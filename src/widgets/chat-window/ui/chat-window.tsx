import { Avatar, Empty, Flex, Typography } from "antd";
import { useEffect, useRef } from "react";

import { useChatStore } from "@/entities/chat";
import { MessageBubble, useMessageStore } from "@/entities/message";
import { SendMessageForm } from "@/features/send-message";

const EMPTY_MESSAGES: readonly [] = [];

export const ChatWindow = () => {
  const activeChatId = useChatStore((state) => state.activeChatId);
  const activeChat = useChatStore((state) =>
    state.chats.find((chat) => chat.chatId === state.activeChatId),
  );
  const messages = useMessageStore((state) =>
    activeChatId ? (state.messagesByChatId[activeChatId] ?? EMPTY_MESSAGES) : EMPTY_MESSAGES,
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
      <Flex className="chat-window__empty" align="center" justify="center">
        <Empty description="Выберите чат" />
      </Flex>
    );
  }

  return (
    <Flex className="chat-window" vertical>
      <header className="chat-header">
        <Avatar className="chat-header__avatar" size={42}>
          {activeChat.phoneNumber.slice(-2)}
        </Avatar>
        <div className="chat-header__details">
          <Typography.Title className="chat-header__title" level={4}>
            +{activeChat.phoneNumber}
          </Typography.Title>
          <Typography.Text className="chat-header__status" type="secondary">
            Чат GREEN-API
          </Typography.Text>
        </div>
      </header>

      <Flex className="messenger-scroll-area chat-window__messages" vertical gap="small">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        <div ref={messagesEndReference} />
      </Flex>

      <footer className="messenger-composer">
        <SendMessageForm />
      </footer>
    </Flex>
  );
};
