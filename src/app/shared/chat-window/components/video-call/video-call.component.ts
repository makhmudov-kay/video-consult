import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Instance } from 'simple-peer';
import Echo from 'laravel-echo';
import { VideoCallService } from '../../../services/video-call.service';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NgDestroy, SharedModule } from 'ngx-az-core';
import { SvgModule } from '../../../svg/svg.module';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription, filter, takeUntil } from 'rxjs';
import { RtcstreamService } from './services/rtcstream.service';
import { ListenStreamingUser } from '../../services/listen-streaming-user.service';

@Component({
  selector: 'az-video-call',
  standalone: true,
  imports: [SharedModule, NzAvatarModule, SvgModule, NzNotificationModule],
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.less'],
  providers: [NgDestroy],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoCallComponent implements OnInit, OnDestroy {
  /**
   *
   */
  @Input()
  authuserid!: number | null;

  /**
   *
   */
  @Input()
  profileId!: number | null;

  /**
   *
   */
  @Input()
  id?: string | null;

  /**
   *
   */
  @Input()
  fullname!: string;

  /**
   *
   */
  @Input()
  avatar!: string;

  /**
   *
   */
  @Output()
  joinedUserChange = new EventEmitter<boolean>();

  /**
   *
   */
  @Output()
  isStreamingHandler = new EventEmitter<boolean>();

  /**
   *
   */
  @ViewChild('videoBlock', { read: ElementRef, static: true })
  videoBlock!: ElementRef;

  /**
   *
   */
  @ViewChild('userVideo', { read: ElementRef, static: true })
  userVideo!: ElementRef;

  /**
   *
   */
  @ViewChild('partnerVideo', { read: ElementRef })
  partnerVideo!: ElementRef;

  /**
   *
   */
  @ViewChild('waitingCall', { read: ElementRef })
  waitingCall!: ElementRef;

  /**
   *
   */
  @ViewChild('incomingCall', { read: ElementRef })
  incomingCall!: ElementRef;

  /**
   * Video call params
   */
  callPartner!: string;
  mutedAudio = false;
  mutedVideo = false;
  videoCallParams = {
    users: [] as any[],
    stream: null as any,
    receivingCall: false,
    caller: null as any,
    callAccepted: false,
    channel: null as any,
  };

  /**
   *
   */
  smallScreen = false;

  /**
   *
   */
  minimalScreen = false;

  /**
   *
   */
  isConnected = false;

  /**
   *
   */
  reconnecting = false;

  /**
   *
   */
  isStreaming = false;

  /**
   *
   */
  connectionError = false;

  /**
   *
   */
  isDeclined = false;

  /**
   *
   */
  partnerAvatar!: string;

  /**
   *
   */
  partnerFullName!: string;

  /**
   *
   */
  deviceNotFound = false;

  /**
   *
   */
  subStream!: Subscription;

  /**
   *
   */
  cameraSwitcher = false;

  /**
   *
   * @param cd
   * @param $videoCall
   * @param router
   * @param $destroy
   * @param stream
   * @param $streamingUser
   */
  constructor(
    private cd: ChangeDetectorRef,
    private $videoCall: VideoCallService,
    private router: Router,
    private $destroy: NgDestroy,
    private stream: RtcstreamService,
    private $streamingUser: ListenStreamingUser
  ) {
    this.setupVideoCallSubscription();
    this.setupRouterEventsSubscription();
    this.setupJoinToChannelSubscription();
  }

  /**
   *
   */
  private setupVideoCallSubscription() {
    this.$videoCall.placeVideoCall$.subscribe((w) => {
      if (w) {
        this.placeVideoCall(w.profileId, w.fullName);
      }
    });
  }

  /**
   *
   */
  private setupRouterEventsSubscription() {
    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        takeUntil(this.$destroy)
      )
      .subscribe(() => {
        if (!this.isStreaming) {
          (window as any).Echo.leave(`presence-video-channel.${this.id}`);
        }
        this.cd.markForCheck();
      });
  }

  /**
   *
   */
  private setupJoinToChannelSubscription() {
    this.$videoCall.joinToChannel$.subscribe((w) => {
      if (w === undefined && this.id) {
        this.initializeChannel();
        this.initializeCallListeners();
      }
    });
  }

  /**
   *
   */
  private handleJoinedUser(status: boolean) {
    this.joinedUserChange.emit(status);
    this.cd.markForCheck();
  }

  /**
   *
   */
  ngOnInit() {
    if (this.id) {
      // Сброс звонка если сеанс не был завершен ранее, при тех ситуациях если у 2х пользователей за раз оборвалась свзяь или обновили страницу, отключили свет, отключили интернет
      this.handleEndCall();
      this.initializeChannel();
      this.$streamingUser.listenStreamingUserChannel(this.id);
      this.initializeCallListeners();
      this.checkIsStreaming();
    }
  }

  /**
   * Инициализация канала вход в канал
   */
  initializeChannel() {
    this.videoCallParams.channel = (window as any).Echo.join(
      `video-channel.${this.id}`
    );
  }

  /**
   *
   */
  checkIsStreaming() {
    this.subStream = this.$streamingUser
      .checkStreamingUser()
      .subscribe((streaming) => {
        if (streaming) {
          this.stream.options.appId = streaming.data.appID;
          this.stream.options.channel = `channel-${streaming.chat_id}`;
          this.stream.options.token = streaming.data.token;
          this.cd.markForCheck();
        }
      });
  }

  /**
   *
   * @param user
   */
  async reconnectCall(user: any) {
    this.placeVideoCall(user.id, this.fullname);
  }

  /**
   * инициализация пользователей в канале показывает сколько пользователей в канале находятся и кто вошел или вышел
   */
  initializeCallListeners() {
    this.subscribeToHereEvent();
    this.subscribeToJoinEvent();
    this.subscribeToLeavingEvent();
    this.subscribeToListenEvent();
  }

  /**
   *
   */
  private subscribeToHereEvent() {
    this.videoCallParams.channel.here((users: any) => {
      console.log('here', users);

      this.videoCallParams.users = users;
      if (users.length > 1) {
        this.handleJoinedUser(true);
      }
    });
  }

  /**
   *
   */
  private subscribeToJoinEvent() {
    this.videoCallParams.channel.joining((user: any) => {
      console.log('joining', user);
      const joiningUserIndex = this.videoCallParams.users.findIndex(
        (data: any) => data.id === user.id
      );

      this.handleJoinedUser(true);

      // Переподключеие после обновления страницы если шел разговор
      if (this.isStreaming) {
        setTimeout(() => {
          this.reconnecting = true;
          this.handleEndCall(true);
          this.reconnectCall(user);
        }, 1000);
      }

      if (joiningUserIndex < 0) {
        this.videoCallParams.users.push(user);
      }
    });
  }

  /**
   *
   */
  private subscribeToLeavingEvent() {
    this.videoCallParams.channel.leaving((user: any) => {
      console.log('leaving', user);
      this.reconnecting = true;
      this.videoCallParams.callAccepted = false;
      const leavingUserIndex = this.videoCallParams.users.findIndex(
        (data) => data.id === user.id
      );

      this.handleJoinedUser(false);
      this.videoCallParams.users.splice(leavingUserIndex, 1);
      this.cd.markForCheck();
    });
  }

  /**
   *
   */
  private subscribeToListenEvent() {
    this.videoCallParams.channel.listen('.video-event', ({ data }: any) => {
      // событие входящего звонка
      if (data.type === 'incomingCall') {
        // add a new line to the sdp to take care of error
        this.incomingTypeHandler(data);
      }

      if (data.type === 'callAccepted') {
        if (this.videoCallParams.receivingCall) {
          this.acceptedCallListener();
        }
      }

      if (data.type === 'decline') {
        this.clickEndCall();
      }

      // событие отключения
      if (data.type === 'disconnect') {
        this.discconnectTypeHandler();
      }

      // событие отмены звонка
      if (data.type === 'decline') {
        this.isDeclined = true;
      }
    });
  }

  /**
   *
   * @param data
   */
  private incomingTypeHandler(data: any) {
    this.videoCallParams.receivingCall = true;
    this.videoCallParams.caller = data.from;
    this.partnerAvatar = data.avatar;
    this.partnerFullName = data.fullname;
    this.fullname = data.fullname;

    if (data.userToCall === this.authuserid) {
      this.incomingCall.nativeElement.play();
    }
    this.cd.markForCheck();
  }

  /**
   *
   */
  private discconnectTypeHandler() {
    this.isStreaming = false;
    this.videoCallParams.receivingCall = false;
    this.videoCallParams.callAccepted = false;
    this.handleEndCall();
    this.cd.markForCheck();
  }

  /**
   *
   */
  resize() {
    this.smallScreen = !this.smallScreen;
    this.cd.markForCheck();
  }

  /**
   *
   */
  minimize() {
    this.minimalScreen = !this.minimalScreen;
    this.cd.markForCheck();
  }

  /**
   *remove inside
   */
  toggleMuteAudio() {
    this.mutedAudio = this.stream.toggleMutedAudio();
    this.cd.markForCheck();
  }

  /**
   * remove  inside
   */
  toggleMuteVideo() {
    this.mutedVideo = this.stream.toggleHideVideo();
    this.cd.markForCheck();
  }

  /**
   *
   * @param id
   * @param name
   */
  async placeVideoCall(id: number, name: string) {
    this.updateStatusAfterStartCall(name);
    this.muteMediaDevices();
    this.startCallHandler(id);
  }

  /**
   *
   * @param id
   */
  private startCallHandler(id: number) {
    const callToUserData = {
      user_to_call: id,
      chat_id: Number(this.id),
    };

    this.$videoCall
      .callToUser(callToUserData)
      .pipe(takeUntil(this.$destroy))
      .subscribe(async () => {
        await this.startVideoStream();
      });
  }

  /**
   * start video stream
   */
  private async startVideoStream() {
    const rtcDetails = await this.stream.generateTokenAndUid();
    this.stream.createRTCClient();
    this.stream.agoraServerEvents(this.stream.rtc);
    await this.stream.localUser(rtcDetails.token);
    this.cd.markForCheck();
  }

  /**
   *
   * @param name
   */
  private updateStatusAfterStartCall(name: string) {
    this.callPartner = name;
    this.isConnected = false;
    this.isDeclined = false;
    this.isStreaming = true;
    this.isStreamingHandler.emit(true);
    if (this.waitingCall) {
      this.waitingCall.nativeElement.play();
    }
    this.cd.markForCheck();
  }

  /**
   *
   */
  private muteMediaDevices() {
    this.mutedVideo = false;
    this.mutedAudio = false;
    this.cd.markForCheck();
  }

  /**
   *
   */
  async acceptCall() {
    this.isStreaming = true;
    this.acceptedCallListener();
    this.acceptCallHandler();
  }

  /**
   *
   */
  private acceptCallHandler() {
    const acceptData = {
      to: this.videoCallParams.caller,
      chat_id: Number(this.id),
    };

    this.$videoCall
      .acceptCall(acceptData)
      .pipe(takeUntil(this.$destroy))
      .subscribe(async () => {
        this.startVideoStream();
      });
  }

  /**
   *
   */
  private acceptedCallListener() {
    this.videoCallParams.callAccepted = true;
    this.videoCallParams.receivingCall = false;
    this.reconnecting = false;
    this.isStreamingHandler.emit(true);
    this.isDeclined = false;
    this.muteMediaDevices();
    if (this.incomingCall) {
      this.incomingCall.nativeElement.currentTime = 0;
      this.incomingCall.nativeElement.pause();
    }
    this.cd.markForCheck();
  }

  /**
   *
   */
  declineCall() {
    this.resetSounds();
    this.videoCallParams.callAccepted = true;

    const declineData = {
      to: this.videoCallParams.caller,
      chat_id: Number(this.id),
    };

    this.$videoCall
      .declineCall(declineData)
      .pipe(takeUntil(this.$destroy))
      .subscribe(() => {
        this.updateStatusAfterDecline();
      });
  }

  /**
   *
   */
  private updateStatusAfterDecline() {
    this.handleEndCall();
    this.isConnected = true;
    this.isDeclined = true;
    this.videoCallParams.receivingCall = false;
    this.reconnecting = false;
    this.isStreaming = false;
    this.isStreamingHandler.emit(false);
    this.cd.markForCheck();
  }

  /**
   *
   */
  clickEndCall() {
    this.leaveCall();
    this.updateStreamingStatus(false);
    this.resetSounds();
    if (this.id) {
      this.leaveEchoChannel();
      this.$videoCall.disconectCall(this.id).subscribe(() => {
        this.reinitializeChannelAndCallListeners();
        this.cd.markForCheck();
      });
    }
  }

  /**
   *
   * @param reconnecting
   */
  handleEndCall(reconnecting = false) {
    this.leaveCall();
    this.handleStreamingState();
    this.updateStreamingStatus(reconnecting);
    this.resetSounds();
    this.leaveEchoChannel();
    this.reinitializeChannelAndCallListeners();
    this.cd.markForCheck();
  }

  /**
   *
   */
  private leaveCall() {
    this.stream.leaveCall();
  }

  /**
   *
   */
  private handleStreamingState() {
    if (this.id) {
      this.$videoCall
        .handleStreamingState(this.id)
        .pipe(takeUntil(this.$destroy))
        .subscribe();
    }
  }

  /**
   *
   * @param reconnecting
   */
  private updateStreamingStatus(reconnecting: boolean) {
    this.isStreaming = reconnecting;
    this.isStreamingHandler.emit(reconnecting);
    this.reconnecting = reconnecting;
  }

  /**
   *
   */
  private leaveEchoChannel() {
    (window as any).Echo.leave(`presence-video-channel.${this.id}`);
  }

  /**
   *
   */
  private reinitializeChannelAndCallListeners() {
    this.initializeChannel();
    this.initializeCallListeners();
  }

  /**
   *
   */
  private resetSounds() {
    this.resetCallAcceptedFlag();
    this.resetAudioElement(this.waitingCall);
    this.resetAudioElement(this.incomingCall);
  }

  /**
   *
   */
  private resetCallAcceptedFlag() {
    this.videoCallParams.callAccepted = false;
  }

  /**
   *
   * @param audioElement
   */
  private resetAudioElement(audioElement: ElementRef) {
    if (audioElement) {
      audioElement.nativeElement.currentTime = 0;
      audioElement.nativeElement.pause();
    }
  }

  /**
   *
   */
  ngOnDestroy() {
    if (this.id) {
      (window as any).Echo.leave(`presence-video-channel.${this.id}`);
    }

    if (this.subStream) {
      this.subStream.unsubscribe();
    }
  }

  /**
   *
   */
  screenCapture() {
    this.cameraSwitcher = !this.cameraSwitcher;

    if (this.cameraSwitcher) {
      this.stream.switchToScreenShare();
    } else {
      this.stream.switchToCamera();
    }

    this.cd.markForCheck();
  }
}
