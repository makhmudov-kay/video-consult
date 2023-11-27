import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'az-svg-calendar',
  templateUrl: './svg-calendar.component.svg',
  styleUrls: ['./svg-calendar.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SvgCalendarComponent {}
