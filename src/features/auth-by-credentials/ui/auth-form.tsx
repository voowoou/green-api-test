import { Button, Form, Input } from "antd";

import { type AuthCredentials, useSessionStore } from "@/entities/session";

export const AuthForm = () => {
  const setCredentials = useSessionStore((state) => state.setCredentials);

  const handleFinish = (credentials: AuthCredentials): void => {
    setCredentials(credentials);
  };

  return (
    <Form<AuthCredentials> layout="vertical" onFinish={handleFinish}>
      <Form.Item<AuthCredentials>
        label="ID инстанса"
        name="idInstance"
        rules={[{ required: true, message: "Введите ID инстанса" }]}
      >
        <Input autoComplete="username" placeholder="Например, 1101000001" />
      </Form.Item>
      <Form.Item<AuthCredentials>
        label="API-токен инстанса"
        name="apiTokenInstance"
        rules={[{ required: true, message: "Введите API-токен" }]}
      >
        <Input.Password autoComplete="current-password" placeholder="Ваш API-токен" />
      </Form.Item>
      <Button block htmlType="submit" type="primary">
        Продолжить
      </Button>
    </Form>
  );
};
