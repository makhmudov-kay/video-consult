import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BannerInfo } from '../../dto/banner-info.interface';

@Component({
  selector: 'az-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BannerComponent {
  /**
   *
   */
  bannerInfo: BannerInfo[] = [
    {
      title: 'withoutСomissions',
      img: './assets/images/feature-percent.svg',
      description: 'withoutComissions.text',
    },
    {
      title: 'paymentGarant',
      img: './assets/images/feature-shield.svg',
      description: 'paymentGarant.text',
    },
    {
      title: 'clientTrust',
      img: './assets/images/feature-smile.svg',
      description: 'clientTrust.text',
    },
    {
      title: 'comfortPayment',
      img: './assets/images/feature-card.svg',
      description: 'comfortPayment.text',
    },
  ];
}
