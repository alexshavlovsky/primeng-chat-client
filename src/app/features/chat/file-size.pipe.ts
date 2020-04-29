import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'fileSize'
})
export class FileSizePipe implements PipeTransform {

  formatSizeUnits(size: number): string {
    if (size >= 1073741824) {
      return (size / 1073741824).toFixed(2) + ' GB';
    } else if (size >= 1048576) {
      return (size / 1048576).toFixed(2) + ' MB';
    } else if (size >= 1024) {
      return (size / 1024).toFixed(2) + ' KB';
    } else if (size > 1) {
      return size + ' bytes';
    } else if (size === 1) {
      return size + ' byte';
    } else {
      return '0 bytes';
    }
  }

  transform(value: number, prefix: string = '', suffix: string = ''): string {
    return prefix + this.formatSizeUnits(value) + suffix;
  }
}
