import {ChatClientModel} from './chat-client.model';

export interface ChatSnapshotModel {
  version: number;
  clients: ChatClientModel[];
  client: ChatClientModel;
}
