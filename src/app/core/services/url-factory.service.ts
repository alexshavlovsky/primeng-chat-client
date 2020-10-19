import {Injectable} from '@angular/core';
import {AppPropertiesService} from './app-properties.service';

@Injectable({
  providedIn: 'root'
})
export class UrlFactoryService {

  constructor(private appProps: AppPropertiesService) {
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

  public getMessageHistoryUrl(): string {
    return this.uploadUrl('/message-history/');
  }

  private buildUrl(protocol: string, uri: string) {
    const l = window.location;
    const hostName = this.appProps.API_HOST ? this.appProps.API_HOST : l.hostname;
    const port = this.appProps.API_PORT ? this.appProps.API_PORT.toString() : l.port;
    return protocol + '//' + hostName + ':' + port + this.appProps.API_URI_PREFIX + uri;
  }

  private wsUrl(uri: string): string {
    return this.buildUrl(window.location.protocol === 'https:' ? 'wss:' : 'ws:', uri);
  }

  private uploadUrl(uri: string): string {
    return this.buildUrl(window.location.protocol, uri);
  }
}
