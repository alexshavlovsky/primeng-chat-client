import {Injectable} from '@angular/core';
import {StorageProxyService} from './storage-proxy.service';
import {UuidFactoryService} from './uuid-factory.service';
import {UserModel} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserPrincipalService {

  constructor(private storage: StorageProxyService,
              private uuidFactory: UuidFactoryService) {
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

  getUser(): UserModel | null {
    const nick = this.loadByKeyOrSet(this.LS_NICK_KEY, null);
    const id = this.loadByKeyOrSet(this.LS_UUID_KEY, null);
    return (id && nick) ? {id, nick} : null;
  }

  setNick(nick: string) {
    this.loadByKeyOrSet(this.LS_UUID_KEY, this.uuidFactory.newUuid);
    this.storage.setItem(this.LS_NICK_KEY, nick);
  }

  removePrincipal() {
    this.storage.removeItem(this.LS_NICK_KEY);
  }
}
