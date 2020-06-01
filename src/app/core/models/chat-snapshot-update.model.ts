import {ChatClientModel} from './chat-client.model';

export interface ChatSnapshotUpdateModel {
  version: number;
  type: string;
  client: ChatClientModel;
}
