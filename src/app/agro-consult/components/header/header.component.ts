import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Select, Store } from '@ngxs/store';
import {
  AuthorizedUserModel,
  AuthState,
  DataState,
  NgDestroy,
  CheckHasResume,
  UserInfo,
  OAuthService,
  CheckHasResumeAction,
  UserInfoAction,
  StoreService,
} from 'ngx-az-core';
import { filter, Observable, takeUntil } from 'rxjs';
import { Notification } from './models/notification.interface';
import { NotificationsService } from './service/notifications.service';

@Component({
  selector: 'az-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  providers: [NgDestroy],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  /**
   *
   */
  visiblePopover = false;

  /**
   *
   */
  visibleNotificationPopover = false;

  /**
   *
   */
  drawerVisible = false;

  /**
   *
   */
  profileId!: number;

  /**
   *
   */
  liveNotification!: Notification[];

  /**
   *
   */
  liveNotificationMapped: any[] = [];

  /**
   *
   */
  messagePack: Notification[] = [];

  /**
   *
   */
  notifications$!: Observable<Notification[]>;

  /**
   *
   */
  @Select(AuthState.authorizedUser)
  authorizedUser$!: Observable<AuthorizedUserModel>;

  /**
   *
   */
  @Select(DataState.checkHasResume)
  checkHasResume$!: Observable<CheckHasResume>;

  /**
   *
   */
  @Select(DataState.getUserInfo)
  userInfo$!: Observable<UserInfo | null>;

  /**
   *
   */
  get isUserAuthetificate() {
    return !this.$jwtHelper.isTokenExpired();
  }

  /**
   *
   */
  messagesByLink = new Map();

  /**
   *
   */
  chatId: number | null = null;

  /**
   *
   */
  notificateionDrawerVisible = false;

  /**
   *
   */
  userDrawerVisible = false;

  /**
   *
   */
  isMobileSize = false;

  /**
   *
   */
  notificationCount!: number;

  clientNotifications!: Notification[];
  consultantNotifications!: Notification[];

  /**
   *
   * @param $jwtHelper
   * @param document
   * @param $notifications
   * @param router
   * @param $store
   * @param cd
   * @param $destroy
   */
  constructor(
    private $jwtHelper: JwtHelperService,
    private $oAuth: OAuthService,
    private $notifications: NotificationsService,
    private router: Router,
    private $store: Store,
    private $storeService: StoreService,
    private cd: ChangeDetectorRef,
    private $destroy: NgDestroy
  ) {
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => {
        this.chatId = null;
        const urlsData = this.router.url.split('/');
        if (urlsData.includes('chat')) {
          const chatId = Number(urlsData[urlsData.length - 1]);
          if (!isNaN(chatId)) {
            this.chatId = chatId;
          }
        }
        this.cd.markForCheck();
      });

    if (!$jwtHelper.isTokenExpired()) {
      this.dispatchCheckHasResume();
      this.dispatchUserInfo();
    }
  }

  /**
   *
   */
  private filterNitificationByRole() {
    this.clientNotifications = this.messagePack.filter((e) => !e.is_consultant);
    this.consultantNotifications = this.messagePack.filter(
      (e) => e.is_consultant
    );
  }

  /**
   *
   */
  private getNotifications() {
    this.$notifications
      .getNotifications()
      .pipe(takeUntil(this.$destroy))
      .subscribe((result) => {
        if (result) {
          const notification = result.data;

          for (let index = notification.length - 1; index >= 0; index--) {
            const message = notification[index];
            this.setMessageToMap(message);
          }
          this.messagePack = [...this.messagePack];
          this.filterNitificationByRole();
          this.computeNotificationCount();
          this.cd.markForCheck();
        }
      });
  }

  /**
   *
   */
  private getUserInfo() {
    this.userInfo$.pipe(takeUntil(this.$destroy)).subscribe((result) => {
      if (result) {
        this.getNotifications();
        this.profileId = result.profile.id;
        this.$notifications.listenNotificationChannel(this.profileId);
      }
    });
  }

  /**
   *
   */
  private computeNotificationCount() {
    this.notificationCount = this.messagePack.filter(
      (el) => el.showed === false
    ).length;
  }

  /**
   *
   */
  private dispatchCheckHasResume() {
    this.$store.dispatch(new CheckHasResumeAction());
  }

  /**
   *
   */
  private dispatchUserInfo() {
    this.$store.dispatch(new UserInfoAction());
  }

  /**
   *
   */
  ngOnInit() {
    if (window.innerWidth < 575) {
      this.isMobileSize = true;
    }

    this.getUserInfo();
    this.getLiveNotification();
    this.cd.markForCheck();
  }

  /**
   * NAVIGATE TO SIGN-IN SCREEN
   */
  navigateToSignIn() {
    this.$oAuth.setDocumentHrefBySignInHref();
  }

  /**
   *
   * @param isConsultant
   * @param chatId
   * @param id
   */
  navigateToChat(isConsultant: boolean | null, chatId: number, id: number) {
    const chatType = isConsultant ? 'client' : 'consultant';
    this.router.navigate([
      this.$storeService.currentLanguage,
      'cabinet',
      chatType,
      'chat',
      chatId,
    ]);
    this.markAsRead(id);
    this.visibleNotificationPopover = false;
  }

  /**
   *
   * @param count
   */
  handleNotificationCount(obj: { id: number; chatId?: number | undefined }) {
    this.$notifications.markAsCheckedNotificationById(obj.id).subscribe(() => {
      this.messagePack.forEach((notice) => {
        if (notice.id === obj.id || notice.link === obj.chatId) {
          notice.showed = true;
        }
      });

      this.computeNotificationCount();
      this.cd.markForCheck();
    });
    this.cd.markForCheck();
  }

  /**
   *
   * @param id
   */
  markAsRead(id: number, chatId?: number) {
    this.$notifications.markAsCheckedNotificationById(id).subscribe(() => {
      this.messagePack.forEach((notice) => {
        if (notice.link === chatId) {
          notice.showed = true;
        }
      });
      this.computeNotificationCount();

      this.cd.markForCheck();
    });
    this.visibleNotificationPopover = false;
  }

  /**
   *
   */
  clearNotification() {
    this.$notifications
      .markAllAsRead()
      .pipe(takeUntil(this.$destroy))
      .subscribe(() => {
        this.messagePack = [];
        this.filterNitificationByRole();
        this.notificationCount = 0;
        this.cd.markForCheck();
      });
  }

  /**
   *
   * @param resumeId
   * @param id
   */
  navigateToResume(resumeId: number, id: number) {
    this.router.navigate([
      this.$storeService.currentLanguage,
      'cabinet',
      'consultant',
      'resume',
      resumeId,
    ]);
    this.markAsRead(id);
    this.visibleNotificationPopover = false;
  }

  /**
   *
   * @param applicationId
   * @param id
   */
  navigateToPrivate(applicationId: number, id: number) {
    this.router.navigate([
      this.$storeService.currentLanguage,
      'cabinet',
      'consultant',
      'search',
      applicationId,
    ]);
    this.markAsRead(id);
    this.visibleNotificationPopover = false;
  }

  /**
   *
   * @param applicationId
   * @param id
   */
  navigateToResponses(applicationId: number, id: number) {
    this.router.navigate([
      this.$storeService.currentLanguage,
      'cabinet',
      'client',
      'applications',
      applicationId,
    ]);
    this.markAsRead(id);
    this.visibleNotificationPopover = false;
  }

  /**
   *
   * @param applicationId
   * @param id
   */
  navigateToPrivateResponses(applicationId: number, id: number) {
    this.router.navigate([
      this.$storeService.currentLanguage,
      'cabinet',
      'client',
      'chat',
      applicationId,
    ]);
    this.markAsRead(id);
    this.visibleNotificationPopover = false;
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
    this.visibleNotificationPopover = false;
  }

  /**
   *
   */
  closeDrawer() {
    this.drawerVisible = false;
  }

  /**
   *
   */
  openDrawer() {
    this.drawerVisible = true;
  }

  /**
   *
   * @param message
   */
  private setMessageToMap(message: any) {
    if (message.type !== 'message') {
      this.messagePack.unshift(message);
    } else {
      const obj = {
        ...message,
        count: 1,
      };

      if (
        typeof this.chatId === 'number' &&
        !obj.showed &&
        obj.link === this.chatId
      ) {
        this.markAsRead(obj.id, obj.link);
        return;
      }

      const m = this.messagePack.find((w) => w.link === obj.link);
      if (m) {
        m.count += 1;
        if (!obj.showed) {
          m.showed = false;
          this.computeNotificationCount();
        }
        return;
      }
      this.messagePack.unshift(obj);
    }
    this.filterNitificationByRole();
    this.computeNotificationCount();
    this.cd.markForCheck();
  }

  /**
   *
   */
  getLiveNotification() {
    this.$notifications.getLiveNotification().subscribe((notification) => {
      if (notification) {
        const liveNotification: Notification = {
          created_at: notification.notification.created_at,
          updated_at: notification.notification.updated_at,
          id: notification.notification.id,
          type: notification.notification.type,
          description: notification.notification.description,
          link: notification.notification.link,
          profile_id: notification.notification.profile_id,
          showed: notification.notification.showed,
          text: notification.notification.text,
          data: notification.notification.data,
          is_consultant: notification.notification.is_consultant,
          count: notification.notification.count,
        };

        this.addNotification(liveNotification);
      }
    });
  }

  /**
   *
   * @param liveNotification
   */
  addNotification(liveNotification: Notification) {
    this.setMessageToMap(liveNotification);
    this.cd.markForCheck();
  }

  /**
   *
   */
  closeNotificationDrawer() {
    this.notificateionDrawerVisible = false;
    this.cd.markForCheck();
  }

  /**
   *
   * @param e
   */
  onResize(e: any) {
    if (e.target.innerWidth < 576) {
      this.isMobileSize = true;
      this.cd.markForCheck();
      return;
    }
    this.isMobileSize = false;
    this.cd.markForCheck();
  }

  /**
   *
   */
  opennotificationDrawer() {
    this.notificateionDrawerVisible = true;
    this.cd.markForCheck();
  }

  /**
   *
   */
  openUserDrawer() {
    this.userDrawerVisible = true;
  }

  /**
   *
   */
  closeUserDrawer() {
    this.userDrawerVisible = false;
  }
}
