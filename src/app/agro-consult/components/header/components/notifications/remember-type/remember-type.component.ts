import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Notification } from '../../../models/notification.interface';
import { NavigateToChat } from '../message-type/message-type.component';

@Component({
  selector: 'az-remember-type',
  templateUrl: './remember-type.component.html',
  styleUrls: ['./remember-type.component.less'],
})
export class RememberTypeComponent {
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
