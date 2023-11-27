import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ChatItemResponse } from '../models/chat-item.response';

@Component({
  selector: 'az-chat-item',
  templateUrl: './chat-item.component.html',
  styleUrls: ['./chat-item.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatItemComponent {
  /**
   *
   */
  @Input()
  card!: ChatItemResponse;

  /**
   *
   */
  @Input()
  isClient!: boolean;
}
