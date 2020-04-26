import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {UrlFactoryService} from './url-factory.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient,
              private urlFactory: UrlFactoryService) {
  }

  uploadFile(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', this.urlFactory.getUploadUrl(), formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }
}
