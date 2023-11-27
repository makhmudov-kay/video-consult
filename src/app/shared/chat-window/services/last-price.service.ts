import { Injectable } from '@angular/core';
import { BaseService } from 'ngx-az-core';

@Injectable({
  providedIn: 'root',
})

export class LastPriceService {
  /**
   * 
   */
  url = 'chats/last-price';

  /**
   * 
   * @param $baseService 
   */
  constructor(private $baseService: BaseService) {}

  /**
   * 
   * @param chatId 
   * @returns 
   */
  getLastPrice(chatId: number) {
    return this.$baseService.get(`${this.url}/${chatId}`);
  }
}
