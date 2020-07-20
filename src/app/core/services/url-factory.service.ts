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
    return this.uploadUrl(this.API_PORT, '/files/');
  }

  public getThumbsUrl(): string {
    return this.uploadUrl(this.API_PORT, '/files/thumbs/');
  }

  public getDownloadUrl(): string {
    return this.getUploadUrl();
  }

  public getVideoSourcesUrl(): string {
    return this.uploadUrl(this.API_PORT, '/videos/sources/');
  }

  public getVideoStreamsUrl(): string {
    return this.uploadUrl(this.API_PORT, '/videos/streams/');
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
