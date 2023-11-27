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
  selector: 'az-consultant-application-detail',
  templateUrl: './consultant-application-detail.component.html',
  styleUrls: ['./consultant-application-detail.component.less'],
  providers: [NgDestroy],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsultantApplicationDetailComponent {
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
    private $destroy: NgDestroy,
    private cd: ChangeDetectorRef
  ) {
    this.id = this.route.snapshot.params['id'];
    if (this.id && Number.isFinite(+this.id)) {
      this.getApplicationById(this.id);
    }

    this.currentLanguage$.pipe(takeUntil(this.$destroy)).subscribe(() => {
      if (this.id && Number.isFinite(+this.id)) {
        this.getApplicationById(this.id);
      }
    });

    this.cd.markForCheck();
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
