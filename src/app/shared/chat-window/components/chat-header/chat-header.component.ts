import { NgClass, NgIf } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { SvgModule } from '../../../svg/svg.module';
import { UserComponent } from '../user/user.component';
import { Application } from '../../../models/application.interface';
import { TranslateModule } from '@ngx-translate/core';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzIconModule } from 'ng-zorro-antd/icon';

export interface UserData {
  profileId: number;
  fullName: string;
}

@Component({
  selector: 'az-chat-header',
  templateUrl: './chat-header.component.html',
  styleUrls: ['./chat-header.component.less'],
  standalone: true,
  imports: [
    NgClass,
    RouterLink,
    NgIf,
    SvgModule,
    UserComponent,
    TranslateModule,
    NzToolTipModule,
    NzIconModule,
  ],
})
export class ChatHeaderComponent {
  /**
   *
   */
  @Input()
  isMobileDevice!: boolean;

  /**
   *
   */
  @Input()
  isClient!: boolean;

  /**
   *
   */
  @Input()
  application!: Application;

  /**
   *
   */
  @Input()
  applicationStatus!: number;

  /**
   *
   */
  @Input()
  waiting!: number;

  /**
   *
   */
  @Input()
  waitingNotificate!: number;

  /**
   *
   */
  @Input()
  joinedUser!: boolean;

  /**
   *
   */
  @Input()
  isStreaming!: boolean;

  /**
   *
   */
  @Input()
  notificateForReady!: boolean;

  /**
   *
   */
  @Input()
  liveIsStreaming!: boolean;

  /**
   *
   */
  @Input()
  sendInvite!: boolean;

  /**
   *
   */
  @Output()
  startCall = new EventEmitter<UserData>();

  /**
   *
   */
  @Output()
  invite = new EventEmitter();

  /**
   *
   */
  @Output()
  readyToConsult = new EventEmitter();

  /**
   *
   */
  cameraPermission = false;

  /**
   *
   */
  micPermission = false;

  /**
   *
   */
  notPermission = false;

  /**
   *
   */
  notFound = false;

  /**
   *
   */
  mediaError = false;
  /**
   *
   * @param cd
   */
  constructor(private cd: ChangeDetectorRef) {
    this.getMedia();
  }

  /**
   *
   * @param constraints
   */
  async getMedia() {
    let mediaStream;
    try {
      const constraints = { audio: true, video: true };
      mediaStream = await navigator.mediaDevices.getUserMedia(constraints);

      // Check the camera and microphone permissions
      this.checkMediaPermissions('camera');
      this.checkMediaPermissions('microphone');
    } catch (ex) {
      if (ex instanceof DOMException) {
        if (ex.name === 'NotAllowedError') {
          this.notPermission = true;
        } else if (ex.name === 'NotFoundError') {
          this.notFound = true;
        } else {
          this.mediaError = true;
        }
      }
    }
  }

  /**
   *
   * @param name
   */
  private checkMediaPermissions(name: string) {
    navigator.permissions
      .query({ name: name as PermissionName })
      .then((result) => {
        if (result.state === 'granted') {
          if (name === 'camera') {
            this.cameraPermission = true;
            this.cd.markForCheck();
            return;
          }
          this.micPermission = true;
          this.cd.markForCheck();
        }
      });
  }
}
