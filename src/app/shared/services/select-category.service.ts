import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponse, BaseService } from 'ngx-az-core';
import { CategorySelectResponse } from '../models/category-select.response';

@Injectable({ providedIn: 'root' })
export class CategorySelectorService {
  /**
   *
   */
  private url = 'select-category';

  /**
   *
   * @param $baseService
   */
  constructor(private $baseService: BaseService) {}

  /**
   *
   * @returns
   */
  get(): Observable<BaseResponse<CategorySelectResponse[]>> {
    return this.$baseService.get<CategorySelectResponse[]>(`${this.url}`);
  }
}
