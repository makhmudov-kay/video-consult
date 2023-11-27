import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Notification } from '../../../models/notification.interface';

export interface Response {
  link: number;
  id: number;
}

@Component({
  selector: 'az-response-type',
  templateUrl: './response-type.component.html',
  styleUrls: ['./response-type.component.less'],
})
export class ResponseTypeComponent {
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
  navigateToResume = new EventEmitter<Response>();

  /**
   *
   * @param obj
   */
  handleNavigateResume(obj: Response) {
    this.navigateToResume.emit(obj);
  }
}
