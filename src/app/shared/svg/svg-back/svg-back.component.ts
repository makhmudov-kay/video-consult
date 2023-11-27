import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'az-svg-back',
  templateUrl: './svg-back.component.html',
  styleUrls: ['./svg-back.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SvgBackComponent {
  @Input()
  minimalScreen!: boolean;
}
