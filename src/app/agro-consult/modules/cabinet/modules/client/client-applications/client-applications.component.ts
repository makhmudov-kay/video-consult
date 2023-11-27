import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { Observable, map, takeUntil } from 'rxjs';
import { MyApplicationsResponse } from 'projects/agro-consult/src/app/shared/models/my-application.response';
import { RadioGroup } from 'projects/agro-consult/src/app/shared/radio-group/models/radio-group.model';
import { MyApplicationService } from 'projects/agro-consult/src/app/shared/services/my-application.service';
import { HttpParams } from '@angular/common/http';
import { NgDestroy } from 'ngx-az-core';

@Component({
  selector: 'az-client-applications',
  templateUrl: './client-applications.component.html',
  styleUrls: ['./client-applications.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientApplicationsComponent implements OnInit {
  /**
   *
   */
  isVisible = false;

  /**
   *
   */
  clientApplicationRadioOptions: RadioGroup[] = [
    // { value: 0, label: 'all' },
    { value: 1, label: 'isNew', count: 0 },
    { value: 7, label: 'waitingToPay', count: 0 },
    { value: 2, label: 'inProgress', count: 0 },
    { value: 6, label: 'wasCanceled', count: 0 },
    { value: 4, label: 'completed', count: 0 },
    { value: 3, label: 'drafted', count: 0 },
    { value: 5, label: 'STATUS_BLOCKED', count: 0 },
  ];

  /**
   *
   */
  statusFilterValue = 1;

  /**
   *
   */
  applications$!: Observable<MyApplicationsResponse[]>;

  /**
   *
   * @param $myApplication
   */
  constructor(
    private $myApplication: MyApplicationService,
    private $destroy: NgDestroy,
    private cd: ChangeDetectorRef
  ) {}

  /**
   *
   */
  private getApplicationsList(params?: HttpParams) {
    this.applications$ = this.$myApplication
      .get(params)
      .pipe(map((result) => result.data));
  }

  /**
   *
   */
  private getApplicationForTheCount() {
    this.$myApplication
      .get()
      .pipe(takeUntil(this.$destroy))
      .subscribe((result) => {
        result.data.forEach((el) => {
          this.clientApplicationRadioOptions.forEach((radio) => {
            if (radio.value === el.status) {
              radio.count += 1;
            }
            this.cd.markForCheck();
          });
        });
      });
  }

  /**
   *
   */
  ngOnInit() {
    this.getApplicationForTheCount();
    this.getApplicationsList(
      new HttpParams().append('status', this.statusFilterValue)
    );
  }

  /**
   *
   * @param statusFilter
   */
  handleChangeFilter(statusFilter: number) {
    if (statusFilter !== 0) {
      this.statusFilterValue = statusFilter;
      const params = new HttpParams().append('status', statusFilter);
      this.getApplicationsList(params);
    } else {
      this.getApplicationsList();
    }
  }

  /**
   *
   * @param text
   */
  searchText(text: string) {
    if (text) {
      const search = new HttpParams().append('search', text);
      this.getApplicationsList(search);
    } else {
      const params = new HttpParams().append('status', this.statusFilterValue);
      this.getApplicationsList(params);
    }
  }
}
