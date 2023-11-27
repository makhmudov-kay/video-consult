import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Notification } from '../../../models/notification.interface';

export interface NavigateToResume {
  resumeId: number;
  id: number;
}

@Component({
  selector: 'az-resume',
  templateUrl: './resume-type.component.html',
  styleUrls: ['./resume-type.component.less'],
})
export class ResumeTypeComponent {
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
  navigateToResume = new EventEmitter<NavigateToResume>();

  /**
   *
   * @param obj
   */
  handleNavigateResume(obj: NavigateToResume) {
    this.navigateToResume.emit(obj);
  }
}
