import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Notification } from '../../../models/notification.interface';
import { NavigateToChat } from '../message-type/message-type.component';

export interface NavigateToPrivate {
  link: number;
  id: number;
}

@Component({
  selector: 'az-private-application-type',
  templateUrl: './private-application-type.component.html',
  styleUrls: ['./private-application-type.component.less'],
})
export class PrivateApplicationTypeComponent {
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
  @Input()
  cancelPrivate!: boolean;

  /**
   *
   */
  @Output()
  navigateToPrivateApplication = new EventEmitter<NavigateToPrivate>();

  /**
   *
   */
  @Output()
  navigateToChat = new EventEmitter<NavigateToChat>();

  /**
   *
   * @param obj
   */
  handleNavigateToPrivate(obj: NavigateToPrivate) {
    this.navigateToPrivateApplication.emit(obj);
  }

  /**
   *
   * @param obj
   */
  handleNavigateToChat(obj: NavigateToChat) {
    this.navigateToChat.emit(obj);
  }
}
