import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ChatItemResponse } from '../models/chat-item.response';
import { ConsultantChatListService } from './consultant-chat-list.service';

@Injectable({ providedIn: 'root' })
export class ConsultatntChatListResolver implements Resolve<ChatItemResponse[]> {
  /**
   *
   * @param $consultantChatList
   */
  constructor(private $consultantChatList: ConsultantChatListService) {}

  /**
   *
   * @param route
   * @returns
   */
  resolve(
    route: ActivatedRouteSnapshot
  ):
    | Observable<ChatItemResponse[]>
    | Promise<ChatItemResponse[]>
    | ChatItemResponse[] {
    return this.$consultantChatList
      .getConsultantChatList()
      .pipe(map((result) => result.data));
  }
}
