import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent} from '@angular/common/http';
import {UrlFactoryService} from './url-factory.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient,
              private urlFactory: UrlFactoryService) {
  }

  uploadFormData(formData: FormData): Observable<HttpEvent<any>> {
    return this.http.post(this.urlFactory.getUploadUrl(), formData, {
      reportProgress: true,
      observe: 'events',
      responseType: 'text'
    });
  }
}
