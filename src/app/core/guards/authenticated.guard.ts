import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AbstractRoleGuard} from './abstract.role.guard';
import {RouteUrls} from '../../app-routing.config';
import {UserPrincipalService} from '../services/user-principal.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard extends AbstractRoleGuard {
// authenticated only user allowed
  constructor(protected userService: UserPrincipalService,
              protected router: Router) {
// if redirect strategy returns null, guarded route is activated
    super(userService, router, t => t === null ? RouteUrls.LOGIN : null);
  }

}
