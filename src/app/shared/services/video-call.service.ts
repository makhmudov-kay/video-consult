import { BaseService } from 'ngx-az-core';
import { Injectable } from '@angular/core';
import { VideoAccept } from '../models/video-call-accept.interface';
import { VideoDecline } from '../models/video-call-decline.interface';
import { VideoCall } from '../models/video-call.interface';
import { BehaviorSubject } from 'rxjs';
import { Application } from '../models/application.interface';

@Injectable({ providedIn: 'root' })
export class VideoCallService {
  /**
   *
   */
  id$ = new BehaviorSubject<string | undefined>(undefined);
  authuserid$ = new BehaviorSubject<number | null>(null);
  joinToChannel$ = new BehaviorSubject(undefined);
  profileId$ = new BehaviorSubject<number | null>(null);
  application$ = new BehaviorSubject<Application | null>(null);
  placeVideoCall$ = new BehaviorSubject<{
    profileId: number;
    fullName: string;
  } | null>(null);
  listenJoinedUsers$ = new BehaviorSubject<boolean>(false);
  isStreamingHandler$ = new BehaviorSubject<boolean>(false);

  /**
   *
   */
  private url = 'video';

  /**
   *
   * @param $baseService
   */
  constructor(private $baseService: BaseService) {}

  /**
   *
   * @param request
   * @returns
   */
  callToUser(request: VideoCall) {
    return this.$baseService.post(`${this.url}/call-user`, request);
  }

  /**
   *
   * @param request
   * @returns
   */
  acceptCall(request: VideoAccept) {
    return this.$baseService.post(`${this.url}/accept-call`, request);
  }

  /**
   *
   * @param request
   * @returns
   */
  declineCall(request: VideoDecline) {
    return this.$baseService.post(`${this.url}/decline-call`, request);
  }

  /**
   *
   * @param id
   * @returns
   */
  disconectCall(id: string) {
    return this.$baseService.post(`${this.url}/disconnect-call`, {
      chat_id: id,
    });
  }

  /**
   *
   * @param chatId
   * @returns
   */
  handleStreamingState(chatId: string) {
    return this.$baseService.post(
      `${this.url}/profile-is-stream-false/${chatId}`
    );
  }
}
