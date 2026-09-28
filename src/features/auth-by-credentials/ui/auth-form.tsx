import { Button, Form, Input } from "antd";

import { type AuthCredentials, useSessionStore } from "@/entities/session";

export const AuthForm = () => {
  const setCredentials = useSessionStore((state) => state.setCredentials);

  const handleFinish = (credentials: AuthCredentials): void => {
    setCredentials(credentials);
  };

  return (
    <Form<AuthCredentials> className="auth-form" layout="vertical" onFinish={handleFinish}>
      <Form.Item<AuthCredentials>
        label="ID instance"
        name="idInstance"
        rules={[{ required: true, message: "Введите ID" }]}
      >
        <Input autoComplete="username" placeholder="Например, 1101000001" />
      </Form.Item>
      <Form.Item<AuthCredentials>
        label="Токен"
        name="apiTokenInstance"
        rules={[{ required: true, message: "Введите токен" }]}
      >
        <Input.Password autoComplete="current-password" placeholder="Токен API" />
      </Form.Item>
      <Button block className="auth-form__submit" htmlType="submit" type="primary">
        Открыть чаты
      </Button>
    </Form>
  );
};
