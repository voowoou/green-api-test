import { createGreenApiClient, GREEN_API_METHODS, type GreenApiCredentials } from "@/shared/api";

export interface SendMessageParams {
  credentials: GreenApiCredentials;
  chatId: string;
  message: string;
}

export interface SendMessageResponse {
  idMessage: string;
}

export const sendMessage = async ({
  credentials,
  chatId,
  message,
}: SendMessageParams): Promise<SendMessageResponse> => {
  const client = createGreenApiClient(credentials);
  const response = await client.http.post<SendMessageResponse>(
    client.methodPath(GREEN_API_METHODS.sendMessage),
    { chatId, message },
  );

  return response.data;
};
