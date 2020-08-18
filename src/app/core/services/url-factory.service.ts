import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlFactoryService {

  API_PORT = 8080; // if null then the location.port will be taken
  API_HOST = null; // if null then the location.hostName will be taken

  constructor() {
  }

  public getWsUrl(): string {
    return this.wsUrl('/ws/');
  }

  public getUploadUrl(): string {
    return this.uploadUrl('/files/');
  }

  public getThumbsUrl(): string {
    return this.uploadUrl('/files/thumbs/');
  }

  public getDownloadUrl(): string {
    return this.getUploadUrl();
  }

  public getVideoSourcesUrl(): string {
    return this.uploadUrl('/videos/sources/');
  }

  public getVideoStreamsUrl(): string {
    return this.uploadUrl('/videos/streams/');
  }

  private buildUrl(protocol: string, uri: string) {
    const l = window.location;
    const hostName = this.API_HOST ? this.API_HOST : l.hostname;
    const port = this.API_PORT ? this.API_PORT.toString() : l.port;
    return protocol + '//' + hostName + ':' + port + uri;
  }

  private wsUrl(uri: string): string {
    return this.buildUrl(window.location.protocol === 'https:' ? 'wss:' : 'ws:', uri);
  }

  private uploadUrl(uri: string): string {
    return this.buildUrl(window.location.protocol, uri);
  }
}
