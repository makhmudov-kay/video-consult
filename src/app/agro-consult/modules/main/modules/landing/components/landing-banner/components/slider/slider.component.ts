import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StatisticCount } from '../../model/statistic-count.interface';

@Component({
  selector: 'az-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.less'],
})
export class SliderComponent {
  /**
   *
   */
  @Input()
  isVisible!: boolean;

  /**
   *
   */
  @Output()
  isVisibleChange = new EventEmitter<boolean>();

  /**
   *
   */
  @Input()
  statisticCount!: StatisticCount;

  /**
   *
   */
  @Output()
  guideVisible = new EventEmitter<boolean>();

  /**
   *
   */
  @Input()
  bannerImg = './assets/images/landing-banner.png';

  /**
   *
   */
  @Input()
  circleImg = './assets/images/circle.png';

  /**
   *
   */
  @Input()
  isClass!: number;
}
