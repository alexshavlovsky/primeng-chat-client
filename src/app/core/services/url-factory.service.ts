import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlFactoryService {

  API_PORT = 8080;

  constructor() {
  }

  public getWsUrl(): string {
    return this.wsUrl(this.API_PORT, '/ws/');
  }

  public getUploadUrl(): string {
    return this.wsUrl(this.API_PORT, '/upload/');
  }

  private wsUrl(port: number | null, uri: string): string {
    const l = window.location;
    return ((l.protocol === 'https:') ? 'wss://' : 'ws://') + l.hostname + ':' + (port ? port.toString() : l.port) + uri;
  }

  private uploadUrl(port: number | null, uri: string): string {
    const l = window.location;
    return l.protocol + '//' + l.hostname + ':' + (port ? port.toString() : l.port) + uri;
  }
}
