import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select } from '@ngxs/store';
import { LanguageState, NgDestroy } from 'ngx-az-core';
import { ResumeResponse } from 'projects/agro-consult/src/app/shared/models/resume.response';
import { ResumeService } from 'projects/agro-consult/src/app/shared/services/resume.service';
import { map, Observable, takeUntil } from 'rxjs';

@Component({
  selector: 'az-resume-detail',
  templateUrl: './resume-detail.component.html',
  styleUrls: ['./resume-detail.component.less'],
  providers: [NgDestroy],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResumeDetailComponent implements OnInit {
  /**
   *
   */
  id?: string;

  /**
   *
   */
  resume$!: Observable<ResumeResponse>;

  /**
   *
   */
  @Select(LanguageState.currentLanguage)
  language$!: Observable<string>;

  /**
   *
   * @param route
   * @param $resume
   */
  constructor(
    private route: ActivatedRoute,
    private $resume: ResumeService,
    private $destroy: NgDestroy
  ) {
    this.id = this.route.snapshot.params['id'];
    this.language$.pipe(takeUntil(this.$destroy)).subscribe(() => {
      if (this.id) {
        this.getResumeById(this.id);
      }
    });
  }

  /**
   *
   */
  private getResumeById(id: string) {
    this.resume$ = this.$resume
      .getResumeById(id)
      .pipe(map((result) => result.data));
  }

  /**
   *
   */
  ngOnInit() {
    if (this.id) {
      this.getResumeById(this.id);
    }
  }
}
