import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UrlFactoryService} from './url-factory.service';
import {AttachmentModel} from '../models/rich-message.model';
import {Observable} from 'rxjs';
import {CompoundVideoModel} from '../models/compound-video.model';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private http: HttpClient,
              private urlFactory: UrlFactoryService) {
  }

  public downloadSources(attachment: AttachmentModel): Observable<CompoundVideoModel> {
    return this.http.get<CompoundVideoModel>(this.urlFactory.getVideoSourcesUrl() + attachment.fileId);
  }

}
