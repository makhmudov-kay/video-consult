import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Response } from '../response-type/response-type.component';
import { Notification } from '../../../models/notification.interface';

@Component({
  selector: 'az-warning-type',
  templateUrl: './warning-type.component.html',
  styleUrls: ['./warning-type.component.less'],
})
export class WarningTypeComponent {
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
  navigateToPrivateChat = new EventEmitter<Response>();

  /**
   *
   * @param obj
   */
  navigateToPrivate(obj: Response) {
    this.navigateToPrivateChat.emit(obj);
  }
}
