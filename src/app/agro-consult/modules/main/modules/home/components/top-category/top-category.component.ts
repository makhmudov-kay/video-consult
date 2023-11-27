import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CategoryListResponse } from 'projects/agro-consult/src/app/shared/category-list/model/category-list.response';
import { TopCategoryService } from './service/top-category.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'az-top-category',
  templateUrl: './top-category.component.html',
  styleUrls: ['./top-category.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopCategoryComponent implements OnInit {
  /**
   *
   */
  topCategory$!: Observable<CategoryListResponse[]>;

  /**
   *
   * @param $topCategory
   */
  constructor(private $topCategory: TopCategoryService) {}

  /**
   *
   */
  private getTopCategory() {
    this.topCategory$ = this.$topCategory
      .getTopCategories()
      .pipe(map((result) => result.data));
  }

  /**
   *
   */
  ngOnInit() {
    this.getTopCategory();
  }
}
