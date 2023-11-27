import { ListenStreamingUser } from './services/listen-streaming-user.service';
import { InviteToChatService } from './services/invite-to-chat.service';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, Subscription, takeUntil } from 'rxjs';
import { Application } from '../models/application.interface';
import { ClientChatListService } from '../services/client-chat-list.service';
import { TranslateService } from '@ngx-translate/core';
import { VideoCallService } from '../services/video-call.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Select } from '@ngxs/store';
import { DataState, UserInfo, NgDestroy } from 'ngx-az-core';
import { UserData } from './components/chat-header/chat-header.component';
import { HttpParams } from '@angular/common/http';
import { ChatMessageService } from '../services/chat-message.service';

@Component({
  selector: 'az-common-chat-window',
  templateUrl: './common-chat-window.component.html',
  styleUrls: ['./common-chat-window.component.less'],
  providers: [NgDestroy],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CommonChatWindowComponent implements OnInit, OnDestroy {
  /**
   *
   */
  private _authuserid!: number;
  public get authuserid(): number {
    return this._authuserid;
  }
  public set authuserid(v: number) {
    this._authuserid = v;
    this.$videoCall.authuserid$.next(v);
  }

  /**
   *
   */
  private _profileId!: number;
  public get profileId(): number {
    return this._profileId;
  }
  public set profileId(v: number) {
    this._profileId = v;
    this.$videoCall.profileId$.next(v);
  }

  /**
   *
   */
  isClient!: boolean;

  /**
   *
   */
  private _application$!: Observable<Application>;
  public get application$(): Observable<Application> {
    return this._application$;
  }
  public set application$(v: Observable<Application>) {
    this._application$ = v;
    v.subscribe(this.$videoCall.application$);
  }

  /**
   *
   */
  private _id?: string;
  public get id(): string | undefined {
    return this._id;
  }
  public set id(v: string | undefined) {
    this._id = v;
    this.$videoCall.id$.next(v);
  }

  /**
   *
   */
  applicationStatus!: number;

  /**
   *
   */
  joinedUser = false;

  /**
   *
   */
  sendInvite = false;

  /**
   *
   */
  notificateForReady = false;

  /**
   *
   */
  waiting = 30;

  /**
   *
   */
  waitingNotificate = 30;

  /**
   *
   */
  interval!: any;

  /**
   *
   */
  isStreaming = false;

  /**
   *
   */
  liveIsStreaming!: boolean;

  /**
   *
   */
  sb!: Subscription;

  /**
   *
   */
  @Select(DataState.getUserInfo)
  userInfo$!: Observable<UserInfo | null>;

  /**
   *
   */
  isMobileDevice = false;

  /**
   *
   */
  subStream!: Subscription;

  /**
   *
   */
  chatId!: string;


  /**
   *
   * @param $application
   * @param $videoCall
   * @param route
   * @param router
   * @param cd
   * @param $destroy
   * @param $invite
   * @param translate
   * @param $streamingUser
   * @param notification
   */
  constructor(
    private $application: ClientChatListService,
    private $videoCall: VideoCallService,
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef,
    private $destroy: NgDestroy,
    private $invite: InviteToChatService,
    private translate: TranslateService,
    private $streamingUser: ListenStreamingUser,
    private notification: NzNotificationService,
    private $message: ChatMessageService
  ) {
    this.route.params.subscribe((param) => {
      this.id = param['id'];
      this.getApplicationInfo(param['id']);
      cd.markForCheck();
    });

    this.isClient = this.router.url.split('/').includes('client');

    $videoCall.listenJoinedUsers$
      .pipe(takeUntil($destroy))
      .subscribe((w) => this.listenJoinedUsers(w));

    $videoCall.isStreamingHandler$.pipe(takeUntil($destroy)).subscribe((w) => {
      this.isStreaming = w;
      cd.markForCheck();
    });

    if (this.route.snapshot.fragment) {
      this.isMobileDevice = true;
      cd.markForCheck();
    }

    if (router.url.split('/').includes('chat')) {
      this.chatId = router.url.split('/')[5];
    }
  }

  /**
   *
   */
  private getUserIds() {
    this.userInfo$.pipe(takeUntil(this.$destroy)).subscribe((result) => {
      if (result) {
        this.authuserid = result.id;
        this.profileId = result.profile.id;
        this.$invite.listenJoinedUser(result.profile.id);
        this.getLiveJoiningUser();
      }
    });
  }

  /**
   *
   */
  ngOnInit() {
    this.$videoCall.joinToChannel$.next(undefined);
    if (this.id) {
      this.getUserIds();
      this.$streamingUser.listenStreamingUserChannel(this.id);
      this.checkIsStreaming();
    }
  }

  /**
   *
   */
  getLiveJoiningUser() {
    this.sb = this.$invite
      .handleLiveJoiningUser()
      .pipe(takeUntil(this.$destroy))
      .subscribe((join) => {
        if (join) {
          this.createMessage(join.data.type, join.data.fullname);
        }
      });
  }

  /**
   *
   * @param type
   * @param userName
   */
  createMessage(type: string, userName: string): void {
    const messageType = type === 'accept' ? 'success' : 'error';
    if (messageType === 'success') {
      this.notification.create(
        messageType,
        this.translate.instant('notifications'),
        this.translate.instant('joinToChat', { userName: userName })
      );
    } else {
      this.notification.create(
        messageType,
        this.translate.instant('notifications'),
        this.translate.instant('deniedInvite', { userName: userName })
      );
    }
  }

  /**
   *
   * @param id
   */
  getApplicationInfo(id: string) {
    this.application$ = this.$application
      .getChatInfoById(id)
      .pipe(map((result) => result.data));
  }

  /**
   *
   */
  applicationStatusChange() {
    if (this.id) {
      this.getApplicationInfo(this.id);
      this.cd.markForCheck();
    }
  }

  /**
   *
   * @param status
   */
  setStatusFromListener(status: number) {
    this.applicationStatus = status;
    this.cd.markForCheck();
  }

  /**
   *
   */
  inviteUser() {
    if (this.id) {
      this.$invite
        .inviteToChat(this.id, 'invite')
        .pipe(takeUntil(this.$destroy))
        .subscribe();
      this.sendInvite = true;

      this.interval = setInterval(() => {
        this.waiting = this.waiting - 1;
        if (this.waiting === 0) {
          clearInterval(this.interval);
          this.sendInvite = false;
          this.waiting = 30;
        }
        this.cd.markForCheck();
      }, 1000);
      this.cd.markForCheck();
    }
  }

  /**
   *
   */
  informConsultantAboutReady() {
    // TODO
    if (this.id) {
      this.$invite
        .inviteToChat(this.id, 'remember')
        .pipe(takeUntil(this.$destroy))
        .subscribe();
      this.notificateForReady = true;

      this.interval = setInterval(() => {
        this.waitingNotificate = this.waitingNotificate - 1;
        if (this.waitingNotificate === 0) {
          clearInterval(this.interval);
          this.notificateForReady = false;
          this.waitingNotificate = 30;
        }
        this.cd.markForCheck();
      }, 1000);
      this.cd.markForCheck();
    }
  }

  /**
   *
   * @param isJoined
   */
  listenJoinedUsers(isJoined: boolean) {
    console.log('isJoined', isJoined);
    console.log('this.joinedUser', this.joinedUser);

    this.joinedUser = isJoined;
    this.setDefaultInviteSettings();
    this.cd.markForCheck();
  }

  /**
   *
   */
  private setDefaultInviteSettings() {
    clearInterval(this.interval);
    this.sendInvite = false;
    this.waiting = 30;
    this.cd.markForCheck();
  }

  /**
   *
   * @param profileId
   * @param fullName
   */
  placeVideoCall(userInfo: UserData) {
    this.$videoCall.placeVideoCall$.next({
      profileId: userInfo.profileId,
      fullName: userInfo.fullName,
    });
  }

  /**
   *
   */
  checkIsStreaming() {
    this.subStream = this.$streamingUser
      .checkStreamingUser()
      .subscribe((streaming) => {
        if (streaming) {
          this.liveIsStreaming = streaming.is_stream;
          this.cd.markForCheck();
        }
      });
  }

  /**
   *
   */
  ngOnDestroy() {
    if (this.id) {
      this.setDefaultInviteSettings();
      this.$invite.leaveJoinedUser(this.profileId);
      this.$streamingUser.leaveStreamingUserChanel(this.id);

      // ОТМЕЧАЕТ ВСЕ СООБЩЕНИЯ КАК ПРОЧИТАННОЕ
      const param = new HttpParams().append('chat_id', this.chatId);
      this.$message
        .getMessages(param)
        .pipe(takeUntil(this.$destroy))
        .subscribe();
    }

    if (this.sb) {
      this.sb.unsubscribe();
      this.subStream.unsubscribe();
    }
  }
}
