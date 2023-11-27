import { transition, trigger, useAnimation } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { fadeOutRight, slideInRight } from 'ng-animate';
import { Invite } from '../../../shared/chat-window/models/invite';
import { Observable, takeUntil } from 'rxjs';
import { Select } from '@ngxs/store';
import { DataState, NgDestroy, StoreService, UserInfo } from 'ngx-az-core';
import { Router } from '@angular/router';
import { InviteToChatService } from '../../../shared/chat-window/services/invite-to-chat.service';

@Component({
  selector: 'az-invite-card',
  templateUrl: './invite-card.component.html',
  styleUrls: ['./invite-card.component.less'],
  providers: [NgDestroy],
  animations: [
    trigger('bounce', [
      transition(
        ':enter',
        useAnimation(slideInRight, {
          params: { timing: 0.2 },
        })
      ),
      transition(':leave', [
        useAnimation(fadeOutRight, {
          params: { timing: 0.2 },
        }),
      ]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InviteCardComponent implements OnInit {
  /**
   *
   */
  invites: Invite[] = [];

  /**
   *
   */
  @Select(DataState.getUserInfo)
  userInfo$!: Observable<UserInfo | null>;

  /**
   *
   */
  userInfo!: UserInfo;

  /**
   *
   * @param router
   * @param $invites
   * @param cd
   * @param $destroy
   * @param $store
   */
  constructor(
    private router: Router,
    private $invites: InviteToChatService,
    private cd: ChangeDetectorRef,
    private $destroy: NgDestroy,
    private $storeService: StoreService
  ) {}

  /**
   *
   */
  private getUserInfo() {
    this.userInfo$.pipe(takeUntil(this.$destroy)).subscribe((result) => {
      if (result) {
        this.userInfo = result;
        this.$invites.listenInviteToChannel(result.profile.id);
        this.cd.markForCheck();
      }
    });
  }

  /**
   *
   */
  ngOnInit() {
    this.getUserInfo();
    this.getLiveInvites();
  }

  /**
   *
   */
  getLiveInvites() {
    this.$invites.getLiveInvite().subscribe((invite) => {
      if (invite) {
        const liveInvite: Invite = {
          is_consultant: invite.data.is_consultant,
          profile_id: invite.data.profile_id,
          text: invite.data.text,
          chat_id: invite.data.chat_id,
          type: invite.data.type,
        };

        this.showInvite(liveInvite);
      }
    });
  }

  /**
   *
   * @param invite
   */
  showInvite(invite: Invite) {
    this.invites.push(invite);
    this.cd.markForCheck();
  }

  /**
   *
   * @param chatId
   * @param isConsultant
   */
  navigateToChat(chatId: string, isConsultant: boolean) {
    this.invites = this.invites.filter((el) => {
      el.chat_id !== chatId;
    });

    this.$invites
      .handleInvite(chatId, 'accept')
      .pipe(takeUntil(this.$destroy))
      .subscribe();

    const chatType = isConsultant ? 'client' : 'consultant';
    this.router.navigate([
      this.$storeService.currentLanguage,
      'cabinet',
      chatType,
      'chat',
      chatId,
    ]);
  }

  /**
   *
   * @param chatId
   */
  cancelInvite(chatId: string) {
    this.$invites.handleInvite(chatId, 'not_now').subscribe(() => {
      this.invites = this.invites.filter((el) => {
        el.chat_id !== chatId;
        this.cd.markForCheck();
      });
    });
  }

  /**
   *
   * @param index
   */
  closeNotice(index: number) {
    this.invites.splice(index, 1);
  }
}
