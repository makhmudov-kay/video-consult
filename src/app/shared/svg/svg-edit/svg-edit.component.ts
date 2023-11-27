import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'az-svg-edit',
  templateUrl: './svg-edit.component.svg',
  styleUrls: ['./svg-edit.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SvgEditComponent {}
