import { MessageOutlined } from "@ant-design/icons";
import { Typography } from "antd";

import { AuthForm } from "@/features/auth-by-credentials";

export const AuthModal = () => (
  <main className="auth-page">
    <section aria-labelledby="auth-title" className="auth-card">
      <div className="auth-card__icon">
        <MessageOutlined />
      </div>
      <Typography.Title className="auth-card__title" id="auth-title" level={2}>
        Вход в чаты
      </Typography.Title>
      <Typography.Paragraph className="auth-card__description" type="secondary">
        Укажите данные подключения из личного кабинета GREEN-API.
      </Typography.Paragraph>
      <AuthForm />
    </section>
  </main>
);
