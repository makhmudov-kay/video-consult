import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CategoryListResponse } from '../model/category-list.response';
import { CategoryListService } from './category-list.service';

@Injectable({ providedIn: 'root' })
export class CategoryListResolver {
  /**
   *
   * @param $categoryList
   */
  constructor(private $categoryList: CategoryListService) {}

  /**
   *
   * @param route
   * @returns
   */
  resolve():
    | Observable<CategoryListResponse[]>
    | Promise<CategoryListResponse[]>
    | CategoryListResponse[] {
    return this.$categoryList.getAll().pipe(map((w) => w.data));
  }
}
