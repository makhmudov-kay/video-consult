import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  ChangeDetectorRef,
  EventEmitter,
} from '@angular/core';
import { Router } from '@angular/router';
import { StoreService, UserInfo } from 'ngx-az-core';
import { NotificationsService } from '../../service/notifications.service';
import { Notification } from '../../models/notification.interface';
import { NavigateToChat } from './message-type/message-type.component';
import { NavigateToResume } from './resume/resume-type.component';
import { NavigateToPrivate } from './private-application-type/private-application-type.component';
import { Response } from './response-type/response-type.component';

@Component({
  selector: 'az-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationsComponent {
  /**
   *
   */
  @Input()
  messagePack!: Notification[];

  unreadClient = 0;
  unreadConsultant = 0;

  private _clientNotifications!: Notification[];
  public get clientNotifications(): Notification[] {
    return this._clientNotifications;
  }
  @Input()
  public set clientNotifications(v: Notification[]) {
    this._clientNotifications = v;
    this.unreadClient = v.filter((el) => el.showed == false).length;
  }

  /**
   *
   */
  private _consultantNotifications!: Notification[];
  public get consultantNotifications(): Notification[] {
    return this._consultantNotifications;
  }
  @Input()
  public set consultantNotifications(v: Notification[]) {
    this._consultantNotifications = v;
    this.unreadConsultant = v.filter((el) => el.showed == false).length;
  }

  /**
   *
   */
  @Input()
  notificationCount!: number;

  /**
   *
   */
  @Output()
  handleNotificationCount = new EventEmitter<{
    id: number;
    chatId?: number | undefined;
  }>();

  /**
   *
   */
  @Input()
  visibleNotificationPopover!: boolean;

  /**
   *
   */
  @Input()
  user!: UserInfo;

  /**
   *
   */
  @Output()
  visibleNotificationPopoverChange = new EventEmitter<boolean>();

  /**
   *
   */
  @Output()
  closeDrawer = new EventEmitter();

  /**
   *
   */
  @Output()
  clearNotificationHandler = new EventEmitter();

  /**
   *
   * @param $notifications
   * @param cd
   * @param router
   * @param $store
   */
  constructor(
    private $notifications: NotificationsService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private $storeService: StoreService
  ) {}

  /**
   *
   */
  clearNotification() {
    this.clearNotificationHandler.emit();
  }

  /**
   *
   * @param id
   */
  markAsRead(id: number, chatId?: number | undefined) {
    const obj = { id, chatId };
    this.handleNotificationCount.emit(obj);
    this.visibleNotificationPopoverChange.emit(false);
  }

  /**
   *
   * @param linkObj
   */
  navigateToChat(linkObj: NavigateToChat) {
    const chatType = linkObj.is_consultant ? 'client' : 'consultant';
    this.router.navigate([
      this.$storeService.currentLanguage,
      'cabinet',
      chatType,
      'chat',
      linkObj.link,
    ]);
    this.markAsRead(linkObj.id, linkObj.link);
    this.closeDrawer.emit();
    this.cd.markForCheck();
  }

  /**
   *
   * @param resumeId
   * @param id
   */
  navigateToResume(obj: NavigateToResume) {
    this.router.navigate([
      this.$storeService.currentLanguage,
      'cabinet',
      'consultant',
      'resume',
      obj.resumeId,
    ]);
    this.markAsRead(obj.id);
    this.closeDrawer.emit();
  }

  /**
   *
   * @param applicationId
   * @param id
   */
  navigateToPrivate(obj: Response) {
    this.router.navigate([
      this.$storeService.currentLanguage,
      'cabinet',
      'consultant',
      'search',
      obj.link,
    ]);
    this.markAsRead(obj.id);
    this.closeDrawer.emit();
  }

  /**
   *
   * @param applicationId
   * @param id
   */
  navigateToResponses(obj: Response) {
    this.router.navigate([
      this.$storeService.currentLanguage,
      'cabinet',
      'client',
      'applications',
      obj.link,
    ]);
    this.markAsRead(obj.id);
    this.closeDrawer.emit();
  }

  /**
   *
   * @param id
   */
  navigateToSearchApplications(id: number) {
    this.router.navigate([
      this.$storeService.currentLanguage,
      'cabinet',
      'consultant',
      'search',
    ]);
    this.markAsRead(id);
    this.closeDrawer.emit();
  }

  /**
   *
   * @param applicationId
   * @param id
   */
  navigateToPrivateResponses(obj: NavigateToPrivate) {
    this.router.navigate([
      this.$storeService.currentLanguage,
      'cabinet',
      'client',
      'chat',
      obj.link,
    ]);
    this.markAsRead(obj.id);
    this.closeDrawer.emit();
  }

  /**
   *
   * @param id
   * @param e
   */
  deleteNotificationById(id: number, e?: Event) {
    this.$notifications.deleteNotificationById(id).subscribe(() => {
      this.messagePack = this.messagePack.filter((el) => el.id !== id);
      const unreadCount = this.messagePack.filter((el) => el.showed == false);
      console.log(unreadCount);

      this.handleNotificationCount.emit({ id });
      this.cd.markForCheck();
    });
    if (e) {
      e.stopPropagation();
    }
  }
}

// <ul class="notification__list" *ngIf="messagePack.length; else empty">
// <!-- NOTIFICATION TYPE MESSAGE -->
// <li
//   class="notification__list__item"
//   *ngFor="let notification of messagePack; let isLast = last"
// >
//   <div [ngSwitch]="notification.type">
//     <!-- NOTIFICATION TYPE MESSAGE -->
//     <div *ngSwitchCase="'message'">
//       <az-message-type
//         [notification]="notification"
//         [isLast]="isLast"
//         (navigateToChat)="navigateToChat($event)"
//       ></az-message-type>
//     </div>

//     <!-- NOTIFICATION TYPE RESUME -->
//     <div *ngSwitchCase="'resume'">
//       <az-resume
//         [notification]="notification"
//         [isLast]="isLast"
//         (navigateToResume)="navigateToResume($event)"
//       ></az-resume>
//     </div>

//     <!-- NOTIFICATION TYPE PRIVATE APPLICATION -->
//     <div *ngSwitchCase="'private_application'">
//       <az-private-application-type
//         [notification]="notification"
//         [isLast]="isLast"
//         (navigateToPrivateApplication)="navigateToPrivate($event)"
//         (navigateToChat)="navigateToChat($event)"
//       ></az-private-application-type>
//     </div>

//     <!-- NOTIFICATION APPLICATION BLOCK TYPE -->
//     <div *ngSwitchCase="'application'">
//       <az-blocked-application-type
//         [notification]="notification"
//         [isLast]="isLast"
//       ></az-blocked-application-type>
//     </div>

//     <!-- NOTIFICATEION CANCEL PRIVATE BLOCK -->
//     <div *ngSwitchCase="'cancel_private_application'">
//       <az-private-application-type
//         [cancelPrivate]="true"
//         [notification]="notification"
//         [isLast]="isLast"
//         (navigateToPrivateApplication)="navigateToResponses($event)"
//         (navigateToChat)="navigateToChat($event)"
//       ></az-private-application-type>
//     </div>

//     <!-- NOTIFICATEION NEW APPLICATION COUNT -->
//     <div *ngSwitchCase="'new_applications_count'">
//       <az-applications-count
//         [notification]="notification"
//         [isLast]="isLast"
//         (navigateToSearchApplications)="
//           navigateToSearchApplications($event)
//         "
//       ></az-applications-count>
//     </div>

//     <!-- NOTIFICATION TYPE RESPONSE -->
//     <div *ngSwitchCase="'response'">
//       <az-response-type
//         [notification]="notification"
//         [isLast]="isLast"
//         (navigateToResume)="navigateToResponses($event)"
//       ></az-response-type>
//     </div>

//     <!-- NOTIFICATION PRIVATE RESPONSE -->
//     <div *ngSwitchCase="'private_response'">
//       <az-response-type
//         [notification]="notification"
//         [isLast]="isLast"
//         (navigateToResume)="navigateToPrivateResponses($event)"
//       ></az-response-type>
//     </div>

//     <!-- NOTIFICATION WARNING TYPE -->
//     <div *ngSwitchCase="'warning_private_application'">
//       <az-warning-type
//         [notification]="notification"
//         [isLast]="isLast"
//         (navigateToPrivateChat)="navigateToPrivate($event)"
//       ></az-warning-type>
//     </div>

//     <!-- NOTIFICATION REMEMBER TYPE -->
//     <div *ngSwitchCase="'remember'">
//       <az-remember-type
//         [notification]="notification"
//         [isLast]="isLast"
//         (navigateToChat)="navigateToChat($event)"
//       ></az-remember-type>
//     </div>
//     <!-- NOTIFICATION PAYMENT TYPE -->
//     <div *ngSwitchCase="'payment'">
//       <az-payment-type
//         [notification]="notification"
//         [isLast]="isLast"
//         (navigateToChat)="navigateToChat($event)"
//       ></az-payment-type>
//     </div>
//   </div>
// </li>
// <!-- ------------------------- -->
// </ul>
