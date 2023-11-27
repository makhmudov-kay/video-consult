import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'az-svg-camera',
  templateUrl: './svg-camera.component.svg',
  styleUrls: ['./svg-camera.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SvgCameraComponent {}
