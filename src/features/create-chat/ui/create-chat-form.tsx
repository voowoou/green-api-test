import { Button, Form, Input } from "antd";

import { useChatStore } from "@/entities/chat";
import { formatChatId, normalizePhoneNumber } from "@/shared/lib";

interface CreateChatValues {
  phoneNumber: string;
}

interface CreateChatFormProps {
  onCreated?: () => void;
}

export const CreateChatForm = ({ onCreated }: CreateChatFormProps) => {
  const addChat = useChatStore((state) => state.addChat);

  const handleFinish = ({ phoneNumber }: CreateChatValues): void => {
    const normalizedPhoneNumber = normalizePhoneNumber(phoneNumber);

    addChat({
      chatId: formatChatId(normalizedPhoneNumber),
      phoneNumber: normalizedPhoneNumber,
    });
    onCreated?.();
  };

  return (
    <Form<CreateChatValues> layout="inline" onFinish={handleFinish}>
      <Form.Item<CreateChatValues>
        name="phoneNumber"
        rules={[
          { required: true, message: "Введите номер телефона" },
          {
            validator: (_, value: string) => {
              const digits = normalizePhoneNumber(value ?? "");

              return digits.length >= 7 && digits.length <= 15
                ? Promise.resolve()
                : Promise.reject(new Error("Введите номер в международном формате"));
            },
          },
        ]}
      >
        <Input inputMode="tel" placeholder="79991234567" />
      </Form.Item>
      <Button htmlType="submit" type="primary">
        Открыть чат
      </Button>
    </Form>
  );
};
