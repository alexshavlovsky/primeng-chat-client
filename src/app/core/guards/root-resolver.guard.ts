import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {UserPrincipalService} from '../services/user-principal.service';
import {RouteUrls} from '../../app-routing.config';

@Injectable({
  providedIn: 'root'
})
export class RootResolverGuard implements CanActivate {

  constructor(private userService: UserPrincipalService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | boolean | UrlTree {
    // activate error component
    if (state.url !== '/') {
      return true;
    }
    // the root url is redirected based on specified conditions
    return of(this.userService.getUser()).pipe(
      map(t => this.router.createUrlTree([t === null ? RouteUrls.LOGIN : RouteUrls.CHAT])),
    );
  }

}
