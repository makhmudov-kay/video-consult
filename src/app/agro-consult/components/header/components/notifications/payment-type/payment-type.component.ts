import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Notification } from '../../../models/notification.interface';
import { NavigateToChat } from '../message-type/message-type.component';

@Component({
  selector: 'az-payment-type',
  templateUrl: './payment-type.component.html',
  styleUrls: ['./payment-type.component.less'],
})
export class PaymentTypeComponent {
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
