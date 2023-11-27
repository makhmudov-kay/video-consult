import { Injectable } from '@angular/core';
import { BaseResponse, BaseService } from 'ngx-az-core';
import { Observable } from 'rxjs';
import { CategoryListResponse } from '../model/category-list.response';

@Injectable({ providedIn: 'root' })
export class CategoryListService {
  /**
   *
   */
  private url = 'category';

  /**
   *
   * @param $baseService
   */
  constructor(private $baseService: BaseService) {}

  /**
   *
   * @returns
   */
  getAll(): Observable<BaseResponse<CategoryListResponse[]>> {
    return this.$baseService.get<CategoryListResponse[]>(`${this.url}`);
  }
}
