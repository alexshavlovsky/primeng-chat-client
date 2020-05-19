import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UserPrincipalService} from '../../core/services/user-principal.service';
import {Router} from '@angular/router';
import {MenuItem, MessageService} from 'primeng/api';
import {combineLatest, EMPTY, Subject, Subscription} from 'rxjs';
import {WsService} from '../../core/services/ws.service';
import {ChatSnapshotService} from '../../core/services/chat-snapshot.service';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, map, tap, throttleTime} from 'rxjs/operators';
import {UserPrincipal} from '../../core/models/user-principal.model';
import {ChatClientModel} from '../../core/models/chat-client.model';
import {ServerMessageModel} from '../../core/models/server-message.model';
import {MessageWithAttachment} from './message-input/message-input.component';
import {HttpEventType} from '@angular/common/http';
import {AttachmentModel} from '../../core/models/rich-message.model';
import {UuidFactoryService} from '../../core/services/uuid-factory.service';
import {AttachmentService} from '../../core/services/attachment.service';
import {TypingService} from '../../core/services/typing.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [MessageService]
})
export class ChatComponent implements OnInit, OnDestroy {

  cornerMenuItems: MenuItem[];
  messages: ServerMessageModel[] = [];
  users: ChatClientModel[] = [];
  wsSubscription: Subscription;
  snapshotSubscription: Subscription;
  progress: number = null;

  nick: string;
  nickChanged: Subject<string> = new Subject<string>();

  @ViewChild('messagesScroll') private msgScroll: ElementRef;

  constructor(private userPrincipalService: UserPrincipalService,
              private router: Router,
              private ws: WsService,
              private snapshotService: ChatSnapshotService,
              private uuidFactory: UuidFactoryService,
              private downloadService: AttachmentService,
              private messageService: MessageService,
              private typingService: TypingService) {
  }

  get principal(): UserPrincipal {
    return this.userPrincipalService.getPrincipal();
  }

  ngOnInit(): void {
    this.cornerMenuItems = [
      {label: 'Logout', icon: 'pi pi-sign-out', command: () => this.logout()},
    ];
    this.wsSubscription = this.ws.incoming.pipe(
      tap(m => this.snapshotService.handle(m)),
      tap(m => this.typingService.handle(m)),
      filter(m => m.type === 'msg' || m.type === 'richMsg'),
      map(m => ({...m, userNick: m.userNick ? m.userNick : m.sessionId})),
      tap(m => {
        this.messages.push(m);
        setTimeout(() => this.scrollToBottom());
      })
    ).subscribe();
    this.nick = this.principal.nick;
    this.nickChanged.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      filter(nick => nick !== null && this.nick.length !== 0),
      tap(nick => {
        this.userPrincipalService.setPrincipal(nick);
        this.ws.updateUserDetails();
      })
    ).subscribe();

    // combine a users list managed by the snapshot service with a typingMap managed by the typing service
    // and sort the resulting list
    this.snapshotSubscription = combineLatest([this.snapshotService.getUsersList$(), this.typingService.getTypingMap$()])
      .subscribe(([users, typingMap]) => {
        this.users = users.map(user => ({
          ...user,
          nick: user.nick ? user.nick : user.sessionId,
          isTyping: (typingMap.get(user.clientId) !== undefined)
        })).sort((a, b) => a.nick.localeCompare(b.nick));
      });
  }

  logout() {
    this.userPrincipalService.removePrincipal();
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.wsSubscription.unsubscribe();
    this.snapshotSubscription.unsubscribe();
  }

  send(payload: MessageWithAttachment) {
    // no attachments
    if (payload.files.length === 0) {
      this.ws.sendMsg(payload.message);
      return;
    }

    this.progress = 0;

    // send attachments as a form data
    const formData: FormData = new FormData();
    const attachments: AttachmentModel[] = [];
    payload.files.forEach(file => {
      const attachment: AttachmentModel = {
        fileId: this.uuidFactory.newUuid(),
        name: file.name,
        size: file.size,
        lastModified: file.lastModified,
        type: file.type
      };
      formData.append('file', file, attachment.fileId);
      attachments.push(attachment);
    });

    this.downloadService.uploadFormData(formData).pipe(
      tap(e => {
        if (e.type === HttpEventType.Response && e.status === 200) {
          attachments.forEach(a => a.fileId = e.body[a.fileId]);
          this.ws.sendRichMsg({message: payload.message, attachments});
        }
      }),
      filter(e => e.type === HttpEventType.UploadProgress),
      map(e => e.type === HttpEventType.UploadProgress ? Math.floor(100 * e.loaded / e.total) : null),
      throttleTime(1000),
      finalize(() => this.progress = null)
    ).subscribe(v => this.progress = v);
  }

  private scrollToBottom() {
    try {
      this.msgScroll.nativeElement.scrollTop = this.msgScroll.nativeElement.scrollHeight;
    } catch (err) {
    }
  }

  downloadAttachment(attachment: AttachmentModel) {
    this.downloadService.downloadAttachment(attachment).pipe(
      catchError(e => {
        this.messageService.add({
          key: 'toast',
          severity: 'error',
          summary: 'Error ' + e.status + ': ' + e.statusText,
          detail: attachment.name
        });
        return EMPTY;
      })
    ).subscribe();
  }

  userTyping() {
    this.ws.setTyping();
  }
}
