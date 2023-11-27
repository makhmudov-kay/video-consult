import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Notification } from '../../../models/notification.interface';

export interface NavigateToChat {
  is_consultant: boolean;
  link: number;
  id: number;
}

@Component({
  selector: 'az-message-type',
  templateUrl: './message-type.component.html',
  styleUrls: ['./message-type.component.less'],
})
export class MessageTypeComponent {
  /**
   *
   */
  @Input()
  notification!: Notification;

  /**
   *
   */
  @Input()
  isLast!: boolean;

  /**
   *
   */
  @Output()
  navigateToChat = new EventEmitter<NavigateToChat>();

  /**
   *
   * @param obj
   */
  handleNavigateToChat(obj: NavigateToChat) {
    this.navigateToChat.emit(obj);
  }
}
