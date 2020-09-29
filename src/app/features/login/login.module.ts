import {NgModule} from '@angular/core';
import {LoginComponent} from './login.component';
import {ButtonModule} from 'primeng/button';
import {PanelModule} from 'primeng/panel';
import {InputTextModule} from 'primeng/inputtext';
import {LoginRoutingModule} from './login.routing.module';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {RippleModule} from 'primeng/ripple';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    PanelModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    RippleModule,
  ]
})
export class LoginModule {
}
