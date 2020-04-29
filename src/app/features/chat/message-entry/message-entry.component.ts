import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ServerMessageModel} from '../../../core/models/server-message.model';
import {UserPrincipal} from '../../../core/models/user-principal.model';
import {AttachmentModel, RichMessageModel} from '../../../core/models/rich-message.model';

@Component({
  selector: 'app-message-entry',
  templateUrl: './message-entry.component.html',
  styleUrls: ['./message-entry.component.css']
})
export class MessageEntryComponent implements OnInit {

  @Input() message: ServerMessageModel;
  @Input() principal: UserPrincipal;
  @Output() attachmentRequest: EventEmitter<AttachmentModel> = new EventEmitter();

  richMessage: RichMessageModel;

  constructor() {
  }

  ngOnInit(): void {
    this.richMessage = this.message.type === 'richMsg' ? JSON.parse(this.message.payload) as RichMessageModel : null;
  }
}
