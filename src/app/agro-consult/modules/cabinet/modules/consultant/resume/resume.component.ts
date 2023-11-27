import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { LanguageState, NgDestroy } from 'ngx-az-core';
import { IsVisibleResume } from 'projects/agro-consult/src/app/shared/models/isVisible-resume.interface';
import { ResumeResponse } from 'projects/agro-consult/src/app/shared/models/resume.response';
import { MyResumeService } from 'projects/agro-consult/src/app/shared/services/my-resume.service';
import { ResumeService } from 'projects/agro-consult/src/app/shared/services/resume.service';
import { map, Observable, takeUntil } from 'rxjs';

@Component({
  selector: 'az-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.less'],
  providers: [NgDestroy],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResumeComponent implements OnInit {
  /**
   *
   */
  isLoading = false;

  /**
   *
   */
  isVisible = false;

  /**
   *
   */
  isVisibleDeleteModal = false;

  /**
   *
   */
  removeResume = false;

  /**
   *
   */
  myResume$!: Observable<ResumeResponse[]>;

  /**
   *
   */
  resumeList!: ResumeResponse[];

  /**
   *
   */
  id!: number;

  /**
   *
   */
  @Select(LanguageState.currentLanguage)
  language$!: Observable<string>;

  /**
   *
   * @param $myResume
   * @param $resume
   * @param cd
   */
  constructor(
    private $myResume: MyResumeService,
    private $resume: ResumeService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private $store: Store,
    private $destroy: NgDestroy
  ) {
    this.language$.pipe(takeUntil($destroy)).subscribe(() => {
      this.getMyResume();
    });
  }

  /**
   *
   */
  private getResumeList() {
    this.myResume$ = this.$myResume
      .getMyResumeList()
      .pipe(map((result) => result.data));
  }

  /**
   *
   */
  getMyResume() {
    this.$myResume
      .getMyResumeList()
      .pipe(takeUntil(this.$destroy))
      .subscribe((result) => {
        this.resumeList = result.data;
        // if (!this.resumeList.length) {
        //   this.router.navigate([
        //     this.$store.selectSnapshot(LanguageState.currentLanguage),
        //     'cabinet',
        //     'client',
        //     'applications',
        //   ]);
        // }
        this.cd.markForCheck();
      });
  }

  /**
   *
   */
  ngOnInit() {
    // this.getResumeList();
    // this.getMyResume();
  }

  /**
   *
   * @param id
   * @param value
   */
  changeVisible(id: number, value: boolean) {
    const body: IsVisibleResume = {
      visible: value,
    };
    this.isLoading = true;
    this.$resume
      .updateVisible(id, body)
      .pipe(takeUntil(this.$destroy))
      .subscribe(() => {
        this.isLoading = false;
        // this.getResumeList();
        this.getMyResume();
        this.cd.markForCheck();
      });
  }

  /**
   *
   * @param id
   */
  remove(id: number, activeApplicationCount: number) {
    if (activeApplicationCount > 0) {
      this.isVisible = true;
      return;
    }

    this.id = id;
    this.isVisibleDeleteModal = true;
    this.cd.markForCheck();
  }

  /**
   *
   * @param id
   */
  deleteResume() {
    this.$resume
      .removeResume(this.id)
      .pipe(takeUntil(this.$destroy))
      .subscribe(() => {
        this.getMyResume();
        this.cd.markForCheck();
      });
  }
}
