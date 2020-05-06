import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpParams, HttpResponse} from '@angular/common/http';
import {UrlFactoryService} from './url-factory.service';
import {AttachmentModel} from '../models/rich-message.model';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttachmentService {

  constructor(private http: HttpClient,
              private urlFactory: UrlFactoryService) {
  }

  uploadFormData(formData: FormData): Observable<HttpEvent<{ [id: string]: string }>> {
    return this.http.post<{ [id: string]: string }>(this.urlFactory.getUploadUrl(), formData, {
      reportProgress: true,
      observe: 'events',
      responseType: 'json'
    });
  }

  downloadAttachment(attachment: AttachmentModel): Observable<any> {
    const payload = new HttpParams().set('fileId', attachment.fileId);
    return this.http.post(this.urlFactory.getDownloadUrl(), payload,
      {observe: 'response', responseType: 'blob'}
    ).pipe(
      tap(response => this.redirectBlobToBrowser(response, attachment.name, attachment.type)),
    );
  }

  redirectBlobToBrowser(response: HttpResponse<Blob>, fileName: string, fileType: string) {
    const blob = new Blob([response.body], {type: fileType});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    link.dispatchEvent(new MouseEvent(`click`, {bubbles: true, cancelable: true, view: window}));
    URL.revokeObjectURL(url);
  }
}
