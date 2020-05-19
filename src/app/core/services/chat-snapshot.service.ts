import {Injectable} from '@angular/core';
import {ChatClientModel} from '../models/chat-client.model';
import {ServerMessageModel} from '../models/server-message.model';
import {ChatSnapshotModel} from '../models/chat-snapshot.model';
import {ChatSnapshotUpdateModel} from '../models/chat-snapshot-update.model';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatSnapshotService {

  private users: Map<string, ChatClientModel> = new Map();
  private snapshotVer = -1;
  private usersList$: BehaviorSubject<ChatClientModel[]> = new BehaviorSubject<ChatClientModel[]>([]);

  constructor() {
  }

  handle(message: ServerMessageModel) {
    switch (message.type) {
      case 'snapshot':
        const snapshot = JSON.parse(message.payload) as ChatSnapshotModel;
        this.snapshotVer = snapshot.snapshotVer;
        this.users.clear();
        snapshot.users.forEach(c => this.users.set(c.sessionId, c));
        break;
      case 'snapshotUpdate':
        const update = JSON.parse(message.payload) as ChatSnapshotUpdateModel;
        if (update.snapshotVer >= this.snapshotVer) {
          const user = update.user;
          switch (update.type) {
            case 'addUser':
            case 'updateUser':
              this.users.set(user.sessionId, user);
              break;
            case 'removeUser':
              this.users.delete(user.sessionId);
              break;
          }
        }
        break;
      default:
        return;
    }
    this.usersList$.next([...this.users.values()]);
  }

  getUsersList$(): Observable<ChatClientModel[]> {
    return this.usersList$.asObservable();
  }
}
