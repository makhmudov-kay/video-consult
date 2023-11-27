import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { CategorySelectResponse } from 'projects/agro-consult/src/app/shared/models/category-select.response';
import { CategorySelectorService } from 'projects/agro-consult/src/app/shared/services/select-category.service';
import { map, Observable, takeUntil } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoryListResolver implements Resolve<CategorySelectResponse[]> {
  /**
   *
   * @param $selectCategory
   */
  constructor(private $selectCategory: CategorySelectorService) {}

  /**
   *
   * @param route
   * @returns
   */
  resolve(
    route: ActivatedRouteSnapshot
  ):
    | Observable<CategorySelectResponse[]>
    | Promise<CategorySelectResponse[]>
    | CategorySelectResponse[] {
    return this.$selectCategory.get().pipe(map((result) => result.data));
  }
}
