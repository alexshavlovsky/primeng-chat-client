import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MenuItem} from 'primeng';
import {FileSizePipe} from '../file-size.pipe';

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
  filesToolTipText = '';
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

  updateFilesMenu() {
    let s = 0;
    this.filesMenuItems = this.filesList.map((file, i) => {
      s += file.size;
      return {
        label: FileSizePipe.prototype.transform(file.size, '(', ') ') + file.name,
        icon: 'pi pi-times',
        command: () => this.removeFile(i)
      };
    });
    const fn = this.filesList.length;
    this.filesToolTipText = `${FileSizePipe.prototype.transform(s)} in ${fn} file${fn === 1 ? '' : 's'}`;
    if (this.filesList.length > 1) {
      this.filesMenuItems.push({
        label: this.filesToolTipText,
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
