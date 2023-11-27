import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Notification } from '../../../models/notification.interface';

@Component({
  selector: 'az-blocked-application-type',
  templateUrl: './blocked-application-type.component.html',
  styleUrls: ['./blocked-application-type.component.less'],
})
export class BlockedApplicationTypeComponent {
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
   navigateToPrivateApplication = new EventEmitter<any>();
 
   /**
    *
    * @param obj
    */
   handleNavigateResume(obj: any) {
     this.navigateToPrivateApplication.emit(obj);
   }
}
