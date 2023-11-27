import { Injectable } from '@angular/core';
import { BaseResponse, BaseService } from 'ngx-az-core';
import { Observable } from 'rxjs';
import { RespondChecker } from '../models/respond-checker.interface';

@Injectable({ providedIn: 'root' })
export class CheckResponseService {
  /**
   *
   */
  private url = 'response-check';

  /**
   *
   * @param $baseService
   */
  constructor(private $baseService: BaseService) {}

  /**
   *
   * @param id
   * @returns
   */
  get(id: number): Observable<BaseResponse<RespondChecker>> {
    return this.$baseService.get<RespondChecker>(`${this.url}/${id}`);
  }
}
