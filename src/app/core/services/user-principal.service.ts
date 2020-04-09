import {Injectable} from '@angular/core';
import {UserPrincipal} from '../models/user-principal.model';
import {StorageProxyService} from './storage-proxy.service';

@Injectable({
  providedIn: 'root'
})
export class UserPrincipalService {

  constructor(private storage: StorageProxyService) {
  }

  private LS_UUID_KEY = 'client-uuid';
  private LS_NICK_KEY = 'client-nick';

  private loadByKeyOrSet(key: string, provider: (() => string) | null): string {
    let item = this.storage.getItem(key);
    if (item === null && provider) {
      item = provider();
      this.storage.setItem(key, item);
    }
    return item;
  }

  private newUuid() {
    return ((1e7).toString() + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c: any) =>
      // tslint:disable-next-line:no-bitwise
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
  }

  getPrincipal(): UserPrincipal | null {
    const nick = this.loadByKeyOrSet(this.LS_NICK_KEY, null);
    const id = this.loadByKeyOrSet(this.LS_UUID_KEY, null);
    return (id && nick) ? {id, nick} : null;
  }

  setPrincipal(nick: string) {
    this.loadByKeyOrSet(this.LS_UUID_KEY, this.newUuid);
    this.storage.setItem(this.LS_NICK_KEY, nick);
  }

  removePrincipal() {
    this.storage.removeItem(this.LS_NICK_KEY);
  }
}
