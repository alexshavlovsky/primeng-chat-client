export interface ServerMessageModel {
  id: string;
  sessionId: string;
  clientId: string;
  userNick: string;
  type: string;
  payload: string;
  timestamp: Date;
}
