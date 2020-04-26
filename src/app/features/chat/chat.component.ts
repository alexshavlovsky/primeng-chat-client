import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UserPrincipalService} from '../../core/services/user-principal.service';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {Observable, Subject, Subscription} from 'rxjs';
import {WsService} from '../../core/services/ws.service';
import {ChatSnapshotService} from '../../core/services/chat-snapshot.service';
import {debounceTime, distinctUntilChanged, filter, map, tap} from 'rxjs/operators';
import {UserPrincipal} from '../../core/models/user-principal.model';
import {ChatClientModel} from '../../core/models/chat-client.model';
import {ServerMessageModel} from '../../core/models/server-message.model';
import {MessageWithAttachment} from './message-input/message-input.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  cornerMenuItems: MenuItem[];
  messages: ServerMessageModel[] = [];
  subscription: Subscription;

  nick: string;
  nickChanged: Subject<string> = new Subject<string>();

  @ViewChild('messagesScroll') private msgScroll: ElementRef;

  constructor(private userPrincipalService: UserPrincipalService,
              private router: Router,
              private ws: WsService,
              private snapshotService: ChatSnapshotService) {
  }

  get principal(): UserPrincipal {
    return this.userPrincipalService.getPrincipal();
  }

  get usersList(): Observable<ChatClientModel[]> {
    return this.snapshotService.usersList;
  }

  ngOnInit(): void {
    this.cornerMenuItems = [
      {label: 'Logout', icon: 'pi pi-sign-out', command: () => this.logout()},
    ];
    this.subscription = this.ws.incoming.pipe(
      tap(m => this.snapshotService.handle(m)),
      filter(m => m.type === 'msg'),
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
  }

  logout() {
    this.userPrincipalService.removePrincipal();
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  send(event: MessageWithAttachment) {
    console.log(event);
    this.ws.sendMsg(event.message);
  }

  private scrollToBottom() {
    try {
      this.msgScroll.nativeElement.scrollTop = this.msgScroll.nativeElement.scrollHeight;
    } catch (err) {
    }
  }
}
