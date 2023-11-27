import { MyResumeService } from './../../../../../../shared/services/my-resume.service';
import { MyOrderApplicationService } from './../../../../../../shared/services/my-order-application.service';
import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  HostListener,
} from '@angular/core';
import { RadioGroup } from 'projects/agro-consult/src/app/shared/radio-group/models/radio-group.model';
import { GridLogic, LanguageState, NgDestroy } from 'ngx-az-core';
import { SearchApplicationResponse } from 'projects/agro-consult/src/app/shared/models/search-application.interface';
import { ResumeResponse } from 'projects/agro-consult/src/app/shared/models/resume.response';
import { ApplicationFilter } from 'projects/agro-consult/src/app/shared/application-filter/model/filter.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { map, Observable, takeUntil } from 'rxjs';
import { Select } from '@ngxs/store';

@Component({
  selector: 'az-consultant-applications',
  templateUrl: './consultant-applications.component.html',
  styleUrls: ['./consultant-applications.component.less'],
  providers: [NgDestroy],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsultantApplicationsComponent
  extends GridLogic<SearchApplicationResponse>
  implements OnInit
{
  /**
   *
   */
  clientApplicationRadioOptions: RadioGroup[] = [
    { value: 0, label: 'all', count: 0 },
    { value: 2, label: 'waitingToDo', count: 0 },
    { value: 4, label: 'completed', count: 0 },
  ];

  /**
   *
   */
  statusFilterValue = 0;

  /**
   *
   */
  form!: FormGroup;

  /**
   *
   */
  visible = false;

  /**
   *
   */
  isAvailableSkeleton = false;

  /**
   *
   */
  params!: ApplicationFilter;

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
  @Select(LanguageState.currentLanguage)
  language$!: Observable<string>;

  /**
   *
   * @param $data
   * @param cd
   * @param route
   */
  constructor(
    protected override $data: MyOrderApplicationService,
    protected override cd: ChangeDetectorRef,
    private fb: FormBuilder,
    private $myResume: MyResumeService,
    private $destroy: NgDestroy
  ) {
    super($data, cd);
    this.language$.pipe(takeUntil(this.$destroy)).subscribe(() => {
      this.getResumeList();
      this.setDefaultData();
      this.loadData();
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
      status: [null],
      response_status: [null],
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
  ngOnInit() {
    this.initForm();
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
  close(isVisible: boolean): void {
    this.visible = isVisible;
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
   * @param statusFilter
   */
  handleChangeFilter(statusFilter: number) {
    this.statusFilterValue = statusFilter;
    this.setDefaultData();
    this.filterData();
  }

  /**
   *
   */
  override getQueryFilter() {
    return [
      {
        key: 'status',
        value: [String(this.statusFilterValue || '')],
      },
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
        key: 'status',
        value: [String(this.params?.status || '')],
      },
    ];
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
