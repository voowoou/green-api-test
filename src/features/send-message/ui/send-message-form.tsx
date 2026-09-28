import { PaperClipOutlined, SendOutlined, SmileOutlined } from "@ant-design/icons";
import { App, Button, Form, Input } from "antd";
import { useState } from "react";

import { useChatStore } from "@/entities/chat";
import { useMessageStore } from "@/entities/message";
import { useSessionStore } from "@/entities/session";

import { sendMessage } from "../api/send-message";

interface SendMessageValues {
  text: string;
}

export const SendMessageForm = () => {
  const [form] = Form.useForm<SendMessageValues>();
  const [isSending, setIsSending] = useState(false);
  const { message } = App.useApp();
  const draft = Form.useWatch("text", form) ?? "";
  const credentials = useSessionStore((state) => state.credentials);
  const activeChatId = useChatStore((state) => state.activeChatId);
  const addMessage = useMessageStore((state) => state.addMessage);

  const handleFinish = async ({ text }: SendMessageValues): Promise<void> => {
    if (!credentials || !activeChatId) {
      return;
    }

    const normalizedText = text.trim();

    if (!normalizedText) {
      return;
    }

    setIsSending(true);

    try {
      const response = await sendMessage({
        credentials,
        chatId: activeChatId,
        message: normalizedText,
      });

      addMessage(activeChatId, {
        id: response.idMessage,
        sender: credentials.idInstance,
        text: normalizedText,
        timestamp: Date.now(),
        isOutgoing: true,
      });
      form.resetFields();
    } catch {
      message.error("Не удалось отправить сообщение");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Form<SendMessageValues> className="message-composer__form" form={form} onFinish={handleFinish}>
      <div className="message-composer__input-shell">
        <Button aria-label="Прикрепить файл" icon={<PaperClipOutlined />} type="text" />
        <Form.Item<SendMessageValues>
          className="message-composer__field"
          name="text"
          rules={[{ required: true, whitespace: true, message: "Напишите сообщение" }]}
        >
          <Input.TextArea
            autoSize={{ minRows: 1, maxRows: 4 }}
            disabled={!credentials || !activeChatId || isSending}
            placeholder="Сообщение"
          />
        </Form.Item>
        <Button aria-label="Добавить эмодзи" icon={<SmileOutlined />} type="text" />
      </div>
      {draft.trim() ? (
        <Button
          aria-label="Отправить сообщение"
          className="message-composer__send"
          disabled={!credentials || !activeChatId}
          htmlType="submit"
          icon={<SendOutlined />}
          loading={isSending}
          shape="circle"
          type="primary"
        />
      ) : null}
    </Form>
  );
};
