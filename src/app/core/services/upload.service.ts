import {Injectable} from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {UrlFactoryService} from './url-factory.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient,
              private urlFactory: UrlFactoryService) {
  }

  uploadFormData(formData: FormData): Observable<any> {
    const req = new HttpRequest('POST', this.urlFactory.getUploadUrl(), formData, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req);
  }
}
