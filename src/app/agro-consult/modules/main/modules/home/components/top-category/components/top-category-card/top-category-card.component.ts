import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CategoryListResponse } from 'projects/agro-consult/src/app/shared/category-list/model/category-list.response';

@Component({
  selector: 'az-top-category-card',
  templateUrl: './top-category-card.component.html',
  styleUrls: ['./top-category-card.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopCategoryCardComponent {
  /**
   *
   */
  @Input()
  category!: CategoryListResponse;
}
