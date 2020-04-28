import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {UrlFactoryService} from './url-factory.service';
import {EMPTY} from 'rxjs';
import {AttachmentModel} from '../models/rich-message.model';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor(private http: HttpClient,
              private urlFactory: UrlFactoryService) {
  }

  downloadAttachment(attachment: AttachmentModel) {
    this.http.get(this.urlFactory.getDownloadUrl() + attachment.uid, {
      headers: new HttpHeaders({Accept: 'application/octet-stream, application/json'}),
      observe: 'response', responseType: 'blob'
    }).pipe(
      map(response => this.redirectBlobToBrowser(response, attachment.name, attachment.type)),
      catchError(() => {
        console.log('Failed to download a file');
        return EMPTY;
      })
    ).subscribe();
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
