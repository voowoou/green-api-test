import axios, { type AxiosInstance } from "axios";

import {
  API_METHODS,
  type ApiMethod,
  buildDeleteNotificationPath,
  buildInstanceMethodPath,
  GREEN_API_BASE_URL,
} from "@/shared/config";

export interface GreenApiCredentials {
  idInstance: string;
  apiTokenInstance: string;
}

export interface GreenApiClient {
  http: AxiosInstance;
  methodPath: (method: ApiMethod) => string;
  deleteNotificationPath: (receiptId: number) => string;
}

export const createApiClient = (): AxiosInstance =>
  axios.create({
    baseURL: GREEN_API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

export const apiClient = createApiClient();

export const createGreenApiClient = (credentials: GreenApiCredentials): GreenApiClient => ({
  http: apiClient,
  methodPath: (method) =>
    buildInstanceMethodPath(credentials.idInstance, credentials.apiTokenInstance, method),
  deleteNotificationPath: (receiptId) =>
    buildDeleteNotificationPath(credentials.idInstance, credentials.apiTokenInstance, receiptId),
});

export const GREEN_API_METHODS = API_METHODS;
