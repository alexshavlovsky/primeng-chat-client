export interface ServerMessageModel {
  id: string;
  sessionId: string;
  remoteClientId: string;
  type: string;
  payload: string;
  timestamp: Date;
}
