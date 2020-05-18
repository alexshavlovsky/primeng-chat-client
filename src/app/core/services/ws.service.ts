import {Injectable} from '@angular/core';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import {repeat, retry} from 'rxjs/operators';
import {defer, Observable} from 'rxjs';
import {ClientMessageModel} from '../models/client-message.model';
import {UserPrincipalService} from './user-principal.service';
import {ServerMessageModel} from '../models/server-message.model';
import {UrlFactoryService} from './url-factory.service';
import {RichMessageModel} from '../models/rich-message.model';

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

  private sendTypedMessage(type: string, payload: string) {
    const msg: ClientMessageModel = {
      frameId: this.ongoingFrameId++,
      type,
      clientId: this.userPrincipalService.getPrincipal().id,
      userNick: this.userPrincipalService.getPrincipal().nick,
      payload
    };
    this.outgoing.next(msg);
  }

  updateUserDetails() {
    this.sendTypedMessage('updateMe', '');
  }

  setTyping() {
    this.sendTypedMessage('setTyping', '');
  }

  sendMsg(text: string) {
    this.sendTypedMessage('msg', text);
  }

  sendRichMsg(richMessage: RichMessageModel) {
    this.sendTypedMessage('richMsg', JSON.stringify(richMessage));
  }
}
