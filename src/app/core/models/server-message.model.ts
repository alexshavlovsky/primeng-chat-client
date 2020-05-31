export interface ServerMessageModel {
  id: string;
  sessionId: string;
  clientId: string;
  nick: string;
  type: string;
  payload: string;
  timestamp: Date;
}
