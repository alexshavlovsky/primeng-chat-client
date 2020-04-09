import {Injectable} from '@angular/core';
import {ChatClientModel} from '../models/chat-client.model';
import {ServerMessageModel} from '../models/server-message.model';
import {ChatSnapshotModel} from '../models/chat-snapshot.model';
import {ChatSnapshotUpdateModel} from '../models/chat-snapshot-update.model';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatSnapshotService {

  users: Map<string, ChatClientModel> = new Map();
  snapshotVer = -1;
  usersList: Subject<ChatClientModel[]> = new BehaviorSubject<ChatClientModel[]>([]);

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
    this.usersList.next(this.usersAsSortedList());
  }

  usersAsSortedList(): ChatClientModel[] {
    return [...this.users.values()].map(m => ({
      ...m,
      nick: m.nick ? m.nick : m.sessionId
    })).sort((a, b) => a.nick.localeCompare(b.nick));
  }
}
