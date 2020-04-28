import {Component, Input, OnInit} from '@angular/core';
import {ServerMessageModel} from '../../../core/models/server-message.model';
import {UserPrincipal} from '../../../core/models/user-principal.model';
import {AttachmentModel, RichMessageModel} from '../../../core/models/rich-message.model';
import {DownloadService} from '../../../core/services/download.service';

@Component({
  selector: 'app-message-entry',
  templateUrl: './message-entry.component.html',
  styleUrls: ['./message-entry.component.css']
})
export class MessageEntryComponent implements OnInit {

  @Input() message: ServerMessageModel;
  @Input() principal: UserPrincipal;

  richMessage: RichMessageModel;

  constructor(private downloadService: DownloadService) {
  }

  ngOnInit(): void {
    this.richMessage = this.message.type === 'richMsg' ? JSON.parse(this.message.payload) as RichMessageModel : null;
  }

  download(attachment: AttachmentModel) {
    this.downloadService.downloadAttachment(attachment);
  }
}
