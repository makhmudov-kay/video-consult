import { Injectable } from '@angular/core';
import { BaseService } from 'ngx-az-core';
import {
  RespondPrivateRequest,
  RespondRequest,
} from '../models/respond.request';

@Injectable({ providedIn: 'root' })
export class ApplicationResponseService {
  /**
   *
   */
  private url = 'response';

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
  respond(request: RespondRequest) {
    return this.$baseService.post(`${this.url}`, request);
  }

  /**
   *
   * @param request
   * @returns
   */
  respondPrivate(request: RespondPrivateRequest) {
    return this.$baseService.post(`create-chat`, request);
  }
}
