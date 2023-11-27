import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Select } from '@ngxs/store';
import {
  DataState,
  NgDestroy,
  CheckHasResume,
  StoreService,
} from 'ngx-az-core';
import { filter, map, Observable, takeUntil } from 'rxjs';
import { ResumeResponse } from '../../../shared/models/resume.response';
import { MyResumeService } from '../../../shared/services/my-resume.service';

@Component({
  selector: 'az-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.less'],
  providers: [NgDestroy],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CabinetComponent implements OnInit {
  /**
   *
   */
  myResume$!: Observable<ResumeResponse[]>;

  /**
   *
   */
  @Select(DataState.checkHasResume)
  checkHasResume$!: Observable<CheckHasResume>;

  /**
   *
   */
  hasResume!: boolean;

  /**
   *
   */
  resumeCount!: number;

  /**
   *
   */
  isMobileDevice = false;

  /**
   *
   * @param $myResume
   * @param router
   */
  constructor(
    private $myResume: MyResumeService,
    private router: Router,
    private $storeService: StoreService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private $destroy: NgDestroy
  ) {
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => {
        this.checkHasResume();
        this.cd.markForCheck();
      });

    if (this.route.snapshot.fragment) {
      this.isMobileDevice = true;
      cd.markForCheck();
    }
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
  private checkHasResume() {
    this.checkHasResume$.pipe(takeUntil(this.$destroy)).subscribe((result) => {
      if (result) {
        this.hasResume = result.check;
        this.resumeCount = result.count;
        this.cd.markForCheck();
      }
    });
  }

  /**
   *
   */
  ngOnInit() {
    this.getResumeList();
    this.checkHasResume();
  }

  /**
   *
   */
  navigateTo() {
    this.router.navigate([
      this.$storeService.currentLanguage,
      'main',
      'become-consultant',
    ]);
  }
}
