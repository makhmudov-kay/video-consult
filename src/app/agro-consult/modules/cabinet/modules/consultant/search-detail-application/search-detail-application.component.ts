import {
  ChangeDetectionStrategy,
  Component,
  ChangeDetectorRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select } from '@ngxs/store';
import { LanguageState, NgDestroy } from 'ngx-az-core';
import { ApplicationDetailResponse } from 'projects/agro-consult/src/app/shared/models/application-detail.response';
import { ApplicationsService } from 'projects/agro-consult/src/app/shared/services/application.service';
import { map, Observable, takeUntil } from 'rxjs';

@Component({
  selector: 'az-search-detail-application',
  templateUrl: './search-detail-application.component.html',
  styleUrls: ['./search-detail-application.component.less'],
  providers: [NgDestroy],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchDetailApplicationComponent {
  /**
   *
   */
  id?: string;

  /**
   *
   */
  application$!: Observable<ApplicationDetailResponse>;

  /**
   *
   */
  @Select(LanguageState.currentLanguage)
  currentLanguage$!: Observable<string>;

  /**
   *
   * @param route
   * @param $application
   */
  constructor(
    private route: ActivatedRoute,
    private $application: ApplicationsService,
    private cd: ChangeDetectorRef,
    private $destroy: NgDestroy
  ) {
    this.route.params.subscribe((param) => {
      this.id = param['id'];
      if (this.id && Number.isFinite(+this.id)) {
        this.getApplicationById(this.id);
      }
      this.cd.markForCheck();
    });

    this.currentLanguage$.pipe(takeUntil(this.$destroy)).subscribe(() => {
      if (this.id && Number.isFinite(+this.id)) {
        this.getApplicationById(this.id);
      }
    });
  }

  /**
   *
   * @param id
   */
  private getApplicationById(id: string) {
    this.application$ = this.$application
      .getById(id)
      .pipe(map((result) => result.data));
  }
}
