import {Component, OnInit} from '@angular/core';
import {UserPrincipalService} from '../../core/services/user-principal.service';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  items: MenuItem[];

  constructor(private userPrincipalService: UserPrincipalService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.items = [
      {label: 'Logout', icon: 'pi pi-fw pi-sign-out', command: () => this.logout()},
    ];
  }

  logout() {
    this.userPrincipalService.removePrincipal();
    this.router.navigate(['/']);
  }

  get principal() {
    return this.userPrincipalService.getPrincipal();
  }
}
