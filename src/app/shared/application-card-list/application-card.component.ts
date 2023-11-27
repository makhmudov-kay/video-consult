import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

@Component({
  selector: 'az-application-card-list',
  templateUrl: './application-card.component.html',
  styleUrls: ['./application-card.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationCardComponent {
  /**
   *
   */
  @Input()
  application!: NzSafeAny;

  /**
   *
   */
  @Input()
  status = false;
}
