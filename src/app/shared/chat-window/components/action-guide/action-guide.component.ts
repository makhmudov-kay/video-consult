import { Message } from './../../../models/message.interface';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'az-action-guide',
  templateUrl: './action-guide.component.html',
  styleUrls: ['./action-guide.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionGuideComponent {
  /**
   *
   */
  @Input()
  message!: Message;

  /**
   *
   */
  @Input()
  isClient!: boolean;

  /**
   *
   */
  @Input()
  isStreaming!: boolean;

  /**
   *
   */
  @Input()
  joinedUser!: boolean;

  /**
   *
   */
  @Input()
  isOnline!: boolean;

  /**
   *
   */
  @Input()
  isFreeApplication!: boolean;

  /**
   *
   */
  @Input()
  profileId!: number;

  /**
   *
   */
  @Input()
  status!: number;

  /**
   *
   */
  @Output()
  handleVideoCall = new EventEmitter();

  /**
   *
   */
  @Output()
  handleInvite = new EventEmitter();

  /**
   *
   */
  startVideoCall() {
    this.handleVideoCall.emit();
  }

  /**
   *
   */
  inviteToChat() {
    this.handleInvite.emit();
  }
}
