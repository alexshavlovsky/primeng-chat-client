import {Component, OnInit} from '@angular/core';
import {UserPrincipalService} from '../../core/services/user-principal.service';
import {Router} from '@angular/router';
import {UserPrincipal} from '../../core/models/user-principal.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private userPrincipalService: UserPrincipalService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  logout() {
    this.userPrincipalService.removePrincipal();
    this.router.navigate(['/']);
  }

  get principal(): UserPrincipal {
    return this.userPrincipalService.getPrincipal();
  }
}
