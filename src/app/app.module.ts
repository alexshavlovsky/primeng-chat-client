import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app.routing.module';
import {ErrorComponent} from './shared/error/error.component';
import {PanelModule} from 'primeng/panel';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {EnvConfigProvider} from './core/env.injector';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PanelModule,
    HttpClientModule,
  ],
  providers: [EnvConfigProvider],
  bootstrap: [AppComponent]
})
export class AppModule {
}
