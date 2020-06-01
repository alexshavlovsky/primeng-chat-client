export interface ChatClientModel {
  sessionId: string;
  clientId: string;
  nick: string;
}

export interface ChatClientTypingModel extends ChatClientModel {
  isTyping: boolean;
}
