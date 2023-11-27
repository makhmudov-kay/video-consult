import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GridLogic } from 'ngx-az-core';
import { ApplicationFilter } from 'projects/agro-consult/src/app/shared/application-filter/model/filter.interface';
import { ResumeResponse } from 'projects/agro-consult/src/app/shared/models/resume.response';
import { SearchApplicationResponse } from 'projects/agro-consult/src/app/shared/models/search-application.interface';
import { RadioGroup } from 'projects/agro-consult/src/app/shared/radio-group/models/radio-group.model';
import { MyResponsesService } from 'projects/agro-consult/src/app/shared/services/my-response.service';

@Component({
  selector: 'az-responses',
  templateUrl: './responses.component.html',
  styleUrls: ['./responses.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResponsesComponent extends GridLogic<SearchApplicationResponse> {
  /**
   *
   */
  statusFilterValue = 2;

  /**
   *
   */
  categoryList!: ResumeResponse[];

  /**
   *
   */
  params!: ApplicationFilter;

  /**
   *
   */
  clientApplicationRadioOptions: RadioGroup[] = [
    { value: 2, label: 'Принято', count: 0 },
    { value: 1, label: 'Отправлено', count: 0 },
    { value: 3, label: 'Отклонено', count: 0 },
  ];

  /**
   *
   */
  visible = false;

  /**
   *
   * @param $data
   * @param cd
   * @param route
   */
  constructor(
    protected override $data: MyResponsesService,
    protected override cd: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {
    super($data, cd);
    this.route.data.subscribe((result) => {
      this.categoryList = result['filter'];
      this.data = result['data'];
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
  close(): void {
    this.visible = false;
  }

  /**
   *
   * @param statusFilter
   */
  setListByQueryParams(statusFilter: number) {
    this.statusFilterValue = statusFilter;
    this.filterData();
  }

  /**
   *
   * @param params
   */
  searchByFilter(params: ApplicationFilter) {
    this.params = params;
    this.filterData();
  }

  /**
   *
   */
  override getQueryFilter() {
    return [
      {
        key: 'response_status',
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
    ];
  }
}
