import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChatComponent} from './chat.component';
import {ChatRoutingModule} from './chat.routing.module';
import {PanelModule} from 'primeng/panel';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {MenuModule} from 'primeng/menu';
import {ListboxModule} from 'primeng/listbox';

@NgModule({
  declarations: [ChatComponent],
  imports: [
    CommonModule,
    ChatRoutingModule,
    PanelModule,
    ButtonModule,
    InputTextModule,
    MenuModule,
    ListboxModule,
  ]
})
export class ChatModule {
}
