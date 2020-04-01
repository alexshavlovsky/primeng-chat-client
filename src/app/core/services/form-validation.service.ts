import {Injectable} from '@angular/core';
import {AbstractControl} from '@angular/forms';

export interface ValidationMessageEntry {
  name: string;
  message: string | ((options: any) => string);
}

@Injectable({
  providedIn: 'root'
})
export class FormValidationService {

  validationMessages: ValidationMessageEntry[] = [
    {name: 'required', message: 'This field is required'},
    {name: 'minlength', message: f => `Please enter at least ${f.minlength} characters`},
    {name: 'maxlength', message: f => `This field must not exceed ${f.maxlength} characters`},
    {name: 'email', message: 'Please enter a valid email address'},
  ];

  constructor() {
  }

  getValidationMessage(control: AbstractControl, options?: {}): string | null {
    for (const entry of this.validationMessages) {
      if (control.hasError(entry.name)) {
        const message = entry.message;
        if (message) {
          return (typeof message === 'function') ? message(options === undefined ? {} : options) : message;
        }
      }
    }
    return null;
  }
}
