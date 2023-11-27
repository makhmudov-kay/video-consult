import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseResponse, BaseService } from 'ngx-az-core';
import { Observable } from 'rxjs';
import { FilterCount } from '../models/filter-count.interface';
import { MyApplicationsResponse } from '../models/my-application.response';

@Injectable({
  providedIn: 'root',
})
export class MyApplicationService {
  /**
   *
   */
  private url = 'my-application';

  /**
   *
   * @param $baseService
   */
  constructor(private $baseService: BaseService) {}

  /**
   *
   * @returns
   */
  get(params?: HttpParams): Observable<BaseResponse<MyApplicationsResponse[]>> {
    return this.$baseService.get<MyApplicationsResponse[]>(
      `${this.url}`,
      params
    );
  }

  /**
   * 
   * @param params 
   * @returns 
   */
  getCountForFilter(params?: HttpParams) {
    return this.$baseService.get<FilterCount>(`${this.url}-count`, params);
  }
}
