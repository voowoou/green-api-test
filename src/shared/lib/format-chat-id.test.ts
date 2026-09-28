import { describe, expect, it } from "vitest";

import { formatChatId, normalizePhoneNumber } from "./format-chat-id";

describe("normalizePhoneNumber", () => {
  it("removes formatting characters", () => {
    expect(normalizePhoneNumber("+7 (999) 123-45-67")).toBe("79991234567");
  });
});

describe("formatChatId", () => {
  it("converts a phone number to a WhatsApp chatId", () => {
    expect(formatChatId("79991234567")).toBe("79991234567@c.us");
  });

  it("normalizes a formatted phone number before conversion", () => {
    expect(formatChatId("+7 (999) 123-45-67")).toBe("79991234567@c.us");
  });

  it("rejects a value without digits", () => {
    expect(() => formatChatId("not a phone")).toThrow(
      "Phone number must contain at least one digit",
    );
  });
});
