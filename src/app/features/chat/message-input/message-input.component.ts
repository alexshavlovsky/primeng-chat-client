import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MenuItem} from 'primeng';

export interface MessageWithAttachment {
  message: string;
  files: File[];
}

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.css']
})
export class MessageInputComponent implements OnInit {

  filesMenuItems: MenuItem[];
  filesList: File[] = [];
  inputText = '';

  @Output() newMessage = new EventEmitter<MessageWithAttachment>();

  constructor() {
  }

  ngOnInit(): void {
  }

  newFilesAdded(event) {
    Array.from(event.target.files as FileList).forEach(file => this.filesList.push(file));
    this.updateFilesMenu();
  }

  removeFile(idx: number) {
    this.filesList.splice(idx, 1);
    this.updateFilesMenu();
  }

  private removeAll() {
    this.filesList = [];
    this.updateFilesMenu();
  }


  formatSizeUnits(bytes) {
    if (bytes >= 1073741824) {
      bytes = (bytes / 1073741824).toFixed(2) + ' GB';
    } else if (bytes >= 1048576) {
      bytes = (bytes / 1048576).toFixed(2) + ' MB';
    } else if (bytes >= 1024) {
      bytes = (bytes / 1024).toFixed(2) + ' KB';
    } else if (bytes > 1) {
      bytes = bytes + ' bytes';
    } else if (bytes === 1) {
      bytes = bytes + ' byte';
    } else {
      bytes = '0 bytes';
    }
    return '(' + bytes + ')';
  }

  updateFilesMenu() {
    let i = 0;
    let s = 0;
    this.filesMenuItems = this.filesList.map(file => {
      s += file.size;
      i++;
      return {label: this.formatSizeUnits(file.size) + ' ' + file.name, icon: 'pi pi-times', command: () => this.removeFile(i - 1)};
    });
    if (i > 1) {
      this.filesMenuItems.push({
        label: this.formatSizeUnits(s) + ' total ' + i + ' file attachments',
        icon: 'pi pi-times',
        command: () => this.removeAll()
      });
    }
  }

  send() {
    if (this.inputText === '' && this.filesList.length === 0) {
      return;
    }
    this.newMessage.emit({message: this.inputText, files: this.filesList});
    this.inputText = '';
    this.removeAll();
  }

}
