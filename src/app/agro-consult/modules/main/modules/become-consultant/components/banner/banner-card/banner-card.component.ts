import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BannerInfo } from '../../../dto/banner-info.interface';

@Component({
  selector: 'az-banner-card',
  templateUrl: './banner-card.component.html',
  styleUrls: ['./banner-card.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BannerCardComponent {
  /**
   *
   */
  @Input()
  bannerCard!: BannerInfo;
}
