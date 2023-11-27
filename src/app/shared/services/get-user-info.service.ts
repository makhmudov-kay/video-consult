import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseResponse, BaseService } from 'ngx-az-core';
import { GetInfo } from '../models/get-info.response';

@Injectable({ providedIn: 'root' })
export class GetAuthInfoService {
  /**
   *
   */
  private url = 'auth/get-info';

  /**
   *
   * @param $baseService
   */
  constructor(private $baseService: BaseService) {}

  /**
   *
   * @returns
   */
  getInfo(): Observable<BaseResponse<GetInfo>> {
    return this.$baseService.post<GetInfo>(`${this.url}`);
  }
}
