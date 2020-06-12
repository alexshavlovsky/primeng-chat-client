import {Injectable} from '@angular/core';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import {UserPrincipalService} from './user-principal.service';
import {UrlFactoryService} from './url-factory.service';
import {RichMessageModel} from '../models/rich-message.model';
import {ServerMessageModel} from '../models/server-message.model';
import {merge, Observable, Subject} from 'rxjs';
import {OutgoingMessageModel} from '../models/outgoing-message.model';
import {delay, retryWhen} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WsService {

  private readonly connectionStatusEvents: Subject<ServerMessageModel> = new Subject();
  private readonly subject: WebSocketSubject<any>;
  private ongoingFrameId = 0;

  constructor(private userPrincipalService: UserPrincipalService,
              private urlFactory: UrlFactoryService) {
    this.subject = webSocket({
      url: urlFactory.getWsUrl(),
      openObserver: {
        next: e => {
          this.connectionStatusEvents.next(this.newInternalMsg('command', 'clearChatAppender'));
          this.connectionStatusEvents.next(this.newInternalMsg('info', `Connected to ${(e.target as WebSocket).url}`));
          this.sendHello();
        }
      },
      closeObserver: {
        next: e => {
          this.connectionStatusEvents.next(this.newInternalMsg('info',
            `The ws connection to ${(e.target as WebSocket).url} was closed abnormally with code ${e.code}. Retry in 5 seconds...`));
        }
      }
    });
  }

  private newInternalMsg(type: string, payload: string): ServerMessageModel {
    return {id: 'internal', client: null, type, timestamp: new Date(), payload};
  }

  get incoming(): Observable<ServerMessageModel> {
    return merge(
      this.connectionStatusEvents.asObservable(),
      this.subject.asObservable().pipe(retryWhen(n => n.pipe(delay(5000))))
    );
  }

  closeConnection() {
    this.subject.complete();
  }

  private sendTypedMessage(type: string, payload: string) {
    const msg: OutgoingMessageModel = {
      frameId: this.ongoingFrameId++,
      type,
      user: this.userPrincipalService.getUser(),
      payload
    };
    this.subject.next(msg);
  }

  sendHello() {
    this.sendTypedMessage('hello', '');
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
