export interface AuthCredentials {
  idInstance: string;
  apiTokenInstance: string;
}

export interface SessionState {
  credentials: AuthCredentials | null;
  setCredentials: (credentials: AuthCredentials) => void;
  clearCredentials: () => void;
}
