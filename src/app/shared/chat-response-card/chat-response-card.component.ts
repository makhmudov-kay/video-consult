import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ResponseCard } from '../models/application-detail.response';

@Component({
  selector: 'az-chat-response-card',
  templateUrl: './chat-response-card.component.html',
  styleUrls: ['./chat-response-card.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatResponseCardComponent {
  /**
   *
   */
  @Input()
  response!: ResponseCard;
}
