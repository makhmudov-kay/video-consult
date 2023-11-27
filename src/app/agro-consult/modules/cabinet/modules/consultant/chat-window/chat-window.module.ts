import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatWindowComponent } from './chat-window.component';
import { ChatWindowRoutes } from './chat-window.routing';
import { CommonChatWindowModule } from 'projects/agro-consult/src/app/shared/chat-window/common-chat-window.module';

@NgModule({
  imports: [
    CommonModule,
    ChatWindowRoutes,
    CommonChatWindowModule,
  ],
  declarations: [ChatWindowComponent],
})
export class ChatWindowModule {}
