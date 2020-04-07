import {Injectable} from '@angular/core';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import {repeat, retry} from 'rxjs/operators';
import {defer, Observable} from 'rxjs';
import {MessageModel} from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class WsService {

  outgoing: WebSocketSubject<any>;
  incoming: Observable<MessageModel>;

  private wsUrl(port: number | null, uri: string): string {
    const l = window.location;
    return ((l.protocol === 'https:') ? 'wss://' : 'ws://') + l.hostname + ':' + (port ? port.toString() : l.port) + uri;
  }

  constructor() {
    this.outgoing = webSocket(this.wsUrl(8080, '/ws/'));
    this.incoming = defer(() => this.outgoing).pipe(
      retry(),
      repeat(),
    );
  }
}
