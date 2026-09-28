import { App as AntdApp, ConfigProvider, theme } from "antd";
import ruRU from "antd/locale/ru_RU";

import { useSessionStore } from "@/entities/session";
import { MainPage } from "@/pages/main-page";
import { AuthModal } from "@/widgets/auth-modal";
import "../styles/global.css";

export const App = () => {
  const credentials = useSessionStore((state) => state.credentials);

  return (
    <ConfigProvider
      locale={ruRU}
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          borderRadius: 14,
          borderRadiusLG: 18,
          colorPrimary: "#1687e8",
          colorInfo: "#1687e8",
          colorBgBase: "#f5f8fc",
          colorBgContainer: "#ffffff",
          colorBgElevated: "#ffffff",
          colorBorder: "#e5ebf3",
          colorText: "#172033",
          colorTextSecondary: "#748094",
          controlHeight: 40,
          fontSize: 14,
          wireframe: false,
        },
      }}
    >
      <AntdApp>{credentials ? <MainPage /> : <AuthModal />}</AntdApp>
    </ConfigProvider>
  );
};
