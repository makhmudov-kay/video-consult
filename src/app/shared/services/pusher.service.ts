import { AuthState } from './../../../../../ngx-az-core/src/lib/shared/store/auth/auth.state';
import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';

import Echo from 'laravel-echo';
import { BehaviorSubject, Observable } from 'rxjs';
import { WsMessage } from '../models/ws-message.interface';
import { environment } from 'projects/agro-consult/src/environments/environment';

const HOST = environment.socketIO;

@Injectable({ providedIn: 'root' })
export class PusherService<T = WsMessage> {
  /**
   *
   */
  message = new BehaviorSubject<T | null>(null);

  /**
   *
   */
  notification = new BehaviorSubject<T | null>(null);

  /**
   *
   */
  data = new BehaviorSubject<any>(null);

  /**
   *
   */
  invite = new BehaviorSubject<any>(null);

  /**
   *
   */
  join = new BehaviorSubject<any>(null);

  /**
   *
   */
  isStreamingUser = new BehaviorSubject<any>(null);

  /**
   *
   */
  @Select(AuthState.token)
  token$!: Observable<string | null>;

  /**
   *
   */
  constructor(private $store: Store) {
    this.token$.subscribe((token) => {
      if (token) {
        this.initLaravelEcho();
      }
    });
  }

  /**
   *
   */
  initLaravelEcho() {
    (window as any).io = require('socket.io-client');
    (window as any).Echo = new Echo({
      broadcaster: 'socket.io',
      host: HOST,
      authEndpoint: '/broadcasting/auth',
      auth: {
        headers: {
          Authorization: `Bearer ${this.$store.selectSnapshot(
            AuthState.token
          )}`,
        },
      },
    });
  }

  /**
   * channel for messages
   * @param channel
   * @param event
   */
  listenChannelEvent(channel: string, event: string) {
    (window as any).Echo.private(channel).listen(event, (message: T) => {
      this.message.next(message);
    });
  }

  /**
   *channel for notifications
   * @param channel
   * @param event
   */
  listenChannelEventNotification(channel: string, event: string) {
    (window as any).Echo.private(channel).listen(event, (notification: T) => {
      this.notification.next(notification);
    });
  }

  /**
   * channel for data
   * @param channel
   * @param event
   */
  listenChannelEventData(channel: string, event: string) {
    (window as any).Echo.private(channel).listen(event, (data: any) => {
      this.data.next(data);
    });
  }

  /**
   * channel for invite
   * @param channel
   * @param event
   */
  listenInviteToChannel(channel: string, event: string) {
    (window as any).Echo.private(channel).listen(event, (invite: any) => {
      this.invite.next(invite);
    });
  }

  /**
   * channel for invite
   * @param channel
   * @param event
   */
  listenJoinedUser(channel: string, event: string) {
    (window as any).Echo.private(channel).listen(event, (join: any) => {
      this.join.next(join);
    });
  }

  /**
   * channel for invite
   * @param channel
   * @param event
   */
  listenStreamingUser(channel: string, event: string) {
    (window as any).Echo.private(channel).listen(
      event,
      (isStreamingUser: any) => {
        this.isStreamingUser.next(isStreamingUser);
      }
    );
  }

  /**
   *
   * @param channel
   */
  leaveChannel(channel: string) {
    (window as any).Echo.leave(channel);
  }
}
