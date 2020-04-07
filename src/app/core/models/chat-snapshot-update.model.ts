import {ChatClientModel} from './chat-client.model';

export interface ChatSnapshotUpdateModel {
  snapshotVer: number;
  type: string;
  user: ChatClientModel;
}
