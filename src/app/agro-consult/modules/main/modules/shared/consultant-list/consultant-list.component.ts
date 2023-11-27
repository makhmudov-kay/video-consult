import { ResumeService } from 'projects/agro-consult/src/app/shared/services/resume.service';
import { ResumeResponse } from 'projects/agro-consult/src/app/shared/models/resume.response';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';
import { GridLogic, LanguageState, NgDestroy } from 'ngx-az-core';
import { Select } from '@ngxs/store';
import { Observable, takeUntil } from 'rxjs';

@Component({
  selector: 'az-consultant-list',
  templateUrl: './consultant-list.component.html',
  styleUrls: ['./consultant-list.component.less'],
  providers: [NgDestroy],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsultantListComponent extends GridLogic<ResumeResponse> {
  /**
   *
   */
  @Input()
  categoryId!: number;

  /**
   *
   */
  searchValue = '';

  /**
   *
   */
  sort = 'new';

  /**
   *
   */
  handleSort!: string;

  /**
   *
   */
  @Select(LanguageState.currentLanguage)
  language$!: Observable<string>;

  /**
   *
   * @param $data
   * @param cd
   */
  constructor(
    protected override $data: ResumeService,
    protected override cd: ChangeDetectorRef,
    private $destroy: NgDestroy
  ) {
    super($data, cd);
    this.loadData();

    this.language$.pipe(takeUntil(this.$destroy)).subscribe(() => {
      this.loadData();
    });
  }

  /**
   *
   */
  override getQueryFilter() {
    return [
      {
        key: 'category_id',
        value: [String(this.categoryId || '')],
      },
      {
        key: 'search',
        value: [this.searchValue || ''],
      },
      {
        key: 'sort_name',
        value: [this.handleSort || ''],
      },
    ];
  }

  /**
   *
   */
  override filterData() {
    super.filterData();
  }

  /**
   *
   */
  submitSearch() {
    if (this.sort !== 'new') {
      this.handleSort = this.sort;
    } else {
      this.handleSort = '';
    }
    this.setDefaultData();
    this.filterData();
  }

  /**
   *
   */
  resetInput() {
    this.searchValue = '';
    this.submitSearch();
  }
}
