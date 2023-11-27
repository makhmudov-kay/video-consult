import { PusherService } from 'projects/agro-consult/src/app/shared/services/pusher.service';
import { Injectable } from '@angular/core';
import { BaseService } from 'ngx-az-core';

@Injectable({
  providedIn: 'root',
})
export class InviteToChatService {
  /**
   *
   */
  private url = 'video/invite-to-chat';

  /**
   *
   * @param $baseService
   * @param pusherService
   */
  constructor(
    private $baseService: BaseService,
    private $pusherService: PusherService<any>
  ) {}

  /**
   *
   * @param chatId
   * @param type
   * @returns
   */
  handleInvite(chatId: string, type: string) {
    const chat_id = Number(chatId);
    return this.$baseService.post(`${'video/action-in-chat'}`, {
      chat_id: chat_id,
      type: type,
    });
  }

  /**
   *
   * @param profile_id
   */
  listenInviteToChannel(profile_id: number) {
    this.$pusherService.listenInviteToChannel(
      `invite.${profile_id}`,
      '.invite.chat'
    );
  }

  /**
   *
   * @param chatId
   */
  leaveInviteToChannel(profile_id: number) {
    this.$pusherService.leaveChannel(`invite.${profile_id}`);
    // Resets the previous value when switching to a new chat window for texarea
    this.$pusherService.invite.next(null);
  }

  /**
   *
   * @param profileId
   */
  listenJoinedUser(profileId: number) {
    this.$pusherService.listenJoinedUser(
      `action-in-chats.${profileId}`,
      '.action.inchat'
    );
  }

  /**
   *
   * @param profileId
   */
  leaveJoinedUser(profileId: number) {
    this.$pusherService.leaveChannel(`action-in-chats.${profileId}`);
    this.$pusherService.join.next(null);
  }

  /**
   *
   * @returns
   */
  handleLiveJoiningUser() {
    return this.$pusherService.join.asObservable();
  }

  /**
   *
   * @returns
   */
  getLiveInvite() {
    return this.$pusherService.invite.asObservable();
  }

  /**
   *
   * @param chatId
   */
  inviteToChat(chatId: string, type: string) {
    return this.$baseService.post(`${this.url}/${chatId}`, { type });
  }
}
