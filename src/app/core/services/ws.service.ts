import {Injectable} from '@angular/core';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import {ClientMessageModel} from '../models/client-message.model';
import {UserPrincipalService} from './user-principal.service';
import {UrlFactoryService} from './url-factory.service';
import {RichMessageModel} from '../models/rich-message.model';
import {ServerMessageModel} from '../models/server-message.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WsService {

  private readonly subject: WebSocketSubject<any>;
  private ongoingFrameId = 0;

  constructor(private userPrincipalService: UserPrincipalService,
              private urlFactory: UrlFactoryService) {
    this.subject = webSocket(urlFactory.getWsUrl());
  }

  get incoming(): Observable<ServerMessageModel> {
    return this.subject.asObservable();
  }

  closeConnection() {
    this.subject.complete();
  }

  private sendTypedMessage(type: string, payload: string) {
    const msg: ClientMessageModel = {
      frameId: this.ongoingFrameId++,
      type,
      clientId: this.userPrincipalService.getPrincipal().id,
      userNick: this.userPrincipalService.getPrincipal().nick,
      payload
    };
    this.subject.next(msg);
  }

  sendUpdateMe() {
    this.sendTypedMessage('updateMe', '');
  }

  sendSetTyping() {
    this.sendTypedMessage('setTyping', '');
  }

  sendMsg(text: string) {
    this.sendTypedMessage('msg', text);
  }

  sendRichMsg(richMessage: RichMessageModel) {
    this.sendTypedMessage('richMsg', JSON.stringify(richMessage));
  }
}
