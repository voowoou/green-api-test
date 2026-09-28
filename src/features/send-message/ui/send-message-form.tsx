import { PaperClipOutlined, SendOutlined, SmileOutlined } from "@ant-design/icons";
import { App, Button, Input } from "antd";
import { type FormEvent, useState } from "react";

import { useChatStore } from "@/entities/chat";
import { useMessageStore } from "@/entities/message";
import { useSessionStore } from "@/entities/session";

import { sendMessage } from "../api/send-message";

export const SendMessageForm = () => {
  const [draft, setDraft] = useState("");
  const [isSending, setIsSending] = useState(false);
  const { message } = App.useApp();
  const credentials = useSessionStore((state) => state.credentials);
  const activeChatId = useChatStore((state) => state.activeChatId);
  const addMessage = useMessageStore((state) => state.addMessage);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    if (!credentials || !activeChatId) {
      return;
    }

    const normalizedText = draft.trim();

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
      setDraft("");
    } catch {
      message.error("Не удалось отправить сообщение");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <form className="message-composer__form" onSubmit={handleSubmit}>
      <div className="message-composer__input-shell">
        <Button aria-label="Прикрепить файл" icon={<PaperClipOutlined />} type="text" />
        <div className="message-composer__field">
          <Input.TextArea
            autoSize={{ minRows: 1, maxRows: 4 }}
            disabled={!credentials || !activeChatId || isSending}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Сообщение"
            value={draft}
          />
        </div>
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
    </form>
  );
};
