import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'az-svg-notification',
  templateUrl: './svg-notification.component.svg',
  styleUrls: ['./svg-notification.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SvgNotificationComponent {}
