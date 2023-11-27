import { Injectable } from '@angular/core';
import { BaseService, GridService } from 'ngx-az-core';
import { HistoryTransaction } from '../model/history.response';

@Injectable({
  providedIn: 'root',
})
export class PaymentHistoryService extends GridService<HistoryTransaction> {
  /**
   *
   */
  url: string;

  /**
   *
   * @param $baseService
   */
  constructor(protected override $baseService: BaseService) {
    super($baseService);
    this.url = 'payment';
  }
}
