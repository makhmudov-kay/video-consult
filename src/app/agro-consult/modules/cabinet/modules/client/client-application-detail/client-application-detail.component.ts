import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { LanguageState, NgDestroy } from 'ngx-az-core';
import { ApplicationDetailResponse } from 'projects/agro-consult/src/app/shared/models/application-detail.response';
import { ApplicationVisibleRequest } from 'projects/agro-consult/src/app/shared/models/application-visible.interface';
import { ApplicationsService } from 'projects/agro-consult/src/app/shared/services/application.service';
import { map, Observable, takeUntil } from 'rxjs';

@Component({
  selector: 'az-client-application-detail',
  templateUrl: './client-application-detail.component.html',
  styleUrls: ['./client-application-detail.component.less'],
  providers: [NgDestroy],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientApplicationDetailComponent {
  /**
   *
   */
  id?: string;

  /**
   *
   */
  isLoading = false;

  /**
   *
   */
  application$!: Observable<ApplicationDetailResponse>;

  /**
   *
   */
  mobileWebView!: string | null;

  /**
   *
   */
  @Select(LanguageState.currentLanguage)
  currentLanguage$!: Observable<string>;

  /**
   *
   * @param $application
   * @param route
   * @param $destroy
   * @param router
   * @param cd
   */
  constructor(
    private $application: ApplicationsService,
    private route: ActivatedRoute,
    private $destroy: NgDestroy,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {
    this.mobileWebView = this.route.snapshot.fragment;

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

  /**
   *
   * @param id
   */
  removeApplication(id: number) {
    this.$application
      .remove(id)
      .pipe(takeUntil(this.$destroy))
      .subscribe(() => {
        this.router.navigate(['../'], { relativeTo: this.route });
      });
  }

  /**
   *
   * @param isVisible
   */
  handleVsisbleApplication(isVisible: boolean) {
    const request: ApplicationVisibleRequest = {
      is_visible: isVisible,
    };
    if (this.id) {
      this.isLoading = true;
      this.$application.updateApplication(this.id, request).subscribe(() => {
        this.isLoading = false;
        this.cd.markForCheck();
      });
    }
  }
}
