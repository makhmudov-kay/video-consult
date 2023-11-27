import { ActivatedRoute } from '@angular/router';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ChangeDetectorRef,
} from '@angular/core';
import { map, Observable } from 'rxjs';
import { ResumeResponse } from '../models/resume.response';
import { CategoryListResponse } from './model/category-list.response';
import { CategoryListService } from './service/category-list.service';

@Component({
  selector: 'az-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryListComponent implements OnInit {
  /**
   *
   */
  @Input()
  selectedCategory?: number = 2;

  /**
   *
   */
  @Input()
  customClassName!: string;

  /**
   *
   */
  @Input()
  isRadioBtn!: boolean;

  /**
   *
   */
  @Input()
  isCreateApplication!: boolean;

  /**
   *
   */
  @Input()
  consultantResume!: ResumeResponse;

  /**
   *
   */
  @Output() categoryId = new EventEmitter<number>();

  /**
   *
   */
  // categoryList$!: Observable<CategoryListResponse[]>;

  /**
   *
   */
  categoryList!: CategoryListResponse[];

  /**
   *
   */
  showCategory = false;

  /**
   *
   */
  id!: number;

  /**
   *
   * @param $categoryList
   */
  constructor(
    private $categoryList: CategoryListService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {}

  /**
   *
   */
  private getCategories() {
    // this.categoryList$ = this.$categoryList.getAll().pipe(map((w) => w.data));
    this.route.data.subscribe((result) => {
      this.categoryList = result['data'];
      this.cd.markForCheck();
    });
  }

  /**
   *
   */
  ngOnInit(): void {
    this.getCategories();
  }

  /**
   *
   * @param obj
   */
  onSelectCategory(obj?: any) {
    if (obj) {
      this.id = obj.id;
      this.categoryId.emit(obj.id);
    } else {
      this.categoryId.emit();
    }
  }

  /**
   *
   */
  showMoreCategory() {
    this.showCategory = true;
  }
}
