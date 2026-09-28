import { create } from "zustand";

import type { AuthCredentials, SessionState } from "./types";

const SESSION_STORAGE_KEY = "green-api-session";

const isAuthCredentials = (value: unknown): value is AuthCredentials => {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const credentials = value as Record<string, unknown>;

  return (
    typeof credentials.idInstance === "string" &&
    credentials.idInstance.length > 0 &&
    typeof credentials.apiTokenInstance === "string" &&
    credentials.apiTokenInstance.length > 0
  );
};

const getStorage = (): Storage | null => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return window.localStorage;
  } catch {
    return null;
  }
};

const readCredentials = (): AuthCredentials | null => {
  const storedSession = getStorage()?.getItem(SESSION_STORAGE_KEY);

  if (!storedSession) {
    return null;
  }

  try {
    const parsedSession: unknown = JSON.parse(storedSession);

    return isAuthCredentials(parsedSession) ? parsedSession : null;
  } catch {
    return null;
  }
};

const saveCredentials = (credentials: AuthCredentials): void => {
  getStorage()?.setItem(SESSION_STORAGE_KEY, JSON.stringify(credentials));
};

const removeCredentials = (): void => {
  getStorage()?.removeItem(SESSION_STORAGE_KEY);
};

export const useSessionStore = create<SessionState>((set) => ({
  credentials: readCredentials(),
  setCredentials: (credentials) => {
    saveCredentials(credentials);
    set({ credentials });
  },
  clearCredentials: () => {
    removeCredentials();
    set({ credentials: null });
  },
}));
