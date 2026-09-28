import { App, Layout } from "antd";
import { useCallback } from "react";

import { useChatStore } from "@/entities/chat";
import { usePollingLoop } from "@/features/poll-notifications";
import { ChatWindow } from "@/widgets/chat-window";
import { Sidebar } from "@/widgets/sidebar";

export const MainPage = () => {
  const { message } = App.useApp();
  const activeChatId = useChatStore((state) => state.activeChatId);
  const showPollingError = useCallback(
    () => message.error("Не удалось получить сообщения"),
    [message],
  );

  usePollingLoop({ onError: showPollingError });

  return (
    <Layout className={`app-shell${activeChatId ? " app-shell--chat-active" : ""}`}>
      <Layout.Sider className="app-shell__sidebar" theme="light" width={360}>
        <Sidebar />
      </Layout.Sider>
      <Layout.Content className="app-shell__content">
        <ChatWindow />
      </Layout.Content>
    </Layout>
  );
};
