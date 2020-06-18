import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AttachmentModel} from '../../../../core/models/rich-message.model';

@Component({
  selector: 'app-message-attachment',
  templateUrl: './message-attachment.component.html',
  styleUrls: ['./message-attachment.component.css']
})
export class MessageAttachmentComponent implements OnInit {

  isImage: boolean;
  @Input() attachment: AttachmentModel;
  @Input() thumbsUrl: string;
  @Output() attachmentRequest: EventEmitter<AttachmentModel> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
    this.isImage = this.attachment.type.startsWith('image');
  }

  buildImageHtml(type: string, fileName: string) {
    return type.startsWith('image') ?
      `<div style="display:table-cell;width:240px;height:240px;text-align:center;vertical-align:middle;"><img src="${this.thumbsUrl}${fileName}" alt="${type}"></div>` :
      '';
  }
}
