import {ChatClientModel} from './chat-client.model';

export interface ChatSnapshotModel {
  snapshotVer: number;
  users: ChatClientModel[];
  thisUser: ChatClientModel;
}
