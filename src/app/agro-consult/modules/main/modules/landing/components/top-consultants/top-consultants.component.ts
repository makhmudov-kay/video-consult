import { ResumeResponse } from 'projects/agro-consult/src/app/shared/models/resume.response';
import { map, Observable, takeUntil } from 'rxjs';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TopConsultantService } from '../../../service/top-consultant.service';
import { Select } from '@ngxs/store';
import { LanguageState, NgDestroy } from 'ngx-az-core';

@Component({
  selector: 'az-top-consultants',
  templateUrl: './top-consultants.component.html',
  styleUrls: ['./top-consultants.component.less'],
  providers: [NgDestroy],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopConsultantsComponent implements OnInit {
  /**
   *
   */
  topConsulatantsList$!: Observable<ResumeResponse[]>;

  /**
   *
   */
  @Select(LanguageState.currentLanguage)
  language$!: Observable<string>;

  /**
   *
   * @param $topConsultant
   */
  constructor(
    private $topConsultant: TopConsultantService,
    private $destroy: NgDestroy
  ) {
    this.language$.pipe(takeUntil(this.$destroy)).subscribe(() => {
      this.getTopConsultants();
    });
  }

  /**
   *
   */
  private getTopConsultants() {
    this.topConsulatantsList$ = this.$topConsultant
      .getTopConsultants(4)
      .pipe(map((result) => result.data));
  }

  /**
   *
   */
  ngOnInit() {
    this.getTopConsultants();
  }
}
