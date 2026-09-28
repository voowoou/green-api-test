import { Button, Divider, Flex, List, Typography } from "antd";

import { ChatCard, useChatStore } from "@/entities/chat";
import { useMessageStore } from "@/entities/message";
import { useSessionStore } from "@/entities/session";
import { CreateChatForm } from "@/features/create-chat";

export const Sidebar = () => {
  const credentials = useSessionStore((state) => state.credentials);
  const clearCredentials = useSessionStore((state) => state.clearCredentials);
  const chats = useChatStore((state) => state.chats);
  const activeChatId = useChatStore((state) => state.activeChatId);
  const setActiveChatId = useChatStore((state) => state.setActiveChatId);
  const clearChats = useChatStore((state) => state.clearChats);
  const clearMessages = useMessageStore((state) => state.clearMessages);

  const handleLogout = (): void => {
    clearCredentials();
    clearChats();
    clearMessages();
  };

  return (
    <Flex className="messenger-sidebar" vertical gap="middle">
      <Flex align="center" justify="space-between">
        <div>
          <Typography.Text type="secondary">Ваш ID</Typography.Text>
          <Typography.Paragraph
            ellipsis={{ tooltip: credentials?.idInstance }}
            style={{ margin: 0 }}
            strong
          >
            {credentials?.idInstance ?? "Нет данных"}
          </Typography.Paragraph>
        </div>
        <Button onClick={handleLogout} type="text">
          Выйти
        </Button>
      </Flex>

      <CreateChatForm />

      <Divider style={{ margin: 0 }} />

      <List
        dataSource={chats}
        locale={{ emptyText: "Создайте чат" }}
        renderItem={(chat) => (
          <ChatCard
            chat={chat}
            isActive={chat.chatId === activeChatId}
            onSelect={setActiveChatId}
          />
        )}
        className="messenger-scroll-area"
      />
    </Flex>
  );
};
