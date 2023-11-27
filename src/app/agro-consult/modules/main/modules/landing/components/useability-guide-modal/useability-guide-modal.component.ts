import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ViewChild,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Inject,
} from '@angular/core';
import { SwiperComponent } from 'swiper/angular';
import { GuideResponse } from './model/guide.response';
import { GuidePassedService } from './service/guide-passed.service';
import { GuideUpdate } from './model/guide-update.request';
import { CheckHasResume } from 'projects/agro-consult/src/app/agro-consult/components/header/models/check-has-resume.interface';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'az-useability-guide-modal',
  templateUrl: './useability-guide-modal.component.html',
  styleUrls: ['./useability-guide-modal.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UseabilityGuideModalComponent implements OnInit {
  /**
   *
   */
  @Input()
  isVisibleGuide!: boolean;

  /**
   *
   */
  @Input()
  visibleGuideDrawer!: boolean;

  /**
   *
   */
  @Input()
  isVisibleModal!: boolean;

  /**
   *
   */
  @Input()
  userInfo!: any;

  /**
   *
   */
  @Input()
  checkResume!: CheckHasResume;

  /**
   *
   */
  @Output()
  isVisibleGuideChange = new EventEmitter<boolean>();

  /**
   *
   */
  @Output()
  visibleGuideDrawerChange = new EventEmitter<boolean>();

  /**
   *
   */
  @ViewChild('swiper')
  swiper!: SwiperComponent;

  /**
   *
   */
  type = 'user';

  /**
   *
   */
  lastSlide = false;

  /**
   *
   */
  firstSlide = false;

  /**
   *
   */
  current = 0;

  /**
   *
   */
  index = 'first';

  /**
   *
   */
  copableGuideLink!: string;

  /**
   *
   */
  $guide!: Observable<GuideResponse[]>;

  /**
   *
   * @param cd
   * @param profileUpdate$
   * @param route
   */
  constructor(
    private cd: ChangeDetectorRef,
    private profileUpdate$: GuidePassedService,
    private route: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.$guide = this.route.data.pipe(map((result) => result['guide']));
    this.route.params.subscribe(() => {
      if (this.swiper) {
        this.swiper.swiperRef.slideTo(0, 500);
      }
    });
    this.cd.markForCheck();
  }

  /**
   *
   * @param bodyRequest
   */
  private updateProfile(bodyRequest: GuideUpdate) {
    this.profileUpdate$
      .updateProfileGuide(this.userInfo.profile.id, bodyRequest)
      .subscribe();
  }

  /**
   *
   */
  private updateGuideStatus() {
    if (this.userInfo && !this.userInfo.profile.guide_user) {
      const bodyRequest: GuideUpdate = {
        guide_user: true,
      };
      this.updateProfile(bodyRequest);
    }
    if (this.checkResume.count > 0 && !this.userInfo.profile.guide_consultant) {
      const bodyRequest: GuideUpdate = {
        guide_consultant: true,
      };
      this.updateProfile(bodyRequest);
    }
  }

  /**
   *
   */
  ngOnInit() {
    this.copableGuideLink = this.document.location.href + '?guide=true';
    if (this.userInfo && !this.userInfo.profile.guide_user) {
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
  swiperEventListener() {
    this.cd.detectChanges();
  }

  /**
   *
   */
  handleCancel() {
    this.isVisibleGuideChange.emit(false);
    this.visibleGuideDrawerChange.emit(false);
    this.updateGuideStatus();
  }

  /**
   *
   */
  handleOk() {
    this.isVisibleGuideChange.emit(false);
    this.visibleGuideDrawerChange.emit(false);
    this.updateGuideStatus();
  }

  /**
   *
   * @param type
   */
  chooseGuideType(type: string) {
    this.type = type;
  }

  /**
   *
   */
  pre() {
    this.swiper.swiperRef.slidePrev();
  }

  /**
   *
   */
  next() {
    this.swiper.swiperRef.slideNext();
  }

  /**
   *-----------------------------
   */
  preStep(): void {
    this.current -= 1;
    this.changeContent();
  }

  /**
   *
   */
  nextStep(): void {
    this.current += 1;
    this.changeContent();
  }

  /**
   *
   */
  changeContent(): void {
    switch (this.current) {
      case 0: {
        this.index = 'first';
        break;
      }
      case 1: {
        this.index = 'second';
        break;
      }
      default: {
        this.index = 'error';
      }
    }
  }
}
