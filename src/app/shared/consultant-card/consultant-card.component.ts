import { Constants } from './../../../../../ngx-az-core/src/lib/config/constants';
import { Router } from '@angular/router';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  isDevMode,
} from '@angular/core';
import { ResumeResponse } from '../models/resume.response';
import { StoreService } from 'ngx-az-core';
import { DOCUMENT } from '@angular/common';
import { Urls } from 'ngx-az-core';
import { DITokens } from 'ngx-az-core';

@Component({
  selector: 'az-consultant-card',
  templateUrl: './consultant-card.component.html',
  styleUrls: ['./consultant-card.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsultantCardComponent {
  /**
   *
   */
  @Input()
  consultant!: ResumeResponse;

  /**
   *
   */
  @Input()
  isSkeleton!: boolean;

  /**
   *
   */
  @Input()
  agrozamin!: boolean;

  /**
   *
   */
  private readonly isProjectAgroConsult =
    window.location.origin == this.urls.agroMaslahat;

  /**
   *
   * @param router
   * @param $store
   */
  constructor(
    private router: Router,
    private $storeService: StoreService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(DITokens.URLS) private urls: Urls
  ) {}

  /**
   *
   * @param id
   */
  navigateToDetailInfo(id: number) {
    const suffix = [
      this.$storeService.currentLanguage,
      'main',
      'consultant',
      id,
    ];

    if (isDevMode() || this.isProjectAgroConsult) {
      this.navigateToConsultant(suffix);
      return;
    }

    this.document.location.href = `${this.urls.agroMaslahat}/${suffix.join(
      '/'
    )}`;
  }

  /**
   *
   * @param suffix
   * @param prefix
   */
  private navigateToConsultant(suffix: (string | number)[]) {
    this.router.navigate(['/', ...suffix]);
  }
}
