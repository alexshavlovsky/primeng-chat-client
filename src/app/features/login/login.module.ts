import {NgModule} from '@angular/core';
import {LoginComponent} from './login.component';
import {ButtonModule} from 'primeng/button';
import {PanelModule} from 'primeng/panel';
import {InputTextModule} from 'primeng/inputtext';
import {LoginRoutingModule} from './login.routing.module';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    PanelModule,
    InputTextModule,
    ButtonModule
  ]
})
export class LoginModule {
}
