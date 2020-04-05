import {Component, OnInit} from '@angular/core';
import {UserPrincipalService} from '../../core/services/user-principal.service';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  items: MenuItem[];
  wsSubject: WebSocketSubject<any>;

  constructor(private userPrincipalService: UserPrincipalService,
              private router: Router) {
  }

  get principal() {
    return this.userPrincipalService.getPrincipal();
  }

  wsUrl(port: number | null, uri: string): string {
    const l = window.location;
    return ((l.protocol === 'https:') ? 'wss://' : 'ws://') + l.hostname + ':' + (port ? port.toString() : l.port) + uri;
  }

  ngOnInit(): void {
    this.items = [
      {label: 'Logout', icon: 'pi pi-fw pi-sign-out', command: () => this.logout()},
    ];
    const url = this.wsUrl(8080, '/ws/');
    console.log(url);
    this.wsSubject = webSocket(url);
    this.wsSubject.subscribe(
      e => console.log(e),
      e => console.log(e),
      () => 'complete'
    );
  }

  logout() {
    this.userPrincipalService.removePrincipal();
    this.router.navigate(['/']);
  }
}
