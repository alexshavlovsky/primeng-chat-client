import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AbstractRoleGuard} from './abstract.role.guard';
import {UserPrincipalService} from '../services/user-principal.service';
import {RouteUrls} from '../../app-routing.config';

@Injectable({
  providedIn: 'root'
})
export class NotAuthenticatedGuard extends AbstractRoleGuard {
// not authenticated only user allowed
  constructor(protected userService: UserPrincipalService,
              protected router: Router) {
// if redirect strategy returns null, guarded route is activated
    super(userService, router, t => t === null ? null : RouteUrls.CHAT);
  }

}
