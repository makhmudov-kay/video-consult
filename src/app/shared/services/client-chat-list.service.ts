import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseResponse, BaseService } from 'ngx-az-core';
import { Observable } from 'rxjs';
import { Application } from '../models/application.interface';
import { ChatItemResponse } from '../models/chat-item.response';

@Injectable({ providedIn: 'root' })
export class ClientChatListService {
  /**
   *
   */
  private url = 'chats';

  /**
   *
   * @param $baseService
   */
  constructor(private $baseService: BaseService) {}

  /**
   *
   * @returns
   */
  getChatList(
    params?: HttpParams
  ): Observable<BaseResponse<ChatItemResponse[]>> {
    return this.$baseService.get<ChatItemResponse[]>(`${this.url}`, params);
  }

  /**
   *
   * @param id
   * @returns
   */
  getChatInfoById(id: string): Observable<BaseResponse<Application>> {
    return this.$baseService.get<Application>(`${this.url}/${id}`);
  }
}
