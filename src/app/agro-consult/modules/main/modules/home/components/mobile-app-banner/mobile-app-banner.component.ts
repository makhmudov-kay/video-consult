import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'az-mobile-app-banner',
  templateUrl: './mobile-app-banner.component.html',
  styleUrls: ['./mobile-app-banner.component.less'],
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileAppBannerComponent {
  /**
   *
   */
  @Input()
  title = 'mobileBanner.title';

  /**
   *
   */
  @Input()
  description = 'mobileBanner.description';
}
