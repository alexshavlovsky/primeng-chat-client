import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AttachmentModel} from '../../../../core/models/rich-message.model';
import {VideoService} from '../../../../core/services/video.service';
import * as Plyr from 'plyr';
import {UrlFactoryService} from '../../../../core/services/url-factory.service';


@Component({
  selector: 'app-message-attachment',
  templateUrl: './message-attachment.component.html',
  styleUrls: ['./message-attachment.component.css']
})
export class MessageAttachmentComponent implements OnInit {

  thumbType: string;
  doLazyLoadImage = false;
  doShowSpinner = true;
  player;
  @Input() attachment: AttachmentModel;
  @Input() thumbsUrl: string;
  @Output() attachmentRequest: EventEmitter<AttachmentModel> = new EventEmitter();

  constructor(private videoService: VideoService,
              private urlFactory: UrlFactoryService) {
  }

  types: string[] = ['bmp', 'jpeg', 'png', 'gif', 'tiff', 'pdf'];

  ngOnInit(): void {
    if (this.attachment.type.startsWith('video')) {
      this.thumbType = 'video';
      this.videoService.downloadSources(this.attachment).subscribe(s => {
        if (!s.sources || s.sources.length === 0) {
          return;
        }
        const streamsUrl = this.urlFactory.getVideoStreamsUrl();
        this.player = new Plyr(document.getElementById('vid' + this.attachment.fileId));
        const source = s.sources.map(v => ({...v, src: streamsUrl + v.src}));
        s.type = 'video';
        s.title = this.attachment.name;
        s.sources = source;
        s.poster = this.buildThumbUrl(this.attachment);
        this.player.source = s;
      });
    } else {
      const typeArr = this.types.filter(v => this.attachment.type.endsWith(v));
      if (typeArr.length === 1) {
        this.thumbType = typeArr[0];
      }
    }
  }

  buildImageHtml(type: string, fileName: string) {
    return type.startsWith('image') ?
      `<div style="display:table-cell;width:240px;height:240px;text-align:center;vertical-align:middle;"><img src="${this.thumbsUrl}${fileName}" alt="${type}"></div>` :
      '';
  }

  buildThumbUrl(attachment: AttachmentModel) {
    return this.thumbsUrl + this.thumbType + '/' + attachment.fileId;
  }

  clickDownload(attachment: AttachmentModel) {
    if (!this.player) {
      this.attachmentRequest.emit(attachment);
    }
  }
}
