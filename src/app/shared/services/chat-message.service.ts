import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseResponse, BaseService, obj2FormData } from 'ngx-az-core';
import { Observable } from 'rxjs';
import { Message } from '../models/message.interface';
import { Offer } from '../models/offer.request';
import { PusherService } from './pusher.service';

@Injectable({ providedIn: 'root' })
export class ChatMessageService {
  /**
   *
   */
  private url = 'chat-messages';

  /**
   *
   * @param $baseService
   * @param pusherService
   */
  constructor(
    private $baseService: BaseService,
    private pusherService: PusherService
  ) {}

  /**
   *
   * @param chatId
   */
  listenChatChannel(chatId: string) {
    this.pusherService.listenChannelEvent(`chat.${chatId}`, '.message.sent');
  }

  /**
   *
   * @param chatId
   */
  leaveChatChanel(chatId: string) {
    this.pusherService.leaveChannel(`chat.${chatId}`);
    // Resets the previous value when switching to a new chat window for texarea
    this.pusherService.message.next(null);
  }

  /**
   *
   * @param chatId
   */
  listenStatusApplication(chatId: string) {
    this.pusherService.listenChannelEventData(`discussion.${chatId}`, '.deal');
  }

  /**
   *
   * @param chatId
   */
  leaveStatusApplication(chatId: string) {
    this.pusherService.leaveChannel(`discussion.${chatId}`);
    // Resets the previous value when switching to a new chat window for texarea
    this.pusherService.data.next(null);
  }

  /**
   *
   */
  getMessage() {
    return this.pusherService.message.asObservable();
  }

  /**
   *
   * @returns
   */
  getDataApplcation() {
    return this.pusherService.data.asObservable();
  }

  /**
   *
   * @param params
   * @returns
   */
  getMessages(params: HttpParams): Observable<BaseResponse<Message[]>> {
    return this.$baseService.get<Message[]>(`${this.url}`, params);
  }

  /**
   *
   * @param offerRequest
   * @returns
   */
  sendOffer(offerRequest: Offer) {
    const formData = this.convertModelIntoFormData(offerRequest);
    return this.$baseService.post(`${this.url}/send`, formData);
  }

  /**
   *
   * @param model
   * @returns
   */
  private convertModelIntoFormData(model: Offer) {
    const formData = obj2FormData(model);
    return formData;
  }
}
