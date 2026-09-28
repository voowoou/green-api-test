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
          borderRadius: 10,
          colorPrimary: "#1677ff",
        },
      }}
    >
      <AntdApp>{credentials ? <MainPage /> : <AuthModal />}</AntdApp>
    </ConfigProvider>
  );
};
