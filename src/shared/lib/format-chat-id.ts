const WHATSAPP_CHAT_SUFFIX = "@c.us";

export const normalizePhoneNumber = (phoneNumber: string): string => phoneNumber.replace(/\D/g, "");

export const formatChatId = (phoneNumber: string): string => {
  const normalizedPhoneNumber = normalizePhoneNumber(phoneNumber);

  if (!normalizedPhoneNumber) {
    throw new Error("Phone number must contain at least one digit");
  }

  return `${normalizedPhoneNumber}${WHATSAPP_CHAT_SUFFIX}`;
};
