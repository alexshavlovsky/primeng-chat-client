import {Injectable} from '@angular/core';
import {UserPrincipal} from '../models/user-principal.model';

@Injectable({
  providedIn: 'root'
})
export class UserPrincipalService {
  private principal: UserPrincipal = null;

  constructor() {
  }

  getPrincipal(): UserPrincipal {
    return this.principal;
  }

  setPrincipal(principal: UserPrincipal) {
    this.principal = principal;
  }
}
