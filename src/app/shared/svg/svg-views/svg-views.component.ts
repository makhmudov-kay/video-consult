import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-svg-views',
  templateUrl: './svg-views.component.svg',
  styleUrls: ['./svg-views.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SvgViewsComponent {}
