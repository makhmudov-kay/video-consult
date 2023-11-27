import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

@Component({
  selector: 'az-application-card',
  templateUrl: './application-card.component.html',
  styleUrls: ['./application-card.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationCardComponent {
  /**
   *
   */
  @Input()
  form!: FormGroup;

  /**
   *
   */
  @Input()
  imageSrc!: NzSafeAny;
}
