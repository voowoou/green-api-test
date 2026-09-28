import { Modal, Typography } from "antd";

import { AuthForm } from "@/features/auth-by-credentials";

export const AuthModal = () => (
  <Modal closable={false} footer={null} mask={{ closable: false }} open title="Войти">
    <Typography.Paragraph type="secondary">
      Введите ID и токен из личного кабинета GREEN-API
    </Typography.Paragraph>
    <AuthForm />
  </Modal>
);
