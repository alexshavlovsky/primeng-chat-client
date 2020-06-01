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

  private clients: Map<string, ChatClientModel> = new Map();
  private snapshotVer = -1;
  private clientsList$: BehaviorSubject<ChatClientModel[]> = new BehaviorSubject<ChatClientModel[]>([]);

  constructor() {
  }

  handle(message: ServerMessageModel) {
    switch (message.type) {
      case 'snapshot':
        const snapshot = JSON.parse(message.payload) as ChatSnapshotModel;
        this.snapshotVer = snapshot.version;
        this.clients.clear();
        snapshot.clients.forEach(client => this.clients.set(client.sessionId, client));
        break;
      case 'snapshotUpdate':
        const update = JSON.parse(message.payload) as ChatSnapshotUpdateModel;
        if (update.version >= this.snapshotVer) {
          const client = update.client;
          switch (update.type) {
            case 'addUser':
            case 'updateUser':
              this.clients.set(client.sessionId, client);
              break;
            case 'removeUser':
              this.clients.delete(client.sessionId);
              break;
          }
        }
        break;
      default:
        return;
    }
    this.clientsList$.next([...this.clients.values()]);
  }

  getClientsList$(): Observable<ChatClientModel[]> {
    return this.clientsList$.asObservable();
  }
}
