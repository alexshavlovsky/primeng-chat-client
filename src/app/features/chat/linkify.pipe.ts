import {Pipe, PipeTransform} from '@angular/core';

// see: https://stackoverflow.com/questions/39276617/angular2-way-of-converting-plain-text-to-url-anchor-links
@Pipe({name: 'linkify'})
export class LinkifyPipe implements PipeTransform {
  transform(raw: string): string {
    // URLs starting with http://, https://, or ftp://
    const pattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    // URLs starting with "www." (without // before it, or it'd re-link the ones done above)
    const pattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    // Change email addresses to mailto:: links
    const pattern3 = /(([a-zA-Z0-9\-_.])+@[a-zA-Z_]+?(\.[a-zA-Z]{2,6})+)/gim;
    return raw
    // the following two lines are necessary to prevent injection attempts
      .replace('<', '&lt;')
      .replace('>', '&gt;')
      .replace(pattern1, '<a href="$1" target="_blank">$1</a>')
      .replace(pattern2, '$1<a href="http://$2" target="_blank">$2</a>')
      .replace(pattern3, '<a href="mailto:$1">$1</a>');
  }
}
