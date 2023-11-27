import { ActivatedRoute } from '@angular/router';
import { DataState, NgDestroy } from 'ngx-az-core';
import { Observable, takeUntil, map } from 'rxjs';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { Select } from '@ngxs/store';
import { CheckHasResume, UserInfo } from 'ngx-az-core';
import { FAQResponse } from './components/f-a-q/model/f-a-q.response';

@Component({
  selector: 'az-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.less'],
  providers: [NgDestroy],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingComponent implements OnInit {
  /**
   *
   */
  isVisibleGuide = false;

  /**
   *
   */
  visibleGuideDrawer = false;

  /**
   *
   */
  isVisibleModal = true;

  /**
   *
   */
  faqsData$!: Observable<FAQResponse[]>;

  /**
   *
   */
  userInfo!: any;

  /**
   *
   */
  checkResume!: CheckHasResume;

  /**
   *
   */
  @Select(DataState.checkHasResume)
  checkHasResume$!: Observable<CheckHasResume>;

  /**
   *
   */
  @Select(DataState.getUserInfo)
  userInfo$!: Observable<UserInfo>;

  /**
   *
   * @param cd
   * @param user$
   */
  constructor(
    private cd: ChangeDetectorRef,
    private $destroy: NgDestroy,
    private route: ActivatedRoute
  ) {}

  /**
   *
   */
  private getFAQData() {
    this.faqsData$ = this.route.data.pipe(map((result) => result['data']));
  }

  /**
   *
   */
  private openGudeByQueryParam() {
    if (this.route.snapshot.queryParams['guide']) {
      if (this.isVisibleModal) {
        this.isVisibleGuide = true;
      } else {
        this.visibleGuideDrawer = true;
      }
      this.cd.markForCheck();
    }
  }

  /**
   *
   */
  private getUserInfo() {
    this.userInfo$.pipe(takeUntil(this.$destroy)).subscribe((user) => {
      if (user) {
        this.userInfo = user;
        if (!user.profile.guide_user) {
          if (this.isVisibleModal) {
            this.isVisibleGuide = true;
          } else {
            this.visibleGuideDrawer = true;
          }
        }
        this.checkResumeInfo();
        this.cd.markForCheck();
      }
    });
  }

  /**
   *
   */
  private checkResumeInfo() {
    this.checkHasResume$.pipe(takeUntil(this.$destroy)).subscribe((result) => {
      this.checkResume = result;

      if (result?.count > 0 && !this.userInfo.profile.guide_consultant) {
        if (this.isVisibleModal) {
          this.isVisibleGuide = true;
        } else {
          this.visibleGuideDrawer = true;
        }
      }
      this.cd.markForCheck();
    });
  }

  /**
   *
   */
  ngOnInit() {
    if (window.innerWidth < 768) {
      this.isVisibleModal = false;
    } else if (window.innerWidth > 767) {
      this.isVisibleModal = true;
    }
    this.openGudeByQueryParam();
    this.getUserInfo();
    this.getFAQData();
  }

  /**
   *
   * @param e
   */
  onResize(e: any) {
    if (e.target.innerWidth < 768) {
      this.isVisibleModal = false;
    } else if (e.target.innerWidth > 767) {
      this.isVisibleModal = true;
    }
  }

  /**
   *
   */
  handleGuideVisible(isVisible: boolean) {
    if (this.isVisibleModal) {
      this.isVisibleGuide = isVisible;
    } else {
      this.visibleGuideDrawer = isVisible;
    }
    this.cd.markForCheck();
  }
}
