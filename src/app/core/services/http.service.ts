import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UrlFactoryService} from './url-factory.service';
import {ServerMessageModel} from '../models/server-message.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient,
              private urlFactory: UrlFactoryService) {
  }

  API_DEFAULT_HEADERS = new HttpHeaders({Accept: 'application/json', 'Content-Type': 'application/json'});

  private get<T>(url): Observable<T> {
    return this.http.get<T>(url, {headers: this.API_DEFAULT_HEADERS});
  }

  getMessageHistory(from: ServerMessageModel): Observable<ServerMessageModel[]> {
    return this.get<ServerMessageModel[]>(this.urlFactory.getMessageHistoryUrl() + from.id);
  }
}
