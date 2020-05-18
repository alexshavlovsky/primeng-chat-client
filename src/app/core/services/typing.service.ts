import {Injectable} from '@angular/core';
import {ServerMessageModel} from '../models/server-message.model';

@Injectable({
  providedIn: 'root'
})
export class TypingService {

//  users: Map<string, string>;

  constructor() {
  }

  handle(m: ServerMessageModel) {
    if (m.type === 'setTyping') {
      // console.log(m);
    }
  }

}
