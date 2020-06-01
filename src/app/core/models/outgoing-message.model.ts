import {UserModel} from './user.model';

export interface OutgoingMessageModel {
  frameId: number;
  user: UserModel;
  type: string;
  payload: string;
}
