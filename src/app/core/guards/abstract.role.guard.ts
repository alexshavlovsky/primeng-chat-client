import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree} from '@angular/router';
import {defer, Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

import {UserPrincipalService} from '../services/user-principal.service';
import {UserPrincipal} from '../models/user-principal.model';

export abstract class AbstractRoleGuard implements CanLoad, CanActivate {

  protected constructor(protected userService: UserPrincipalService,
                        protected router: Router,
                        protected redirectStrategy: (t: UserPrincipal | null) => string | null) {
  }

  private allowOrRedirect$ = defer(() => of(this.redirectStrategy(this.userService.getPrincipal())));

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this.allowOrRedirect$.pipe(map(r => {
      if (r !== null) {
        this.router.navigate([r]);
      }
      return r === null;
    }));
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.allowOrRedirect$.pipe(map(r => r === null ? true : this.router.createUrlTree([r])));
  }
}
