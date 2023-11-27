import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RadioGroup } from './models/radio-group.model';

@Component({
  selector: 'az-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.less'],
})
export class RadioGroupComponent {
  /**
   *
   */
  @Input()
  radioValue!: number;

  /**
   *
   */
  @Output()
  radioValueChange = new EventEmitter<number>();

  /**
   *
   */
  @Input()
  radioOptions!: RadioGroup[];
}
