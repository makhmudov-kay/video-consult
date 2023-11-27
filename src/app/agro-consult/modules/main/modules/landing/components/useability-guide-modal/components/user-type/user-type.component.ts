import { Router } from '@angular/router';
import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'az-user-type',
  templateUrl: './user-type.component.html',
  styleUrls: ['./user-type.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTypeComponent {
  @Input()
  type!: string;

  /**
   *
   */
  @Output()
  typeChanger = new EventEmitter<string>();

  /**
   *
   * @param type
   */
  chooseGuideType(type: string) {
    this.typeChanger.emit(type);
  }
}
