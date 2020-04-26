import {Injectable} from '@angular/core';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import {repeat, retry} from 'rxjs/operators';
import {defer, Observable} from 'rxjs';
import {ClientMessageModel} from '../models/client-message.model';
import {UserPrincipalService} from './user-principal.service';
import {ServerMessageModel} from '../models/server-message.model';
import {UrlFactoryService} from './url-factory.service';

@Injectable({
  providedIn: 'root'
})
export class WsService {

  private outgoing: WebSocketSubject<any>;
  private ongoingFrameId = 0;
  incoming: Observable<ServerMessageModel>;

  constructor(private userPrincipalService: UserPrincipalService,
              private urlFactory: UrlFactoryService) {
    this.outgoing = webSocket(urlFactory.getWsUrl());
    this.incoming = defer(() => {
      this.updateUserDetails();
      return this.outgoing;
    }).pipe(
      retry(),
      repeat(),
    );
  }

  updateUserDetails() {
    const msg: ClientMessageModel = {
      frameId: this.ongoingFrameId++,
      type: 'updateMe',
      clientId: this.userPrincipalService.getPrincipal().id,
      userNick: this.userPrincipalService.getPrincipal().nick,
      payload: this.userPrincipalService.getPrincipal().nick, // TODO: remove this unnecessary field
    };
    this.outgoing.next(msg);
  }

  sendMsg(text: string) {
    const msg: ClientMessageModel = {
      frameId: this.ongoingFrameId++,
      type: 'msg',
      clientId: this.userPrincipalService.getPrincipal().id,
      userNick: this.userPrincipalService.getPrincipal().nick,
      payload: text
    };
    this.outgoing.next(msg);
  }
}
