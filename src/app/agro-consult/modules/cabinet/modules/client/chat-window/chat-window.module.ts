import { CommonChatWindowModule } from './../../../../../../shared/chat-window/common-chat-window.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatWindowComponent } from './chat-window.component';
import { ChatWindowRoutes } from './chat-window.routing';

@NgModule({
  imports: [CommonModule, ChatWindowRoutes, CommonChatWindowModule],
  declarations: [ChatWindowComponent],
})
export class ChatWindowModule {}
