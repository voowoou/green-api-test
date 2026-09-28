import { LogoutOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Flex, Input, List, Typography } from "antd";
import { useMemo, useState } from "react";

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
  const messagesByChatId = useMessageStore((state) => state.messagesByChatId);
  const [searchValue, setSearchValue] = useState("");
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);

  const visibleChats = useMemo(() => {
    const normalizedSearch = searchValue.trim().replaceAll(/\s/g, "");

    if (!normalizedSearch) {
      return chats;
    }

    return chats.filter((chat) => chat.phoneNumber.includes(normalizedSearch));
  }, [chats, searchValue]);

  const handleLogout = (): void => {
    clearCredentials();
    clearChats();
    clearMessages();
  };

  return (
    <Flex className="messenger-sidebar" vertical gap="small">
      <header className="sidebar-header">
        <Flex align="center" justify="space-between">
          <Typography.Title className="sidebar-header__title" level={3}>
            Чаты
          </Typography.Title>
          <Button
            aria-label="Создать чат"
            icon={<PlusOutlined />}
            onClick={() => setIsCreateFormOpen((isOpen) => !isOpen)}
            shape="circle"
            type="primary"
          />
        </Flex>
        <Flex align="center" className="sidebar-account" justify="space-between">
          <Typography.Text ellipsis type="secondary">
            ID {credentials?.idInstance ?? "нет данных"}
          </Typography.Text>
          <Button aria-label="Выйти" icon={<LogoutOutlined />} onClick={handleLogout} type="text" />
        </Flex>
      </header>

      {isCreateFormOpen ? (
        <div className="sidebar-create-form">
          <CreateChatForm onCreated={() => setIsCreateFormOpen(false)} />
        </div>
      ) : null}

      <Input
        allowClear
        className="sidebar-search"
        onChange={(event) => setSearchValue(event.target.value)}
        placeholder="Поиск чатов"
        prefix={<SearchOutlined />}
        value={searchValue}
      />

      <List
        className="messenger-scroll-area chat-list"
        dataSource={visibleChats}
        locale={{
          emptyText: searchValue
            ? "Чаты не найдены"
            : "Создайте первый чат, чтобы начать переписку",
        }}
        renderItem={(chat) => {
          const chatMessages = messagesByChatId[chat.chatId] ?? [];

          return (
            <ChatCard
              chat={chat}
              isActive={chat.chatId === activeChatId}
              lastMessage={chatMessages.at(-1)}
              onSelect={setActiveChatId}
            />
          );
        }}
      />
    </Flex>
  );
};
