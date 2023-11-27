import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Notification } from '../../../models/notification.interface';

@Component({
  selector: 'az-applications-count',
  templateUrl: './applications-count.component.html',
  styleUrls: ['./applications-count.component.less'],
})
export class ApplicationsCountComponent {
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
  navigateToSearchApplications = new EventEmitter<number>();

  /**
   *
   * @param obj
   */
  handleNavigateToSearchApplications(id: number) {
    this.navigateToSearchApplications.emit(id);
  }
}
