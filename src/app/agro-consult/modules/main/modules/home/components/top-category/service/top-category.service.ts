import { Injectable } from '@angular/core';
import { BaseResponse, BaseService } from 'ngx-az-core';
import { Observable } from 'rxjs';
import { CategoryListResponse } from 'projects/agro-consult/src/app/shared/category-list/model/category-list.response';

@Injectable({ providedIn: 'root' })
export class TopCategoryService {
  /**
   *
   */
  private url = 'top-category';

  /**
   *
   * @param $baseService
   */
  constructor(private $baseService: BaseService) {}

  /**
   *
   * @returns
   */
  getTopCategories(): Observable<BaseResponse<CategoryListResponse[]>> {
    return this.$baseService.get<CategoryListResponse[]>(`${this.url}`);
  }
}
