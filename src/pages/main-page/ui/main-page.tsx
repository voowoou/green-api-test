import { App, Layout } from "antd";
import { useCallback } from "react";

import { usePollingLoop } from "@/features/poll-notifications";
import { ChatWindow } from "@/widgets/chat-window";
import { Sidebar } from "@/widgets/sidebar";

export const MainPage = () => {
  const { message } = App.useApp();
  const showPollingError = useCallback(
    () => message.error("Не удалось получить сообщения"),
    [message],
  );

  usePollingLoop({ onError: showPollingError });

  return (
    <Layout className="app-shell">
      <Layout.Sider breakpoint="lg" collapsedWidth={0} theme="light" width={360}>
        <Sidebar />
      </Layout.Sider>
      <Layout.Content>
        <ChatWindow />
      </Layout.Content>
    </Layout>
  );
};
