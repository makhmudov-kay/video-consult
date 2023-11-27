import { PusherService } from './../../services/pusher.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ListenStreamingUser {
  constructor(private pusherService: PusherService) {}

  /**
   *
   * @param chatId
   */
  listenStreamingUserChannel(chatId: string) {
    this.pusherService.listenStreamingUser(
      `profile-is-stream.${chatId}`,
      '.profile.is-stream'
    );
  }

  /**
   *
   * @param chatId
   */
  leaveStreamingUserChanel(chatId: string) {
    this.pusherService.leaveChannel(`profile-is-stream.${chatId}`);
    this.pusherService.isStreamingUser.next(null);
  }

  /**
   *
   */
  checkStreamingUser() {
    return this.pusherService.isStreamingUser.asObservable();
  }
}
