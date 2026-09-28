import { Layout } from "antd";

import { usePollingLoop } from "@/features/poll-notifications";
import { ChatWindow } from "@/widgets/chat-window";
import { Sidebar } from "@/widgets/sidebar";

export const MainPage = () => {
  usePollingLoop();

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
