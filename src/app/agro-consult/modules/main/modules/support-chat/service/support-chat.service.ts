import { Injectable } from '@angular/core';
import {
  ChatService,
  SupportChatRequest,
  SupportChatResponse,
} from 'ngx-az-chat';
import { BaseService } from 'ngx-az-core';

@Injectable({ providedIn: 'root' })
export class SupportChatService extends ChatService<
  SupportChatResponse,
  SupportChatRequest
> {
  /**
   *
   */
  url: string;

  /**
   *
   * @param $base
   */
  constructor(protected override $baseService: BaseService) {
    super($baseService);
    this.url = 'support-chat';
  }

  /**
   *
   * @param message
   * @returns
   */
  sendMessage(message: SupportChatRequest) {
    const formData = this.convertModelIntoFormData(message);
    return this.$baseService.post<boolean>(this.url + '/message', formData);
  }
}
