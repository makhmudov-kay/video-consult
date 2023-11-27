import { Injectable } from '@angular/core';
import { BaseService } from 'ngx-az-core';
import { CancelResponse } from '../models/cancel-response.request';

@Injectable({
  providedIn: 'root',
})
export class CancelResponseService {
  /**
   *
   */
  private url = 'cancel-response';

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
  cancelApplication(request: CancelResponse) {
    return this.$baseService.post(`${this.url}`, request);
  }
}
