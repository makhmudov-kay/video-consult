import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'az-svg-attach',
  templateUrl: './svg-attach.component.svg',
  styleUrls: ['./svg-attach.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SvgAttachComponent {}
