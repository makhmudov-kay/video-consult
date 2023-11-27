import SwiperCore, { Autoplay, EffectFade, Navigation, Pagination } from 'swiper';
import { StatisticCountService } from './service/statistic-count.service';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ChangeDetectorRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from 'ngx-az-core';
import { StatisticCount } from './model/statistic-count.interface';

SwiperCore.use([Pagination, Navigation, Autoplay, EffectFade]);
@Component({
  selector: 'az-landing-banner',
  templateUrl: './landing-banner.component.html',
  styleUrls: ['./landing-banner.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingBannerComponent implements OnInit {
  /**
   *
   */
  @Output()
  guideVisible = new EventEmitter<boolean>();

  /**
   *
   */
  isVisible = false;

  /**
   *
   */
  statisticCount!: StatisticCount;

  /**
   *
   */
  carouselImages = [
    {
      circleImg: './assets/images/circle.png',
      bannerImg: './assets/images/landing-banner.png',
      isClass: 1,
    },
    {
      circleImg: './assets/images/slider/yellow-circle.png',
      bannerImg: './assets/images/slider/yellow.png',
      isClass: 2,
    },
    {
      circleImg: './assets/images/slider/green-circle.png',
      bannerImg: './assets/images/slider/green.png',
      isClass: 3,
    },
    {
      circleImg: './assets/images/slider/green-yellow-circle.png',
      bannerImg: './assets/images/slider/green-yellow.png',
      isClass: 4,
    },
  ];

  /**
   *
   * @param router
   * @param $store
   * @param $statistic
   */
  constructor(
    private router: Router,
    private $storeService: StoreService,
    private $statistic: StatisticCountService,
    private cd: ChangeDetectorRef
  ) {}

  /**
   *
   */
  navigateToCreateApplication() {
    this.router.navigate([
      this.$storeService.currentLanguage,
      'main',
      'application-type',
    ]);
  }

  /**
   *
   */
  private getStatisticCount() {
    this.$statistic.getStatisticByService().subscribe((result) => {
      this.statisticCount = result.data;
      this.cd.markForCheck();
    });
  }

  /**
   *
   */
  ngOnInit() {
    this.getStatisticCount();
  }

  /**
   *
   * @param event
   */
  handlerGuideVisible(event: boolean) {
    this.guideVisible.emit(event);
  }
}
