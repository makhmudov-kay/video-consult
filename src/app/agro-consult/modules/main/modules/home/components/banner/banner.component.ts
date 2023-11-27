import { ChangeDetectionStrategy, Component } from '@angular/core';

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
  isVisible = false;
}
