import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AttachmentModel} from '../../../../core/models/rich-message.model';

@Component({
  selector: 'app-message-attachment',
  templateUrl: './message-attachment.component.html',
  styleUrls: ['./message-attachment.component.css']
})
export class MessageAttachmentComponent implements OnInit {

  thumbType: string;
  doLazyLoadImage = false;
  doShowSpinner = true;
  @Input() attachment: AttachmentModel;
  @Input() thumbsUrl: string;
  @Output() attachmentRequest: EventEmitter<AttachmentModel> = new EventEmitter();

  constructor() {
  }

  types: string[] = ['bmp', 'jpeg', 'png', 'gif', 'tiff', 'pdf'];

  ngOnInit(): void {
    if (this.attachment.type.startsWith('video')) {
      this.thumbType = 'video';
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
}
