import { CheckResumeService } from 'projects/agro-consult/src/app/shared/services/check-resume.service';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  DataState,
  GridLogic,
  NgDestroy,
  CheckHasResume,
  LanguageState,
} from 'ngx-az-core';
import { ApplicationFilter } from 'projects/agro-consult/src/app/shared/application-filter/model/filter.interface';
import { ResumeResponse } from 'projects/agro-consult/src/app/shared/models/resume.response';
import { SearchApplicationResponse } from 'projects/agro-consult/src/app/shared/models/search-application.interface';
import { SearchApplicationsService } from 'projects/agro-consult/src/app/shared/services/search-application.service';
import { map, Observable, takeUntil } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { MyApplicationService } from 'projects/agro-consult/src/app/shared/services/my-application.service';
import { FilterCount } from 'projects/agro-consult/src/app/shared/models/filter-count.interface';
import { MyResumeService } from 'projects/agro-consult/src/app/shared/services/my-resume.service';
import { Select } from '@ngxs/store';

@Component({
  selector: 'az-consultant-search',
  templateUrl: './consultant-search.component.html',
  styleUrls: ['./consultant-search.component.less'],
  providers: [NgDestroy],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsultantSearchComponent
  extends GridLogic<SearchApplicationResponse>
  implements OnInit
{
  /**
   *
   */
  visible = false;

  /**
   *
   */
  params?: ApplicationFilter;

  /**
   *
   */
  form!: FormGroup;

  /**
   *
   */
  isAvailableSkeleton = false;

  /**
   *
   */
  categoryList$!: Observable<ResumeResponse[]>;

  /**
   *
   */
  searchInputValue?: string;

  /**
   *
   */
  filterCount!: FilterCount;

  /**
   *
   */
  @Select(DataState.checkHasResume)
  checkHasResume$!: Observable<CheckHasResume | null>;

  /**
   *
   */
  @Select(LanguageState.currentLanguage)
  language$!: Observable<string>;

  /**
   *
   */
  hasResume!: boolean;

  /**
   *
   * @param $data
   * @param cd
   * @param fb
   * @param $myApplication
   * @param $destroy
   * @param $myResume
   */
  constructor(
    protected override $data: SearchApplicationsService,
    protected override cd: ChangeDetectorRef,
    private fb: FormBuilder,
    private $myApplication: MyApplicationService,
    private $destroy: NgDestroy,
    private $myResume: MyResumeService
  ) {
    super($data, cd);
    this.language$.pipe(takeUntil(this.$destroy)).subscribe(() => {
      this.getResumeList();
      this.submitSearch('');
    });
  }

  /**
   *
   */
  private initForm() {
    this.form = this.fb.group({
      category_id: [null],
      price_from: [null],
      price_to: [null],
      when_date: [null],
      type: [null],
      search: [null],
      response_status: [null],
      status: [null],
      private_expired: [null],
      is_free: [null],
    });
  }

  /**
   *
   */
  private getResumeList() {
    this.categoryList$ = this.$myResume
      .getMyResumeList()
      .pipe(map((result) => result.data));
  }

  /**
   *
   */
  private checkHasResume() {
    this.checkHasResume$.pipe(takeUntil(this.$destroy)).subscribe((result) => {
      if (result) {
        this.hasResume = result.check;
        this.$loadDataFromServer = this.hasResume
          ? this.$data.getGridData.bind(this.$data)
          : this.$data.getApplicationWithoutResume.bind(this.$data);

        this.cd.markForCheck();
      }
    });
  }

  /**
   *
   */
  ngOnInit() {
    this.getFilterCount();
    this.initForm();
    this.setDefaultData();
    this.checkHasResume();
  }

  /**
   *
   * @param categoryId
   */
  getFilterCount(categoryId?: number) {
    let params;
    if (categoryId) {
      params = new HttpParams().append('category_id', categoryId);
    }

    this.$myApplication
      .getCountForFilter(params)
      .pipe(takeUntil(this.$destroy))
      .subscribe((result) => {
        this.filterCount = result.data;
        this.cd.markForCheck();
      });
  }

  /**
   *
   */
  open(): void {
    this.visible = true;
  }

  /**
   *
   */
  close(isVisble: boolean): void {
    this.visible = isVisble;
  }

  /**
   *
   * @param params
   */
  searchByFilter(params: ApplicationFilter) {
    this.isAvailableSkeleton = true;
    this.params = params;
    this.visible = false;
    this.setDefaultData();
    this.filterData();
  }

  /**
   *
   * @param text
   */
  submitSearch(text: string) {
    this.isAvailableSkeleton = true;
    this.searchInputValue = text;
    this.setDefaultData();
    this.filterData();
  }

  /**
   *
   */
  override getQueryFilter() {
    if (this.hasResume) {
      return [
        {
          key: 'category_id',
          value: [String(this.params?.category_id || '')],
        },
        {
          key: 'price_from',
          value: [String(this.params?.price_from || '')],
        },
        {
          key: 'price_to',
          value: [String(this.params?.price_to || '')],
        },
        {
          key: 'when_date',
          value: [String(this.params?.when_date || '')],
        },
        {
          key: 'type',
          value: [this.params?.type || ''],
        },
        {
          key: 'search',
          value: [this.searchInputValue || ''],
        },
        {
          key: 'response_status',
          value: [String(this.params?.response_status || '')],
        },
        {
          key: 'status',
          value: [String(this.params?.status || '')],
        },
        {
          key: 'private_expired',
          value: [String(this.params?.private_expired || '')],
        },
        {
          key: 'is_free',
          value: [String(this.params?.is_free || '')],
        },
      ];
    } else {
      return [
        {
          key: 'status',
          value: ['1'],
        },
        {
          key: 'type',
          value: ['public'],
        },
      ];
    }
  }

  /**
   *
   * @param $event
   */
  @HostListener('scroll', ['$event'])
  onScrollEvent($event: NzSafeAny) {
    if (
      $event.target.scrollHeight <
      $event.target.scrollTop + $event.target.scrollWidth + 100
    ) {
      if (
        this.data.current_page === this.query.pageIndex && // prevents mutiple requests on the time
        this.data.total > (this.query.pageIndex - 1) * this.query.pageSize
      ) {
        this.isAvailableSkeleton = false;
        this.paginate(this.query.pageIndex + 1);
      }
    }
  }
}
