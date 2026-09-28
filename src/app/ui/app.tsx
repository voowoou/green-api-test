import { App as AntdApp, ConfigProvider } from "antd";

import "../styles/global.css";

export const App = () => (
  <ConfigProvider>
    <AntdApp>
      <main>Чаты</main>
    </AntdApp>
  </ConfigProvider>
);
