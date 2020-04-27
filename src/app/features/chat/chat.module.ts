import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChatComponent} from './chat.component';
import {ChatRoutingModule} from './chat.routing.module';
import {PanelModule} from 'primeng/panel';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {MenuModule} from 'primeng/menu';
import {ListboxModule} from 'primeng/listbox';
import {FormsModule} from '@angular/forms';
import {MessageInputComponent} from './message-input/message-input.component';
import {ProgressBarModule} from 'primeng/progressbar';

@NgModule({
  declarations: [ChatComponent, MessageInputComponent],
  imports: [
    CommonModule,
    ChatRoutingModule,
    PanelModule,
    ButtonModule,
    InputTextModule,
    MenuModule,
    ListboxModule,
    FormsModule,
    ProgressBarModule,
  ]
})
export class ChatModule {
}
