import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageProxyService {

  private cache: Map<string, string> = new Map();

  constructor() {
  }

  setItem(key: string, value: string) {
    const cacheValue = this.cache.get(key);
    if (cacheValue !== value) {
      this.cache.set(key, value);
      localStorage.setItem(key, value);
    }
  }

  getItem(key: string) {
    const value = this.cache.get(key);
    if (value) {
      return value;
    } else {
      const storageValue = localStorage.getItem(key);
      if (storageValue) {
        this.cache.set(key, storageValue);
      }
      return storageValue;
    }
  }

  removeItem(key: string) {
    const cacheValue = this.cache.get(key);
    if (cacheValue) {
      this.cache.delete(key);
      localStorage.removeItem(key);
    }
  }

}
