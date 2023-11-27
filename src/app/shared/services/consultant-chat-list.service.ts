import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'ngx-az-core';
import { ChatItemResponse } from '../models/chat-item.response';

@Injectable({ providedIn: 'root' })
export class ConsultantChatListService {
  /**
   *
   */
  private url = 'consultant-chats';

  /**
   *
   * @param $baseService
   */
  constructor(private $baseService: BaseService) {}

  /**
   *
   * @param params
   * @returns
   */
  getConsultantChatList(params?: HttpParams) {
    return this.$baseService.get<ChatItemResponse[]>(`${this.url}`, params);
  }
}
