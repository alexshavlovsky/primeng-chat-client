import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment} from '@angular/router';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

import {UserPrincipalService} from '../services/user-principal.service';
import {UserPrincipal} from '../models/user-principal.model';

export abstract class AbstractRoleGuard implements CanLoad, CanActivate {

  protected constructor(protected userService: UserPrincipalService,
                        protected router: Router,
                        protected redirectStrategy: (t: UserPrincipal | null) => string | null) {
  }

  private allowOrRedirect$ = of(this.userService.getPrincipal()).pipe(
    map(t => {
      const redirect = this.redirectStrategy(t);
      if (redirect !== null) {
        this.router.navigate([redirect]);
      }
      return true;
    })
  );

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this.allowOrRedirect$;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.allowOrRedirect$;
  }

}
