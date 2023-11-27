import { Component, Input } from '@angular/core';

@Component({
  selector: 'az-svg-info-message',
  templateUrl: './svg-info-message.component.html',
  styleUrls: ['./svg-info-message.component.less'],
})
export class SvgInfoMessageComponent {
  @Input()
  danger!: boolean;
}
