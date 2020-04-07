import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserPrincipalService} from '../../core/services/user-principal.service';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {Observable, Subscription} from 'rxjs';
import {WsService} from '../../core/services/ws.service';
import {ChatSnapshotService} from '../../core/services/chat-snapshot.service';
import {filter, tap} from 'rxjs/operators';
import {UserPrincipal} from '../../core/models/user-principal.model';
import {ChatClientModel} from '../../core/models/chat-client.model';
import {MessageModel} from '../../core/models/message.model';
import {OutgoingMessageModel} from '../../core/models/outgoing-message.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  items: MenuItem[];
  messages: MessageModel[] = [];
  subscription: Subscription;
  inputText = '';

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
    this.items = [
      {label: 'Logout', icon: 'pi pi-fw pi-sign-out', command: () => this.logout()},
    ];
    this.subscription = this.ws.incoming.pipe(
      tap(m => this.snapshotService.handle(m)),
      filter(m => m.type === 'msg'),
      tap(m => this.messages.push(m))
    ).subscribe();
  }

  logout() {
    this.userPrincipalService.removePrincipal();
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  send() {
    if (this.inputText === '') {
      return;
    }
    const msg: OutgoingMessageModel = {remoteClientId: this.userPrincipalService.getPrincipal().id, messageText: this.inputText};
    this.ws.outgoing.next(msg);
    this.inputText = '';
  }
}
