import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseResponse, BaseService } from 'ngx-az-core';
import { PusherService } from 'projects/agro-consult/src/app/shared/services/pusher.service';
import { Notification } from '../models/notification.interface';

@Injectable({ providedIn: 'root' })
export class NotificationsService {
  /**
   *
   */
  private url = 'my-notification';

  /**
   *
   * @param $baseService
   * @param pusherService
   */
  constructor(
    private $baseService: BaseService,
    private pusherService: PusherService<any>
  ) {}

  /**
   *
   * @param profile_id
   */
  listenNotificationChannel(profile_id: number) {
    this.pusherService.listenChannelEventNotification(
      `notifications.${profile_id}`,
      '.notification.sent'
    );
  }

  /**
   *
   * @returns
   */
  getLiveNotification() {
    return this.pusherService.notification.asObservable();
  }

  /**
   *
   * @returns
   */
  getNotifications(): Observable<BaseResponse<Notification[]>> {
    return this.$baseService.get<Notification[]>(`${this.url}`);
  }

  /**
   *
   * @param id
   * @returns
   */
  markAsCheckedNotificationById(id: number) {
    return this.$baseService.get(`notification/${id}`);
  }
  /**
   *
   * @param id
   * @returns
   */
  deleteNotificationById(id: number) {
    return this.$baseService.delete(`notification/${id}`);
  }

  /**
   *
   * @returns
   */
  markAllAsRead() {
    return this.$baseService.get('delete-all-notification');
  }
}
