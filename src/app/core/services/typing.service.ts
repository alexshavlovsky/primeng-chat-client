import {Injectable} from '@angular/core';
import {ServerMessageModel} from '../models/server-message.model';
import {interval, Observable} from 'rxjs';
import {distinct, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TypingService {

  private typingByUserId: Map<string, number> = new Map<string, number>();
  private mapVersion = 0;
  private typingMap$: Observable<Map<string, number>> = interval(500).pipe(
    map(() => new Date().valueOf()),
    map(now => {
      this.typingByUserId.forEach((time, id, m) => {
        if (now - time > 3000) {
          m.delete(id);
          this.mapVersion++;
        }
      });
      return this.typingByUserId;
    }),
    distinct(() => this.mapVersion)
  );

  constructor() {
  }

  getTypingMap$(): Observable<Map<string, number>> {
    return this.typingMap$;
  }

  handle(m: ServerMessageModel) {
    if (m.type === 'setTyping') {
      if (this.typingByUserId.get(m.client.clientId) === undefined) {
        this.mapVersion++;
      }
      this.typingByUserId.set(m.client.clientId, new Date().valueOf());
    }
  }
}
