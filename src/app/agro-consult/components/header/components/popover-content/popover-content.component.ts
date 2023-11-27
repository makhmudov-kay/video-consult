import { VideoCallService } from './../../../../../shared/services/video-call.service';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { AuthorizedUserModel, BaseAuthService } from 'ngx-az-core';
import { Observable } from 'rxjs';
import { InviteToChatService } from 'projects/agro-consult/src/app/shared/chat-window/services/invite-to-chat.service';

@Component({
  selector: 'az-popover-content',
  templateUrl: './popover-content.component.html',
  styleUrls: ['./popover-content.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopoverContentComponent {
  /**
   *
   */
  @Input()
  user!: Observable<AuthorizedUserModel>;

  /**
   *
   */
  @Input()
  profileId!: number;

  /**
   *
   */
  @Input()
  isDrawer!: boolean;

  /**
   *
   */
  @Output()
  visiblePopover = new EventEmitter();

  /**
   *
   */
  @Output()
  visibleDrawer = new EventEmitter();

  /**
   *
   * @param $baseAuth
   */
  constructor(
    private $baseAuth: BaseAuthService,
    private $videoCall: VideoCallService,
    private $invite: InviteToChatService
  ) {}

  /**
   *
   */
  logout() {
    this.$videoCall.id$.subscribe((id) => {
      (window as any).Echo.leave(`presence-video-channel.${id}`);
      this.$invite.leaveInviteToChannel(this.profileId);
    });
    this.$baseAuth.signOut();
  }
}
