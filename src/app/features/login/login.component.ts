import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {FormValidationService} from '../../core/services/form-validation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private formValidationService: FormValidationService) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nick: ['', [Validators.required]],
    });
  }

  getError(key: string, form: FormGroupDirective): string {
    const control = this.form.controls[key];
    if (!(form.submitted || control.dirty || control.touched)) {
      return null;
    }
    return this.formValidationService.getValidationMessage(control);
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    console.log({request: this.form.value});
  }

}
