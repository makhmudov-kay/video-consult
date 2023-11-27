import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'az-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatWindowComponent {}
