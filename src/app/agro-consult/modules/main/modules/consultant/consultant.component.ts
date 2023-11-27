import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, takeUntil } from 'rxjs';
import { ResumeService } from 'projects/agro-consult/src/app/shared/services/resume.service';
import { ResumeResponse } from 'projects/agro-consult/src/app/shared/models/resume.response';
import { DataState, LanguageState, NgDestroy, UserInfo } from 'ngx-az-core';
import { Select } from '@ngxs/store';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'az-consultant',
  templateUrl: './consultant.component.html',
  styleUrls: ['./consultant.component.less'],
  providers: [NgDestroy],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsultantComponent implements OnInit {
  /**
   *
   */
  id!: string;

  /**
   *
   */
  consultantInfo$!: Observable<ResumeResponse>;

  /**
   *
   */
  profileId!: number;

  /**
   *
   */
  @Select(DataState.getUserInfo)
  userInfo$!: Observable<UserInfo>;

  /**
   *
   */
  @Select(LanguageState.currentLanguage)
  language$!: Observable<string>;

  /**
   *
   * @param route
   * @param $resume
   * @param cd
   * @param $destroy
   */
  constructor(
    private route: ActivatedRoute,
    private $resume: ResumeService,
    private cd: ChangeDetectorRef,
    private $destroy: NgDestroy,
    private viewport: ViewportScroller
  ) {
    this.route.params.subscribe((param) => {
      this.id = param['id'];
      this.getUserInfo();
      this.cd.markForCheck();
    });
  }

  /**
   *
   * @param id
   */
  private getResumeById(id: string) {
    this.consultantInfo$ = this.$resume
      .getResumeById(id)
      .pipe(map((result) => result.data));
  }

  /**
   *
   */
  private getUserInfo() {
    this.userInfo$.pipe(takeUntil(this.$destroy)).subscribe((result) => {
      this.profileId = result.profile.id;
    });
  }

  /**
   *
   */
  ngOnInit(): void {
    if (this.id) {
      this.getResumeById(this.id);
      
      this.viewport.scrollToPosition([0, 0]);

      this.language$.subscribe(() => {
        this.getResumeById(this.id);
      });
    }
  }
}
